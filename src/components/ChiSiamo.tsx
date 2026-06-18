import { Pizza, Beer, Utensils } from "lucide-react";
import { motion } from "motion/react";

export default function ChiSiamo() {
  const cards = [
    {
      id: "chi-pizzeria",
      icon: <Pizza className="w-8 h-8 text-brand-red" />,
      title: "PIZZERIA",
      description: "Impasti a lunga lievitazione e ingredienti certificati DOP per offrirti la vera pizza della tradizione italiana in ogni morso.",
    },
    {
      id: "chi-birreria",
      icon: <Beer className="w-8 h-8 text-brand-red" />,
      title: "BIRRERIA",
      description: "Un'accurata selezione di birre artigianali locali e grandi etichette, pensate per esaltare i sapori intensi dei nostri impasti.",
    },
    {
      id: "chi-cucina",
      icon: <Utensils className="w-8 h-8 text-brand-red" />,
      title: "CUCINA",
      description: "Primi piatti della tradizione, selezioni di carne grigliata e specialità fatte a mano dal sapore squisitamente familiare.",
    },
  ];

  return (
    <section id="chi-siamo" className="py-20 bg-gastronomica-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-widest text-brand-red uppercase mb-2 select-none">
            CHI SIAMO
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto"></div>
        </div>

        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Chef / Kitchen Image with Retro Border */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative p-2 bg-[#FFF8F4] border-double-red shadow-hard max-w-lg w-full">
              <img
                src="/src/assets/images/regenerated_image_1781616257243.jpg"
                alt="Pizzeria La Gastronomica Interno"
                className="w-full h-72 sm:h-80 object-cover border border-[#3A2410]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-brand-red text-white font-display text-xs tracking-widest uppercase border-2 border-wood-dark shadow-hard font-bold select-none">
                DAL 2009
              </div>
            </div>
          </div>

          {/* Core Text */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-widest text-wood-dark uppercase">
              TRADIZIONE E PASSIONE
            </h3>
            <p className="font-sans text-base sm:text-lg text-[#3A2410] font-light leading-relaxed">
              Nel cuore di San Benedetto del Tronto, la <strong>Pizzeria La Gastronomica</strong> è il vero punto di riferimento per gli amanti della cucina sincera e genuina. Abbiamo sposato l'artigianalità nel profondo, unendo farine pregiate italiane e ingredienti selezionati.
            </p>
            <p className="font-sans text-base sm:text-lg text-[#3A2410] font-light leading-relaxed">
              La nostra forza risiede negli <strong>impasti ad altissima idratazione e a lunga lievitazione</strong> (minimo 48 ore). Questa elaborazione curata garantisce una digeribilità superiore, un'alveolatura soffice e quella fragranza unica che solo i forni tradizionali sanno donare.
            </p>
          </div>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {cards.map((card, idx) => (
            <motion.div
              id={card.id}
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-gastronomica-card bg-wood-grain p-8 border-2 border-wood-dark shadow-hard select-none flex flex-col items-center text-center group cursor-default"
            >
              <div className="p-4 bg-paper-cream border border-wood-dark mb-5 shadow-hard group-hover:scale-105 transition-transform duration-200">
                {card.icon}
              </div>
              <h4 className="font-display text-xl font-bold tracking-widest text-[#3A2410] uppercase mb-3">
                {card.title}
              </h4>
              <p className="font-sans text-sm text-[#2A1A08] font-light leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Panoramic Mid-Banner: SAPORE AUTENTICO */}
      <div className="relative py-24 bg-cover bg-center border-t-6 border-b-6 border-brand-red flex items-center justify-center overflow-hidden" 
           style={{ 
             backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80')" 
           }}>
        
        {/* Elegant Centered Dark Box */}
        <div className="bg-wood-dark/95 border-2 border-brand-red py-6 px-12 text-center max-w-md mx-4 shadow-hard">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-widest text-brand-red uppercase block">
            SAPORE AUTENTICO
          </span>
          <span className="font-sans text-xs tracking-wider text-paper-cream uppercase block mt-1">
            Ingredienti nostrani a km zero
          </span>
        </div>
      </div>
    </section>
  );
}
