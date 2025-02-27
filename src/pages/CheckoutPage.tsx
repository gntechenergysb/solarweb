import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  ShoppingBag,
  Check,
  ChevronLeft,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CheckoutPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState("shipping");
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      email: "",
    },
    payment: {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      saveCard: false,
    },
    shippingMethod: "standard",
  });

  // Sample cart items
  const cartItems = [
    {
      id: "1",
      title: "Solar Panel 250W Monocrystalline",
      price: 199.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "2",
      title: "Inverter 3000W Pure Sine Wave",
      price: 349.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1611365892117-bede7a956882?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleShippingMethodChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      shippingMethod: value,
    }));
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep("payment");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
    }, 1500);
  };

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = formData.shippingMethod === "express" ? 29.99 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Navbar />

        <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Thank you for your purchase
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order Number:</span>
                <span>#SOL-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Estimated Delivery:</span>
                <span>
                  {formData.shippingMethod === "express"
                    ? "2-3 Business Days"
                    : "5-7 Business Days"}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-bold">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              >
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                View Order History
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />

      <div className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <Tabs value={activeStep} onValueChange={setActiveStep}>
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="shipping"
                      disabled={activeStep === "payment"}
                    >
                      Shipping
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      disabled={activeStep === "shipping"}
                    >
                      Payment
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="shipping" className="p-6">
                  <form
                    onSubmit={handleContinueToPayment}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.shipping.firstName}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "firstName",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.shipping.lastName}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "lastName",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        required
                        value={formData.shipping.address}
                        onChange={(e) =>
                          handleInputChange(
                            "shipping",
                            "address",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          required
                          value={formData.shipping.city}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "city",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          required
                          value={formData.shipping.state}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "state",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          required
                          value={formData.shipping.zipCode}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "zipCode",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.shipping.email}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "email",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          required
                          value={formData.shipping.phone}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "phone",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Shipping Method</h3>
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={handleShippingMethodChange}
                      >
                        <div className="flex items-start space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem
                            value="standard"
                            id="standard"
                            className="mt-1"
                          />
                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="standard"
                              className="font-medium cursor-pointer"
                            >
                              Standard Shipping
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              5-7 business days - $15.99
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem
                            value="express"
                            id="express"
                            className="mt-1"
                          />
                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="express"
                              className="font-medium cursor-pointer"
                            >
                              Express Shipping
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              2-3 business days - $29.99
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/cart")}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Cart
                      </Button>
                      <Button type="submit">Continue to Payment</Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="payment" className="p-6">
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        required
                        value={formData.payment.cardName}
                        onChange={(e) =>
                          handleInputChange(
                            "payment",
                            "cardName",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          required
                          placeholder="4242 4242 4242 4242"
                          value={formData.payment.cardNumber}
                          onChange={(e) =>
                            handleInputChange(
                              "payment",
                              "cardNumber",
                              formatCardNumber(e.target.value),
                            )
                          }
                          maxLength={19}
                        />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          required
                          placeholder="MM/YY"
                          value={formData.payment.expiry}
                          onChange={(e) =>
                            handleInputChange(
                              "payment",
                              "expiry",
                              formatExpiry(e.target.value),
                            )
                          }
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          required
                          placeholder="123"
                          value={formData.payment.cvc}
                          onChange={(e) =>
                            handleInputChange("payment", "cvc", e.target.value)
                          }
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Secure Payment</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your payment information is encrypted and secure. We
                        never store your full card details.
                      </p>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveStep("shipping")}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to
                        Shipping
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                      >
                        Place Order
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck size={16} className="text-green-600" />
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield size={16} className="text-green-600" />
                    <span>2-year warranty on all products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
