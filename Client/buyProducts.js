import { ProductView } from "./Entities/ProductView.js";

export class BuyProducts {
	constructor(user) {
		this.container = null;
		this.user = user;
	}

	draw(host) {
		while (host.firstChild) {
			host.removeChild(host.lastChild);
		}

		this.container = document.createElement("div");
		this.container.className = "buyProducts2";
		host.appendChild(this.container);

		const leftDiv = document.createElement("div");
		leftDiv.className = "partLeft2";
		this.container.appendChild(leftDiv);

		const row = document.createElement("div");
		row.className = "rowSearch2";
		leftDiv.appendChild(row);

		const tagDiv = document.createElement("div");
		tagDiv.className = "ui left corner labeled input move2";
		const tagInput = document.createElement("input");
		tagInput.placeholder = "Search by tags..";
		const signDiv = document.createElement("div");
		signDiv.className = "ui left corner label";
		const i = document.createElement("i");
		i.className = "asterisk icon";
		signDiv.appendChild(i);
		tagDiv.appendChild(tagInput);
		tagDiv.appendChild(signDiv);
		row.appendChild(tagDiv);
		
		const minDiv = document.createElement("div");
		minDiv.className = "ui right labeled input move2";
		const minInput = document.createElement("input");
		minInput.placeholder = "Enter min price..";
		minInput.type = "number";
		const signDiv2 = document.createElement("div");
		signDiv2.className = "ui basic label";
		signDiv2.innerHTML = "$";
		minDiv.appendChild(minInput);
		minDiv.appendChild(signDiv2);
		row.appendChild(minDiv);

		const maxDiv = document.createElement("div");
		maxDiv.className = "ui right labeled input move2";
		const maxInput = document.createElement("input");
		maxInput.placeholder = "Enter max price..";
		maxInput.type = "number";
		const signDiv3 = document.createElement("div");
		signDiv3.className = "ui basic label";
		signDiv3.innerHTML = "$";
		maxDiv.appendChild(maxInput);
		maxDiv.appendChild(signDiv3);
		row.appendChild(maxDiv);

		const sortSelect = document.createElement("select");
		sortSelect.className = "ui dropdown move2";
		const option1 = document.createElement("option");
		option1.value="1";
		option1.innerHTML = "Ascending"
		const option2 = document.createElement("option");
		option2.value="2";
		option2.innerHTML = "Descending"
		sortSelect.appendChild(option1);
		sortSelect.appendChild(option2);
		row.appendChild(sortSelect);

		const findBut = document.createElement("button");
		findBut.innerHTML = "Find";
		findBut.className = "ui green button move2";
		row.appendChild(findBut);

		const productsDiv = document.createElement("div");
		productsDiv.className = "productsDiv2";
		leftDiv.appendChild(productsDiv);



		findBut.onclick = () => {
			this.pageFun(productsDiv, tagInput, minInput, maxInput, sortSelect, 1);
			}
	}

	pageFun(productsDiv, tagInput, minInput, maxInput, sortSelect, page)
	{
		while (productsDiv.firstChild) {
			productsDiv.removeChild(productsDiv.lastChild);
		}

		if (minInput.value=="")
			minInput.value = "0";
		
		if (maxInput.value=="")
			maxInput.value = "999999";

		let asc = false;
		if (sortSelect.value == "1")
			asc = true;
	
		fetch(
			"https://localhost:7085/FleaMarket/GetSearchResults/" + tagInput.value+"&"+page+"&"+ parseInt(minInput.value)+"&"
			+parseInt(maxInput.value)+"&" + asc)
			.then(p => {
				p.json().then(products => {
					for (var p in products) {
						console.log(p);
						const product = new ProductView(
							products[p]._id,
							products[p].name,
							products[p].price,
							products[p].user,
							products[p].tags,
							products[p].imgUrl
						);
						this.drawProductViewForBuy(productsDiv, product);
						console.log(product.id,product.name);
			};

					let nextButton = document.createElement("button");
					nextButton.className = "ui green button buttonPage";
					nextButton.innerHTML = "Next";

					let prevButton = document.createElement("button");
					prevButton.className = "ui green button buttonPage";
					prevButton.innerHTML = "Previous";

					if(products.length == 3 && page == 1)
					{
						productsDiv.appendChild(nextButton);
					}
					else if(products.length == 3 && page > 1)
					{
						let rowButtons = document.createElement("div");
						rowButtons.appendChild(prevButton);
						rowButtons.appendChild(nextButton);

						productsDiv.appendChild(rowButtons);
					}
					else if(products.length < 3 && page > 1)
					{
						productsDiv.appendChild(prevButton);
					}

					nextButton.onclick = () => {
						this.pageFun(productsDiv, tagInput, minInput, maxInput, sortSelect, page + 1)
					}
					prevButton.onclick = () => {
						this.pageFun(productsDiv, tagInput, minInput, maxInput, sortSelect, page - 1)
					}

				});
			}).catch(q => { console.log("Error")});
		}


		drawProductViewForBuy(productsDiv, product)
		{
		const element = document.createElement("div");
		element.className = "item3";
		productsDiv.appendChild(element);

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
		name.innerHTML = product.name
		name.className = "name3";
		contentTopLeft.appendChild(name);

		const price = document.createElement("div");
		price.innerHTML = product.price;
		contentTopLeft.appendChild(price);


		const contentBottom = document.createElement("div");
		contentBottom.className = "contentBottom3";
		content.appendChild(contentBottom);

		const button = document.createElement("button");
		button.className = "mini ui green bottom attached button";
		button.innerHTML = "Show details";
		contentBottom.appendChild(button);

		const icon = document.createElement("i");
		icon.className = "right chevron icon";
		button.appendChild(icon);

		const line = document.createElement("h");
		element.appendChild(line);

		button.onclick = () => {

		}
		}
}
	

