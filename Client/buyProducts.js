import { ProductView } from "./Entities/ProductView.js";
import {Product } from "./Entities/Product.js";

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
		const rightDiv = document.createElement("div");
		rightDiv.className = "partRight2";
		this.container.appendChild(rightDiv);

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
			while (rightDiv.firstChild) {
				rightDiv.removeChild(rightDiv.lastChild);
			}
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
			maxInput.value = "99999999";

		let asc = false;
		if (sortSelect.value == "1")
			asc = true;
	
		fetch(
			"https://localhost:7085/FleaMarket/GetSearchResults/" + tagInput.value+"&"+page+"&"+ parseInt(minInput.value)+"&"
			+parseInt(maxInput.value)+"&" + asc)
			.then(p => {
				p.json().then(products => {
					let br = 0;
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
						console.log(product);
						this.drawProductViewForBuy(productsDiv, product);
						br++;
					
						
			};
					if(br==0 && page==1)
					{
						alert ("No results");
					}
					else
					{
					let nextButton = document.createElement("button");
					nextButton.className = "ui green button buttonPage";
					nextButton.innerHTML = "Next";

					let prevButton = document.createElement("button");
					prevButton.className = "ui green button buttonPage";
					prevButton.innerHTML = "Previous";

					if(br == 5 && page == 1)
					{
						productsDiv.appendChild(nextButton);
					}
					else if(br == 5 && page > 1)
					{
						let rowButtons = document.createElement("div");
						rowButtons.appendChild(prevButton);
						rowButtons.appendChild(nextButton);

						productsDiv.appendChild(rowButtons);
					}
					else if(br < 5 && page > 1)
					{
						productsDiv.appendChild(prevButton);
					}

					nextButton.onclick = () => {
						const rightDiv = this.container.querySelector(".partRight2")
						while (rightDiv.firstChild) {
							rightDiv.removeChild(rightDiv.lastChild);
						}
						this.pageFun(productsDiv, tagInput, minInput, maxInput, sortSelect, page + 1)
					}
					prevButton.onclick = () => {
						const rightDiv = this.container.querySelector(".partRight2")
						while (rightDiv.firstChild) {
							rightDiv.removeChild(rightDiv.lastChild);
						}
						this.pageFun(productsDiv, tagInput, minInput, maxInput, sortSelect, page - 1)
					}
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
		//https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278__340.jpg
		image.src = product.img;
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
		price.innerHTML = product.price + " $";
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
			this.getProductDetails(product)
		}
		}

		getProductDetails(productView)
		{
			const rightDiv = this.container.querySelector(".partRight2");
			while (rightDiv.firstChild) {
				rightDiv.removeChild(rightDiv.lastChild);
			}

			fetch(
				"https://localhost:7085/FleaMarket/GetProductDetails/" + productView.product)
				.then(p => {
					
					p.json().then(productJson => {
					
							const product = new Product(
								productJson._id,
								productJson.name,
								productJson.price,
								productJson.customAttributes,
								productJson.tags,
								productJson.imgUrl,
								productJson.description
							);
								console.log(product);
							fetch(
								"https://localhost:7085/FleaMarket/GetUserDetails/" + productView.user)
								.then(q => {
									q.json().then(userInfo => {
							this.drawProduct(rightDiv, product, userInfo, productView.user, productView.id);
									})
								})
							
				});
			});
		}
	
		drawProduct(rightDiv, product, userInfo, sellerUsername, idProduct)
		{
			const firstDiv = document.createElement("div");
			firstDiv.className = "firstDiv2";
			rightDiv.appendChild(firstDiv);

			const img = document.createElement("img");
			
			img.src =  product.img;
			img.className = "img2"; 
			firstDiv.appendChild(img);

			const rightFirstDiv = document.createElement("div");
			rightFirstDiv.className = "rightFirstDiv2";
			firstDiv.appendChild(rightFirstDiv);

			const nameH2 = document.createElement("h2");
			nameH2.innerHTML = "Name: "+product.name;
			rightFirstDiv.appendChild(nameH2);

			const priceH2 = document.createElement("h2");
			priceH2.innerHTML = "Price: "+product.price +"$";
			rightFirstDiv.appendChild(priceH2);

			const descriptionH2 = document.createElement("h2");
			descriptionH2.innerHTML = "Description: "+product.description;
			rightFirstDiv.appendChild(descriptionH2);
			
			
			
			product.customAttributes.forEach(element => {
				let att = document.createElement("h2");
				att.innerHTML = element.name + ": " + element.value;
				rightDiv.appendChild(att);
			});

			const lab = document.createElement("h2");
			lab.innerHTML = "Seller info:";
			lab.style.marginTop  = "50px";
			rightDiv.appendChild(lab);


			const name = document.createElement("div");
			rightDiv.appendChild(name);
			name.className = "fontSize";
			name.innerHTML = "Full name: " +userInfo[0] + " " +userInfo[1];

			const city = document.createElement("div");
			rightDiv.appendChild(city);
			city.className = "fontSize";
			city.innerHTML = "City: " +userInfo[2];

			const contact = document.createElement("div");
			rightDiv.appendChild(contact);
			contact.className = "fontSize";
			contact.innerHTML = "Phone number: " +userInfo[3];

			
			console.log(this.user.username, sellerUsername);
			if(this.user.username != sellerUsername)
			{

			const barterDiv = document.createElement("div");
			barterDiv.className = "barterDiv2";
			barterDiv.style.alignSelf = "end";
			rightDiv.appendChild(barterDiv);

			const labBarter = document.createElement("h2");
			labBarter.innerHTML = "Suggest price: ";
			barterDiv.appendChild(labBarter);

			const semanticBarter = document.createElement("div");
			semanticBarter.className = "ui right labeled input";
			barterDiv.appendChild(semanticBarter);
		
			const inpBarter = document.createElement("input");
			semanticBarter.appendChild(inpBarter);
			inpBarter.type = "number";
			
			const div =document.createElement("div");
			div.className = "ui basic label";
			div.innerHTML = "$";
			semanticBarter.appendChild(div);
			
			
			const buttBarter = document.createElement("button");
			buttBarter.className = "ui green button";
			buttBarter.innerHTML = "Begin barter";
			barterDiv.appendChild(buttBarter);

			buttBarter.onclick = () => {
				let price =parseInt(inpBarter.value);

				fetch(
					"https://localhost:7085/FleaMarket/CheckNotification/" + sellerUsername +"&"+this.user.username+"&"+idProduct)
					.then(q => {
						if(q.status==400)
						{
							alert("Your offer is already sent !");
						}
						else if(q.status == 200)
						{
							fetch(`https://localhost:7085/FleaMarket/CreateNotification/`+sellerUsername, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: this.user.username,
					firstName: this.user.firstName,
					lastName: this.user.lastName,
					productName: product.name,
					productId: idProduct,
					price: price ,
					barter: true,
				}),
			}).then(p => {
				if (p.ok)
					alert("Your offer has been sent ");
					else if(p.status == 400)
				{
					alert("You don't have enough money ")
				}
				else
					console.log("Error");	
						})
					}
					
		
			})

		
		}
	}
		}
	}
	

