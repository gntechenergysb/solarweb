import React, { useState, useEffect } from "react"; 
import { Search, X, Filter, SunMedium, Zap, Battery, Grid, MapPin, Plug, MoreHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import CategorySpecificFilters from "./filters/CategorySpecificFilters";

interface SearchSectionProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  onFilterChange?: (filters: string[]) => void;
  initialCategory?: string;
  initialFilters?: string[];
  filterSuggestions?: { [category: string]: string[] };
}

const SearchSection = ({
  onSearch = () => {},
  onCategoryChange = () => {},
  onFilterChange = () => {},
  initialCategory = "all",
  initialFilters = [],
  filterSuggestions = {},
}: SearchSectionProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeFilters, setActiveFilters] = useState<string[]>(initialFilters);
  const [showFilterSuggestions, setShowFilterSuggestions] = useState(false);
  const [showCategoryFilters, setShowCategoryFilters] = useState(false);

  
  useEffect(() => {
    if (activeCategory !== "all") {
      setShowCategoryFilters(true);
    }
  }, [activeCategory]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
    // Reset filters when category changes
    setActiveFilters([]);
    onFilterChange([]);
  };

  const toggleFilter = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter];

    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    onFilterChange([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const currentSuggestions = filterSuggestions[activeCategory] || [];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 bg-gradient-to-b from-amber-50 to-white rounded-xl shadow-sm">
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t("search.placeholder")}
            className="pl-10 pr-10 py-6 text-lg rounded-full border-2 border-amber-100 focus:border-amber-300 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          <Button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full"
          >
            {t("search.button")}
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        {/* Use horizontal scroll for mobile */}
        <div className="w-full overflow-x-auto">
          <Tabs
            defaultValue={activeCategory}
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <TabsList className="flex flex-nowrap items-center gap-4 bg-amber-50 p-3 rounded-lg">
              <TabsTrigger
                value="all"
                className={cn(
                  "min-w-[80px] px-3 py-2 rounded flex items-center gap-1",
                  "data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900",
                  "transition-colors duration-200"
                )}
              >
                <Grid size={20} />
                <span className="whitespace-nowrap">All</span>
              </TabsTrigger>
              <TabsTrigger
                value="panels"
                className={cn(
                  "min-w-[80px] px-3 py-2 rounded flex items-center gap-1",
                  "data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900",
                  "transition-colors duration-200"
                )}
              >
                <SunMedium size={20} />
                <span className="whitespace-nowrap">Panels</span>
              </TabsTrigger>
              <TabsTrigger
                value="inverters"
                className={cn(
                  "min-w-[80px] px-3 py-2 rounded flex items-center gap-1",
                  "data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900",
                  "transition-colors duration-200"
                )}
              >
                <Zap size={20} />
                <span className="whitespace-nowrap">Inverters</span>
              </TabsTrigger>
              <TabsTrigger
                value="batteries"
                className={cn(
                  "min-w-[80px] px-3 py-2 rounded flex items-center gap-1",
                  "data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900",
                  "transition-colors duration-200"
                )}
              >
                <Battery size={20} />
                <span className="whitespace-nowrap">Batteries</span>
              </TabsTrigger>
              <TabsTrigger
                value="mounting"
                className={cn(
                  "min-w-[100px] px-3 py-2 rounded flex items-center gap-1",
                  "data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900",
                  "transition-colors duration-200"
                )}
              >
                <MapPin size={20} />
                <span className="whitespace-nowrap">Mounting</span>
              </TabsTrigger>
              <TabsTrigger
                value="cable"
                className={cn(
                  "min-w-[80px] px-3 py-2 rounded flex items-center gap-1",
                  "data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900",
                  "transition-colors duration-200"
                )}
              >
                <Plug size={20} />
                <span className="whitespace-nowrap">Cable</span>
              </TabsTrigger>
              <TabsTrigger
                value="others"
                className={cn(
                  "min-w-[80px] px-3 py-2 rounded flex items-center gap-1",
                  "data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900",
                  "transition-colors duration-200"
                )}
              >
                <MoreHorizontal size={20} />
                <span className="whitespace-nowrap">Others</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4 animate-in fade-in duration-300">
          <span className="text-sm text-gray-500">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="px-3 py-1 bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer flex items-center gap-1"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
              <X size={14} />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {t("filter.clear")}
          </Button>
        </div>
      )}

      {/* Category-Specific Filters */}
      {showCategoryFilters && activeCategory !== "all" && (
        <div className="mb-4 animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">
              {t(`category.${activeCategory}`)} {t("filter.title")}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCategoryFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </Button>
          </div>
          <CategorySpecificFilters
            category={activeCategory}
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
          />
        </div>
      )}

      {/* Filter Suggestions */}
      {showFilterSuggestions && (
        <div className="p-4 bg-white rounded-lg shadow-md mb-4 animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Suggested Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilterSuggestions(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSuggestions.map((filter) => (
              <Badge
                key={filter}
                variant={activeFilters.includes(filter) ? "default" : "outline"}
                className={cn(
                  "px-3 py-1 cursor-pointer",
                  activeFilters.includes(filter)
                    ? "bg-amber-200 text-amber-900 hover:bg-amber-300 border-transparent"
                    : "bg-transparent text-gray-700 hover:bg-amber-50 border-gray-200"
                )}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;
