
export class MyProducts {
	constructor() {
		this.container = null;
	}

	draw(host) {
		this.container = document.createElement("div");
		this.container.className = "MyProducts";
		host.appendChild(this.container);

		const list = document.createElement("div");
		list.className = "ui relaxed divided list";
		this.container.appendChild(list);

		// pribavi produkte
		fetch(
			`https://localhost:7294/Business/Review/${this.username}&${this.businessName}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					review: inputReview.value,
					rating: rating,
					name: this.username,
				}),
			}
		)
			.then((p) => {
				if (p.ok) {
					const rightDiv3 = document.body.querySelector(".rightDiv3");
					while (rightDiv3.firstChild) {
						rightDiv3.removeChild(rightDiv3.lastChild);
					}
					this.drawRightDiv(rightDiv3);
				}
			})
			.finally();

		for (let i = 0; i < 10; i ++)
		{
			this.drawProductView(this.container);
		}
	}

	drawProductView(host)
	{
		const element = document.createElement("div");
		element.className = "item item3";
		host.appendChild(element);

		const image = document.createElement("img");
		image.className = "image img3";
		image.src = "./image.png";
		element.appendChild(image);

		const content = document.createElement("content");
		content.className = "content";
		element.appendChild(content);

		const name = document.createElement("div");
		name.innerHTML = "name3";
		name.className = "name3";
		content.appendChild(name);

		const span = document.createElement("div");
		span.innerHTML = "cena";
		content.appendChild(span);

		const button = document.createElement("button");
		button.className = "ui green right floated button b3";
		button.innerHTML = "Show details";
		content.appendChild(button);

		const icon = document.createElement("i");
		icon.className = "right chevron icon";
		button.appendChild(icon);

		const line = document.createElement("h");
		element.appendChild(line);
	}
}
