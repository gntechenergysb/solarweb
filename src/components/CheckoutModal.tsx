import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Check, ShoppingCart, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface CheckoutModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: {
    id: string;
    title: string;
    price: number;
    image?: string;
  };
}

const checkoutSchema = z.object({
  cardName: z.string().min(3, { message: "Name is required" }),
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be 16 digits" })
    .max(19, { message: "Card number must be 16-19 digits" })
    .regex(/^[0-9\s-]+$/, { message: "Invalid card number format" }),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
    message: "Expiry date must be in MM/YY format",
  }),
  cvc: z
    .string()
    .min(3, { message: "CVC must be 3-4 digits" })
    .max(4, { message: "CVC must be 3-4 digits" })
    .regex(/^[0-9]+$/, { message: "CVC must contain only numbers" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutModal = ({
  open = false,
  onOpenChange = () => {},
  product = {
    id: "1",
    title: "Solar Panel 250W Monocrystalline",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
  },
}: CheckoutModalProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  const onSubmit = (values: CheckoutFormValues) => {
    if (!user) {
      navigate("/login", { state: { returnTo: "/checkout" } });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Close modal after showing success message
      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
        form.reset();
      }, 2000);
    }, 2000);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2)}`;
    }
    return value;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isSuccess ? "Payment Successful!" : "Checkout"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess
              ? "Your order has been processed successfully."
              : "Complete your purchase securely."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              Thank you for your purchase!
            </h3>
            <p className="text-gray-500 mb-4">
              A confirmation email has been sent to your email address.
            </p>
            <Button
              onClick={() => {
                onOpenChange(false);
                setIsSuccess(false);
                form.reset();
              }}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">
                  {product.title}
                </h3>
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          disabled={isProcessing}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="4242 4242 4242 4242"
                            {...field}
                            value={formatCardNumber(field.value)}
                            disabled={isProcessing}
                            maxLength={19}
                          />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="MM/YY"
                            {...field}
                            value={formatExpiry(field.value)}
                            disabled={isProcessing}
                            maxLength={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123"
                            {...field}
                            disabled={isProcessing}
                            maxLength={4}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-gray-500">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between mb-2 text-gray-500">
                    <span>Tax</span>
                    <span>${(product.price * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${(product.price * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <p>
                    This is a demo checkout. No actual payment will be
                    processed. You can use any test card number like 4242 4242
                    4242 4242.
                  </p>
                </div>

                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Pay ${(product.price * 1.08).toFixed(2)}
                      </span>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
