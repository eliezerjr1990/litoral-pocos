import { motion } from "framer-motion";
import VisitCounter from "./VisitCounter";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sobre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4">Litoral Poços</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Especialistas em perfuração e manutenção de poços artesianos no litoral paranaense.
            </p>
          </motion.div>

          {/* Cidades Atendidas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4">Cidades Atendidas</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>• Paranaguá</li>
              <li>• Pontal do Paraná</li>
              <li>• Matinhos</li>
              <li>• Guaratuba</li>
            </ul>
          </motion.div>

          {/* Contatos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">Setor de Contatos</h3>
            <div className="space-y-2 text-blue-100 text-sm">
              <p><strong>Atendimento Principal:</strong> (41) 98437-8485 (Eliezer)</p>
              <p><strong>Agendamentos:</strong> (41) 99867-0421 (Anthonnelly)</p>
              <p><strong>Técnico Perfurador:</strong> (41) 95072-8510 (Luiz Antonio)</p>
            </div>
          </motion.div>
        </div>

        {/* Divisor */}
        <div className="border-t border-blue-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-blue-100 text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              © 2026 Litoral Poços - Todos os direitos reservados.
            </motion.p>
            
            <VisitCounter />

            <motion.p
              className="text-blue-100 text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Desenvolvido por <a href="https://manus.im" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Manus</a>
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
