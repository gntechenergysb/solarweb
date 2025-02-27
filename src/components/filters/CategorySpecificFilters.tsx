import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CategorySpecificFiltersProps {
  category: string;
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const CategorySpecificFilters = ({
  category,
  activeFilters,
  onFilterChange,
}: CategorySpecificFiltersProps) => {
  const { t } = useLanguage();

  const toggleFilter = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter];

    onFilterChange(newFilters);
  };

  // Panel-specific filters
  if (category === "panels") {
    return (
      <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
        <div>
          <h3 className="text-sm font-medium mb-3">
            {t("filter.panels.type")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Monocrystalline",
              "Polycrystalline",
              "Thin Film",
              "Bifacial",
            ].map((filter) => (
              <Badge
                key={filter}
                variant={activeFilters.includes(filter) ? "default" : "outline"}
                className={cn(
                  "px-3 py-1 cursor-pointer",
                  activeFilters.includes(filter)
                    ? "bg-amber-200 text-amber-900 hover:bg-amber-300 border-transparent"
                    : "bg-transparent text-gray-700 hover:bg-amber-50 border-gray-200",
                )}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">
            {t("filter.panels.wattage")}
          </h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[250]}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>100W</span>
              <span>250W</span>
              <span>500W</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">
            {t("filter.panels.efficiency")}
          </h3>
          <div className="space-y-2">
            {["High Efficiency", "Standard Efficiency"].map((filter) => (
              <div key={filter} className="flex items-center">
                <input
                  type="checkbox"
                  id={filter}
                  checked={activeFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor={filter} className="ml-2 text-sm">
                  {filter}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Inverter-specific filters
  if (category === "inverters") {
    return (
      <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
        <div>
          <h3 className="text-sm font-medium mb-3">
            {t("filter.inverters.type")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {["String", "Microinverter", "Hybrid", "Off-Grid", "Grid-Tied"].map(
              (filter) => (
                <Badge
                  key={filter}
                  variant={
                    activeFilters.includes(filter) ? "default" : "outline"
                  }
                  className={cn(
                    "px-3 py-1 cursor-pointer",
                    activeFilters.includes(filter)
                      ? "bg-amber-200 text-amber-900 hover:bg-amber-300 border-transparent"
                      : "bg-transparent text-gray-700 hover:bg-amber-50 border-gray-200",
                  )}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </Badge>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">
            {t("filter.inverters.power")}
          </h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[3000]}
              max={10000}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1000W</span>
              <span>5000W</span>
              <span>10000W</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Features</h3>
          <div className="space-y-2">
            {["Battery Ready", "Monitoring", "Warranty"].map((filter) => (
              <div key={filter} className="flex items-center">
                <input
                  type="checkbox"
                  id={filter}
                  checked={activeFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor={filter} className="ml-2 text-sm">
                  {filter}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Battery-specific filters
  if (category === "batteries") {
    return (
      <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
        <div>
          <h3 className="text-sm font-medium mb-3">
            {t("filter.batteries.type")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Lithium-Ion", "Lead-Acid", "Flow", "Salt Water"].map(
              (filter) => (
                <Badge
                  key={filter}
                  variant={
                    activeFilters.includes(filter) ? "default" : "outline"
                  }
                  className={cn(
                    "px-3 py-1 cursor-pointer",
                    activeFilters.includes(filter)
                      ? "bg-amber-200 text-amber-900 hover:bg-amber-300 border-transparent"
                      : "bg-transparent text-gray-700 hover:bg-amber-50 border-gray-200",
                  )}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </Badge>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">
            {t("filter.batteries.capacity")}
          </h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[100]}
              max={200}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>50Ah</span>
              <span>100Ah</span>
              <span>200Ah</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">
            {t("filter.batteries.voltage")}
          </h3>
          <div className="space-y-2">
            {["12V", "24V", "48V"].map((filter) => (
              <div key={filter} className="flex items-center">
                <input
                  type="checkbox"
                  id={filter}
                  checked={activeFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor={filter} className="ml-2 text-sm">
                  {filter}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default filters for other categories
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h3 className="text-sm font-medium mb-3">{t("filter.condition")}</h3>
        <div className="flex flex-wrap gap-2">
          {["New", "Used", "Refurbished"].map((filter) => (
            <Badge
              key={filter}
              variant={activeFilters.includes(filter) ? "default" : "outline"}
              className={cn(
                "px-3 py-1 cursor-pointer",
                activeFilters.includes(filter)
                  ? "bg-amber-200 text-amber-900 hover:bg-amber-300 border-transparent"
                  : "bg-transparent text-gray-700 hover:bg-amber-50 border-gray-200",
              )}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">{t("filter.price")}</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[500]}
            max={1000}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$500</span>
            <span>$1000+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySpecificFilters;
