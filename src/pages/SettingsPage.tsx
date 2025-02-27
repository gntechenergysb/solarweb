import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { User, Bell, Shield, CreditCard, HelpCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const SettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: "",
    location: "",
    phone: "",
    notifications: {
      email: true,
      push: true,
      sms: false,
      deals: true,
      updates: true,
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      profileVisibility: "public",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (
    category: string,
    name: string,
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Only update username for now
      await updateProfile({ username: formData.username });
      // Show success message
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar isLoggedIn={true} />

      <div className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs
                  orientation="vertical"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="flex flex-col items-start h-auto bg-transparent space-y-1 p-0">
                    <TabsTrigger
                      value="profile"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="privacy"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy
                    </TabsTrigger>
                    <TabsTrigger
                      value="billing"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </TabsTrigger>
                    <TabsTrigger
                      value="help"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help & Support
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-0 pb-4">
                <div className="text-sm text-muted-foreground mt-4 mb-2">
                  Language
                </div>
                <LanguageSwitcher variant="outline" size="default" />
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "profile" && "Profile Settings"}
                  {activeTab === "notifications" && "Notification Preferences"}
                  {activeTab === "privacy" && "Privacy Settings"}
                  {activeTab === "billing" && "Billing Information"}
                  {activeTab === "help" && "Help & Support"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "profile" &&
                    "Update your personal information"}
                  {activeTab === "notifications" && "Manage how we contact you"}
                  {activeTab === "privacy" && "Control your privacy settings"}
                  {activeTab === "billing" &&
                    "Manage your payment methods and subscription"}
                  {activeTab === "help" && "Get help with your account"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="profile" className="mt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={true} // Email can't be changed directly
                        />
                        <p className="text-xs text-muted-foreground">
                          Contact support to change your email address
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell others about yourself"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City, State"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="mt-6">
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Saving...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Save size={16} />
                          Save Changes
                        </span>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Notification Methods
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="email-notifications"
                              className="font-medium"
                            >
                              Email Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={formData.notifications.email}
                            onCheckedChange={(checked) =>
                              handleSwitchChange(
                                "notifications",
                                "email",
                                checked,
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="push-notifications"
                              className="font-medium"
                            >
                              Push Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications in your browser
                            </p>
                          </div>
                          <Switch
                            id="push-notifications"
                            checked={formData.notifications.push}
                            onCheckedChange={(checked) =>
                              handleSwitchChange(
                                "notifications",
                                "push",
                                checked,
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="sms-notifications"
                              className="font-medium"
                            >
                              SMS Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications via text message
                            </p>
                          </div>
                          <Switch
                            id="sms-notifications"
                            checked={formData.notifications.sms}
                            onCheckedChange={(checked) =>
                              handleSwitchChange(
                                "notifications",
                                "sms",
                                checked,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Notification Types
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="deals-notifications"
                              className="font-medium"
                            >
                              Deals & Promotions
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Special offers and discounts
                            </p>
                          </div>
                          <Switch
                            id="deals-notifications"
                            checked={formData.notifications.deals}
                            onCheckedChange={(checked) =>
                              handleSwitchChange(
                                "notifications",
                                "deals",
                                checked,
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="updates-notifications"
                              className="font-medium"
                            >
                              Product Updates
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              New features and improvements
                            </p>
                          </div>
                          <Switch
                            id="updates-notifications"
                            checked={formData.notifications.updates}
                            onCheckedChange={(checked) =>
                              handleSwitchChange(
                                "notifications",
                                "updates",
                                checked,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Button className="mt-6">
                      <Save size={16} className="mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="privacy" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Profile Visibility
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="show-email" className="font-medium">
                              Show Email Address
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Display your email on your public profile
                            </p>
                          </div>
                          <Switch
                            id="show-email"
                            checked={formData.privacy.showEmail}
                            onCheckedChange={(checked) =>
                              handleSwitchChange(
                                "privacy",
                                "showEmail",
                                checked,
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="show-phone" className="font-medium">
                              Show Phone Number
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Display your phone number on your public profile
                            </p>
                          </div>
                          <Switch
                            id="show-phone"
                            checked={formData.privacy.showPhone}
                            onCheckedChange={(checked) =>
                              handleSwitchChange(
                                "privacy",
                                "showPhone",
                                checked,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Data & Privacy
                      </h3>
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          Download My Data
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-destructive hover:text-destructive"
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>

                    <Button className="mt-6">
                      <Save size={16} className="mr-2" />
                      Save Privacy Settings
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="billing" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Current Plan</h3>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h4 className="font-bold text-lg">
                                {user.tier === "paid"
                                  ? "Premium Plan"
                                  : "Free Plan"}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {user.tier === "paid"
                                  ? "Unlimited listings with enhanced visibility"
                                  : "Basic features with 1 free listing"}
                              </p>
                            </div>
                            <div className="text-xl font-bold">
                              {user.tier === "paid" ? "$9.99/month" : "Free"}
                            </div>
                          </div>
                          {user.tier === "free" ? (
                            <Button
                              className="w-full"
                              onClick={() => navigate("/pricing")}
                            >
                              Upgrade to Premium
                            </Button>
                          ) : (
                            <Button variant="outline" className="w-full">
                              Manage Subscription
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {user.tier === "paid" && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Payment Methods
                        </h3>
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                                  <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    •••• •••• •••• 4242
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Expires 12/25
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Button variant="outline" className="mt-4">
                          Add Payment Method
                        </Button>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Billing History
                      </h3>
                      {user.tier === "paid" ? (
                        <div className="border rounded-md">
                          <div className="flex justify-between items-center p-4 border-b">
                            <div>
                              <p className="font-medium">
                                Premium Plan - Monthly
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Jul 1, 2023
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$9.99</p>
                              <p className="text-xs text-green-600">Paid</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-4">
                            <div>
                              <p className="font-medium">
                                Premium Plan - Monthly
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Jun 1, 2023
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$9.99</p>
                              <p className="text-xs text-green-600">Paid</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6 border rounded-md">
                          <p className="text-muted-foreground">
                            No billing history available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="help" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Frequently Asked Questions
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">
                            How do I create a listing?
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            To create a listing, click on the "Create Listing"
                            button in the navigation bar or dashboard. Fill out
                            the required information and upload photos of your
                            item.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">
                            How do I upgrade my account?
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            You can upgrade to a Premium account by visiting the
                            Pricing page and selecting the Premium plan. Follow
                            the instructions to complete payment.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">
                            How do I contact a seller?
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            When viewing a listing, click on the "Contact
                            Seller" button to send a message directly to the
                            seller through our secure messaging system.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Contact Support
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            placeholder="What can we help you with?"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Describe your issue in detail"
                            className="min-h-[120px]"
                          />
                        </div>
                        <Button>Submit Support Request</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
