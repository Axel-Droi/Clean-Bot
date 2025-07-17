import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Features", href: "/features" },
    { label: "Technology", href: "/technology" },
    { label: "Impact", href: "/impact" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-lg border-b border-border/50 shadow-card">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-tech rounded-xl flex items-center justify-center shadow-glow">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-tech bg-clip-text text-transparent">
              CleanBot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`transition-colors duration-300 font-medium ${
                  location.pathname === item.href 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button variant="hero" className="ml-4">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`transition-colors duration-300 font-medium py-2 ${
                    location.pathname === item.href 
                      ? "text-primary font-semibold" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/contact" className="mt-4">
                <Button variant="hero" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};