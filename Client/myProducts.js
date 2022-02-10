import { ProductView } from "./Entities/ProductView.js";

export class MyProducts {
	constructor() {
		this.container = null;
		this.pageNum = 1;
	}

	draw(host) {
		this.container = document.createElement("div");
		this.container.className = "MyProducts3";
		host.appendChild(this.container);

		const buttonBox = document.createElement("div");
		buttonBox.className = "buttonBox3";
		this.container.appendChild(buttonBox);

		const prevButton = document.createElement("button");
		prevButton.className = "mini ui green bottom attached button button3";
		prevButton.id = "prevButton3";
		prevButton.disabled = true;
		buttonBox.appendChild(prevButton);

		let icon = document.createElement("i");
		icon.className = "left chevron icon";
		prevButton.appendChild(icon);
		prevButton.innerHTML += "Previous";

		prevButton.onclick = () => {
			//pribavi produkte
			this.pageNum--;

			fetch("https://localhost:7085/FleaMarket/GetMyProducts/aca&" + this.pageNum).then((p) => {
				p.json().then((products) => {

					// otkljucati next dugme
					document.getElementById("myBtn3").disabled = false;
	
					// obrisati vec prikazane produkte
					this.container.removeChild(list);
	
					list = document.createElement("div");
					list.className = "ui relaxed list";
					this.container.appendChild(list);
	
	
					for (var p in products) {
						const product = new ProductView(
							p,
							products[p].name,
							products[p].price,
							products[p].username,
							products[p].product,
							products[p].tags,
							products[p].imgUrl
						);
						this.drawProductView(list, product);
					}

					console.log(this.pageNum);
	
					if (this.pageNum == 1)
					{
						document.getElementById("prevButton3").disabled = true;
					}
				});
			});
		};
		
		const nextButton = document.createElement("button");
		nextButton.className = "mini ui green bottom attached button";
		nextButton.id = "myBtn3";
		nextButton.innerHTML = "Next";
		buttonBox.appendChild(nextButton);

		icon = document.createElement("i");
		icon.className = "right chevron icon";
		nextButton.appendChild(icon);

		nextButton.onclick = () => 
		{
			this.pageNum++;

			// omoguciti prev dugme
			document.getElementById("prevButton3").disabled = false;

			// obrisati prikazane proizvode
			this.container.removeChild(list);

			list = document.createElement("div");
			list.className = "ui relaxed list";
			this.container.appendChild(list);	

			let num = 0;

			//pribavi produkte
			fetch("https://localhost:7085/FleaMarket/GetMyProducts/aca&" + this.pageNum).then((p) => {
				p.json().then((products) => {
					for (var p in products) {
						num++
						console.log(p);
						const product = new ProductView(
							p,
							products[p].name,
							products[p].price,
							products[p].username,
							products[p].product,
							products[p].tags,
							products[p].imgUrl
						);
						this.drawProductView(list, product);
					}

					if (num < 10)
						document.getElementById("myBtn3").disabled = true;
				});
			});
		};

		let list = document.createElement("div");
		list.className = "ui relaxed list";
		this.container.appendChild(list);	

		//pribavi produkte
		fetch("https://localhost:7085/FleaMarket/GetMyProducts/aca&1").then((p) => {
			p.json().then((products) => {
				for (var p in products) {
					//console.log(p);
					const product = new ProductView(
						p,
						products[p].name,
						products[p].price,
						products[p].username,
						products[p].product,
						products[p].tags,
						products[p].imgUrl
					);
					this.drawProductView(list, product);
				}
			});
		});

	};

	drawProductView(host, product) {

		const element = document.createElement("div");
		element.className = "item3";
		element.id = product.id;
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
		name.innerHTML = product.name;
		name.className = "name3";
		contentTopLeft.appendChild(name);

		const price = document.createElement("div");
		price.innerHTML = product.price;
		price.className = "name3";
		contentTopLeft.appendChild(price);

		const contentTopRight = document.createElement("div");
		contentTopRight.className = "contentTopRight3";
		contentTop.appendChild(contentTopRight);

		const deleteButton = document.createElement("button");
		deleteButton.className = "mini ui right floated red icon button";
		contentTopRight.appendChild(deleteButton);

		const trashIcon = document.createElement("i");
		trashIcon.className = "trash icon";
		deleteButton.appendChild(trashIcon);

		deleteButton.onclick = () => {
			fetch(
				`https://localhost:7085/FleaMarket/DeleteProduct/${product.id}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				}
			).then((p) => {
				// 
				alert("Uspesno ste obrisali proizvod sa nazivom: " + product.name);
				host.removeChild(element);
			});

		};

		const contentBottom = document.createElement("div");
		contentBottom.className = "contentBottom3";
		content.appendChild(contentBottom);

		const button = document.createElement("button");
		button.className = "mini ui green bottom attached button";
		button.innerHTML = "Show details";
		contentBottom.appendChild(button);

		button.onclick = () => {
			this.drawNewProductForm(host, product.product);
		};

		const icon = document.createElement("i");
		icon.className = "right chevron icon";
		button.appendChild(icon);
	};

	drawNewProductForm(host, productId)
	{
		const form = document.createElement("div");
		form.className = "form3";
		host.appendChild(form);

		// pribaviti proizvod
		console.log(productId);
		fetch("https://localhost:7085/FleaMarket/ProductDetails/" + productId).then((p) => {
				p.json().then((product) => {

					console.log(product);
				});
			});
		
	};
}
