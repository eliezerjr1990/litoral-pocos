import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Filter, Gauge, CheckCircle, Send, Home as HomeIcon, Building2 } from "lucide-react";

const COMPANY_WHATSAPP = "5541998524453";

export default function CompleteOrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "perfuracao",
    depth: 12,
    city: "paranagua",
    message: "",
  });

  const [extras, setExtras] = useState({
    motorCasa: false,
    motorSobrado: false,
    filtro: false,
    pressurizador: false,
    valvula: false
  });

  const PRICES: Record<string, Record<string, number>> = {
    perfuracao: {
      paranagua: 600,
      pontal: 750,
      matinhos: 750,
      guaratuba: 1250,
    },
    manutencao: {
      paranagua: 300,
      pontal: 400,
      matinhos: 400,
      guaratuba: 600,
    },
    motorCasa: {
      paranagua: 500,
      pontal: 500,
      matinhos: 500,
      guaratuba: 500,
    },
    motorSobrado: {
      paranagua: 600,
      pontal: 600,
      matinhos: 600,
      guaratuba: 600,
    },
    filtro: {
      paranagua: 250,
      pontal: 250,
      matinhos: 250,
      guaratuba: 250,
    },
    pressurizador: {
      paranagua: 650,
      pontal: 650,
      matinhos: 650,
      guaratuba: 650,
    },
    valvula: {
      paranagua: 150,
      pontal: 150,
      matinhos: 150,
      guaratuba: 150,
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "depth" ? Number(value) : value,
    }));
  };

  const toggleExtra = (key: keyof typeof extras) => {
    if (key === 'motorCasa') {
      setExtras(prev => ({ ...prev, motorCasa: !prev.motorCasa, motorSobrado: false }));
    } else if (key === 'motorSobrado') {
      setExtras(prev => ({ ...prev, motorSobrado: !prev.motorSobrado, motorCasa: false }));
    } else {
      setExtras(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const basePrice = PRICES[formData.serviceType]?.[formData.city] || 0;
  const depthPrice = formData.serviceType === "perfuracao" && formData.depth > 12 ? (formData.depth - 12) * 50 : 0;
  
  const extrasPrice = Object.entries(extras).reduce((total, [key, isSelected]) => {
    if (isSelected) {
      return total + (PRICES[key]?.[formData.city] || 0);
    }
    return total;
  }, 0);

  const estimatedPrice = basePrice + depthPrice + extrasPrice;

  const handleWhatsAppRedirect = () => {
    const serviceLabel = formData.serviceType === "perfuracao" ? "Perfuração de Poço" : "Manutenção";
    const cityLabel = {
      paranagua: "Paranaguá",
      pontal: "Pontal do Paraná",
      matinhos: "Matinhos",
      guaratuba: "Guaratuba",
    }[formData.city];

    const selectedExtras = Object.entries(extras)
      .filter(([_, isSelected]) => isSelected)
      .map(([key, _]) => {
        const names: Record<string, string> = {
          motorCasa: "Instalação de Motor (Casa)",
          motorSobrado: "Instalação de Motor (Sobrado)",
          filtro: "Filtro de Carvão",
          pressurizador: "Pressurizador",
          valvula: "Válvula de Retenção"
        };
        return names[key];
      });

    const depthInfo = formData.serviceType === "perfuracao" ? `\nProfundidade: ${formData.depth}m` : "";
    const extrasInfo = selectedExtras.length > 0 ? `\nAdicionais: ${selectedExtras.join(", ")}` : "";

    const text = `Olá! Gostaria de solicitar um orçamento completo.
    
*Dados do Cliente:*
Nome: ${formData.name}
Telefone: ${formData.phone}

*Detalhes do Serviço:*
Serviço: ${serviceLabel}
Cidade: ${cityLabel}${depthInfo}${extrasInfo}
Orçamento Estimado: R$ ${estimatedPrice.toLocaleString('pt-BR')}

*Mensagem Adicional:*
${formData.message || "Nenhuma"}`;

    window.open(`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-0 shadow-2xl overflow-hidden bg-white">
        <CardHeader className="bg-blue-600 text-white p-8">
          <CardTitle className="text-2xl">Formulário de Orçamento Detalhado</CardTitle>
          <p className="text-blue-100 opacity-90">Receba sua proposta oficial via WhatsApp</p>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coluna 1: Dados e Configurações */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Seu Nome</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ex: João Silva"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Seu WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Ex: (41) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Tipo de Serviço</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="perfuracao">Perfuração de Poço</option>
                    <option value="manutencao">Manutenção</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Cidade</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="paranagua">Paranaguá</option>
                    <option value="pontal">Pontal do Paraná</option>
                    <option value="matinhos">Matinhos</option>
                    <option value="guaratuba">Guaratuba</option>
                  </select>
                </div>
              </div>

              <AnimatePresence>
                {formData.serviceType === "perfuracao" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-gray-700">Profundidade Desejada</label>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">{formData.depth}m</span>
                    </div>
                    <input
                      type="range"
                      name="depth"
                      min="6"
                      max="30"
                      step="1"
                      value={formData.depth}
                      onChange={handleChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Coluna 2: Adicionais e Resumo */}
            <div className="space-y-6">
              <label className="text-sm font-semibold text-gray-700">Serviços Adicionais</label>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-transparent hover:border-blue-200 transition-all cursor-pointer" onClick={() => toggleExtra('motorCasa')}>
                  <Checkbox checked={extras.motorCasa} onCheckedChange={() => toggleExtra('motorCasa')} />
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">Instalação Motor (Casa)</p>
                    <p className="text-xs text-gray-500">R$ 500</p>
                  </div>
                  <HomeIcon className="w-4 h-4 text-orange-500" />
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-transparent hover:border-blue-200 transition-all cursor-pointer" onClick={() => toggleExtra('motorSobrado')}>
                  <Checkbox checked={extras.motorSobrado} onCheckedChange={() => toggleExtra('motorSobrado')} />
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">Instalação Motor (Sobrado)</p>
                    <p className="text-xs text-gray-500">R$ 600</p>
                  </div>
                  <Building2 className="w-4 h-4 text-orange-600" />
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-transparent hover:border-blue-200 transition-all cursor-pointer" onClick={() => toggleExtra('filtro')}>
                  <Checkbox checked={extras.filtro} onCheckedChange={() => toggleExtra('filtro')} />
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">Filtro de Carvão</p>
                    <p className="text-xs text-gray-500">R$ 250</p>
                  </div>
                  <Filter className="w-4 h-4 text-blue-500" />
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-transparent hover:border-blue-200 transition-all cursor-pointer" onClick={() => toggleExtra('pressurizador')}>
                  <Checkbox checked={extras.pressurizador} onCheckedChange={() => toggleExtra('pressurizador')} />
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">Pressurizador</p>
                    <p className="text-xs text-gray-500">R$ 650</p>
                  </div>
                  <Gauge className="w-4 h-4 text-green-500" />
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-transparent hover:border-blue-200 transition-all cursor-pointer" onClick={() => toggleExtra('valvula')}>
                  <Checkbox checked={extras.valvula} onCheckedChange={() => toggleExtra('valvula')} />
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">Válvula de Retenção</p>
                    <p className="text-xs text-gray-500">R$ 150</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Observações Adicionais</label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Algum detalhe específico?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-blue-800 font-semibold mb-1">Investimento Estimado</p>
              <p className="text-4xl font-bold text-blue-600">
                R$ {estimatedPrice.toLocaleString('pt-BR')}
              </p>
            </div>
            <Button 
              onClick={handleWhatsAppRedirect}
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-10 py-8 rounded-2xl shadow-xl hover:shadow-green-200 transition-all flex items-center gap-3"
            >
              <Send className="w-6 h-6" />
              Enviar via WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
