export class Profile {
	constructor()
	 {
		 this.container = null;
	 }

	draw(host, user) 
	{
		while (host.firstChild) {
		     host.removeChild(host.lastChild);
		 }

		 this.container = document.createElement("div");
		 this.container.className = "profile2";
		 host.appendChild(this.container);

		 const leftDiv = document.createElement("div");
		 leftDiv.className = "leftDiv2";
		 this.container.appendChild(leftDiv);

		 const infoH2 = document.createElement("h2");
		 infoH2.innerHTML = "User information";
		 leftDiv.appendChild(infoH2);

		 const labelArray = ["Username:","First name:", "Last name:", "Contact:", "City:", "Money:"];
		 const infoArray = [user.username, user.firstName, user.lastName, user.contact, user.city, user.money];

		 labelArray.forEach((element,i) => {
			 const row = document.createElement("h3");
			 row.innerHTML = element +"        "+ infoArray[i];
			 leftDiv.appendChild(row);
		 });

		 const middleDiv = document.createElement("div");
		 middleDiv.className = "middleDiv2";
		 this.container.appendChild(middleDiv);

		 const firstMiddleDiv = document.createElement("div");
		 firstMiddleDiv.className = "subMiddleDiv2";
		 middleDiv.appendChild(firstMiddleDiv);

		 const passH2 = document.createElement("h2");
		 passH2.innerHTML = "Change password";
		 firstMiddleDiv.appendChild(passH2);

		 const row1 = document.createElement("div");
		 row1.className = "row2";
		 firstMiddleDiv.appendChild(row1);

		 const oldPassLabel = document.createElement("label");
		 oldPassLabel.innerHTML = "Old password: ";
		 row1.appendChild(oldPassLabel);
		 
		 const oldPassInput = document.createElement("input");
		 row1.appendChild(oldPassInput);

		 const row2 = document.createElement("div");
		 row2.className = "row2";
		 firstMiddleDiv.appendChild(row2);

		 const newPassLabel = document.createElement("label");
		 newPassLabel.innerHTML = "New password: ";
		 row2.appendChild(newPassLabel);
		 
		 const newPassInput = document.createElement("input");
		 row2.appendChild(newPassInput);

		 const buttPass = document.createElement("button");
		 buttPass.innerHTML = "Confirm";
		 buttPass.className = "buttPass2";
		 firstMiddleDiv.appendChild(buttPass);

		 buttPass.onclick = ()=>{
			 alert("q");
		 }

		 const secondMiddleDiv = document.createElement("div");
		 secondMiddleDiv.className = "subMiddleDiv2";
		 middleDiv.appendChild(secondMiddleDiv);

		 const cityH2 = document.createElement("h2");
		 cityH2.innerHTML = "Change city";
		 secondMiddleDiv.appendChild(cityH2);

		 const row3 = document.createElement("div");
		 row3.className = "row2";
		 secondMiddleDiv.appendChild(row3);

		 const cityLabel = document.createElement("label");
		 cityLabel.innerHTML = "New city: ";
		 row3.appendChild(cityLabel);
		 
		 const cityInput = document.createElement("input");
		 row3.appendChild(cityInput);

		 const buttCity = document.createElement("button");
		 buttCity.innerHTML = "Confirm";
		 buttCity.className = "buttPass2";
		 secondMiddleDiv.appendChild(buttCity);

		 buttCity.onclick = ()=>{
			 alert("q");
		 }

		 const thirdMiddleDiv = document.createElement("div");
		 thirdMiddleDiv.className = "subMiddleDiv2";
		 middleDiv.appendChild(thirdMiddleDiv);

		 const contactH2 = document.createElement("h2");
		 contactH2.innerHTML = "Change contact";
		 thirdMiddleDiv.appendChild(contactH2);

		 const row4 = document.createElement("div");
		 row4.className = "row2";
		 thirdMiddleDiv.appendChild(row4);

		 const contactLabel = document.createElement("label");
		 contactLabel.innerHTML = "New contact: ";
		 row4.appendChild(contactLabel);
		 
		 const contactInput = document.createElement("input");
		 row4.appendChild(contactInput);

		 const buttContact = document.createElement("button");
		 buttContact.innerHTML = "Confirm";
		 buttContact.className = "buttPass2";
		 thirdMiddleDiv.appendChild(buttContact);

		 buttContact.onclick = ()=>{
			 alert("q");
		 }


		 const rightDiv = document.createElement("div");
		 rightDiv.className = "rightDiv2";
		 this.container.appendChild(rightDiv);

		 const moneyH2 = document.createElement("h2");
		 moneyH2.innerHTML = "Add money";
		 rightDiv.appendChild(moneyH2);

		 const row5 = document.createElement("div");
		 row5.className = "row2";
		 rightDiv.appendChild(row5);

		 const moneyLabel = document.createElement("label");
		 moneyLabel.innerHTML = "Amount: ";
		 row5.appendChild(moneyLabel);
		 
		 const moneyInput = document.createElement("input");
		 row5.appendChild(moneyInput);

		 const buttMoney = document.createElement("button");
		 buttMoney.innerHTML = "Pay in";
		 buttMoney.className = "buttPass2";
		 rightDiv.appendChild(buttMoney);

		 buttMoney.onclick = ()=>{
			fetch(
				"https://localhost:7085/FleaMarket/GiveMeMoney/" + user.username+"&"+ parseInt(moneyInput.value),
				{
				method: "PUT",
				headers: {
				"Content-Length": 0
				},
				body: {}
			}
			).then(p => {
				if (p.status == 200)
					alert("top");
				else
				{
					console.log("Error");
				}
				});
		 }

	}
}
