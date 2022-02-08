import { Hub } from "./hub.js";

export class Start {
	constructor() {
		this.container = null;
		this.username = null;
	}

	draw(host) {
		let hub = new Hub();
		hub.draw(host);
	}
}
