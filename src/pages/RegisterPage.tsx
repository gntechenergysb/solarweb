import React from "react";
import { Link } from "react-router-dom";
import { Sun } from "lucide-react";

import RegisterForm from "@/components/auth/RegisterForm";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const RegisterPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            {t("app.name")}
          </span>
        </Link>
        <LanguageSwitcher />
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-gray-500">
        <p>{t("footer.copyright")}</p>
      </footer>
    </div>
  );
};

export default RegisterPage;
