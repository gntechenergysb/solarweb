import React from "react";
import Navbar from "@/components/Navbar";
import PricingComponent from "@/components/pricing/PricingPage";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar isLoggedIn={false} />

      <div className="pt-24 pb-16">
        <PricingComponent />
      </div>
    </div>
  );
};

export default PricingPage;
