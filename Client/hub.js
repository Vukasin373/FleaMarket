import { Profile } from "./profile.js";
import { MyProducts } from "./myProducts.js";
import { BuyProducts } from "./buyProducts.js";
import { NotificationsAndBarter } from "./notificationsAndBarter.js";
import { User } from "./Entities/User.js";

export class Hub {
	constructor(user) {
		this.container = null;
		this.username = null;
		this.user = user;
		this.current = null;
	}

	draw(host) {
		this.container = document.createElement("div");
		this.container.className = "HubMain";
		host.appendChild(this.container);

		const navBar = document.createElement("div");
		navBar.className = "navBar";
		this.container.appendChild(navBar);

		const hubBottom = document.createElement("div");
		hubBottom.className = "hubBottom";
		this.container.appendChild(hubBottom);

		let profile = new Profile();

		let myProducts = new MyProducts();
		let buyProducts = new BuyProducts();
		let notificationsAndBarter = new NotificationsAndBarter();

		// while (rightDiv3.firstChild) {
		//     rightDiv3.removeChild(rightDiv3.lastChild);
		// }

		profile.draw(hubBottom, this.user);
	}
}
