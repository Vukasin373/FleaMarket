import { Notification } from "./Entities/Notification.js";

export class NotificationsAndBarter {
	constructor(user) {
		this.user = user;
		this.notifs = null;
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
				for (const item in products) {
					const notif = document.createElement("div");
					notif.className = "notif1 ui raised segment";
					notif.style.width = "75%";
					notifList.appendChild(notif);
					const notification = new Notification(
						item,
						products[item].username,
						products[item].firstName,
						products[item].lastName,
						products[item].productName,
						products[item].productId,
						products[item].price,
						products[item].barter
					);

					const notificationContent = document.createElement("div");
					notificationContent.className = "notificationContent1";
					notif.appendChild(notificationContent);

					if (notification.barter) {
						notificationContent.innerHTML = `User ${notification.firstName}  ${notification.lastName} is offering to buy your ${notification.productName} for ${notification.price}$. Do you accept?`;
						const buttons = document.createElement("div");
						buttons.className = "notificationsButtons1";
						notif.appendChild(buttons);

						const button1 = document.createElement("button");
						button1.className = "ui button green";
						button1.innerHTML = "Accept";
						buttons.appendChild(button1);
						button1.onclick = () => {};

						const button2 = document.createElement("button");
						button2.className = "ui button red";
						button2.innerHTML = "Reject";
						buttons.appendChild(button2);
						button2.onclick = () => {};
					} else {
						if (notification.username == "Accepted")
							notificationContent.innerHTML = `User ${notification.firstName}  ${notification.lastName} has accpeted your offer to buy ${notification.productName} for ${notification.price}$.`;
						else
							notificationContent.innerHTML = `User ${notification.firstName}  ${notification.lastName} has declined your offer to buy ${notification.productName} for ${notification.price}$.`;
					}
				}
			});
		});
	}
}
