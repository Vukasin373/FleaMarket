import { Profile } from "./profile.js";
import { MyProducts } from "./myProducts.js";
import { BuyProducts } from "./buyProducts.js";
import { NotificationsAndBarter } from "./notificationsAndBarter.js";
import { Start } from "./start.js";

export class Hub {
	constructor(user) {
		this.container = null;
		this.user = user;
		this.currentButton = null;
		this.currentPage = null;
	}

	draw(host) {
		this.container = document.createElement("div");
		this.container.className = "HubMain";
		host.appendChild(this.container);

		const navBar = document.createElement("div");
		navBar.className = "navBar ui five item inverted green menu";
		this.container.appendChild(navBar);

		const profileButton = document.createElement("a");
		profileButton.className = "item";
		profileButton.innerText = "Profile";
		navBar.appendChild(profileButton);
		profileButton.onclick = () => {
			this.currentButton.classList.remove("active");
			this.currentButton = profileButton;
			profileButton.classList.add("active");

			this.container.removeChild(this.currentPage.firstChild);
			let profile = new Profile();
			profile.draw(this.currentPage);
		};

		const myProductsButton = document.createElement("a");
		myProductsButton.className = "item";
		myProductsButton.innerText = "My products";
		navBar.appendChild(myProductsButton);
		myProductsButton.onclick = () => {
			this.currentButton.classList.remove("active");
			this.currentButton = myProductsButton;
			myProductsButton.classList.add("active");

			this.container.removeChild(this.currentPage.firstChild);
			let myProducts = new MyProducts();
			myProducts.draw(this.currentPage);
		};

		const buyProductsButton = document.createElement("a");
		buyProductsButton.className = "item active";
		buyProductsButton.innerText = "Buy products";
		navBar.appendChild(buyProductsButton);
		buyProductsButton.onclick = () => {
			this.currentButton.classList.remove("active");
			this.currentButton = buyProductsButton;
			buyProductsButton.classList.add("active");

			this.container.removeChild(this.currentPage.firstChild);
			let buyProducts = new BuyProducts();
			buyProducts.draw(this.currentPage);
		};

		const notifButton = document.createElement("a");
		notifButton.className = "item";
		notifButton.innerText = "Notifications and barter";
		navBar.appendChild(notifButton);
		notifButton.onclick = () => {
			this.currentButton.classList.remove("active");
			this.currentButton = notifButton;
			notifButton.classList.add("active");

			this.container.removeChild(this.currentPage.firstChild);
			let notificationsAndBarter = new NotificationsAndBarter();
			notificationsAndBarter.draw(this.currentPage);
		};

		const logOutButton = document.createElement("a");
		logOutButton.className = "item";
		logOutButton.innerText = "Logout";
		logOutButton.style.backgroundColor = "#c80000";
		navBar.appendChild(logOutButton);
		logOutButton.onclick = () => {
			this.currentButton.classList.remove("active");
			this.currentButton = logOutButton;
			logOutButton.classList.add("active");

			document.body.removeChild(this.container);
			let start = new Start();
			start.draw(document.body);
		};

		const hubBottom = document.createElement("div");
		hubBottom.className = "hubBottom";
		this.container.appendChild(hubBottom);
		this.currentPage = hubBottom;

		//sta je otvoreno na pocetku
		this.currentButton = myProductsButton;
		let myProducts = new MyProducts();
		myProducts.draw(hubBottom);
	}
}
