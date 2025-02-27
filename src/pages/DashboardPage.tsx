import React, { useState } from "react";
import UserDashboard from "@/components/dashboard/UserDashboard";
import Navbar from "@/components/Navbar";
import CreateListingModal from "@/components/CreateListingModal";

const DashboardPage = () => {
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);

  const handleCreateListing = () => {
    setIsCreateListingOpen(true);
  };

  const handleListingSubmit = (values: any) => {
    console.log("Listing submitted:", values);
    setIsCreateListingOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar onCreateListing={handleCreateListing} isLoggedIn={true} />

      <div className="pt-24 pb-16">
        <UserDashboard onCreateListing={handleCreateListing} />
      </div>

      <CreateListingModal
        open={isCreateListingOpen}
        onOpenChange={setIsCreateListingOpen}
        onSubmit={handleListingSubmit}
      />
    </div>
  );
};

export default DashboardPage;
