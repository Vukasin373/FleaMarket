export class NotificationsAndBarter {
	constructor(user) {
		this.user = user;
	}

	draw(host) {
		const mainDiv1 = document.createElement("div");
		mainDiv1.className = "mainDiv1";
		host.appendChild(mainDiv1);
	}
}
