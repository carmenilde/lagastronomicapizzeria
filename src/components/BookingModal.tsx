import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { X, Calendar, Users, Clock, Phone, AlignLeft, CheckCircle2, Copy } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "20:00",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const timeSlots = [
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Si prega di compilare tutti i campi obbligatori.");
      return;
    }

    // Generate a random retro ticket number like GA-5829
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setBookingCode(`GA-${randNum}`);
    setIsSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const textMsg = `Ciao! Vorrei confermare una prenotazione per ${formData.name} il giorno ${formData.date} alle ${formData.time} per ${formData.guests} persone. Codice di riferimento della richiesta: ${bookingCode}. Grazie!`;
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/393406776585?text=${encoded}`, "_blank");
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      guests: "2",
      date: "",
      time: "20:00",
      notes: "",
    });
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-wood-dark/80 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg bg-[#FFF8F4] border-double-red shadow-hard p-6 relative bg-wood-grain"
      >
        
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-wood-dark hover:text-brand-red p-1 transition-colors duration-200 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-widest text-brand-red uppercase">
                PRENOTA UN TAVOLO
              </h3>
              <p className="font-sans text-xs tracking-wider text-wood-dark/80 uppercase mt-1">
                Garantisci il tuo posto alla Gastronomica
              </p>
              <div className="w-16 h-0.5 bg-brand-red mx-auto mt-2"></div>
            </div>

            {/* Booking Form */}
            <form id="booking-form-submission" onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nome */}
              <div>
                <label className="font-display text-[11px] font-bold tracking-widest text-wood-dark block uppercase mb-1">
                  Nome Completo *
                </label>
                <input
                  id="form-booking-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="es. Leonardo Silvestre"
                  className="w-full px-3 py-2.5 bg-[#F5E8C8]/40 border border-[#3A2410] focus:border-brand-red text-[#3A2410] font-sans placeholder-gray-500 outline-none text-sm"
                />
              </div>

              {/* Grid: Telefon e Persone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-display text-[11px] font-bold tracking-widest text-wood-dark block uppercase mb-1">
                    Recapito Telefonico *
                  </label>
                  <div className="relative">
                    <input
                      id="form-booking-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="es. 340 1234567"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F5E8C8]/40 border border-[#3A2410] focus:border-brand-red text-[#3A2410] font-sans placeholder-gray-500 outline-none text-sm"
                    />
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-wood-dark/60" />
                  </div>
                </div>

                <div>
                  <label className="font-display text-[11px] font-bold tracking-widest text-wood-dark block uppercase mb-1">
                    Numero Ospiti
                  </label>
                  <div className="relative">
                    <select
                      id="form-booking-guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F5E8C8]/40 border border-[#3A2410] focus:border-brand-red text-[#3A2410] font-sans outline-none text-sm appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Persona" : "Persone"}
                        </option>
                      ))}
                    </select>
                    <Users className="absolute left-3 top-3.5 w-4 h-4 text-wood-dark/60 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Grid: Giorno e Ora */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-display text-[11px] font-bold tracking-widest text-wood-dark block uppercase mb-1">
                    Giorno della Prenotazione *
                  </label>
                  <div className="relative">
                    <input
                      id="form-booking-date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F5E8C8]/40 border border-[#3A2410] focus:border-brand-red text-[#3A2410] font-sans outline-none text-sm cursor-pointer"
                    />
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-wood-dark/60 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="font-display text-[11px] font-bold tracking-widest text-wood-dark block uppercase mb-1">
                    Orario
                  </label>
                  <div className="relative">
                    <select
                      id="form-booking-time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F5E8C8]/40 border border-[#3A2410] focus:border-brand-red text-[#3A2410] font-sans outline-none text-sm appearance-none cursor-pointer"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <Clock className="absolute left-3 top-3.5 w-4 h-4 text-wood-dark/60 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Note Speciali */}
              <div>
                <label className="font-display text-[11px] font-bold tracking-widest text-wood-dark block uppercase mb-1">
                  Intolleranze, allergie o richieste speciali
                </label>
                <div className="relative">
                  <textarea
                    id="form-booking-notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="es. Allergia al nichel, seggiolino bimbi, ecc..."
                    rows={2}
                    className="w-full pl-9 pr-3 py-2 bg-[#F5E8C8]/40 border border-[#3A2410] focus:border-brand-red text-[#3A2410] font-sans placeholder-gray-500 outline-none text-sm resize-none"
                  ></textarea>
                  <AlignLeft className="absolute left-3 top-2.5 w-4 h-4 text-wood-dark/60" />
                </div>
              </div>

              {/* Privacy acknowledgment */}
              <p className="font-sans text-[10px] text-wood-dark/60 leading-normal">
                Nota: La richiesta è gestita in conformità al GDPR. Il nostro staff verificherà la disponibilità e ti invierà una conferma telefonica entro pochi minuti.
              </p>

              {/* Submit CTA */}
              <button
                id="booking-submit-cta"
                type="submit"
                className="w-full bg-brand-red hover:bg-[#3A2410] text-[#FFF8F4] hover:text-[#F5E8C8] font-display text-sm tracking-widest uppercase font-bold py-3.5 border-2 border-[#1c1108] shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#3A2410] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                DISPONI LA PRENOTAZIONE
              </button>

            </form>
          </div>
        ) : (
          /* SUCCESS SCREEN STYLED LIKE A VINTAGE TICKET RECEIPT */
          <div className="text-center py-6">
            
            <div className="inline-flex items-center justify-center p-3.5 bg-green-100 rounded-full text-green-600 mb-4 border border-green-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-display text-2xl font-black tracking-widest text-brand-red uppercase mb-1">
              PRENOTAZIONE RICHIESTA!
            </h3>
            <p className="font-sans text-sm text-[#3A2410]/80">
              La tua richiesta è in fase di elaborazione.
            </p>

            {/* Ticket Card mockup */}
            <div className="my-6 p-5 bg-[#F5E8C8] border-2 border-dashed border-wood-dark text-left font-mono">
              <div className="flex justify-between items-center border-b border-[#3A2410]/20 pb-2.5 mb-3.5">
                <span className="font-display font-medium text-xs tracking-wider uppercase text-wood-dark">
                  Pizzeria La Gastronomica
                </span>
                <span className="font-bold text-brand-red text-sm">
                  {bookingCode}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#3A2410]">
                <div className="flex justify-between">
                  <span className="opacity-70">Ospite:</span>
                  <span className="font-bold uppercase">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Numero Persone:</span>
                  <span className="font-bold">{formData.guests} Ospiti</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Giorno Scelto:</span>
                  <span className="font-bold">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Orario:</span>
                  <span className="font-bold">{formData.time}</span>
                </div>
                {formData.notes && (
                  <div className="border-t border-[#3A2410]/10 pt-2 mt-2">
                    <span className="opacity-70 block mb-0.5">Richieste:</span>
                    <span className="italic block text-[11px] leading-relaxed">
                      "{formData.notes}"
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="font-sans text-xs text-[#3A2410]/70 max-w-sm mx-auto mb-6">
              Abbiamo registrato i tuoi dettagli. Per accelerare la conferma da parte del gestore sala, puoi inviare un promemoria prioritario direttamente su WhatsApp.
            </p>

            {/* WhatsApp ticket export and close */}
            <div className="space-y-3">
              <button
                id="ticket-whatsapp-export"
                onClick={handleSendWhatsApp}
                className="w-full bg-[#25D366] hover:bg-green-700 text-white font-display text-sm tracking-widest uppercase font-bold py-3.5 border-2 border-wood-dark shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#3A2410] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                INVIA PRIORITÀ WHATSAPP
              </button>

              <div className="flex gap-3 justify-center">
                <button
                  id="ticket-new-booking"
                  onClick={handleReset}
                  className="px-4 py-2 bg-paper-cream hover:bg-[#3A2410]/10 text-[#3A2410] font-display text-xs tracking-widest uppercase border border-wood-dark font-semibold cursor-pointer"
                >
                  NUOVA RICHIESTA
                </button>
                <button
                  id="ticket-close-btn"
                  onClick={onClose}
                  className="px-6 py-2 bg-brand-red text-white hover:bg-wood-dark font-display text-xs tracking-widest uppercase border-2 border-wood-dark shadow-hard font-semibold cursor-pointer"
                >
                  CHIUDI
                </button>
              </div>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
