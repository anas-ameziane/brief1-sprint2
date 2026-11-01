
import { voituresInitiales, sauvegarderVoitures } from './data.js';

const marque = document.getElementById("marque");
const modele = document.getElementById("modele");
const immatriculation = document.getElementById("immatriculation");
const categorie = document.getElementById("categorie");
const prixJour = document.getElementById("prix-jour");
const statut = document.getElementById("statut");

let listeActuelle = [...voituresInitiales];

const listeVoitures = document.querySelector("#liste-voitures");
listeVoitures.classList.add("liste-voitures");

const textrecherche = document.getElementById("recherche");
const choix = document.getElementById("tri-prix");

// Fonction principale d'affichage

function afficherTableVoiture(donnees = voituresInitiales) {
  listeVoitures.replaceChildren();

  if (donnees.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td colspan="7" style="text-align: center;">Aucune voiture ne correspond à votre recherche.</td>';
    listeVoitures.appendChild(tr);
    return;
  }

  donnees.forEach((voiture) => {
    const containerTable = document.createElement("tr");

    containerTable.addEventListener("mouseover", function () {
      containerTable.style.backgroundColor = "#dfdfdf";
    });

    containerTable.addEventListener("mouseout", function () {
      containerTable.style.backgroundColor = "";
    });

    const marque = document.createElement("td");
    const strong = document.createElement("strong");
    strong.textContent = voiture.marque;
    marque.appendChild(strong);

    const modele = document.createElement("td");
    modele.textContent = voiture.modele;

    const immatriculation = document.createElement("td");
    const span = document.createElement("span");
    span.classList.add("registration");
    span.textContent = voiture.immatriculation;
    immatriculation.appendChild(span);

    const categorie = document.createElement("td");
    categorie.textContent = voiture.categorie;

    const prixJour = document.createElement("td");
    prixJour.classList.add("price");
    prixJour.textContent = voiture.prixJour + " ";

    const text = document.createElement("span");
    text.textContent = "DH / jour";
    prixJour.appendChild(text);

    const statut = document.createElement("td");
    const spanone = document.createElement("span");
    spanone.classList.add("badge");

    if (voiture.statut === "Disponible") {
      spanone.classList.add("badge-disponible");
    } else if (voiture.statut === "Louée") {
      spanone.classList.add("badge-louee");
    } else if (voiture.statut === "En maintenance") {
      spanone.classList.add("badge-maintenance");
    }

    spanone.textContent = voiture.statut;
    statut.appendChild(spanone);

    const btns = document.createElement("td");
    const containerBtn = document.createElement("div");
    containerBtn.classList.add("row-actions");

    const btnModifier = document.createElement("button");
    btnModifier.classList.add("button", "button-edit");
    btnModifier.textContent = "Modifier";

    btnModifier.addEventListener("click", function () {
      carModifie(voiture.id);
    });

    const btnSupprimer = document.createElement("button");
    btnSupprimer.classList.add("button", "button-delete");
    btnSupprimer.textContent = "Supprimer";

    btnSupprimer.addEventListener("click", function () {
      supprimervoiture(voiture.id);
    });

    containerTable.appendChild(marque);
    containerTable.appendChild(modele);
    containerTable.appendChild(immatriculation);
    containerTable.appendChild(categorie);
    containerTable.appendChild(prixJour);
    containerTable.appendChild(statut);
    containerTable.appendChild(btns);

    btns.appendChild(containerBtn);
    containerBtn.appendChild(btnModifier);
    containerBtn.appendChild(btnSupprimer);

    listeVoitures.appendChild(containerTable);
  });
}

// Fonction d'ajout de voiture

let cont = Math.max(0, ...voituresInitiales.map(v => v.id)) + 1;

