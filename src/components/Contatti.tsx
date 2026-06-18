import { MapPin, Phone, MessageCircle, Facebook, Mail } from "lucide-react";

interface ContattiProps {
  onOpenBooking: () => void;
}

export default function Contatti({ onOpenBooking }: ContattiProps) {
  // WhatsApp Link generator with customizable message
  const whatsappUrl = "https://wa.me/393406776585?text=Ciao!%20Vorrei%20informazioni%20per%20prenotare%20un%20tavolo%20alla%20Gastronomica.";
  
  // Facebook page search link
  const facebookUrl = "https://www.facebook.com/search/top?q=pizzeria%20la%20gastronomica";

  return (
    <section id="contatti" className="py-20 bg-gastronomica-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-widest text-brand-red uppercase mb-1 select-none">
            CONTATTI & POSIZIONE
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column - Practical address card details as shown in the screenshot */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Indirizzo Info Card */}
            <div id="info-indirizzo" className="bg-gastronomica-card bg-wood-grain p-5 border-2 border-[#3A2410] shadow-hard flex items-start gap-4 select-text">
              <div className="p-3 bg-paper-cream border border-[#3A2410] flex-shrink-0">
                <MapPin className="w-6 h-6 text-brand-red" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold tracking-wider text-[#3A2410] uppercase mb-1">
                  INDIRIZZO
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#2A1A08] font-light leading-relaxed">
                  Via F. Crispi, 56 <br />
                  63074 San Benedetto del Tronto (AP)
                </p>
              </div>
            </div>

            {/* Telefono Info Card */}
            <div id="info-telefono" className="bg-gastronomica-card bg-wood-grain p-5 border-2 border-[#3A2410] shadow-hard flex items-start gap-4 select-text">
              <div className="p-3 bg-paper-cream border border-[#3A2410] flex-shrink-0">
                <Phone className="w-6 h-6 text-brand-red" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold tracking-wider text-[#3A2410] uppercase mb-1">
                  TELEFONO
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#2A1A08] font-bold tracking-wider mb-0.5">
                  0735 587285
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#2A1A08] font-light">
                  Cellulare / Mobile: 340 677 6585
                </p>
              </div>
            </div>

            {/* CTA action triggers as shown in screenshot */}
            <div className="space-y-4 pt-2">
              <button
                id="btn-whatsapp"
                onClick={() => window.open(whatsappUrl, "_blank")}
                className="w-full bg-[#25D366] hover:bg-green-700 text-white font-display text-xs sm:text-sm tracking-widest uppercase font-bold py-3.5 border-2 border-wood-dark shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#3A2410] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                PRENOTA VIA WHATSAPP
              </button>

              <button
                id="btn-facebook"
                onClick={() => window.open(facebookUrl, "_blank")}
                className="w-full bg-[#1877F2] hover:bg-blue-800 text-white font-display text-xs sm:text-sm tracking-widest uppercase font-bold py-3.5 border-2 border-wood-dark shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#3A2410] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                <Facebook className="w-5 h-5 text-white" />
                SEGUICI SU FACEBOOK
              </button>

              <button
                id="btn-modal-booking"
                onClick={onOpenBooking}
                className="w-full bg-brand-red hover:bg-[#3A2410] text-[#FFF8F4] hover:text-[#F5E8C8] font-display text-xs sm:text-sm tracking-widest uppercase font-bold py-3.5 border-2 border-wood-dark shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#3A2410] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                PRENOTA TAVOLO IN SALA
              </button>
            </div>
          </div>

          {/* Right Column - Live Embedded Interactive Google Map */}
          <div id="live-map-container" className="lg:col-span-7 h-96 lg:h-auto min-h-[350px]">
            <div className="relative w-full h-full p-2 bg-[#FFF8F4] border-double-red shadow-hard flex">
              <iframe
                id="google-maps"
                title="Pizzeria La Gastronomica Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.045437812061!2d13.876773515438813!3d42.94632737915159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13318cb9b8702b8d%3A0xe6bf44b5efc1c98a!2sVia%20Francesco%20Crispi%2C%2056%2C%2063074%20San%20Benedetto%20del%20Tronto%20AP%2C%20Italy!5e0!3m2!1sen!2sus!4v1623830230232!5m2!1sen!2sus"
                className="w-full h-full border border-wood-dark grayscale-[10%]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
