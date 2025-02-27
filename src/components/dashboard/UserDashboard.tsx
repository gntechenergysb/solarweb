import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  ShoppingBag,
  Plus,
  Crown,
  Settings,
  LogOut,
} from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

interface UserDashboardProps {
  onCreateListing?: () => void;
}

const UserDashboard = ({ onCreateListing = () => {} }: UserDashboardProps) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Or a loading spinner
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const remainingListings =
    user.tier === "free" ? Math.max(0, 1 - user.listingsCount) : "∞";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={32} className="text-primary" />
                </div>
                <div>
                  <CardTitle>{user.username || "User"}</CardTitle>
                  <CardDescription className="truncate max-w-[200px]">
                    {user.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mb-4">
                <div className="text-sm text-muted-foreground">
                  {t("dashboard.tier")}:
                </div>
                <div className="flex items-center gap-2">
                  {user.tier === "paid" ? (
                    <>
                      <Crown size={16} className="text-amber-500" />
                      <span className="font-medium text-amber-500">
                        {t("pricing.paid.title")}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">
                        {t("pricing.free.title")}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  {t("dashboard.memberSince")}:
                </div>
                <div className="font-medium">{formatDate(user.createdAt)}</div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-2">
              {user.tier === "free" && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-amber-600 border-amber-200 hover:bg-amber-50"
                  onClick={() => navigate("/pricing")}
                >
                  <Crown size={16} />
                  {t("dashboard.upgrade")}
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => navigate("/settings")}
              >
                <Settings size={16} />
                Settings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut size={16} />
                {t("nav.logout")}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listings">
                {t("dashboard.listings")}
              </TabsTrigger>
              <TabsTrigger value="favorites">
                {t("dashboard.favorites")}
              </TabsTrigger>
              <TabsTrigger value="orders">{t("dashboard.orders")}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {t("dashboard.listingsCount")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {user.listingsCount}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("dashboard.listingsRemaining")}: {remainingListings}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Favorites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">0</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">0</div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={onCreateListing}
                    className="h-auto py-6 flex flex-col items-center gap-2"
                    disabled={user.tier === "free" && user.listingsCount >= 1}
                  >
                    <Plus size={24} />
                    <span>Create Listing</span>
                    {user.tier === "free" && user.listingsCount >= 1 && (
                      <span className="text-xs mt-1">
                        Upgrade to create more listings
                      </span>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-center gap-2"
                  >
                    <Heart size={24} />
                    <span>View Favorites</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-center gap-2"
                  >
                    <ShoppingBag size={24} />
                    <span>View Orders</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listings" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{t("dashboard.listings")}</CardTitle>
                    <Button
                      onClick={onCreateListing}
                      disabled={user.tier === "free" && user.listingsCount >= 1}
                    >
                      <Plus size={16} className="mr-2" />
                      Create Listing
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {user.listingsCount === 0 ? (
                    <div className="text-center py-12">
                      <Package
                        size={48}
                        className="mx-auto text-muted-foreground mb-4"
                      />
                      <h3 className="text-lg font-medium mb-2">
                        No listings yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Create your first listing to start selling
                      </p>
                      <Button
                        onClick={onCreateListing}
                        disabled={
                          user.tier === "free" && user.listingsCount >= 1
                        }
                      >
                        <Plus size={16} className="mr-2" />
                        Create Listing
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package
                        size={48}
                        className="mx-auto text-muted-foreground mb-4"
                      />
                      <h3 className="text-lg font-medium mb-2">
                        Your listings will appear here
                      </h3>
                      <p className="text-muted-foreground">
                        This is a demo, so no actual listings are shown
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.favorites")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Heart
                      size={48}
                      className="mx-auto text-muted-foreground mb-4"
                    />
                    <h3 className="text-lg font-medium mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-muted-foreground">
                      Items you favorite will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.orders")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <ShoppingBag
                      size={48}
                      className="mx-auto text-muted-foreground mb-4"
                    />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground">
                      Your purchase history will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
