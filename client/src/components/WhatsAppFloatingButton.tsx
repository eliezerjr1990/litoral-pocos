import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, MessageSquare, Clock } from "lucide-react";

const COMPANY_WHATSAPP = "5541998670421";
const COMPANY_PHONE = "(41) 99867-0421";

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const buttonVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    exit: { opacity: 0, y: 20, scale: 0.8 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const messageOptions = [
    {
      icon: MessageSquare,
      label: "Chat",
      description: "Envie uma mensagem",
      action: () => window.open(`https://wa.me/${COMPANY_WHATSAPP}`, "_blank"),
    },
    {
      icon: Phone,
      label: "Ligar",
      description: "Chamada direta",
      action: () => window.open(`tel:${COMPANY_WHATSAPP.replace(/\D/g, "")}`, "_blank"),
    },
    {
      icon: Clock,
      label: "Agendar",
      description: "Agende um atendimento",
      action: () => window.open(`https://wa.me/${COMPANY_WHATSAPP}?text=Gostaria%20de%20agendar%20um%20atendimento`, "_blank"),
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Button Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Menu Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex flex-col gap-3"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {messageOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.label}
                    custom={index}
                    variants={menuVariants}
                    whileHover={{ scale: 1.05, x: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={option.action}
                    className="flex items-center gap-3 bg-white rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-gray-800 text-sm">
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-600">
                        {option.description}
                      </span>
                    </div>
                    <motion.div
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500"
                      whileHover={{ rotate: 10 }}
                    >
                      <Icon size={20} className="text-white" />
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.div
          className="relative"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Pulse Background */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-green-500 opacity-20"
              variants={pulseVariants}
              animate="animate"
            />
          )}

          {/* Main Button */}
          <motion.button
            onClick={toggleChat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 rounded-full bg-green-500 text-white shadow-2xl hover:shadow-2xl transition-all flex items-center justify-center group"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <MessageCircle size={28} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tooltip */}
            {!isOpen && (
              <motion.div
                className="absolute right-20 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                Fale conosco!
              </motion.div>
            )}
          </motion.button>

          {/* Badge Counter */}
          {!isOpen && (
            <motion.div
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              3
            </motion.div>
          )}
        </motion.div>

        {/* Contact Info Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-4 w-64"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <h3 className="font-bold text-gray-800 mb-1">Litoral Poços</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Disponível 24/7 para atender você
                </p>
                <div className="bg-green-50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-600 mb-1">Telefone:</p>
                  <p className="font-semibold text-green-600">{COMPANY_PHONE}</p>
                </div>
                <p className="text-xs text-gray-500">
                  Responderemos em até 1 hora
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
