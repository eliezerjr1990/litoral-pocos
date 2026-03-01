import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const COMPANY_NAME = "Litoral Poços";
const COMPANY_WHATSAPP = "5541998670421";
const CONTACT_NUMBERS = {
  main: "5541984378485", // Principal
  scheduling: "5541998670421" // Anthonnelly (Agendamentos)
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Início", href: "/" },
    { label: "FAQ", href: "/faq" },
    { label: "Contato", href: "#contact" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.a
            className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💧
            </motion.span>
            {COMPANY_NAME}
          </motion.a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.href}
              custom={i}
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              {item.label === "Contato" ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setContactMenuOpen(!contactMenuOpen)}
                    className="text-foreground hover:text-primary transition-colors font-medium relative flex items-center gap-1"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  {contactMenuOpen && (
                    <motion.div
                      className="absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <a
                        href={`https://wa.me/${CONTACT_NUMBERS.main}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100"
                        onClick={() => setContactMenuOpen(false)}
                      >
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        <div className="text-left">
                          <p className="font-semibold text-sm text-gray-900">Atendimento Principal</p>
                          <p className="text-xs text-gray-500">Eliezer</p>
                        </div>
                      </a>
                      <a
                        href={`https://wa.me/${CONTACT_NUMBERS.scheduling}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors"
                        onClick={() => setContactMenuOpen(false)}
                      >
                        <Phone className="w-5 h-5 text-blue-500" />
                        <div className="text-left">
                          <p className="font-semibold text-sm text-gray-900">Agendamentos</p>
                          <p className="text-xs text-gray-500">Anthonnelly</p>
                        </div>
                      </a>
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link href={item.href}>
                  <motion.a
                    className="text-foreground hover:text-primary transition-colors font-medium relative"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </Link>
              )}
            </motion.div>
          ))}
          <motion.div
            custom={navItems.length}
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            <a
              href={`https://wa.me/${COMPANY_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow">
                  WhatsApp
                </Button>
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-border overflow-hidden"
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.label === "Contato" ? (
                  <div>
                    <motion.button
                      onClick={() => setContactMenuOpen(!contactMenuOpen)}
                      className="w-full text-left text-foreground hover:text-primary transition-colors font-medium block py-2"
                      whileHover={{ x: 8 }}
                      whileTap={{ x: 0 }}
                    >
                      {item.label}
                    </motion.button>
                    {contactMenuOpen && (
                      <motion.div
                        className="pl-4 space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <a
                          href={`https://wa.me/${CONTACT_NUMBERS.main}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <MessageCircle className="w-4 h-4" />
                          Atendimento (Eliezer)
                        </a>
                        <a
                          href={`https://wa.me/${CONTACT_NUMBERS.scheduling}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <Phone className="w-4 h-4" />
                          Agendamentos (Anthonnelly)
                        </a>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href}>
                    <motion.a
                      className="text-foreground hover:text-primary transition-colors font-medium block py-2"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ x: 8 }}
                      whileTap={{ x: 0 }}
                    >
                      {item.label}
                    </motion.a>
                  </Link>
                )}
              </div>
            ))}
            <a
              href={`https://wa.me/${COMPANY_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold">
                  WhatsApp
                </Button>
              </motion.div>
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
