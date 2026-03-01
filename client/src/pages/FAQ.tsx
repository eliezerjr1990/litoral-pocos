import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const COMPANY_WHATSAPP = "5541984378485";

const FAQ_ITEMS = [
  {
    question: "Quais cidades vocês atendem?",
    answer: "Atendemos Paranaguá, Pontal do Paraná, Matinhos e Guaratuba. Consulte-nos para outras localidades."
  },
  {
    question: "Qual é o preço da perfuração?",
    answer: "O preço varia conforme a profundidade e localização. Entre em contato para um orçamento personalizado."
  },
  {
    question: "Quanto tempo leva uma perfuração?",
    answer: "Geralmente entre 2 a 5 dias, dependendo da profundidade e condições do terreno."
  },
  {
    question: "Vocês fazem manutenção de poços?",
    answer: "Sim! Oferecemos serviços de manutenção, limpeza e reparo de poços existentes."
  },
  {
    question: "Qual é o tempo de resposta para orçamento?",
    answer: "Respondemos em até 24 horas. Para urgências, entre em contato via WhatsApp para atendimento imediato."
  },
  {
    question: "Vocês oferecem garantia nos serviços?",
    answer: "Sim! Oferecemos garantia de 1 ano em motores e 6 meses em serviços de perfuração e manutenção."
  },
  {
    question: "Como faço para agendar um serviço?",
    answer: "Você pode agendar através do WhatsApp, telefone ou preenchendo o formulário de contato no site. Nossa equipe confirmará a data e hora."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <HelpCircle size={48} />
              </motion.div>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Perguntas Frequentes
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:text-primary transition-colors py-4 group">
                      <div className="flex items-center gap-3 text-left">
                        <motion.div
                          animate={{ rotate: [0, 180] }}
                          transition={{ duration: 0.3 }}
                          className="group-data-[state=open]:rotate-180"
                        >
                          <ChevronDown size={20} className="text-primary" />
                        </motion.div>
                        <span className="font-semibold text-lg">
                          {item.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80 pb-4 ml-8">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.answer}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-16 md:py-24">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Não encontrou sua resposta?
            </motion.h2>
            <motion.p
              className="text-lg text-foreground/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Entre em contato conosco pelo WhatsApp. Nossa equipe está pronta para ajudar!
            </motion.p>
            <motion.a
              href={`https://wa.me/${COMPANY_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold shadow-lg hover:shadow-xl">
                Fale Conosco no WhatsApp
              </Button>
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
