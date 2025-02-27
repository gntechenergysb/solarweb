import React, { useState } from "react";
import {
  Star,
  MapPin,
  Calendar,
  Heart,
  Share2,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageCarousel from "./ImageCarousel";

interface ProductDetailModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: {
    id: string;
    title: string;
    price: number;
    condition: number;
    category: string;
    description?: string;
    location?: string;
    seller?: string;
    postedDate?: string;
    images?: string[];
  };
}

const ProductDetailModal = ({
  open = false,
  onOpenChange = () => {},
  product = {
    id: "1",
    title: "Solar Panel 250W Monocrystalline",
    price: 199.99,
    condition: 4,
    category: "panels",
    description:
      "High-efficiency monocrystalline solar panel in excellent condition. Only used for 6 months in a residential installation. Produces consistent power output and has no visible damage or degradation. Includes original mounting hardware and connection cables.",
    location: "Portland, OR",
    seller: "GreenEnergy",
    postedDate: "2023-06-15",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611365892117-bede7a956882?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1000&auto=format&fit=crop",
    ],
  },
}: ProductDetailModalProps) => {
  const { t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Generate stars based on condition rating
  const renderConditionStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= product.condition ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />,
      );
    }
    return stars;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const addToCart = () => {
    setIsAddingToCart(true);
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      // Here you would add the product to the cart
      onOpenChange(false);
    }, 1000);
  };

  const conditionLabels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Image carousel */}
          <div className="bg-gray-50 p-4">
            <ImageCarousel
              images={product.images}
              showThumbnails={true}
              enableZoom={true}
            />
          </div>

          {/* Right side - Product details */}
          <div className="p-6 flex flex-col h-full">
            <DialogHeader className="text-left p-0">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2 capitalize">
                    {product.category}
                  </Badge>
                  <DialogTitle className="text-2xl font-bold">
                    {product.title}
                  </DialogTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-600"}`}
                  onClick={toggleFavorite}
                >
                  <Heart className={isFavorite ? "fill-current" : ""} />
                </Button>
              </div>
              <DialogDescription className="text-2xl font-bold text-primary mt-2">
                ${product.price.toFixed(2)}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4 flex-grow">
              {/* Condition */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("product.condition")}
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex mr-2">{renderConditionStars()}</div>
                  <span className="text-sm">
                    {conditionLabels[product.condition] || "Unknown"}
                  </span>
                </div>
              </div>

              {/* Location */}
              {product.location && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("product.location")}
                  </h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm">{product.location}</span>
                  </div>
                </div>
              )}

              {/* Seller & Posted Date */}
              <div className="flex justify-between">
                {product.seller && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {t("product.seller")}
                    </h3>
                    <span className="text-sm">{product.seller}</span>
                  </div>
                )}
                {product.postedDate && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {t("product.postedOn")}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm">{product.postedDate}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("product.description")}
                  </h3>
                  <p className="text-sm mt-1 text-gray-700 whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6 p-0">
              <Button
                variant="outline"
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={() =>
                  window.open(
                    `mailto:seller@example.com?subject=Inquiry about ${product.title}`,
                  )
                }
              >
                <Share2 className="h-4 w-4" />
                {t("product.contactSeller")}
              </Button>
              <Button
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={addToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    {t("product.makeOffer")}
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
