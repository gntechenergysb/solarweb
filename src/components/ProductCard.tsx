import React from "react";
import { Eye, Heart, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ProductCardProps {
  id?: string;
  title?: string;
  price?: number;
  condition?: number;
  image?: string;
  category?: string;
  onQuickView?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  title = "Solar Panel 250W Monocrystalline",
  price = 199.99,
  condition = 4,
  image = "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  category = "panels",
  onQuickView = () => {},
  onFavorite = () => {},
}: ProductCardProps) => {
  // Generate stars based on condition rating
  const renderConditionStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= condition ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />,
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
      {/* Product Image */}
      <div className="relative overflow-hidden group h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 bg-opacity-90 capitalize"
        >
          {category}
        </Badge>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  onClick={() => onQuickView(id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  onClick={() => onFavorite(id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>

        <div className="flex items-center mb-2">
          {renderConditionStars()}
          <span className="text-xs text-gray-500 ml-1">Condition</span>
        </div>

        <div className="mt-auto">
          <p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
