import { voituresInitiales } from './data.js';
let cars = [...voituresInitiales];
const savedCars = localStorage.getItem("cars");
if (savedCars) {
    cars = JSON.parse(savedCars);
} else {
    localStorage.setItem("cars", JSON.stringify(cars));
}

// dashboard
const tot = cars.length;
const disp = cars.filter(item => item.statut === "Disponible").length;
const lou = cars.filter(item => item.statut === "Louée").length;
const en_main = cars.filter(item => item.statut === "En maintenance").length;
const Total = document.getElementById("Total")
Total.textContent = tot
const disponibles = document.getElementById("disponibles")
disponibles.textContent = disp
const louees = document.getElementById("louees")
louees.textContent = lou
const en_maintenance = document.getElementById("en_maintenance")
en_maintenance.textContent = en_main
const disponibles_percentage = document.getElementById("disponibles-percentage")
const louees_percentage = document.getElementById("louees-percentage")
const maintenance_percentage = document.getElementById("maintenance-percentage")
const percentage = count => tot === 0 ? 0 : (100 * count) / tot;
disponibles_percentage.style.width = `${percentage(disp)}%`;
louees_percentage.style.width = `${percentage(lou)}%`;
maintenance_percentage.style.width = `${percentage(en_main)}%`;

const xValues = ["Disponibles", "Louées", "En Maintenance"];
const yValues = [disp, lou, en_main];
const barColors = [
  "#9ffff9",
  "#00aba9",
  "#2F4F4F"
];

new Chart(document.getElementById("myChart"), {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Statistiques des voitures"
    }
  }
});