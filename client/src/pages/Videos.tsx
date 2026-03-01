import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    title: "Perfuração de Poço",
    category: "perfuracao",
    url: "/videos/video_1.mp4",
    thumbnail: "🔨"
  },
  {
    id: 2,
    title: "Manutenção de Poço",
    category: "manutencao",
    url: "/videos/video_2.mp4",
    thumbnail: "🔧"
  },
  {
    id: 3,
    title: "Instalação de Motor",
    category: "instalacao",
    url: "/videos/video_3.mp4",
    thumbnail: "⚙️"
  },
  {
    id: 4,
    title: "Serviço em Paranaguá",
    category: "perfuracao",
    url: "/videos/video_4.mp4",
    thumbnail: "🌊"
  },
  {
    id: 5,
    title: "Técnica de Perfuração",
    category: "perfuracao",
    url: "/videos/video_5.mp4",
    thumbnail: "🎯"
  },
  {
    id: 6,
    title: "Filtro de Água",
    category: "manutencao",
    url: "/videos/video_6.mp4",
    thumbnail: "💧"
  },
  {
    id: 7,
    title: "Poço Artesiano",
    category: "instalacao",
    url: "/videos/video_7.mp4",
    thumbnail: "💦"
  },
  {
    id: 8,
    title: "Qualidade da Água",
    category: "manutencao",
    url: "/videos/video_8.mp4",
    thumbnail: "✨"
  },
  {
    id: 9,
    title: "Serviço Rápido",
    category: "perfuracao",
    url: "/videos/video_9.mp4",
    thumbnail: "⚡"
  },
  {
    id: 10,
    title: "Depoimento Cliente",
    category: "instalacao",
    url: "/videos/video_10.mp4",
    thumbnail: "👍"
  }
];

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);

  const filteredVideos = selectedCategory === "todos"
    ? VIDEOS
    : VIDEOS.filter(v => v.category === selectedCategory);

  const categories = [
    { id: "todos", label: "Todos" },
    { id: "perfuracao", label: "Perfuração" },
    { id: "manutencao", label: "Manutenção" },
    { id: "instalacao", label: "Instalação" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Nossos Vídeos
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conheça nossos serviços através de vídeos demonstrativos de qualidade
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid de Vídeos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {video.thumbnail}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {video.category === "perfuracao" && "Perfuração"}
                  {video.category === "manutencao" && "Manutenção"}
                  {video.category === "instalacao" && "Instalação"}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal de Vídeo */}
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="bg-white rounded-xl overflow-hidden max-w-2xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black aspect-video flex items-center justify-center">
                <video
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedVideo.title}
                </h2>
                <p className="text-gray-600">
                  Veja este vídeo demonstrativo de nossos serviços de qualidade
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
