import React from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowRight,
  CheckCircle,
  Sun,
  Zap,
  Battery,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorksPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />

      <div className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How SolarSwap Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your one-stop marketplace for buying and selling pre-owned solar
            equipment
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">1. List Your Equipment</h3>
            <p className="text-gray-600">
              Create a listing with photos, description, and pricing for your
              pre-owned solar equipment.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Connect with Buyers</h3>
            <p className="text-gray-600">
              Interested buyers will contact you through our secure messaging
              system to ask questions or make offers.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Complete the Sale</h3>
            <p className="text-gray-600">
              Finalize the transaction through our secure payment system and
              arrange for pickup or delivery.
            </p>
          </div>
        </div>

        {/* For Buyers and Sellers */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Zap className="mr-2 text-amber-500" /> For Buyers
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  Browse thousands of pre-owned solar equipment listings
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Save up to 70% compared to buying new equipment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Verified sellers and detailed equipment history</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Secure payment protection and buyer guarantees</span>
              </li>
            </ul>
            <Button onClick={() => navigate("/")} className="mt-6 w-full">
              Start Browsing
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Battery className="mr-2 text-amber-500" /> For Sellers
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>List your unused or upgraded solar equipment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Reach thousands of potential buyers in your area</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Free basic listings with premium options available</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Secure payment processing with seller protection</span>
              </li>
            </ul>
            <Button
              onClick={() => navigate("/pricing")}
              className="mt-6 w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            >
              Start Selling
            </Button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">John D.</h4>
                  <p className="text-sm text-gray-500">Solar Installer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I've been able to find quality used panels for my clients at a
                fraction of the cost. SolarSwap has become an essential part of
                my business."
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sarah M.</h4>
                  <p className="text-sm text-gray-500">Homeowner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "After upgrading my system, I was able to sell my old inverter
                quickly. The process was smooth and I got a fair price."
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Michael T.</h4>
                  <p className="text-sm text-gray-500">Off-Grid Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Found exactly the battery bank I needed for my cabin. Saved
                over $2,000 compared to buying new, and it works perfectly."
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join SolarSwap?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Whether you're looking to buy or sell solar equipment, SolarSwap
            makes it easy, secure, and affordable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              Create an Account
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/20"
            >
              Browse Listings <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
