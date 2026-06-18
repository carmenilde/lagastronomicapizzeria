/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ChiSiamo from "./components/ChiSiamo";
import MenuSection from "./components/MenuSection";
import Orari from "./components/Orari";
import Contatti from "./components/Contatti";
import BookingModal from "./components/BookingModal";
import { REVIEWS } from "./data";
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const scrollToMenu = () => {
    const el = document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToContatti = () => {
    const el = document.getElementById("contatti");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gastronomica-bg selection:bg-brand-red selection:text-white flex flex-col justify-between">
      
      {/* 1950s Diner-Italian Themed Interactive Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Sections */}
      <main className="flex-grow pt-16">
        
        {/* Large Typography Sign Hero */}
        <Hero onSfogliaMenu={scrollToMenu} onDoveSiamo={scrollToContatti} />

        {/* Story Intro & Interactive Cards */}
        <ChiSiamo />

        {/* Filterable Menu with Dotted Leaders & Supplement Sections */}
        <MenuSection />

        {/* Opening Hours Checkers */}
        <Orari />

        {/* Cozy Testimonial / Review Carousel */}
        <section id="recensioni" className="py-20 bg-paper-cream/35 border-b-6 border-brand-red select-none">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-widest text-brand-red uppercase mb-1">
                COSA DICONO DI NOI
              </h3>
              <p className="font-display text-xs tracking-wider text-wood-dark/80 uppercase">
                Le testimonianze dei nostri affezionati clienti
              </p>
              <div className="w-16 h-0.5 bg-brand-red mx-auto mt-2"></div>
            </div>

            {/* Carousel display box */}
            <div className="bg-[#FFF8F4] border-2 border-wood-dark p-6 sm:p-10 shadow-hard relative bg-wood-grain">
              
              <MessageSquareQuote className="absolute top-4 left-4 w-12 h-12 text-brand-red/15" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="text-center space-y-6"
                >
                  {/* Stars rating */}
                  <div className="flex justify-center gap-1 text-amber-500">
                    {Array.from({ length: REVIEWS[currentReviewIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500" />
                    ))}
                  </div>

                  {/* Body text */}
                  <p className="font-sans text-base sm:text-lg text-[#2A1A08] font-light italic leading-relaxed px-2 sm:px-8">
                    "{REVIEWS[currentReviewIndex].text}"
                  </p>

                  {/* Author / Date */}
                  <div>
                    <h5 className="font-display text-md sm:text-lg font-bold tracking-widest text-[#3A2410] uppercase">
                      {REVIEWS[currentReviewIndex].author}
                    </h5>
                    <span className="font-sans text-xs text-[#3A2410]/60">
                      Recensito il {REVIEWS[currentReviewIndex].date}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#3A2410]/15">
                <button
                  onClick={prevReview}
                  className="p-2 border border-wood-dark/40 hover:border-brand-red rounded-sm hover:bg-[#F5E8C8]/30 transition-colors duration-150 text-[#3A2410] cursor-pointer"
                  aria-label="Recensione precedente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <span className="font-sans text-xs text-wood-dark/60">
                  {currentReviewIndex + 1} / {REVIEWS.length}
                </span>

                <button
                  onClick={nextReview}
                  className="p-2 border border-wood-dark/40 hover:border-brand-red rounded-sm hover:bg-[#F5E8C8]/30 transition-colors duration-150 text-[#3A2410] cursor-pointer"
                  aria-label="Prossima recensione"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Practical contacts and live location map */}
        <Contatti onOpenBooking={handleOpenBooking} />

      </main>

      {/* FOOTER */}
      <footer id="footer-gastronomica" className="bg-[#3A2410] border-t-6 border-brand-red text-[#F5E8C8] py-14 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#F5E8C8]/10 pb-10">
            
            {/* Logo and citation */}
            <div className="md:col-span-5 space-y-3">
              <h4 className="font-display text-2xl font-black tracking-widest text-[#FFF8F4]">
                LA <span className="text-brand-red">GASTRONOMICA</span>
              </h4>
              <p className="font-sans text-xs sm:text-sm text-paper-cream/80 font-light leading-relaxed max-w-sm">
                Siamo custodi degli impasti a lunga lievitazione. Serviamo pizze croccanti, profumate e cucinate esclusivamente con materie prime d'eccentricità DOP.
              </p>
            </div>

            {/* Quick reference credentials */}
            <div className="md:col-span-4 text-xs sm:text-sm font-sans space-y-1.5 opacity-90 text-paper-cream">
              <p className="font-bold tracking-wider">DOVE TROVARCI:</p>
              <p className="font-light">Via F. Crispi, 56, San Benedetto del Tronto</p>
              <p className="font-light">Telefono: 0735 587285 | Cell: 340 677 6585</p>
            </div>

            {/* Back to top/legal navigation details */}
            <div className="md:col-span-3 flex flex-col md:items-end space-y-3">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="font-display text-xs tracking-wider text-brand-red hover:text-white uppercase font-bold cursor-pointer underline"
              >
                Torna Su ↑
              </button>
              <div className="flex items-center gap-1.5 text-[11px] text-paper-cream/60 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                <span>Sicuro ai sensi delle normative dell'UE</span>
              </div>
            </div>

          </div>

          {/* Under-Footer Legal Notes */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-paper-cream/50">
            <p>© 2026 Pizzeria La Gastronomica. Tutti i diritti riservati. P.IVA 01849200424.</p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-brand-red hover:underline transition-colors duration-150">Privacy Policy</a>
              <span>•</span>
              <a href="#termini" className="hover:text-brand-red hover:underline transition-colors duration-150">Termini e Condizioni</a>
              <span>•</span>
              <a href="#cookies" className="hover:text-brand-red hover:underline transition-colors duration-150">Dichiarazione Cookies</a>
            </div>
          </div>

        </div>
      </footer>

      {/* POPUP: Dialog for reservation trigger */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
        )}
      </AnimatePresence>

    </div>
  );
}
