/* HOVER FUNCTIONALITY FOR MOBILE */
document.addEventListener("touchstart", function () {}, true);

/* HAMBURGER MENU */
const navButton = document.querySelector(".mobile-nav-btn");
const headerElement = document.querySelector(".header");

navButton.addEventListener("click", function () {
	headerElement.classList.toggle("nav-open");
});

document.addEventListener('DOMContentLoaded', function() {
	var links = document.querySelectorAll('.nav-link');

	links.forEach(function(link) {
		link.addEventListener('click', function(event) {
			var targetId = this.getAttribute('href');

			// Vérifie si la cible est une section de la même page
			if (targetId.charAt(0) === '#' && targetId.length > 1) {
				event.preventDefault(); // Empêche le comportement par défaut du lien

				var targetElement = document.querySelector(targetId); // Sélectionne l'élément cible

				if (targetElement) {
					var offset = 110; // Ajuste la valeur d'offset selon tes besoins
					var targetPosition = targetElement.offsetTop - offset; // Calcule la position de la cible

					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth' // Permet un défilement fluide
					});
				}
			}
		});
	});
});
function openPopup(popupId) {
	// Fermer toutes les popups ouvertes
	closeAllPopups();

	// Ouvrir la popup spécifique
	document.getElementById(popupId).style.display = 'block';
}

function closeAllPopups() {
	// Trouver toutes les popups et les fermer
	var popups = document.querySelectorAll('.popup');
	popups.forEach(function(popup) {
		popup.style.display = 'none';
	});
}

function closePopup() {
	closeAllPopups();
}

const totalSlides = document.querySelectorAll('.carousel-slide').length;
const slidesPerGroup = 3;

document.querySelectorAll('.indicator').forEach((indicator, index) => {
	indicator.addEventListener('click', function() {
		// Calculer l'ID de la première slide du groupe correspondant
		var groupIndex = index * slidesPerGroup + 1;
		var slideId = 'slide' + groupIndex;
		var slideElement = document.getElementById(slideId);

		if (slideElement) {
			// Défiler vers le slide correspondant
			slideElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

			// Mettre à jour les indicateurs actifs
			updateActiveIndicator(index);
		}
	});
});

function updateActiveIndicator(activeIndex) {
	document.querySelectorAll('.indicator').forEach((ind, index) => {
		if (index === activeIndex) {
			ind.classList.add('active');
		} else {
			ind.classList.remove('active');
		}
	});
}

/* STICKY NAVIGATION */
const heroElement = document.querySelector(".section-hero");
const navObserver = new IntersectionObserver(
	function (entries) {
		const ent = entries[0];
		if (ent.isIntersecting === false) {
			document.body.classList.add("sticky");
		} else {
			document.body.classList.remove("sticky");
		}
	},
	{
		root: null,
		threshold: 0,
	}
);

navObserver.observe(heroElement);

/* SCROLL ANIMATE */
const appShots = document.querySelectorAll(".mobile-bg");
const scrollObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("animate-img");
		} else {
			entry.target.classList.remove("animate-img");
		}
	});
});

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
	const formData = new FormData(form);
	e.preventDefault();
	var object = {};
	formData.forEach((value, key) => {
		object[key] = value;
	});
	var json = JSON.stringify(object);
	result.innerHTML = "Please wait...";

	fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: json
	})
		.then(async (response) => {
			let json = await response.json();
			if (response.status == 200) {
				result.innerHTML = json.message;
				result.classList.remove("text-gray-500");
				result.classList.add("text-green-500");
			} else {
				console.log(response);
				result.innerHTML = json.message;
				result.classList.remove("text-gray-500");
				result.classList.add("text-red-500");
			}
		})
		.catch((error) => {
			console.log(error);
			result.innerHTML = "Something went wrong!";
		})
		.then(function () {
			form.reset();
			setTimeout(() => {
				result.style.display = "none";
			}, 5000);
		});
});
