/* HOVER FUNCTIONALITY FOR MOBILE */
document.addEventListener("touchstart", function () {}, true);

/* HAMBURGER MENU */
const navButton = document.querySelector(".mobile-nav-btn");
const headerElement = document.querySelector(".header");

navButton.addEventListener("click", function () {
	headerElement.classList.toggle("nav-open");
});

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
		rootMargin: "-80px",
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
