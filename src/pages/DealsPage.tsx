import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tag, Clock, Percent, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/ProductGrid";
import ProductDetailModal from "@/components/ProductDetailModal";

const DealsPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  // Sample deals data
  const dealsProducts = [
    {
      id: "d1",
      title: "Solar Panel 300W Monocrystalline - 20% OFF",
      price: 159.99, // Original price: 199.99
      condition: 4,
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "panels",
      dealType: "discount",
      discountPercent: 20,
      endsIn: "2 days",
    },
    {
      id: "d2",
      title: "Inverter 5000W Pure Sine Wave - Limited Offer",
      price: 399.99, // Original price: 599.99
      condition: 5,
      image:
        "https://images.unsplash.com/photo-1611365892117-bede7a956882?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "inverters",
      dealType: "clearance",
      discountPercent: 33,
      endsIn: "5 days",
    },
    {
      id: "d3",
      title: "Lithium Battery 48V 200Ah - Bundle Deal",
      price: 1299.99, // Original price: 1599.99
      condition: 4,
      image:
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "batteries",
      dealType: "bundle",
      discountPercent: 18,
      endsIn: "3 days",
    },
    {
      id: "d4",
      title: "Solar Mounting Kit - Buy One Get One Free",
      price: 89.99,
      condition: 5,
      image:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "accessories",
      dealType: "bogo",
      discountPercent: 50,
      endsIn: "1 day",
    },
    {
      id: "d5",
      title: "Charge Controller 60A MPPT - Flash Sale",
      price: 99.99, // Original price: 149.99
      condition: 4,
      image:
        "https://images.unsplash.com/photo-1592833167665-ebf9d00a4799?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "controllers",
      dealType: "flash",
      discountPercent: 33,
      endsIn: "12 hours",
    },
    {
      id: "d6",
      title: "Flexible Solar Panel 150W - Clearance",
      price: 119.99, // Original price: 179.99
      condition: 3,
      image:
        "https://images.unsplash.com/photo-1548348384-6a7765207c9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "panels",
      dealType: "clearance",
      discountPercent: 33,
      endsIn: "7 days",
    },
  ];

  // Filter deals based on active tab
  const filteredDeals =
    activeTab === "all"
      ? dealsProducts
      : dealsProducts.filter((product) => product.dealType === activeTab);

  // Filter by search query
  const searchedDeals = searchQuery
    ? filteredDeals.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredDeals;

  // Handle quick view
  const handleQuickView = (id: string) => {
    setSelectedProductId(id);
    setIsProductDetailOpen(true);
  };

  // Handle favorite
  const handleFavorite = (id: string) => {
    console.log(`Added deal ${id} to favorites`);
  };

  // Get selected product
  const selectedProduct = selectedProductId
    ? dealsProducts.find((product) => product.id === selectedProductId)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />

      <div className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Hot Deals & Special Offers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Save big on pre-owned solar equipment with our limited-time offers
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search deals..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
                <TabsTrigger value="all" className="text-xs md:text-sm">
                  All Deals
                </TabsTrigger>
                <TabsTrigger value="discount" className="text-xs md:text-sm">
                  Discounts
                </TabsTrigger>
                <TabsTrigger value="clearance" className="text-xs md:text-sm">
                  Clearance
                </TabsTrigger>
                <TabsTrigger value="flash" className="text-xs md:text-sm">
                  Flash Sales
                </TabsTrigger>
                <TabsTrigger value="bundle" className="text-xs md:text-sm">
                  Bundles
                </TabsTrigger>
                <TabsTrigger value="bogo" className="text-xs md:text-sm">
                  BOGO
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Deal Types Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Percent size={18} className="text-orange-500" />
              <span className="text-sm">
                <span className="font-medium">Discounts:</span> Price reductions
                on select items
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-orange-500" />
              <span className="text-sm">
                <span className="font-medium">Clearance:</span> Last chance
                items at lowest prices
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-orange-500" />
              <span className="text-sm">
                <span className="font-medium">Flash Sales:</span> Limited-time
                extreme discounts
              </span>
            </div>
          </div>
        </div>

        {/* Featured Deal */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Featured Deal"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <div className="bg-white/20 text-white inline-block px-3 py-1 rounded-full text-sm font-medium mb-2">
                Featured Deal of the Week
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Complete Off-Grid Solar Kit - 40% OFF
              </h2>
              <p className="mb-4">
                Includes 4x 300W panels, 3kW inverter, 200Ah battery bank, and
                all mounting hardware. Perfect for cabins or emergency backup
                power.
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold">$1,999.99</div>
                <div className="text-xl line-through opacity-70">$3,299.99</div>
                <div className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                  Save $1,300
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="bg-white text-orange-600 hover:bg-gray-100">
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Current Deals</h2>
          <ProductGrid
            products={searchedDeals}
            onQuickView={handleQuickView}
            onFavorite={handleFavorite}
            emptyMessage="No deals match your search criteria. Please try different keywords or browse all deals."
          />
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            open={isProductDetailOpen}
            onOpenChange={setIsProductDetailOpen}
            product={{
              id: selectedProduct.id,
              title: selectedProduct.title,
              price: selectedProduct.price,
              condition: selectedProduct.condition,
              category: selectedProduct.category,
              description: `This is a limited-time offer with ${selectedProduct.discountPercent}% discount! Deal ends in ${selectedProduct.endsIn}.`,
              location: "Portland, OR",
              seller: "GreenEnergy",
              postedDate: "2023-06-15",
              images: [selectedProduct.image],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DealsPage;
