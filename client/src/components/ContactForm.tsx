import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Contact Information */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h3 className="text-2xl font-bold mb-6 gradient-text">Informações de Contato</h3>
        </div>

        <motion.div
          className="flex gap-4"
          whileHover={{ x: 8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex-shrink-0">
            <motion.div
              className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Phone className="h-6 w-6 text-blue-600" />
            </motion.div>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Telefone</p>
            <a
              href="tel:5541998670421"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              (41) 99867-0421
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex gap-4"
          whileHover={{ x: 8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex-shrink-0">
            <motion.div
              className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Mail className="h-6 w-6 text-blue-600" />
            </motion.div>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Email</p>
            <a
              href="mailto:contato@litoralpocos.com"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              contato@litoralpocos.com
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex gap-4"
          whileHover={{ x: 8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex-shrink-0">
            <motion.div
              className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <MapPin className="h-6 w-6 text-blue-600" />
            </motion.div>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Localização</p>
            <p className="text-gray-600">Litoral Paranaense</p>
          </div>
        </motion.div>

        <motion.div
          className="pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-600 mb-4">Disponível 24/7 via WhatsApp para atender suas dúvidas!</p>
          <motion.a
            href="https://wa.me/5541998670421"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold">
              Enviar Mensagem via WhatsApp
            </Button>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Envie uma Mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  ✓
                </motion.div>
                <p className="text-lg font-semibold text-green-600">
                  Mensagem enviada com sucesso!
                </p>
                <p className="text-gray-600 mt-2">
                  Entraremos em contato em breve.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Seu nome"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="seu@email.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="(41) 99999-9999"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Sua mensagem aqui..."
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold"
                  >
                    Enviar Mensagem
                  </Button>
                </motion.div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
