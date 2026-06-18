import { useState, useEffect } from "react";
import { OPENING_HOURS } from "../data";
import { Clock, Info } from "lucide-react";

export default function Orari() {
  const [currentDayName, setCurrentDayName] = useState<string>("");
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);
  const [closingTime, setClosingTime] = useState<string>("");

  useEffect(() => {
    // Check real-time opening state
    const checkOpenStatus = () => {
      const now = new Date();
      // Translate index to Italian day names
      const daysInItalian = [
        "Domenica",
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì",
        "Sabato",
      ];
      const dayName = daysInItalian[now.getDay()];
      setCurrentDayName(dayName);

      const findTodayHours = OPENING_HOURS.find((oh) => oh.day === dayName);

      if (findTodayHours?.isOpen) {
        // Parse raw hours
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const totalMinutesNow = currentHour * 60 + currentMinute;

        // Standard start: 18:30 (18 * 60 + 30 = 1110 minutes)
        const openStartMinutes = 18 * 60 + 30;

        // End calculations
        let closeMinutes = 23 * 60; // Standard close default 23:00
        if (dayName === "Venerdì" || dayName === "Domenica") {
          closeMinutes = 23 * 60 + 30; // 23:30
        } else if (dayName === "Sabato") {
          closeMinutes = 24 * 60; // 00:00 (Midnight)
        }

        if (totalMinutesNow >= openStartMinutes && totalMinutesNow < closeMinutes) {
          setIsOpenNow(true);
          const closeTimeStr = findTodayHours.hours.split(" - ")[1];
          setClosingTime(closeTimeStr);
        } else {
          setIsOpenNow(false);
        }
      } else {
        setIsOpenNow(false);
      }
    };

    checkOpenStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(checkOpenStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="orari" className="py-20 bg-wood-dark text-[#F5E8C8] border-b-6 border-brand-red select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block - Dynamic indicator */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-widest text-brand-red uppercase leading-none">
              ORARI D'APERTURA
            </h2>
            <p className="font-sans text-base sm:text-lg text-paper-cream/80 font-light leading-relaxed">
              Siamo pronti ad accoglierti ogni sera per cena, offrendoti fragranza e sapori appena sfornati. Controlla il nostro stato in tempo reale qui sotto:
            </p>

            {/* Pulsing Status Pill */}
            <div className="pt-2">
              {isOpenNow ? (
                <div className="inline-flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2.5 bg-green-950/80 border border-green-500 px-5 py-2.5 text-green-400 font-display text-sm tracking-widest font-bold uppercase shadow-hard-red">
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
                    </span>
                    ● APERTO ORA
                  </div>
                  <span className="font-sans text-xs sm:text-sm text-green-300 italic block mt-1">
                    Cucina attiva fino alle {closingTime}! Ti aspettiamo stasera.
                  </span>
                </div>
              ) : (
                <div className="inline-flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2.5 bg-red-950/80 border border-brand-red px-5 py-2.5 text-brand-red font-display text-sm tracking-widest font-bold uppercase shadow-hard">
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-red"></span>
                    </span>
                    ● CHIUSO ORA
                  </div>
                  <span className="font-sans text-xs sm:text-sm text-paper-cream/60 italic block mt-1">
                    Apriamo tutte le sere a partire dalle <strong>18:30</strong>!
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5 py-4 px-5 bg-paper-cream/5 border-l-4 border-brand-red text-[#FFF8F4]/80 text-xs sm:text-sm font-sans max-w-md">
              <Clock className="w-5 h-5 text-brand-red flex-shrink-0" />
              <span>
                Il servizio d'asporto e domicilio è disponibile negli stessi orari della sala. Si consiglia la prenotazione telefonica anticipata nei weekend.
              </span>
            </div>
          </div>

          {/* Right Block - Time schedule list */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFF8F4] text-[#3A2410] border-2 border-brand-red p-6 sm:p-8 shadow-hard bg-wood-grain">
              <h3 className="font-display text-2xl font-bold tracking-widest border-b border-[#3A2410]/30 pb-3 mb-6 uppercase text-[#3A2410]">
                PROGRAMMA SETTIMANALE
              </h3>

              <div id="weekly-hours-table" className="divide-y divide-[#3A2410]/15">
                {OPENING_HOURS.map((oh) => {
                  const isToday = oh.day === currentDayName;
                  return (
                    <div
                      id={`day-row-${oh.day}`}
                      key={oh.day}
                      className={`flex justify-between items-center py-3.5 px-3 transition-colors duration-200 ${
                        isToday
                          ? "bg-brand-red text-[#FFF8F4] font-semibold shadow-inner"
                          : "hover:bg-[#3A2410]/5"
                      }`}
                    >
                      <span className="font-display tracking-widest uppercase text-sm sm:text-base">
                        {oh.day}
                        {isToday && (
                          <span className="ml-2 bg-[#F5E8C8] text-brand-red text-[9px] font-bold px-2 py-0.5 rounded font-sans tracking-tight">
                            OGGI
                          </span>
                        )}
                      </span>
                      <span className="font-sans font-light text-sm sm:text-base tracking-wider">
                        {oh.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
