import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  PlusCircle,
  User,
  Sun,
  Battery,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface FloatingNavigationProps {
  className?: string;
  initialOpen?: boolean;
}

const FloatingNavigation = ({
  className,
  initialOpen = true,
}: FloatingNavigationProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [activeItem, setActiveItem] = useState("home");

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "create", icon: PlusCircle, label: "Create Listing" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "panels", icon: Sun, label: "Panels" },
    { id: "batteries", icon: Battery, label: "Batteries" },
    { id: "inverters", icon: Zap, label: "Inverters" },
  ];

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    // Handle navigation or action based on the clicked item
  };

  return (
    <div
      className={cn("fixed right-6 top-1/2 -translate-y-1/2 z-50", className)}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main circular menu button */}
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg cursor-pointer z-20 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleOpen}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <PlusCircle className="w-8 h-8 text-white" />
          </motion.div>
        </motion.button>

        {/* Navigation items */}
        <TooltipProvider>
          <div className="absolute right-7 top-1/2 -translate-y-1/2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <motion.button
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shadow-md absolute right-0",
                        activeItem === item.id
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100",
                      )}
                      initial={{ x: 0, opacity: 0 }}
                      animate={{
                        x: isOpen ? -70 : 0,
                        y: isOpen ? (index - 3) * 50 : 0,
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0.5,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: isOpen ? index * 0.05 : 0,
                      }}
                      onClick={() => handleItemClick(item.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>

        {/* Background particle effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
          {isOpen && (
            <>
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-amber-300 opacity-70"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingNavigation;