function ajouterProduit() {

  if (marque.value == "") {
    document.getElementById("marque").style.borderColor = "red";
    document.getElementById("message1").textContent = "Veuillez remplir le champ marque.";
    document.getElementById("message1").style.color = "red";
  }

  if (modele.value == "") {
    document.getElementById("modele").style.borderColor = "red";
    document.getElementById("message2").textContent = "Veuillez remplir le champ modele.";
    document.getElementById("message2").style.color = "red";
  }

  if (immatriculation.value == "") {
    document.getElementById("immatriculation").style.borderColor = "red";
    document.getElementById("message3").textContent = "Veuillez remplir le champ immatriculation.";
    document.getElementById("message3").style.color = "red";
  }

  if (categorie.value == "") {
    document.getElementById("categorie").style.borderColor = "red";
    document.getElementById("message4").textContent = "Veuillez remplir le champ categorie.";
    document.getElementById("message4").style.color = "red";
  }

  if (prixJour.value == "") {
    document.getElementById("prix-jour").style.borderColor = "red";
    document.getElementById("message5").textContent = "Veuillez remplir le champ prix-jour.";
    document.getElementById("message5").style.color = "red";
  }

  if (statut.value == "") {
    document.getElementById("statut").style.borderColor = "red";
    document.getElementById("message6").textContent = "Veuillez remplir le champ statut.";
    document.getElementById("message6").style.color = "red";
  }

  else if (
    marque.value &&
    modele.value &&
    immatriculation.value &&
    prixJour.value &&
    categorie.value &&
    statut.value
  ) {

    const nouvelleVoiture = {
      id: cont++,
      marque: marque.value,
      modele: modele.value,
      immatriculation: immatriculation.value,
      categorie: categorie.value,
      prixJour: Number(prixJour.value),
      statut: statut.value
    };

    if (idchecker !== 0) {

      const index = voituresInitiales.findIndex(v => v.id === idchecker);

      if (index !== -1) {
        voituresInitiales[index] = {
          ...nouvelleVoiture,
          id: idchecker
        };
      }

      idchecker = 0;
      button1.textContent = "Ajouter la voiture";
      document.getElementById("annuler-modification").hidden = true;

    } else {
      voituresInitiales.push(nouvelleVoiture);
    }

    // Sauvegarder dans localStorage
    sauvegarderVoitures();

    formulaire.reset();

    listeActuelle = [...voituresInitiales];
    recherchvoiture();
  }
}

const button = document.getElementById("bouton-enregistrer");

button.addEventListener("click", (event) => {
  event.preventDefault();
  ajouterProduit();
});

// Fonction de suppression

function supprimervoiture(id) {

  if (confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {

    const indexInitial = voituresInitiales.findIndex(v => v.id === id);

    if (indexInitial !== -1) {
      voituresInitiales.splice(indexInitial, 1);
    }

    // Sauvegarder après suppression
    sauvegarderVoitures();

    listeActuelle = listeActuelle.filter(v => v.id !== id);

    afficherTableVoiture(listeActuelle);
  }
}

// Fonction de tri

function tri() {

  const critere = choix.value;

  if (critere === "decroissant") {
    listeActuelle.sort((a, b) => b.prixJour - a.prixJour);
  } else if (critere === "croissant") {
    listeActuelle.sort((a, b) => a.prixJour - b.prixJour);
  } else {
    listeActuelle.sort((a, b) => a.id - b.id);
  }

  afficherTableVoiture(listeActuelle);
}

if (choix) {
  choix.addEventListener("change", tri);
}

const filtreStatut = document.getElementById("filtre-statut");
const filtreCategorie = document.getElementById("filtre-categorie");

const brand = document.getElementById("marque");
const model = document.getElementById("modele");
const registration = document.getElementById("immatriculation");
const category = document.getElementById("categorie");
const price = document.getElementById("prix-jour");
const status = document.getElementById("statut");

const button1 = document.getElementById('bouton-enregistrer');
const formulaire = document.getElementById("formulaire-voiture");

let idchecker = 0;

function carModifie(id) {

  idchecker = id;

  const found = voituresInitiales.find(item => item.id === id);

  if (!found) return;

  brand.value = found.marque;
  model.value = found.modele;
  registration.value = found.immatriculation;
  category.value = found.categorie;
  price.value = found.prixJour;
  status.value = found.statut;

  button1.textContent = "confirmer la modification";

  document.getElementById("annuler-modification").hidden = false;
}

// Annulation de modification

document.getElementById("annuler-modification").addEventListener("click", () => {

  formulaire.reset();

  idchecker = 0;

  button1.textContent = "Ajouter la voiture";

  document.getElementById("annuler-modification").hidden = true;
});

function recherchvoiture() {

  const searchTerm = textrecherche ? textrecherche.value.trim().toLowerCase() : "";

  const statutValue = filtreStatut ? filtreStatut.value : "";

  const categorieValue = filtreCategorie ? filtreCategorie.value : "";

  listeActuelle = voituresInitiales.filter(voiture => {

    const matchTexte = searchTerm === "" ||
      voiture.marque.toLowerCase().includes(searchTerm) ||
      voiture.modele.toLowerCase().includes(searchTerm) ||
      voiture.categorie.toLowerCase().includes(searchTerm) ||
      voiture.immatriculation.toLowerCase().includes(searchTerm);

    const matchStatut = statutValue === "" || voiture.statut === statutValue;

    const matchCategorie = categorieValue === "" || voiture.categorie === categorieValue;

    return matchTexte && matchStatut && matchCategorie;

  });

  afficherTableVoiture(listeActuelle);
}

if (textrecherche) {
  textrecherche.addEventListener("input", recherchvoiture);
}

if (filtreStatut) {
  filtreStatut.addEventListener("change", recherchvoiture);
}

if (filtreCategorie) {
  filtreCategorie.addEventListener("change", recherchvoiture);
}

afficherTableVoiture(voituresInitiales);
