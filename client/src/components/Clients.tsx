import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Client {
  name: string;
  logo: string;
  city: string;
}

const CLIENTS: Client[] = [
  {
    name: "Viação Rocio",
    logo: "/logos/viacao-rocio.png",
    city: "Paranaguá",
  },
  {
    name: "Camboa Palace Hotel",
    logo: "/logos/camboa-hotel.png",
    city: "Paranaguá",
  },
  {
    name: "Viação Graciosa",
    logo: "/logos/viacao-graciosa.png",
    city: "Paranaguá",
  },
  {
    name: "EPR Litoral Pioneiro",
    logo: "/logos/epr-litoral.png",
    city: "Paranaguá",
  },
  {
    name: "Liquipar",
    logo: "/logos/liquipar.jpg",
    city: "Paranaguá",
  },
  {
    name: "Fertipar",
    logo: "/logos/fertipar.png",
    city: "Paranaguá",
  },
];

export default function Clients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, CLIENTS.length - itemsPerView) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= CLIENTS.length - itemsPerView ? 0 : prev + 1
    );
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerView]);

  const visibleClients = CLIENTS.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nossos Clientes
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Confiança de empresas líderes em Paranaguá e região
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
              key={currentIndex}
            >
              {visibleClients.map((client, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  className="flex-1 min-w-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-8 h-full flex flex-col items-center justify-center">
                    <motion.img
                      src={client.logo}
                      alt={client.name}
                      className="h-32 object-contain mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-500">{client.city}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({
            length: Math.max(1, CLIENTS.length - itemsPerView + 1),
          }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
