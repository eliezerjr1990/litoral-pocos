import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import { getPaymentLink } from "@/config/paymentLinks";
import QRCode from "qrcode";

const COMPANY_WHATSAPP = "5541984378485";

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 12,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const HERO_IMAGES = [
  {
    src: "/hero/paranagua_pano.jpg",
    title: "Paranaguá",
    description: "Atendimento especializado na região portuária e industrial"
  },
  {
    src: "/hero/pontal_pano.jpg",
    title: "Pontal do Paraná",
    description: "Soluções em água para todos os balneários de Pontal"
  },
  {
    src: "/hero/matinhos_pano.jpg",
    title: "Matinhos",
    description: "Qualidade e tecnologia na nova orla de Matinhos"
  },
  {
    src: "/hero/guaratuba_pano.jpg",
    title: "Guaratuba",
    description: "Referência em poços artesianos em toda Guaratuba"
  }
];

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [serviceType, setServiceType] = useState("perfuracao");
  const [depth, setDepth] = useState(12);
  const [city, setCity] = useState("paranagua");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");
  const [motorType, setMotorType] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"creditCard" | "debitCard" | "cash" | "pix" | "paymentLink" | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Estado para serviços adicionais
  const [extras, setExtras] = useState({
    motorCasa: false,
    motorSobrado: false,
    filtro: false,
    pressurizador: false,
    valvula: false,
    refilFiltro: false
  });

  // Tabela de preços unificada
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
    },
    motor05: {
      paranagua: 650,
      pontal: 650,
      matinhos: 650,
      guaratuba: 650,
    },
    motor08: {
      paranagua: 1050,
      pontal: 1050,
      matinhos: 1050,
      guaratuba: 1050,
    },
    motor15: {
      paranagua: 1350,
      pontal: 1350,
      matinhos: 1350,
      guaratuba: 1350,
    },
    refilFiltro: {
      paranagua: 100,
      pontal: 100,
      matinhos: 100,
      guaratuba: 100,
    }
  };

  const basePrice = PRICES[serviceType]?.[city] || 0;
  
  // Apenas perfuração tem custo adicional por profundidade acima de 12m
  const depthPrice = serviceType === "perfuracao" && depth > 12 
    ? (depth - 12) * 50 
    : 0;

  // Soma dos extras
  const extrasPrice = Object.entries(extras).reduce((total, [key, isSelected]) => {
    if (isSelected) {
      return total + (PRICES[key]?.[city] || 0);
    }
    return total;
  }, 0);

  // Preco do motor selecionado
  const motorKeyMap: Record<string, string> = {
    "0.5": "motor05",
    "0.8": "motor08",
    "1.5": "motor15"
  };
  const motorKey = motorType ? motorKeyMap[motorType] : "";
  const motorPrice = motorKey ? (PRICES[motorKey]?.[city] || 0) : 0;
    
  const estimatedPrice = basePrice + depthPrice + extrasPrice + motorPrice;

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Muda a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  const toggleExtra = (key: keyof typeof extras) => {
    // Se selecionar motorCasa, desmarca motorSobrado e vice-versa
    if (key === 'motorCasa') {
      setExtras(prev => ({ ...prev, motorCasa: !prev.motorCasa, motorSobrado: false }));
    } else if (key === 'motorSobrado') {
      setExtras(prev => ({ ...prev, motorSobrado: !prev.motorSobrado, motorCasa: false }));
    } else {
      setExtras(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const fetchAddressByCep = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      setCepError("CEP deve ter 8 dígitos");
      return;
    }

    setLoadingCep(true);
    setCepError("");
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado");
        setStreet("");
        setNeighborhood("");
        setAddressCity("");
      } else {
        setStreet(data.logradouro || "");
        setNeighborhood(data.bairro || "");
        setAddressCity(data.localidade || "");
        setCepError("");
      }
    } catch (error) {
      setCepError("Erro ao buscar CEP");
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoadingCep(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCep(value);
    
    // Busca automática quando atinge 8 dígitos
    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      fetchAddressByCep(value);
    }
  };

  const generateQRCode = async (data: string) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(data, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.95,
        margin: 1,
        width: 300,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeImage(qrDataUrl);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const handlePaymentMethodChange = (method: "creditCard" | "debitCard" | "cash" | "pix" | "paymentLink") => {
    setPaymentMethod(method);
    setQrCodeImage(null);
    
    // Se selecionou link de pagamento, gera o QR Code
    if (method === "paymentLink" && paymentLink) {
      generateQRCode(paymentLink);
    }
  };

  const handleWhatsAppRedirect = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Por favor, preencha seu nome e WhatsApp antes de enviar.");
      return;
    }

    const serviceLabel = serviceType === "perfuracao" ? "Perfuracao de Poco" : "Manutencao";
    const cityLabel = {
      paranagua: "Paranagua",
      pontal: "Pontal do Parana",
      matinhos: "Matinhos",
      guaratuba: "Guaratuba",
    }[city];

    // Construir relatorio detalhado com todos os itens
    let reportItems: string[] = [];
    
    // Servico principal
    reportItems.push(`${serviceLabel} - R$ ${basePrice.toLocaleString('pt-BR')}`);
    
    // Profundidade extra (se aplicavel)
    if (depthPrice > 0) {
      reportItems.push(`Profundidade ${depth}m (extra) - R$ ${depthPrice.toLocaleString('pt-BR')}`);
    }
    
    // Motor (se selecionado)
    if (motorType && motorPrice > 0) {
      reportItems.push(`Motor Claw ${motorType}HP - R$ ${motorPrice.toLocaleString('pt-BR')}`);
    }
    
    // Adicionais individuais
    if (extras.motorCasa) {
      reportItems.push(`Instalacao Motor (Casa) - R$ ${PRICES.motorCasa[city].toLocaleString('pt-BR')}`);
    }
    if (extras.motorSobrado) {
      reportItems.push(`Instalacao Motor (Sobrado) - R$ ${PRICES.motorSobrado[city].toLocaleString('pt-BR')}`);
    }
    if (extras.filtro) {
      reportItems.push(`Filtro de Carvao - R$ ${PRICES.filtro[city].toLocaleString('pt-BR')}`);
    }
    if (extras.pressurizador) {
      reportItems.push(`Pressurizador - R$ ${PRICES.pressurizador[city].toLocaleString('pt-BR')}`);
    }
    if (extras.valvula) {
      reportItems.push(`Valvula de Retencao - R$ ${PRICES.valvula[city].toLocaleString('pt-BR')}`);
    }
    if (extras.refilFiltro) {
      reportItems.push(`Refil do Filtro - R$ ${PRICES.refilFiltro[city].toLocaleString('pt-BR')}`);
    }
    
    const addressSection = street || neighborhood || addressCity 
      ? `CEP: ${cep} | Rua: ${street} | Bairro: ${neighborhood} | Cidade: ${addressCity}`
      : "";

    const itemsText = reportItems.join(" | ");

    const text = `ORCAMENTO - LITORAL POCOS

Cliente: ${name}
Telefone: ${phone}
${addressSection ? `Endereco: ${addressSection}
` : ""}Servico: ${serviceLabel}
Cidade: ${cityLabel}${serviceType === "perfuracao" ? ` | Profundidade: ${depth}m` : ""}

Itens: ${itemsText}

TOTAL: R$ ${estimatedPrice.toLocaleString('pt-BR')}`;

    window.open(`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Atualiza o link de pagamento em tempo real conforme o valor muda
  useEffect(() => {
    const realLink = getPaymentLink(estimatedPrice);
    if (realLink) {
      setPaymentLink(realLink);
      // Se já estiver no método de link de pagamento, atualiza o QR Code
      if (paymentMethod === "paymentLink") {
        generateQRCode(realLink);
      }
    } else {
      setPaymentLink("");
      if (paymentMethod === "paymentLink") {
        setPaymentMethod(null);
        setQrCodeImage(null);
      }
    }
  }, [estimatedPrice]);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden h-96">
        {/* Carousel Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${HERO_IMAGES[carouselIndex].src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {HERO_IMAGES[carouselIndex].title}
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-md">
              {HERO_IMAGES[carouselIndex].description}
            </p>
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={handleCarouselPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all"
        >
          ←
        </button>
        <button
          onClick={handleCarouselNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all"
        >
          →
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCarouselIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === carouselIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Calculadora Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Calcule seu Orçamento
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Preencha os dados abaixo para receber um orçamento personalizado para seu serviço
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <Card className="overflow-hidden shadow-2xl border-0">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                {/* Coluna 1: Dados Pessoais */}
                <div className="p-8 bg-white space-y-4 border-r border-gray-100">
                  <CardTitle className="text-xl mb-4">Seus Dados</CardTitle>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome Completo</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(41) 9xxxx-xxxx"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">CEP</label>
                    <input
                      type="text"
                      value={cep}
                      onChange={handleCepChange}
                      placeholder="00000-000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {loadingCep && <p className="text-xs text-blue-600 mt-1">Buscando...</p>}
                    {cepError && <p className="text-xs text-red-600 mt-1">{cepError}</p>}
                  </div>

                  {street && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Rua</label>
                        <input
                          type="text"
                          value={street}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Bairro</label>
                        <input
                          type="text"
                          value={neighborhood}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Cidade</label>
                        <input
                          type="text"
                          value={addressCity}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Coluna 2: Serviço e Profundidade */}
                <div className="p-8 bg-white space-y-4 border-r border-gray-100">
                  <CardTitle className="text-xl mb-4">Serviço</CardTitle>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Serviço</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="perfuracao">Perfuração de Poço</option>
                      <option value="manutencao">Manutenção</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cidade</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="paranagua">Paranaguá</option>
                      <option value="pontal">Pontal do Paraná</option>
                      <option value="matinhos">Matinhos</option>
                      <option value="guaratuba">Guaratuba</option>
                    </select>
                  </div>

                  <AnimatePresence>
                    {serviceType === "perfuracao" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-medium mb-2">Profundidade: {depth}m</label>
                        <input
                          type="range"
                          min="6"
                          max="18"
                          value={depth}
                          onChange={(e) => setDepth(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>6m</span>
                          <span>12m</span>
                          <span>18m</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Coluna 3: Adicionais */}
                <div className="p-8 bg-white space-y-4 border-r border-gray-100">
                  <CardTitle className="text-xl mb-4">Adicionais</CardTitle>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => toggleExtra('motorCasa')}>
                      <Checkbox checked={extras.motorCasa} onCheckedChange={() => toggleExtra('motorCasa')} />
                      <div className="flex-grow min-w-0">
                        <p className="text-xs font-semibold">Instalação de Motor (Casa)</p>
                        <p className="text-xs text-gray-500">Mão de obra: R$ 500</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => toggleExtra('motorSobrado')}>
                      <Checkbox checked={extras.motorSobrado} onCheckedChange={() => toggleExtra('motorSobrado')} />
                      <div className="flex-grow min-w-0">
                        <p className="text-xs font-semibold">Instalação de Motor (Sobrado)</p>
                        <p className="text-xs text-gray-500">Mão de obra: R$ 600</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => toggleExtra('filtro')}>
                      <Checkbox checked={extras.filtro} onCheckedChange={() => toggleExtra('filtro')} />
                      <div className="flex-grow min-w-0">
                        <p className="text-xs font-semibold">Filtro de Carvão Ativado</p>
                        <p className="text-xs text-gray-500">R$ 250</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => toggleExtra('refilFiltro')}>
                      <Checkbox checked={extras.refilFiltro} onCheckedChange={() => toggleExtra('refilFiltro')} />
                      <div className="flex-grow min-w-0">
                        <p className="text-xs font-semibold">Refil do Filtro de Carvão Ativado</p>
                        <p className="text-xs text-gray-500">R$ 100</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => toggleExtra('pressurizador')}>
                      <Checkbox checked={extras.pressurizador} onCheckedChange={() => toggleExtra('pressurizador')} />
                      <div className="flex-grow min-w-0">
                        <p className="text-xs font-semibold">Pressurizador</p>
                        <p className="text-xs text-gray-500">R$ 650</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => toggleExtra('valvula')}>
                      <Checkbox checked={extras.valvula} onCheckedChange={() => toggleExtra('valvula')} />
                      <div className="flex-grow min-w-0">
                        <p className="text-xs font-semibold">Válvula de Retenção</p>
                        <p className="text-xs text-gray-500">R$ 150</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Motor Claw</p>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="motor"
                            value=""
                            checked={motorType === ""}
                            onChange={(e) => setMotorType(e.target.value)}
                            className="w-4 h-4"
                          />
                          <span className="text-xs font-semibold">Nenhum</span>
                        </label>
                        <label className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="motor"
                            value="0.5"
                            checked={motorType === "0.5"}
                            onChange={(e) => setMotorType(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div className="flex-grow min-w-0">
                            <p className="text-xs font-semibold">Motor 0,5HP</p>
                            <p className="text-xs text-gray-500">R$ 650 (1 ano)</p>
                          </div>
                        </label>
                        <label className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="motor"
                            value="0.8"
                            checked={motorType === "0.8"}
                            onChange={(e) => setMotorType(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div className="flex-grow min-w-0">
                            <p className="text-xs font-semibold">Motor 0,8HP</p>
                            <p className="text-xs text-gray-500">R$ 1.050 (2 anos)</p>
                          </div>
                        </label>
                        <label className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="motor"
                            value="1.5"
                            checked={motorType === "1.5"}
                            onChange={(e) => setMotorType(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div className="flex-grow min-w-0">
                            <p className="text-xs font-semibold">Motor 1,5HP</p>
                            <p className="text-xs text-gray-500">R$ 1.350 (2 anos)</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna 4: Total e Botão */}
                <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-between">
                  <div>
                    <CardTitle className="text-lg mb-6">Resumo do Orçamento</CardTitle>
                    
                    <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                      {/* Serviço Principal */}
                      <div className="flex justify-between text-sm bg-white p-2 rounded border border-blue-200">
                        <span className="text-gray-700 font-medium">
                          {serviceType === "perfuracao" ? "Perfuração de Poço" : "Manutenção"}
                        </span>
                        <span className="font-semibold text-blue-600">R$ {basePrice.toLocaleString('pt-BR')}</span>
                      </div>

                      {/* Profundidade Extra */}
                      {depthPrice > 0 && (
                        <div className="flex justify-between text-sm bg-white p-2 rounded border border-blue-200">
                          <span className="text-gray-700">Profundidade {depth}m (extra)</span>
                          <span className="font-semibold text-blue-600">R$ {depthPrice.toLocaleString('pt-BR')}</span>
                        </div>
                      )}

                      {/* Adicionais Individuais */}
                      {extras.motorCasa && (
                        <div className="flex justify-between text-sm bg-white p-2 rounded border border-blue-200">
                          <span className="text-gray-700">Instalação Motor (Casa)</span>
                          <span className="font-semibold text-blue-600">R$ {PRICES.motorCasa[city].toLocaleString('pt-BR')}</span>
                        </div>
                      )}
                      {extras.motorSobrado && (
                        <div className="flex justify-between text-sm bg-white p-2 rounded border border-blue-200">
                          <span className="text-gray-700">Instalação Motor (Sobrado)</span>
                          <span className="font-semibold text-blue-600">R$ {PRICES.motorSobrado[city].toLocaleString('pt-BR')}</span>
                        </div>
                      )}
                      {extras.filtro && (
                        <div className="flex justify-between text-sm bg-white p-2 rounded border border-blue-200">
                          <span className="text-gray-700">Filtro de Carvão</span>
                          <span className="font-semibold text-blue-600">R$ {PRICES.filtro[city].toLocaleString('pt-BR')}</span>
                        </div>
                      )}
                      {extras.pressurizador && (
                        <div className="flex justify-between text-sm bg-white p-2 rounded border border-blue-200">
                          <span className="text-gray-700">Pressurizador</span>
                          <span className="font-semibold text-blue-600">R$ {PRICES.pressurizador[city].toLocaleString('pt-BR')}</span>
                        </div>
                      )}
                      {extras.valvula && (
                        <div className="flex justify-between text-sm bg-white p-2 rounded border border-blue-200">
                          <span className="text-gray-700">Valvula de Retencao</span>
                          <span className="font-semibold text-blue-600">R$ {PRICES.valvula[city].toLocaleString('pt-BR')}</span>
                        </div>
                      )}
                      {motorType && motorPrice > 0 && (
                        <div className="flex justify-between text-sm bg-white p-2 rounded border border-blue-200">
                          <span className="text-gray-700">Motor Claw {motorType}HP</span>
                          <span className="font-semibold text-blue-600">R$ {motorPrice.toLocaleString('pt-BR')}</span>
                        </div>
                      )}
                      {extras.refilFiltro && (
                        <div className="flex justify-between text-sm bg-white p-2 rounded border border-blue-200">
                          <span className="text-gray-700">Refil do Filtro</span>
                          <span className="font-semibold text-blue-600">R$ {PRICES.refilFiltro[city].toLocaleString('pt-BR')}</span>
                        </div>
                      )}

                      {/* Total */}
                      <div className="border-t-2 border-blue-400 pt-3 mt-3 flex justify-between bg-white p-3 rounded-lg border border-blue-300 font-bold">
                        <span className="text-gray-800">Total:</span>
                        <span className="text-xl text-blue-600">
                          R$ {estimatedPrice.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
                    onClick={handleWhatsAppRedirect}
                  >
                    <Send className="w-5 h-5" />
                    Enviar via WhatsApp
                  </Button>

                  {/* Formas de Pagamento */}
                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-800 mb-3">💰 Formas de Pagamento:</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="creditCard"
                          checked={paymentMethod === "creditCard"}
                          onChange={() => handlePaymentMethodChange("creditCard")}
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">💳 Cartão de Crédito</span>
                      </label>
                      <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="debitCard"
                          checked={paymentMethod === "debitCard"}
                          onChange={() => handlePaymentMethodChange("debitCard")}
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">🏦 Cartão de Débito</span>
                      </label>
                      <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          onChange={() => handlePaymentMethodChange("cash")}
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">💵 Dinheiro</span>
                      </label>
                      <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="pix"
                          checked={paymentMethod === "pix"}
                          onChange={() => handlePaymentMethodChange("pix")}
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">📱 Pix</span>
                      </label>
                      {paymentLink && (
                        <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-green-300 bg-green-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paymentLink"
                            checked={paymentMethod === "paymentLink"}
                            onChange={() => handlePaymentMethodChange("paymentLink")}
                            className="w-4 h-4 accent-green-600"
                          />
                          <span className="text-sm font-semibold text-green-700">🔗 Link de Pagamento (Mercado Pago)</span>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Instruções para Pix (Sem QR Code) */}
                  {paymentMethod === "pix" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg text-center"
                    >
                      <p className="text-sm font-semibold text-blue-800 mb-3">📱 Pague via Pix agora:</p>
                      <p className="text-sm text-gray-700 font-bold">Chave Pix: 41984378485</p>
                      <p className="text-xs text-gray-600 mt-1 font-semibold uppercase">Litoral Pocos | Mercado Pago</p>
                      <p className="text-sm text-red-600 mt-3 font-bold">Insira o valor de R$ {estimatedPrice.toLocaleString('pt-BR')} ao pagar.</p>
                      <p className="text-xs text-gray-500 mt-2 italic">Escaneie o código no app do seu banco na opção de Pix.</p>
                    </motion.div>
                  )}

                  {/* QR Code para Link de Pagamento */}
                  {paymentMethod === "paymentLink" && qrCodeImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg text-center"
                    >
                      <p className="text-sm font-semibold text-green-800 mb-3">📲 Escaneie para Pagar:</p>
                      <img
                        src={qrCodeImage}
                        alt="QR Code de Pagamento"
                        className="w-40 h-40 mx-auto border-2 border-white rounded-lg shadow-md"
                      />
                      <p className="text-xs text-gray-600 mt-3">Escaneie o código com seu celular para acessar o link de pagamento seguro.</p>
                      <a
                        href={paymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        Ou clique aqui para pagar
                      </a>
                    </motion.div>
                  )}

                  {/* Confirmação de outros métodos */}
                  {paymentMethod && paymentMethod !== "paymentLink" && paymentMethod !== "pix" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg text-center"
                    >
                      <p className="text-sm font-semibold text-blue-800">✅ Forma de pagamento selecionada:</p>
                      <p className="text-xs text-gray-600 mt-2">
                        {paymentMethod === "creditCard" && "Cartão de Crédito - Será processado após confirmação do serviço"}
                        {paymentMethod === "debitCard" && "Cartão de Débito - Será processado após confirmação do serviço"}
                        {paymentMethod === "cash" && "Dinheiro - Pagamento no local do serviço"}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Clients Section */}
      <Clients />

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Nossa Equipe
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conheça os profissionais que garantem a qualidade e eficiência da Litoral Poços
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "Anthonnelly Pereira",
                role: "Gerente / Agendamentos",
                description: "Profissional dedicada ao atendimento ao cliente, garantindo agendamentos rápidos e eficientes.",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162349935/Ta6U9AEbNtVKunZEz79hdX/anthonnelly_pereira_scheduling_professional_v3_36507243.png",
                instagram: "anthonnelly.pereira"
              },
              {
                name: "Luiz Antonio",
                role: "Técnico Perfurador",
                description: "Especialista experiente em perfuração de poços semi-artesianos com técnica e precisão.",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162349935/Ta6U9AEbNtVKunZEz79hdX/luiz_antonio_technician_professional_v3_57b6e855.png",
                instagram: "luizin77wk"
              },
              {
                name: "Eliezer Júnior",
                role: "CEO & Fundador",
                description: "Líder visionário com mais de 10 anos de experiência em perfuração de poços e gestão de projetos.",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162349935/Ta6U9AEbNtVKunZEz79hdX/eliezer junior CEO_67f1e6a3.png",
                instagram: "junioreliezer_"
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-72 overflow-hidden bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {member.instagram && (
                    <a
                      href={`https://instagram.com/${member.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                      </svg>
                    </a>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wider">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Setor de Contatos
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Entre em contato conosco através dos números abaixo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Atendimento Principal",
                phone: "(41) 98437-8485",
                name: "Eliezer",
                icon: "📞"
              },
              {
                title: "Agendamentos",
                phone: "(41) 99867-0421",
                name: "Anthonnelly",
                icon: "📅"
              },
              {
                title: "Técnico Perfurador",
                phone: "(41) 95072-851",
                name: "Luiz Antonio",
                icon: "🔧"
              }
            ].map((contact, i) => (
              <motion.a
                key={i}
                href={`https://wa.me/55${contact.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                <p className="text-blue-600 font-bold text-lg mb-2">{contact.phone}</p>
                <p className="text-gray-600 text-sm">{contact.name}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
