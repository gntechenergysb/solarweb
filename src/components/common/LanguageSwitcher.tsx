import React from "react";
import { Globe } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ms", name: "Bahasa Malaysia", flag: "🇲🇾" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
];

interface LanguageSwitcherProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const LanguageSwitcher = ({
  variant = "outline",
  size = "icon",
}: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useLanguage();

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} aria-label={t("nav.language")}>
          <span className="flex items-center gap-2">
            {size !== "icon" && currentLanguage?.flag}
            <Globe size={size === "icon" ? 16 : 14} />
            {size !== "icon" && t("nav.language")}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={language === lang.code ? "bg-accent" : ""}
          >
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
