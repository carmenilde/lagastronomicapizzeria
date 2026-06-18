import { useState, useMemo } from "react";
import { CATEGORIES, MENU_ITEMS } from "../data";
import { MenuItem } from "../types";
import { Search, Flame, Leaf, Award, Sparkles, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("pizze-rosse");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dietFilter, setDietFilter] = useState<{
    vegetarian: boolean;
    spicy: boolean;
    bestSeller: boolean;
  }>({
    vegetarian: false,
    spicy: false,
    bestSeller: false,
  });

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
  };

  const toggleDietFilter = (filterKey: "vegetarian" | "spicy" | "bestSeller") => {
    setDietFilter((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDietFilter({
      vegetarian: false,
      spicy: false,
      bestSeller: false,
    });
  };

  // Filter items based on category, search query, and dietary tags
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (item.category !== selectedCategory) return false;

      // Search query filter (name or ingredients)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.toLowerCase().includes(query);
        if (!matchesName && !matchesIngredients) return false;
      }

      // Dietary filters
      if (dietFilter.vegetarian && !item.isVegetarian) return false;
      if (dietFilter.spicy && !item.isSpicy) return false;
      if (dietFilter.bestSeller && !item.isBestSeller) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, dietFilter]);

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery.trim() !== "" ||
      dietFilter.vegetarian ||
      dietFilter.spicy ||
      dietFilter.bestSeller
    );
  }, [searchQuery, dietFilter]);

  // Group filtered items if in "bevande" category
  const groupedBevande = useMemo(() => {
    if (selectedCategory !== "bevande") return null;
    const groups: { [key: string]: MenuItem[] } = {};
    filteredItems.forEach((item) => {
      const sub = item.subcategory || "BEVANDE AL TAVOLO";
      if (!groups[sub]) groups[sub] = [];
      groups[sub].push(item);
    });
    return groups;
  }, [selectedCategory, filteredItems]);

  const formatPrice = (price: number | string) => {
    if (typeof price === "number") {
      return `€ ${price.toFixed(2)}`;
    }
    return price.includes("€") ? price : `€ ${price}`;
  };

  return (
    <section id="menu" className="py-20 bg-paper-cream/30 border-b-6 border-brand-red">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-widest text-brand-red uppercase mb-1 select-none">
            IL NOSTRO MENU
          </h2>
          <p className="font-display text-sm sm:text-base tracking-widest text-[#3A2410] uppercase font-semibold">
            Qualità in ogni singolo morso
          </p>
          <div className="w-24 h-1 bg-brand-red mx-auto mt-3"></div>
        </div>

        {/* Dynamic Search & Diet Pill Filters */}
        <div className="mb-10 space-y-4 max-w-3xl mx-auto">
          {/* Keyword Search */}
          <div className="relative">
            <input
              id="menu-search-input"
              type="text"
              placeholder="Cerca pizze, ingredienti (es. Bufala, Porcini, Salame)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#FFF8F4] border-2 border-[#3A2410] font-sans text-[#3A2410] placeholder-gray-500 outline-none focus:border-brand-red transition-colors duration-150 shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#3A2410]/70" />
            
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-brand-red"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Diet and Attribute Badges */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              id="filter-vegetarian"
              onClick={() => toggleDietFilter("vegetarian")}
              className={`flex items-center gap-1.5 px-4 py-1.5 border border-[#3A2410] font-display text-xs tracking-wider uppercase font-medium cursor-pointer transition-all duration-150 ${
                dietFilter.vegetarian
                  ? "bg-green-700 text-white shadow-hard-red border-brand-red"
                  : "bg-[#FFF8F4] text-[#3A2410] hover:bg-gray-100"
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              VEGETARIANO
            </button>

            <button
              id="filter-spicy"
              onClick={() => toggleDietFilter("spicy")}
              className={`flex items-center gap-1.5 px-4 py-1.5 border border-[#3A2410] font-display text-xs tracking-wider uppercase font-medium cursor-pointer transition-all duration-150 ${
                dietFilter.spicy
                  ? "bg-red-700 text-white shadow-hard-red border-brand-red"
                  : "bg-[#FFF8F4] text-[#3A2410] hover:bg-gray-100"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              PICCANTE
            </button>

            <button
              id="filter-best-seller"
              onClick={() => toggleDietFilter("bestSeller")}
              className={`flex items-center gap-1.5 px-4 py-1.5 border border-[#3A2410] font-display text-xs tracking-wider uppercase font-medium cursor-pointer transition-all duration-150 ${
                dietFilter.bestSeller
                  ? "bg-yellow-600 text-white shadow-hard-red border-brand-red"
                  : "bg-[#FFF8F4] text-[#3A2410] hover:bg-gray-100"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              PIÙ VENDUTI
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-1 text-xs font-display text-brand-red hover:underline font-bold"
              >
                Cancella Filtri
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Selector (Styled like index cards) */}
        <div className="mb-8 overflow-x-auto no-scrollbar scroll-smooth flex py-2 border-b border-[#3A2410]/20 justify-start sm:justify-center gap-2">
          {CATEGORIES.map((category) => (
            <button
              id={`cat-tab-${category.id}`}
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`flex-shrink-0 px-4 py-2.5 font-display text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-2 border-b-0 cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-brand-red text-white border-[#3A2410] shadow-[2px_-2px_0px_#3A2410]"
                  : "bg-[#FFF8F4] text-[#3A2410] border-[#3A2410]/40 hover:bg-[#F5E8C8]/50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* MENU DISPLAY CONTAINER */}
        <div id="pizzas-display" className="p-4 sm:p-8 bg-[#FFF8F4] border-double-red shadow-hard mb-12">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery + JSON.stringify(dietFilter)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {filteredItems.length > 0 ? (
                selectedCategory === "bevande" && groupedBevande ? (
                  <div className="space-y-12">
                    {(Object.entries(groupedBevande) as [string, MenuItem[]][]).map(([sub, items]) => (
                      <div key={sub} className="space-y-6">
                        <div className="flex items-center gap-4">
                          <h3 className="font-display text-lg font-bold tracking-widest text-brand-red uppercase whitespace-nowrap select-none">
                            {sub}
                          </h3>
                          <div className="flex-grow border-b border-[#3A2410]/30 animate-pulse"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                          {items.map((item) => (
                            <div id={`menu-item-${item.id}`} key={item.id} className="group pb-4 border-b border-dashed border-[#3A2410]/20">
                              {/* Name & Cost Row tied with dots (Traditional dotted leaders) */}
                              <div className="flex justify-between items-baseline gap-2 mb-1">
                                <div className="flex items-center flex-wrap gap-2">
                                  <h4 className="font-display text-md sm:text-lg font-bold tracking-wide text-wood-dark uppercase group-hover:text-brand-red transition-colors duration-150">
                                    {item.name}
                                  </h4>
                                </div>
                                
                                {/* Leader dots fill spacing */}
                                <div className="flex-grow dotted-leader h-1.5 mx-2 opacity-50 block md:block"></div>
                                
                                <div className="font-display font-bold text-[#3A2410] text-sm sm:text-base whitespace-nowrap">
                                  {formatPrice(item.price)}
                                </div>
                              </div>

                              {/* Special ingredients/volume text */}
                              {item.ingredients && (
                                <p className="font-sans text-xs sm:text-sm text-[#3A2410]/80 font-light italic leading-relaxed">
                                  {item.ingredients}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {filteredItems.map((item) => (
                      <div id={`menu-item-${item.id}`} key={item.id} className="group pb-4 border-b border-dashed border-[#3A2410]/20">
                        {/* Name & Cost Row tied with dots (Traditional dotted leaders) */}
                        <div className="flex justify-between items-baseline gap-2 mb-1">
                          <div className="flex items-center flex-wrap gap-2">
                            <h4 className="font-display text-md sm:text-lg font-bold tracking-wide text-wood-dark uppercase group-hover:text-brand-red transition-colors duration-150">
                              {item.name}
                            </h4>
                            
                            {/* Helper badges */}
                            {item.isBestSeller && (
                              <span className="bg-brand-red text-[#FFF8F4] text-[10px] font-display tracking-widest font-bold px-1.5 py-0.5 rounded-sm select-none">
                                POPÒLARE
                              </span>
                            )}
                            {item.isVegetarian && (
                              <span className="bg-green-700 text-white text-[10px] font-display tracking-widest font-bold px-1.5 py-0.5 rounded-sm select-none">
                                VEG
                              </span>
                            )}
                            {item.isSpicy && (
                              <span className="bg-red-700 text-white text-[10px] font-display tracking-widest font-bold px-1.5 py-0.5 rounded-sm select-none flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5" /> HOT
                              </span>
                            )}
                            {item.isNew && (
                              <span className="bg-amber-500 text-wood-dark text-[10px] font-display tracking-widest font-bold px-1.5 py-0.5 rounded-sm select-none flex items-center gap-0.5">
                                <Sparkles className="w-2.5 h-2.5" /> NUOVO
                              </span>
                            )}
                          </div>
                          
                          {/* Leader dots fill spacing */}
                          <div className="flex-grow dotted-leader h-1.5 mx-2 opacity-50 block md:block"></div>
                          
                          <div className="font-display font-bold text-[#3A2410] text-sm sm:text-base whitespace-nowrap">
                            {formatPrice(item.price)}
                          </div>
                        </div>

                        {/* Ingredients list */}
                        {item.ingredients && (
                          <p className="font-sans text-xs sm:text-sm text-[#3A2410]/80 font-light italic leading-relaxed">
                            {item.ingredients}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12 text-[#3A2410]/70 font-sans italic">
                  Nessun elemento corrisponde ai filtri selezionati. Prova a modificarli o clicca "Cancella Filtri".
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM METADATA ROW - SUPPLEMENTS / COPERTO */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch font-display">
          
          {/* Extra Supplementi block */}
          <div className="md:col-span-7 bg-[#FFF8F4] p-6 border-2 border-wood-dark shadow-hard bg-wood-grain">
            <h4 className="font-display text-lg font-bold tracking-widest text-[#3A2410] border-b border-[#3A2410]/30 pb-2 mb-4 uppercase">
              EXTRA / SUPPLEMENTI
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 font-sans text-sm text-[#3A2410]">
              <div className="flex justify-between items-baseline border-b border-dotted border-[#3A2410]/20 pb-1">
                <span className="font-light">Senza Lattosio (Formaggio Veg)</span>
                <span className="font-bold">+€ 1,00</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-dotted border-[#3A2410]/20 pb-1">
                <span className="font-light">Aggiunta Bufala DOP</span>
                <span className="font-bold">+€ 1,50</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-dotted border-[#3A2410]/20 pb-1">
                <span className="font-light">Porcini o Stracciatella</span>
                <span className="font-bold">+€ 2,00</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-dotted border-[#3A2410]/20 pb-1">
                <span className="font-light">Prosciutto Crudo di Parma</span>
                <span className="font-bold">+€ 2,00</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-dotted border-[#3A2410]/20 pb-1">
                <span className="font-light">Altri salumi / Affettati</span>
                <span className="font-bold">+€ 1,50</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-dotted border-[#3A2410]/20 pb-1">
                <span className="font-light">Aggiunte varie verdure</span>
                <span className="font-bold">+€ 1,00</span>
              </div>
            </div>
          </div>

          {/* Interactive Block or Coperto details as shown in the screenshot */}
          <div className="md:col-span-5 bg-[#3A2410] border-2 border-brand-red p-8 text-center flex flex-col justify-center items-center shadow-hard text-paper-cream">
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-widest text-[#F5E8C8] uppercase leading-none mb-2">
              COPERTO: +€ 1,50
            </h3>
            <p className="font-sans text-xs tracking-widest text-[#F5E8C8]/70 uppercase">
              Servizio, pane e grissini fatti in casa inclusi
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
