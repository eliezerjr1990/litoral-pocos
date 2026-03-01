import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "João Silva",
    location: "Paranaguá, PR",
    text: "Excelente serviço! A equipe foi muito profissional e entregou o trabalho no prazo. Recomendo para todos que precisam de perfuração de poços.",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    id: 2,
    name: "Maria Santos",
    location: "Matinhos, PR",
    text: "Atendimento impecável! Resolveram meu problema de água em poucas horas. Muito satisfeita com o resultado e o preço justo.",
    rating: 5,
    avatar: "👩‍🌾",
  },
  {
    id: 3,
    name: "Carlos Oliveira",
    location: "Guaratuba, PR",
    text: "Profissionais competentes e pontuais. Fizeram a manutenção do meu poço com qualidade e rapidez. Voltaria a contratar com certeza!",
    rating: 5,
    avatar: "👨‍🔧",
  },
  {
    id: 4,
    name: "Ana Costa",
    location: "Pontal do Paraná, PR",
    text: "Instalaram o motor no meu poço e ficou perfeito! Equipe atenciosa, explicou tudo direitinho. Muito bom mesmo!",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    id: 5,
    name: "Roberto Ferreira",
    location: "Litoral, PR",
    text: "Serviço de qualidade, preço competitivo e ainda oferecem garantia. Isso sim é profissionalismo! Recomendo muito.",
    rating: 5,
    avatar: "👨‍💼",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setAutoplay(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    setAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setAutoplay(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Confira os depoimentos de clientes satisfeitos com nossos serviços de qualidade
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative h-96 flex items-center justify-center"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <AnimatePresence initial={false} custom={current} mode="wait">
              <motion.div
                key={testimonial.id}
                custom={current}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className="absolute w-full"
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-l-4 border-blue-500"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {/* Rating Stars */}
                  <motion.div
                    className="flex gap-1 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star
                          size={20}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p
                    className="text-gray-700 text-lg mb-6 italic leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    "{testimonial.text}"
                  </motion.p>

                  {/* Author Info */}
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="text-4xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              onClick={goToPrevious}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-0 -translate-x-16 md:-translate-x-20 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 translate-x-16 md:translate-x-20 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors z-10"
            >
              <ChevronRight size={24} />
            </motion.button>
          </motion.div>

          {/* Dots Indicator */}
          <motion.div
            className="flex justify-center gap-3 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {TESTIMONIALS.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-3 rounded-full transition-all ${
                  index === current
                    ? "bg-blue-500 w-8"
                    : "bg-gray-300 w-3 hover:bg-gray-400"
                }`}
                animate={{
                  width: index === current ? 32 : 12,
                }}
              />
            ))}
          </motion.div>

          {/* Counter */}
          <motion.div
            className="text-center mt-8 text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-sm">
              <span className="font-bold text-blue-600">{current + 1}</span> de{" "}
              <span className="font-bold text-blue-600">{TESTIMONIALS.length}</span>
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { number: "500+", label: "Clientes Satisfeitos" },
            { number: "4.9★", label: "Avaliação Média" },
            { number: "15+", label: "Anos de Experiência" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 bg-white rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
