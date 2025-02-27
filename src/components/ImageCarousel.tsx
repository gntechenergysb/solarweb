import React, { useState } from "react";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images?: string[];
  showThumbnails?: boolean;
  enableZoom?: boolean;
}

const ImageCarousel = ({
  images = [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611365892117-bede7a956882?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592833167665-ebf9d00a4799?q=80&w=1000&auto=format&fit=crop",
  ],
  showThumbnails = true,
  enableZoom = true,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed) {
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Carousel
          className="w-full"
          onSelect={(api) => setCurrentIndex(api?.selectedScrollSnap() || 0)}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div
                  className={cn(
                    "relative overflow-hidden rounded-md aspect-square",
                    isZoomed ? "cursor-zoom-out" : "cursor-zoom-in",
                  )}
                  onClick={enableZoom ? handleZoomToggle : undefined}
                  onMouseMove={isZoomed ? handleMouseMove : undefined}
                >
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-300",
                      isZoomed ? "scale-150" : "scale-100",
                    )}
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }
                        : undefined
                    }
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
        </Carousel>

        {enableZoom && (
          <button
            onClick={handleZoomToggle}
            className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
        )}
      </div>

      {showThumbnails && (
        <div className="mt-4 px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto py-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                  currentIndex === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent",
                )}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
