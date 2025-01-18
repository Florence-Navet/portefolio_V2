// === VARIABLES GLOBALES ===
const coverRight = document.querySelector(".cover.cover-right"); // Couverture droite
const pageLeft = document.querySelector(".book-page.page-left"); // Page de profil (gauche)
const pages = document.querySelectorAll(".book-page"); // Toutes les pages
const pageTurnBtn = document.querySelectorAll(".nextprev-btn"); // Boutons de navigation

let totalPages = pages.length; // Nombre total de pages
let pageNumber = 0; // Page active (index)

// === FONCTIONS ===

// Fonction : Ajout ou retrait des gestionnaires d'événements de clic
function toggleEventListeners() {
  pageTurnBtn.forEach((btn, index) => {
    btn.onclick = () => {
      const pageTurnId = btn.getAttribute("data-page"); // ID de la page cible
      const pageTurn = document.getElementById(pageTurnId); // Page cible

      if (pageTurn.classList.contains("turn")) {
        // Si la page est tournée, la retourner
        pageTurn.classList.remove("turn");
        setTimeout(() => (pageTurn.style.zIndex = 20 - index), 500);
      } else {
        // Sinon, la tourner
        pageTurn.classList.add("turn");
        setTimeout(() => (pageTurn.style.zIndex = 20 + index), 500);
      }
    };
  });
}

// Fonction : Gère l'index inversé pour revenir en arrière
function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0) {
    pageNumber = totalPages - 1;
  }
}

// Fonction : Animation d'ouverture automatique au chargement
function autoOpenAnimation() {
  // Réinitialiser l'état des pages (enlever la classe "turn" et remettre un zIndex de base)
  pages.forEach((page, index) => {
    page.classList.remove("turn"); // Enlever toute page tournée
    page.style.zIndex = 10 + index; // Initialiser les zIndex de base
  });

  // Ouvre la couverture droite après un délai
  setTimeout(() => {
    coverRight.classList.add("turn"); // Ouvre la couverture droite
  }, 2100);

  // Masque la couverture après un autre délai
  setTimeout(() => {
    coverRight.style.zIndex = -1; // Masque la couverture
  }, 2800);

  // Met la page gauche devant après un délai
  setTimeout(() => {
    pageLeft.style.zIndex = 20; // Met la page gauche devant
  }, 3200);

  // Animation progressive des pages droites (ajustement du zIndex pour chaque page)
  pages.forEach((page, index) => {
    setTimeout(() => {
      page.classList.add("turn"); // Tourne la page

      setTimeout(() => {
        page.style.zIndex = 100 + index; // Ajuste dynamiquement le zIndex pour chaque page tournée
      }, 500);
    }, (index + 1) * 200 + 2100);
  });
}

// Fonction pour gérer le changement de feuille de style
function switchStylesheet() {
  const viewportWidth = window.innerWidth; // Récupère la largeur de l'écran
  const pcStylesheet = document.querySelector("link[href='./style.css']"); // Style pour PC
  const mobileStylesheet = document.querySelector("link[href='./mobile.css']"); // Style pour Mobile

  // Active/Désactive les styles en fonction de la largeur de l'écran
  if (viewportWidth > 800) {
    pcStylesheet.disabled = false;
    mobileStylesheet.disabled = true;
  } else {
    pcStylesheet.disabled = true;
    mobileStylesheet.disabled = false;
  }
}

// === INITIALISATION ===

// Active les gestionnaires d'événements au chargement
toggleEventListeners();

// Lance l'animation d'ouverture
autoOpenAnimation();

// Définition d'un effet d'animation pour changer la feuille de style
window.addEventListener("resize", switchStylesheet);
switchStylesheet();
