import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Calendar } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { label: "HOME", target: "home" },
    { label: "CHI SIAMO", target: "chi-siamo" },
    { label: "IL MENU", target: "menu" },
    { label: "ORARI D'APERTURA", target: "orari" },
    { label: "CONTATTI & STATO", target: "contatti" },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-brand-red ${
        isScrolled
          ? "bg-wood-dark py-3 shadow-md"
          : "bg-wood-dark py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-2 focus:outline-none cursor-pointer"
          >
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-widest text-[#F5E8C8] hover:text-[#C41E1E] transition-colors duration-200">
              LA <span className="text-brand-red">GASTRONOMICA</span>
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                id={`nav-item-${item.target}`}
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className="font-display text-sm tracking-widest text-[#F5E8C8] hover:text-brand-red transition-all duration-200 focus:outline-none cursor-pointer font-medium relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            <button
              id="nav-cta-booking"
              onClick={onOpenBooking}
              className="bg-brand-red text-[#FFF8F4] font-display text-sm tracking-widest px-5 py-2.5 shadow-hard border-2 border-wood-dark hover:bg-wood-medium hover:text-[#3A2410] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 font-bold flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              PRENOTA
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#F5E8C8] hover:text-brand-red focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#3A2410] border-t border-brand-red"
          >
            <div className="px-2 pt-2 pb-6 space-y-2 sm:px-3 text-center flex flex-col items-center">
              {menuItems.map((item) => (
                <button
                  id={`mobile-nav-item-${item.target}`}
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className="block w-full py-3 font-display text-lg tracking-widest text-[#F5E8C8] hover:bg-brand-red hover:text-[#FFF8F4] transition-all duration-200 focus:outline-none cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              <button
                id="mobile-nav-cta-booking"
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-11/12 mt-4 bg-brand-red text-[#FFF8F4] font-display text-base tracking-widest py-3 shadow-hard border-2 border-[#1c1108] hover:bg-wood-medium hover:text-wood-dark transition-all duration-150 font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                PRENOTA UN TAVOLO
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
