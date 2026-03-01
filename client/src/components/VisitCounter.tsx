export default function VisitCounter() {
  // Exibir valor padrão imediatamente
  const defaultVisits = 5710;

  return (
    <div className="text-xs text-blue-100 flex items-center gap-1 whitespace-nowrap">
      <span>👁️</span>
      <span>Visitas: {defaultVisits.toLocaleString('pt-BR')}</span>
    </div>
  );
}
