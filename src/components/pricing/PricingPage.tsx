import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Crown, AlertCircle } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PricingPage = () => {
  const { user, upgradeToPaid } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    if (!user) {
      navigate("/login", { state: { returnTo: "/pricing" } });
      return;
    }

    try {
      await upgradeToPaid();
      // Show success message or redirect
    } catch (error) {
      console.error("Error upgrading account:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("pricing.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("pricing.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Tier */}
        <Card
          className={`border-2 ${user?.tier === "free" ? "border-primary" : "border-transparent"}`}
        >
          <CardHeader>
            <CardTitle className="text-2xl">
              {t("pricing.free.title")}
            </CardTitle>
            <CardDescription>{t("pricing.free.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-6">
              {t("pricing.free.price")}
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span>{t("pricing.free.listings")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span>{t("pricing.free.support")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span>{t("pricing.free.visibility")}</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span>Limited to 1 active listing</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {user?.tier === "free" ? (
              <Button className="w-full" variant="outline" disabled>
                {t("pricing.free.button")}
              </Button>
            ) : (
              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Premium Tier */}
        <Card
          className={`border-2 ${user?.tier === "paid" ? "border-primary" : "border-transparent"} relative overflow-hidden`}
        >
          {/* Recommended Badge */}
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
            Recommended
          </div>

          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown size={20} className="text-amber-500" />
              <CardTitle className="text-2xl">
                {t("pricing.paid.title")}
              </CardTitle>
            </div>
            <CardDescription>{t("pricing.paid.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-6">
              {t("pricing.paid.price")}
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span className="font-medium">
                  {t("pricing.paid.listings")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span>{t("pricing.paid.support")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span>{t("pricing.paid.visibility")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span>Featured listings</span>
              </li>
              <li className="flex items-start gap-2">
                <Check
                  size={18}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span>Detailed analytics</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {!user ? (
              <Button className="w-full" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            ) : user.tier === "paid" ? (
              <Button className="w-full" disabled>
                {t("pricing.paid.current")}
              </Button>
            ) : (
              <Button className="w-full" onClick={handleUpgrade}>
                {t("pricing.paid.button")}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="text-lg font-medium mb-2">
              Can I upgrade or downgrade my plan later?
            </h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade to Premium at any time. Downgrading from
              Premium to Free is also possible at the end of your billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">
              How does the listing limit work?
            </h3>
            <p className="text-muted-foreground">
              Free users can have one active listing at a time. Premium users
              can create unlimited listings. If you're a free user and want to
              create a new listing when you already have one, you'll need to
              either delete your existing listing or upgrade to Premium.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for
              Premium subscriptions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">
              Is there a contract or commitment?
            </h3>
            <p className="text-muted-foreground">
              No long-term contracts. Premium subscriptions are billed monthly
              and you can cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
