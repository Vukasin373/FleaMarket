import { Product } from "./Entities/Product.js";
import { ProductView } from "./Entities/ProductView.js";

export class MyProducts {
	constructor() {
		this.container = null;
		this.pageNum = 1;
	};

	draw(host) {
		this.container = document.createElement("div");
		this.container.className = "MyProducts3";
		host.appendChild(this.container);

		let leftSide = document.createElement("div");
		leftSide.className = "leftSide3";
		this.container.appendChild(leftSide);

		const buttonBox = document.createElement("div");
		buttonBox.className = "buttonBox3";
		leftSide.appendChild(buttonBox);

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
					leftSide.removeChild(list);
	
					list = document.createElement("div");
					list.className = "ui relaxed list";
					leftSide.appendChild(list);
	
	
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
						this.drawProductView(list, product,  this.container);
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
			leftSide.removeChild(list);

			list = document.createElement("div");
			list.className = "ui relaxed list";
			leftSide.appendChild(list);	

			let num = 0;

			//pribavi produkte
			fetch("https://localhost:7085/FleaMarket/GetMyProducts/aca&" + this.pageNum).then((p) => {
				p.json().then((products) => {
					for (var p in products) {
						num++
						// console.log(p);
						const product = new ProductView(
							p,
							products[p].name,
							products[p].price,
							products[p].username,
							products[p].product,
							products[p].tags,
							products[p].imgUrl
						);
						this.drawProductView(list, product, this.container);
					}

					if (num < 10)
						document.getElementById("myBtn3").disabled = true;
				});
			});
		};

		

		let list = document.createElement("div");
		list.className = "ui relaxed list";
		leftSide.appendChild(list);	

		let count = 0;

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
					count++;
					this.drawProductView(list, product, this.container);
					//console.log(product);
				}
				if(count < 10)
				{
					document.getElementById("myBtn3").disabled = true;
				}
			});
		});

	};

	drawProductView(host, product, container) {

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
			const form = document.createElement("div");
			form.className = "form3";
			container.appendChild(form);

			fetch("https://localhost:7085/FleaMarket/GetProductDetails/" + product.product).then((p) => {
				p.json().then((product) => {
					let prod = new Product(
						product._id,
						product.imgUrl,
						product.price,
						product.description,
						product.name,
						product.tags,
						product.customAttributes
						);
						
						//console.log(product);
						this.drawNewProductForm(form, product);
				});
			});
		};

		const icon = document.createElement("i");
		icon.className = "right chevron icon";
		button.appendChild(icon);
	};

	drawNewProductForm(host, product)
	{
		const upper = document.createElement("div");
		upper.className = "upper3";
		host.appendChild(upper);

		const upperLeft = document.createElement("div");
		upperLeft.className = "upperLeft3";
		upper.appendChild(upperLeft);

		const image = document.createElement("img");
		image.className = "formImage3";
		image.src = "./image.png";
		upperLeft.appendChild(image);

		const upperRight = document.createElement("div");
		upperRight.className = "upperRight3";
		upper.appendChild(upperRight);

		this.drawFormElement(upperRight, "Name: ", "text", "name", product.name);
    	this.drawFormElement(upperRight, "Price: ", "number", "price", product.price);
    	this.drawFormElement(upperRight, "Image Url: ", "text", "image", product.img);

		const elContainer = document.createElement("div");
		elContainer.className = "ui input focus elContainer3";
		upperRight.appendChild(elContainer);
	
		const label = document.createElement("label");
		label.className = "label3";
		label.innerHTML = "Description: ";
		elContainer.appendChild(label);
    	
		const description = document.createElement("textarea");
		description.value = product.description;
		description.rows = 5;
		description.className = "description3";
		elContainer.appendChild(description);

		const lower = document.createElement("div");
		lower.className = "lower3";
		host.appendChild(lower);

		const customAttributes = document.createElement("div");
		customAttributes.className = "customAttributes3";
		lower.appendChild(customAttributes);

		// console.log(product.customAttributes);
		// console.log(product.customAttributes.length);

		for(let i = 0; i < product.customAttributes.length; i++)
		{
			this.drawCustomAttribute(customAttributes, product.customAttributes[i]);
		}

		const tags = document.createElement("div");
		tags.className = "tags3";
		lower.appendChild(tags);

		

	};

	drawFormElement(host, lblText, type, className, initial) {
		const elContainer = document.createElement("div");
		elContainer.className = "ui input focus elContainer3";
		host.appendChild(elContainer);
	
		const label = document.createElement("label");
		label.className = "label3";
		label.innerHTML = lblText;
		elContainer.appendChild(label);
	
		const el = document.createElement("input");
		el.type = type;
		el.value = initial;
		elContainer.appendChild(el);
	  }


	drawCustomAttribute(host, attribute)
	{
		console.log(attribute.name);
		console.log(attribute.value);

		const elContainer = document.createElement("div");
		elContainer.className = "ui input focus elContainer3";
		host.appendChild(elContainer);
	
		const label = document.createElement("label");
		label.className = "label3";
		label.innerHTML = lblText;
		elContainer.appendChild(label);
	
		const el = document.createElement("input");
		el.type = type;
		el.value = initial;
		elContainer.appendChild(el);
	}
}