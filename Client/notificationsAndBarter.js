import { Notification } from "./Entities/Notification.js";

export class NotificationsAndBarter {
	constructor(user) {
		this.user = user;
	}

	draw(host) {
		const mainDiv1 = document.createElement("div");
		mainDiv1.className = "mainDiv1";
		host.appendChild(mainDiv1);

		const notifList = document.createElement("div");
		notifList.className = "notifDiv1";
		mainDiv1.appendChild(notifList);

		fetch(
			`https://localhost:7085/FleaMarket/GetNotifications/${this.user.username}`
		).then((p) => {
			p.json().then((products) => {
				console.log(products);
			});
		});
	}
}
