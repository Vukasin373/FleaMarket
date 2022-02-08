
export class MyProducts {
	constructor() {
		this.container = null;
	}

	draw(host) {
		this.container = document.createElement("div");
		this.container.className = "MyProducts";
		host.appendChild(this.container);

		const list = document.createElement("div");
		list.className = "ui relaxed list";
		this.container.appendChild(list);

		// pribavi produkte
		// fetch(
		// 	`https://localhost:7294/Business/Review/${this.username}&${this.businessName}`,
		// 	{
		// 		method: "POST",
		// 		headers: { "Content-Type": "application/json" },
		// 		body: JSON.stringify({
		// 			review: inputReview.value,
		// 			rating: rating,
		// 			name: this.username,
		// 		}),
		// 	}
		// )
		// 	.then((p) => {
		// 		if (p.ok) {
		// 			const rightDiv3 = document.body.querySelector(".rightDiv3");
		// 			while (rightDiv3.firstChild) {
		// 				rightDiv3.removeChild(rightDiv3.lastChild);
		// 			}
		// 			this.drawRightDiv(rightDiv3);
		// 		}
		// 	})
		// 	.finally();

		for (let i = 0; i < 10; i ++)
		{
			this.drawProductView(list);
		}
	}

	drawProductView(host)
	{
		const element = document.createElement("div");
		element.className = "item3";
		host.appendChild(element);

		const image = document.createElement("img");
		image.className = "image img3";
		image.src = "./image.png";
		element.appendChild(image);

		const content = document.createElement("content");
		content.className = "content content3";
		element.appendChild(content);

		const contentTop = document.createElement("div");
		contentTop.className = "contentTop3";
		content.appendChild(contentTop);

		const contentTopLeft = document.createElement("div");
		contentTopLeft.className = "contentTopLeft3";
		contentTop.appendChild(contentTopLeft);

		const name = document.createElement("div");
		name.innerHTML = "name3name3name3name3name3";
		name.className = "name3";
		contentTopLeft.appendChild(name);

		const price = document.createElement("div");
		price.innerHTML = "price";
		contentTopLeft.appendChild(price);

		const contentTopRight = document.createElement("div");
		contentTopRight.className = "contentTopRight3";
		contentTop.appendChild(contentTopRight);

		const deleteButton = document.createElement("button");
		deleteButton.className = "ui red icon button";
		contentTopRight.appendChild(deleteButton);

		const trashIcon = document.createElement("i");
		trashIcon.className = "trash icon";
		deleteButton.appendChild(trashIcon);

		const contentBottom = document.createElement("div");
		contentBottom.className = "contentBottom3";
		content.appendChild(contentBottom);

		const button = document.createElement("button");
		button.className = "ui green bottom attached button";
		button.innerHTML = "Show details";
		contentBottom.appendChild(button);

		const icon = document.createElement("i");
		icon.className = "right chevron icon";
		button.appendChild(icon);

		const line = document.createElement("h");
		element.appendChild(line);
	}
}
