import { voituresInitiales, sauvegarderVoitures } from './data.js';
 const liste_carte = document.getElementById("Liste_cartes");
// AFFICHAGE
function afficher(tableau) {

       liste_carte.innerHTML = "";

       tableau.forEach(element => {

              // CARTE
              const carte = document.createElement("label");

              carte.className = "group relative block shrink-0 snap-center w-[360px] h-[170px] cursor-pointer rounded-2xl border-2 border-[#ddd] bg-white px-5 pt-4 pb-6 transition-all duration-300 has-[:checked]:border-[#3b4fd8] has-[:checked]:bg-[#f6f7ff]";

              // INPUT RADIO
              const input = document.createElement("input");

              input.type = "radio";
              input.name = "car";
              input.value = element.id;
              input.className = "sr-only";

              // CERCLE
              const cercle = document.createElement("span");

              cercle.className = "absolute top-5 right-5 h-5 w-5 rounded-full border-2 border-[#ddd] bg-white transition-all duration-300 group-has-[:checked]:border-[6px] group-has-[:checked]:border-[#3b4fd8]";
              const categorie = document.createElement("span");
              categorie.className = "bg-blue-100 p-1 pr-4 rounded-[5px]";
              categorie.textContent = element.categorie;
              const h3 = document.createElement("p");
              h3.className = "block text-lg font-bold text-black mt-3";
              h3.textContent = `${element.marque} ${element.modele}`;
              const statut = document.createElement("h6");
              statut.className = "text-green-400";
              statut.textContent = element.statut;
              const prix = document.createElement("span");

              prix.className = "text-2xl";
              prix.textContent = element.prixJour + " MAD / jour";

              carte.append(input, categorie, cercle, h3, statut, prix);

              liste_carte.append(carte);

       });
}

// FLECHES DU CAROUSEL
const pas = 300; // largeur carte (280) + gap (20)
document.getElementById("car_prev").addEventListener("click", () => {
       liste_carte.scrollBy({ left: -pas, behavior: "smooth" });
});
document.getElementById("car_next").addEventListener("click", () => {
       liste_carte.scrollBy({ left: pas, behavior: "smooth" });
});
// VOITURES DISPONIBLES
function afficher_voiture() {

       const voitures_disponible = voituresInitiales.filter(function (v) {
              return v.statut === "Disponible";
       });

       afficher(voitures_disponible);

       console.log(voitures_disponible);
}

afficher_voiture();


// SELECTION VOITURE

liste_carte.addEventListener("change", function (e) {

       if (e.target.type === "radio") {

              const voitureSelectionnee = voituresInitiales.find(function (v) {
                     return v.id == e.target.value;
              });

              document.querySelector(".nom_voitur").textContent =
                     voitureSelectionnee.marque + " " + voitureSelectionnee.modele;

       }

});
// ====== RECAPITULATIF ======
let voitureSelectionnee = null;
const inputDebut = document.getElementById("date_depart");
const inputFin = document.getElementById("date_fin");

const get = (id) => document.getElementById(id);

function formatDates(d1, d2) {
       const optMois = { month: "long" };
       const mois1 = d1.toLocaleDateString("fr-FR", optMois);
       const mois2 = d2.toLocaleDateString("fr-FR", optMois);

       if (mois1 === mois2 && d1.getFullYear() === d2.getFullYear()) {
              return `${d1.getDate()} → ${d2.getDate()} ${mois2} ${d2.getFullYear()}`;
       }
       const opt = { day: "numeric", month: "long", year: "numeric" };
       return `${d1.toLocaleDateString("fr-FR", opt)} → ${d2.toLocaleDateString("fr-FR", opt)}`;
}

function mettreAJourRecap() {

       // Voiture
       if (!voitureSelectionnee) return;

       const v = voitureSelectionnee;
       document.querySelector(".nom_voitur").textContent = `${v.marque} ${v.modele}`;
       get("loc_infos").textContent = `${v.categorie} · ${v.prixJour} MAD / jour`;

       // Dates
       if (!inputDebut.value || !inputFin.value) {
              get("loc_dates").textContent = "Choisissez vos dates";
              get("loc_jours").textContent = "";
              get("loc_vehicule_label").textContent = "Véhicule";
              get("loc_vehicule_montant").textContent = "";
              get("loc_total").textContent = "0 MAD";
              return;
       }

       const d1 = new Date(inputDebut.value + "T00:00:00");
       const d2 = new Date(inputFin.value + "T00:00:00");

       if (d2 < d1) {
              get("loc_dates").textContent = "Dates invalides";
              get("loc_jours").textContent = "La date de fin doit être après la date de début";
              get("loc_vehicule_montant").textContent = "";
              get("loc_total").textContent = "0 MAD";
              return;
       }

       const jours = Math.round((d2 - d1) / 86400000) + 1; // dates incluses
       const montant = jours * v.prixJour;

       get("loc_dates").textContent = formatDates(d1, d2);
       get("loc_jours").textContent = `${jours} jour${jours > 1 ? "s" : ""} · dates incluses`;
       get("loc_vehicule_label").textContent = `Véhicule · ${jours} × ${v.prixJour} MAD`;
       get("loc_vehicule_montant").textContent = `${montant} MAD`;
       get("loc_recup").textContent = "Gratuite";
       get("loc_total").textContent = `${montant} MAD`;
}

// SELECTION VOITURE
liste_carte.addEventListener("change", function (e) {
       if (e.target.type === "radio") {
              voitureSelectionnee = voituresInitiales.find(v => v.id == e.target.value);
              mettreAJourRecap();
       }
});

// CHANGEMENT DE DATES
inputDebut.addEventListener("change", mettreAJourRecap);
inputFin.addEventListener("change", mettreAJourRecap);