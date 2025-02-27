import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "./ProductCard";
import { Loader } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  condition: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onQuickView?: (id: string) => void;
  onFavorite?: (id: string) => void;
  emptyMessage?: string;
}

const ProductGrid = ({
  products = [
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
  ],
  isLoading = false,
  hasMore = true,
  onLoadMore = () => {},
  onQuickView = () => {},
  onFavorite = () => {},
  emptyMessage = "No products found. Try adjusting your filters.",
}: ProductGridProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Implement infinite scroll using Intersection Observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading && !isFetching) {
        setIsFetching(true);
        onLoadMore();
        setTimeout(() => setIsFetching(false), 1000); // Debounce
      }
    },
    [hasMore, isLoading, isFetching, onLoadMore],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px 400px 0px",
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [handleObserver]);

  if (products.length === 0 && !isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center w-full">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            condition={product.condition}
            image={product.image}
            category={product.category}
            onQuickView={onQuickView}
            onFavorite={onFavorite}
          />
        ))}
      </div>

      {/* Loading indicator and infinite scroll observer */}
      <div ref={observerTarget} className="w-full flex justify-center py-8">
        {(isLoading || isFetching) && (
          <div className="flex flex-col items-center">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-gray-500 mt-2">
              Loading more products...
            </p>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <p className="text-sm text-gray-500">
            You've reached the end of the catalog
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
