import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart, Menu, X, Plus, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./common/LanguageSwitcher";

interface NavbarProps {
  onCreateListing?: () => void;
  onSearch?: (query: string) => void;
  isLoggedIn?: boolean;
  cartItemCount?: number;
}

const Navbar = ({
  onCreateListing = () => {},
  onSearch = () => {},
  isLoggedIn: isLoggedInProp,
  cartItemCount = 0,
}: NavbarProps) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use auth context if available, otherwise use prop
  const isLoggedIn = user ? true : isLoggedInProp;

  // Handle scroll effect for floating navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    if (user) {
      await signOut();
      navigate("/login");
    }
  };

  const handleCreateListingClick = () => {
    if (!user) {
      navigate("/login", { state: { returnTo: "/create-listing" } });
    } else {
      onCreateListing();
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300",
        isScrolled
          ? "shadow-md py-2 rounded-b-xl bg-opacity-95 backdrop-blur-sm"
          : "py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Sun className="w-6 h-6 text-white animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            {t("app.name")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-64">
            <Input
              type="text"
              placeholder={t("search.placeholder")}
              className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-orange-400 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </form>

          {/* Categories Navigation */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {[
                      {
                        name: t("category.panels"),
                        description:
                          "Monocrystalline, polycrystalline, and thin-film panels",
                      },
                      {
                        name: t("category.inverters"),
                        description: "String, central, and microinverters",
                      },
                      {
                        name: t("category.batteries"),
                        description:
                          "Lithium-ion, lead-acid, and flow batteries",
                      },
                      {
                        name: t("category.mounting"),
                        description: "Roof and ground mounting solutions",
                      },
                      {
                        name: t("category.controllers"),
                        description: "MPPT and PWM controllers",
                      },
                      {
                        name: t("category.accessories"),
                        description:
                          "Cables, connectors, and monitoring systems",
                      },
                    ].map((category) => (
                      <li key={category.name}>
                        <NavigationMenuLink asChild>
                          <a
                            href={`/category/${category.name.toLowerCase().replace(/ /g, "-")}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600"
                          >
                            <div className="text-sm font-medium leading-none">
                              {category.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {category.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/deals"
                  className="text-sm font-medium px-3 py-2 hover:text-orange-500 transition-colors"
                >
                  {t("nav.deals")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/pricing"
                  className="text-sm font-medium px-3 py-2 hover:text-orange-500 transition-colors"
                >
                  {t("nav.pricing")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/how-it-works"
                  className="text-sm font-medium px-3 py-2 hover:text-orange-500 transition-colors"
                >
                  {t("nav.howItWorks")}
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {/* Create Listing Button */}
          <Button
            onClick={handleCreateListingClick}
            className="hidden md:flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-full px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>{t("nav.createListing")}</span>
          </Button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isLoggedIn ? (
                <>
                  <DropdownMenuLabel>
                    {user?.username || "My Account"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/dashboard?tab=listings" className="w-full">
                      {t("nav.myListings")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/dashboard?tab=orders" className="w-full">
                      {t("nav.orders")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/dashboard?tab=favorites" className="w-full">
                      {t("nav.favorites")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link to="/login" className="w-full">
                      {t("nav.login")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/register" className="w-full">
                      {t("nav.register")}
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("search.placeholder")}
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </form>

          <nav className="space-y-4">
            <div className="font-medium text-sm">Categories</div>
            <ul className="space-y-2 pl-2">
              {[
                t("category.panels"),
                t("category.inverters"),
                t("category.batteries"),
                t("category.mounting"),
                t("category.controllers"),
                t("category.accessories"),
              ].map((category) => (
                <li key={category}>
                  <Link
                    to={`/category/${category.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm text-gray-600 hover:text-orange-500 block py-1"
                    onClick={toggleMobileMenu}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <Link
                to="/deals"
                className="text-sm font-medium block py-1 hover:text-orange-500"
                onClick={toggleMobileMenu}
              >
                {t("nav.deals")}
              </Link>
              <Link
                to="/pricing"
                className="text-sm font-medium block py-1 hover:text-orange-500"
                onClick={toggleMobileMenu}
              >
                {t("nav.pricing")}
              </Link>
              <Link
                to="/how-it-works"
                className="text-sm font-medium block py-1 hover:text-orange-500"
                onClick={toggleMobileMenu}
              >
                {t("nav.howItWorks")}
              </Link>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <LanguageSwitcher variant="outline" size="default" />
            </div>

            <Button
              onClick={() => {
                handleCreateListingClick();
                toggleMobileMenu();
              }}
              className="w-full flex items-center justify-center space-x-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-full py-2 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              <span>{t("nav.createListing")}</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
