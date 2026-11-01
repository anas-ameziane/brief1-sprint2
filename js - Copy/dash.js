
function afficherDashboard() {

    // Récupérer les voitures depuis localStorage
    const voitures = JSON.parse(localStorage.getItem("voitures")) || [];

    // Calculer les statistiques
    const total = voitures.length;

    const disponibles = voitures.filter(
        voiture => voiture.statut === "Disponible"
    ).length;

    const louees = voitures.filter(
        voiture => voiture.statut === "Louée"
    ).length;

    const maintenance = voitures.filter(
        voiture => voiture.statut === "En maintenance"
    ).length;

    // Afficher les statistiques
    document.getElementById("Total").textContent = total;

    document.getElementById("disponibles").textContent = disponibles;

    document.getElementById("louees").textContent = louees;

    document.getElementById("en_maintenance").textContent = maintenance;

    // Calculer les pourcentages
    const pourcentageDisponible = total ? (disponibles / total) * 100 : 0;
    const pourcentageLouees = total ? (louees / total) * 100 : 0;
    const pourcentageMaintenance = total ? (maintenance / total) * 100 : 0;

    // Afficher les barres de progression
    document.getElementById("disponibles-percentage").style.width =
        pourcentageDisponible + "%";

    document.getElementById("louees-percentage").style.width =
        pourcentageLouees + "%";

    document.getElementById("maintenance-percentage").style.width =
        pourcentageMaintenance + "%";

    // Graphique Chart.js
    const ctx = document.getElementById("myChart");

    if (window.monGraphique) {
        window.monGraphique.destroy();
    }

    window.monGraphique = new Chart(ctx, {
        type: "pie",

        data: {
            labels: ["Disponibles", "Louées", "En Maintenance"],

            datasets: [{
                data: [disponibles, louees, maintenance],

                backgroundColor: [
                    "#a5f3fc",
                    "#45aaa9",
                    "#354f50"
                ],

                borderColor: "#ffffff",
                borderWidth: 2
            }]
        },

        options: {
            responsive: true,

            title: {
                display: true,
                text: "Statistiques des voitures"
            },

            legend: {
                display: true,
                position: "top"
            }
        }
    });
}

// Afficher le dashboard
afficherDashboard();

// Actualiser si les données changent dans un autre onglet
window.addEventListener("storage", afficherDashboard);
