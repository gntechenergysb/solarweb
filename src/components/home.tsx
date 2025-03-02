import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SearchSection from "./SearchSection";
import ProductGrid from "./ProductGrid";
import CreateListingModal from "./CreateListingModal";
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

  // Modal states
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Products, loading, and pagination state
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch products from an API (replace the endpoint with your own)
  const fetchProducts = async (
    query: string,
    category: string,
    filters: string[]
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/products?q=${encodeURIComponent(query)}&category=${encodeURIComponent(
          category
        )}&filters=${encodeURIComponent(filters.join(","))}`
      );
      const data = await response.json();
      setProducts(data.products);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update URL params when search or filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (activeFilters.length > 0)
      params.set("filters", activeFilters.join(","));
    setSearchParams(params);
  }, [searchQuery, activeCategory, activeFilters, setSearchParams]);

  // Read URL params on initial load and fetch products accordingly
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "all";
    const filters = searchParams.get("filters")?.split(",") || [];

    setSearchQuery(query);
    setActiveCategory(category);
    setActiveFilters(filters);

    fetchProducts(query, category, filters);
  }, [searchParams]);

  // Event handlers for search, category, and filters
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  // Load more products (pagination)
  const handleLoadMore = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    try {
      // Calculate the next page number based on current products count
      const nextPage = Math.floor(products.length / 10) + 1;
      const response = await fetch(
        `/api/products?page=${nextPage}&q=${encodeURIComponent(
          searchQuery
        )}&category=${encodeURIComponent(
          activeCategory
        )}&filters=${encodeURIComponent(activeFilters.join(","))}`
      );
      const data = await response.json();
      setProducts([...products, ...data.products]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error loading more products", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickView = (id: string) => {
    setSelectedProductId(id);
    setIsProductDetailOpen(true);
  };

  const handleFavorite = (id: string) => {
    // Replace with an API call to mark a product as favorite
    console.log(`Favorite product ${id}`);
  };

  const handleCreateListing = () => {
    if (!user) {
      navigate("/login", { state: { returnTo: "/" } });
      return;
    }
    if (user.tier === "free" && user.listingsCount >= 1) {
      navigate("/pricing");
      return;
    }
    setIsCreateListingOpen(true);
  };

  const handleListingSubmit = async (values: any) => {
    // Replace this with an API call to create a new listing
    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const newListing = await response.json();
        // Optionally update the product list with the new listing
        setProducts([newListing, ...products]);
      }
    } catch (error) {
      console.error("Error submitting listing", error);
    }
  };

  const selectedProduct = selectedProductId
    ? products.find((product) => product.id === selectedProductId)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar
        onCreateListing={handleCreateListing}
        cartItemCount={cartItemCount}
      />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <SearchSection
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            onFilterChange={handleFilterChange}
            initialCategory={activeCategory}
            initialFilters={activeFilters}
            // Optionally pass real filter suggestions (see SearchSection below)
            filterSuggestions={{}}
          />

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

      <CreateListingModal
        open={isCreateListingOpen}
        onOpenChange={setIsCreateListingOpen}
        onSubmit={handleListingSubmit}
      />
    </div>
  );
};

export default Home;
