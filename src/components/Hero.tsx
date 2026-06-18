import { motion } from "motion/react";
import { ArrowDown, MapPin, ChefHat } from "lucide-react";

interface HeroProps {
  onSfogliaMenu: () => void;
  onDoveSiamo: () => void;
}

export default function Hero({ onSfogliaMenu, onDoveSiamo }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 flex flex-col items-center justify-center bg-wood-light bg-wood-grain border-b-6 border-brand-red text-[#3A2410] overflow-hidden"
    >
      {/* Decorative corners reminiscent of a high-end vintage physical menu */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-brand-red pointer-events-none hidden sm:block"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-brand-red pointer-events-none hidden sm:block"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-brand-red pointer-events-none hidden sm:block"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-brand-red pointer-events-none hidden sm:block"></div>

      <div className="max-w-4xl mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 bg-brand-red text-white font-display text-xs sm:text-sm tracking-widest px-4 py-1.5 uppercase font-medium border border-wood-dark shadow-hard"
        >
          <ChefHat className="w-4 h-4" />
          AUTENTICA TRADIZIONE ITALIANA DELIZIOSA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-widest text-brand-red uppercase select-none drop-shadow-sm mb-4 leading-none"
        >
          LA GASTRONOMICA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-lg sm:text-xl md:text-2xl text-wood-dark tracking-widest uppercase font-semibold mb-10 max-w-2xl mx-auto border-t-2 border-b-2 border-brand-red py-2.5"
        >
          PIZZA & CUCINA DAL CUORE
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            id="hero-menu-btn"
            onClick={onSfogliaMenu}
            className="w-full sm:w-auto bg-brand-red hover:bg-wood-dark text-[#FFF8F4] hover:text-[#F5E8C8] font-display text-base tracking-widest uppercase font-bold px-8 py-4 border-2 border-wood-dark shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#3A2410] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 cursor-pointer"
          >
            SFOGLIA IL MENU
          </button>
          
          <button
            id="hero-location-btn"
            onClick={onDoveSiamo}
            className="w-full sm:w-auto bg-wood-dark hover:bg-brand-red text-[#F5E8C8] hover:text-white font-display text-base tracking-widest uppercase font-bold px-8 py-4 border-2 border-[#1c1108] shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#C41E1E] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5 text-brand-red" />
            DOVE SIAMO
          </button>
        </motion.div>
      </div>

      {/* Bounce Anchor Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 cursor-pointer opacity-80 hover:opacity-100 hidden sm:flex flex-col items-center"
        onClick={onSfogliaMenu}
      >
        <span className="font-display text-xs tracking-wider text-wood-dark font-medium mb-1 uppercase">Sfoglia</span>
        <ArrowDown className="w-5 h-5 text-brand-red font-bold" />
      </motion.div>
    </section>
  );
}
