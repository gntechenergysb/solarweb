import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SearchSection from "./SearchSection";
import ProductGrid from "./ProductGrid";
import CreateListingModal from "./CreateListingModal";
//import FloatingNavigation from "./FloatingNavigation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: string;
  title: string;
  price: number;
  condition: number;
  image: string;
  category: string;
}

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for modals
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // State for products and loading
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      title: "Solar Panel 250W Monocrystalline",
      price: 199.99,
      condition: 4,
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "panels",
    },
    {
      id: "2",
      title: "Inverter 3000W Pure Sine Wave",
      price: 349.99,
      condition: 3,
      image:
        "https://images.unsplash.com/photo-1611365892117-bede7a956882?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "inverters",
    },
    {
      id: "3",
      title: "Lithium Battery 48V 100Ah",
      price: 899.99,
      condition: 5,
      image:
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "batteries",
    },
    {
      id: "4",
      title: "Solar Charge Controller 60A MPPT",
      price: 129.99,
      condition: 4,
      image:
        "https://images.unsplash.com/photo-1592833167665-ebf9d00a4799?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "controllers",
    },
    {
      id: "5",
      title: "Solar Panel Mounting Brackets (Set of 4)",
      price: 59.99,
      condition: 5,
      image:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "accessories",
    },
    {
      id: "6",
      title: "Flexible Solar Panel 100W",
      price: 149.99,
      condition: 3,
      image:
        "https://images.unsplash.com/photo-1548348384-6a7765207c9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "panels",
    },
    {
      id: "7",
      title: "Off-Grid Solar Inverter 2000W",
      price: 429.99,
      condition: 4,
      image:
        "https://images.unsplash.com/photo-1605980776566-0486c3ac7cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "inverters",
    },
    {
      id: "8",
      title: "Deep Cycle Battery 12V 200Ah",
      price: 349.99,
      condition: 3,
      image:
        "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "batteries",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Update URL params when search or filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (activeFilters.length > 0)
      params.set("filters", activeFilters.join(","));
    setSearchParams(params);
  }, [searchQuery, activeCategory, activeFilters, setSearchParams]);

  // Read URL params on initial load
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "all";
    const filters = searchParams.get("filters")?.split(",") || [];

    setSearchQuery(query);
    setActiveCategory(category);
    setActiveFilters(filters);

    // Filter products based on URL params
    filterProducts(query, category, filters);
  }, [searchParams]);

  // Filter products based on search, category, and filters
  const filterProducts = (
    query: string,
    category: string,
    filters: string[],
  ) => {
    // In a real app, this would be an API call
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      let filteredProducts = [...products];

      // Filter by search query
      if (query) {
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      // Filter by category
      if (category !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category,
        );
      }

      // Filter by additional filters
      if (filters.length > 0) {
        // This is a simplified example - in a real app, you'd have more complex filtering logic
        // For now, we'll just filter by condition if "New" or "Used" is selected
        if (filters.includes("New")) {
          filteredProducts = filteredProducts.filter(
            (product) => product.condition >= 4,
          );
        }
        if (filters.includes("Used")) {
          filteredProducts = filteredProducts.filter(
            (product) => product.condition < 4,
          );
        }

        // Apply category-specific filters
        if (category === "panels") {
          if (
            filters.includes("Monocrystalline") ||
            filters.includes("Polycrystalline") ||
            filters.includes("Thin Film") ||
            filters.includes("Bifacial")
          ) {
            // In a real app, you would filter by panel type
            // For demo, we'll just keep the panels
          }
        } else if (category === "inverters") {
          if (
            filters.includes("String") ||
            filters.includes("Microinverter") ||
            filters.includes("Hybrid") ||
            filters.includes("Off-Grid") ||
            filters.includes("Grid-Tied")
          ) {
            // In a real app, you would filter by inverter type
            // For demo, we'll just keep the inverters
          }
        } else if (category === "batteries") {
          if (
            filters.includes("Lithium-Ion") ||
            filters.includes("Lead-Acid") ||
            filters.includes("Flow") ||
            filters.includes("Salt Water")
          ) {
            // In a real app, you would filter by battery type
            // For demo, we'll just keep the batteries
          }
        }
      }

      setProducts(filteredProducts);
      setIsLoading(false);
      setHasMore(filteredProducts.length >= 8); // Simulate pagination
    }, 500);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Handle filter change
  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  // Handle load more products
  const handleLoadMore = () => {
    // In a real app, this would load the next page of products
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Add more mock products
      const newProducts = [
        {
          id: `${products.length + 1}`,
          title: `Solar Panel ${Math.floor(Math.random() * 300) + 100}W`,
          price: Math.floor(Math.random() * 500) + 100,
          condition: Math.floor(Math.random() * 5) + 1,
          image:
            "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          category: "panels",
        },
        {
          id: `${products.length + 2}`,
          title: `Inverter ${Math.floor(Math.random() * 5000) + 1000}W`,
          price: Math.floor(Math.random() * 800) + 200,
          condition: Math.floor(Math.random() * 5) + 1,
          image:
            "https://images.unsplash.com/photo-1611365892117-bede7a956882?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          category: "inverters",
        },
      ];

      setProducts([...products, ...newProducts]);
      setIsLoading(false);
      setHasMore(products.length < 20); // Limit to 20 products for demo
    }, 1000);
  };

  // Handle quick view
  const handleQuickView = (id: string) => {
    setSelectedProductId(id);
    setIsProductDetailOpen(true);
  };

  // Handle favorite
  const handleFavorite = (id: string) => {
    // In a real app, this would add the product to favorites
    console.log(`Added product ${id} to favorites`);
  };

  // Handle create listing
  const handleCreateListing = () => {
    if (!user) {
      navigate("/login", { state: { returnTo: "/" } });
      return;
    }

    // Check if user can create a listing (free tier limit)
    if (user.tier === "free" && user.listingsCount >= 1) {
      navigate("/pricing");
      return;
    }

    setIsCreateListingOpen(true);
  };

  // Handle listing submission
  const handleListingSubmit = (values: any) => {
    // In a real app, this would submit the listing to the backend
    console.log("Listing submitted:", values);

    // Add the new listing to the products
    const newProduct = {
      id: `${products.length + 1}`,
      title: values.title,
      price: parseFloat(values.price),
      condition: parseInt(values.condition),
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Default image
      category: values.category,
    };

    setProducts([newProduct, ...products]);
  };

  // Get selected product
  const selectedProduct = selectedProductId
    ? products.find((product) => product.id === selectedProductId)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navbar */}
      <Navbar onCreateListing={() => setIsCreateListingOpen(true)} cartItemCount={cartItemCount} />


      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Search Section */}
          <SearchSection
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            onFilterChange={handleFilterChange}
            initialCategory={activeCategory}
            initialFilters={activeFilters}
          />

          {/* Product Grid */}
          <ProductGrid
            products={products}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            onQuickView={handleQuickView}
            onFavorite={handleFavorite}
          />
        </div>
      </main>

      {/* Floating Navigation */}
      {/*<FloatingNavigation />*/}

      {/* Create Listing Modal */}
      <CreateListingModal
        open={isCreateListingOpen}
        onOpenChange={setIsCreateListingOpen}
        onSubmit={handleListingSubmit}
      />
    </div>
  );
};

export default Home;
