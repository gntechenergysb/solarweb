import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const CartPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
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
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === "solar10") {
      // Apply 10% discount
      setDiscount(0.1);
    } else {
      alert("Invalid promo code");
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = subtotal * discount;
  const shipping = 15.99;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />

      <div className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <ShoppingCart className="mr-2" /> Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button onClick={() => navigate("/")} className="mx-auto">
              <ChevronLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Cart Items ({cartItems.length})
                  </h2>

                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-lg font-bold mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <button
                                className="w-8 h-8 rounded-l-md bg-gray-100 flex items-center justify-center"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1,
                                  )
                                }
                              >
                                -
                              </button>
                              <div className="w-10 h-8 bg-gray-50 flex items-center justify-center border-y border-gray-200">
                                {item.quantity}
                              </div>
                              <button
                                className="w-8 h-8 rounded-r-md bg-gray-100 flex items-center justify-center"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1,
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="text-red-500 hover:text-red-700 transition-colors"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex items-center"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setCartItems([])}
                  className="flex items-center"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <div className="pt-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyPromoCode}
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Try "SOLAR10" for 10% off
                      </p>
                    </div>

                    <Button
                      className="w-full mt-6 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                      size="lg"
                      onClick={() => navigate("/checkout")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Proceed to
                      Checkout
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      By proceeding to checkout, you agree to our{" "}
                      <a href="#" className="underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  id: "r1",
                  title: "Solar Panel Mounting Kit",
                  price: 49.99,
                  image:
                    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                },
                {
                  id: "r2",
                  title: "Solar Cable 10AWG (10ft)",
                  price: 19.99,
                  image:
                    "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                },
                {
                  id: "r3",
                  title: "MC4 Connectors (5 pairs)",
                  price: 12.99,
                  image:
                    "https://images.unsplash.com/photo-1586920740099-f3ceb65d0c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                },
                {
                  id: "r4",
                  title: "Solar Panel Cleaning Kit",
                  price: 24.99,
                  image:
                    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                },
              ].map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">{product.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button size="sm" variant="outline">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
