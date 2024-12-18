export default function calcularExperienciaTotal(experienceEntries: { inicio: string; fin: string | null }[]) {
  let totalMonths = 0;

  console.log("Periodos de experiencia recibidos:", experienceEntries);

  experienceEntries.forEach(({ inicio, fin }) => {
    if (!inicio) {
      console.warn("Período sin fecha de inicio:", { inicio, fin });
      return;
    }

    const startDate = new Date(inicio);
    const endDate = fin ? new Date(fin) : new Date();

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.warn("Fechas inválidas detectadas:", { inicio, fin });
      return;
    }

    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    console.log(`Calculando meses: start=${inicio}, end=${fin}, months=${months}`);

    totalMonths += months > 0 ? months : 0;
  });

  const totalYears = Math.floor(totalMonths / 12);
  console.log(`Total meses: ${totalMonths}, Total años: ${totalYears}`);

  return totalYears;
}