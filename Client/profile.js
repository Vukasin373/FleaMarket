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

		 const labelArray = ["Username: ","First name: ", "Last name: ", "Contact: ", "City: ", "Money: "];
		 const infoArray = [user.username, user.firstName, user.lastName, user.contact, user.city, user.money];

		 labelArray.forEach((element,i) => {
			 const row = document.createElement("h3");
			 if(element=="Money: ")
			 {
				row.innerHTML = element + infoArray[i] + " $";
			 	
			 }
			 else
			 	row.innerHTML = element + infoArray[i];

			 row.className="user"+i;
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
		 oldPassLabel.className="lab2";
		 row1.appendChild(oldPassLabel);
		 
		 const oldPassInput = document.createElement("input");
		 oldPassInput.type = "password";
		 oldPassInput.className = "ui input focus";
		 row1.appendChild(oldPassInput);

		 const row2 = document.createElement("div");
		 row2.className = "row2";
		 firstMiddleDiv.appendChild(row2);

		 const newPassLabel = document.createElement("label");
		 newPassLabel.innerHTML = "New password: ";
		 newPassLabel.className="lab2";
		 row2.appendChild(newPassLabel);
		 
		 const newPassInput = document.createElement("input");
		 newPassInput.className = "ui input focus";
		 newPassInput.type = "password";
		 row2.appendChild(newPassInput);

		 const buttPass = document.createElement("button");
		 buttPass.innerHTML = "Confirm";
		 buttPass.className = "ui green button button2";
		 firstMiddleDiv.appendChild(buttPass);

		 buttPass.onclick = ()=>{
			if(oldPassInput.value=="")
			alert("Input old password !");
			else if(newPassInput.value =="")
			alert("Input new password !");
		   else
		   {
			   fetch(
			   "https://localhost:7085/FleaMarket/ChangePassword/" + user.username+"&"+ oldPassInput.value +"&"+newPassInput.value,
				   {
				   method: "PUT",
				   headers: {
				   "Content-Length": 0
				   },
					   body: {}
				   }
				  ).then(p => {
				   if (p.status == 200)
				   {	
				   alert("Password successfully changed !");
				   }
				   else if(p.status == 400)
				   {
					   alert("The old password is incorrect ");
				   }
				   else
	   				{
		   				console.log("Error");
	   				}
	   });
	 }
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
		 cityLabel.className="lab2";
		 row3.appendChild(cityLabel);
		 
		 const cityInput = document.createElement("input");
		 cityInput.className = "ui input focus";
		 row3.appendChild(cityInput);

		 const buttCity = document.createElement("button");
		 buttCity.innerHTML = "Confirm";
		 buttCity.className = "ui green button button2";
		 secondMiddleDiv.appendChild(buttCity);

		 buttCity.onclick = ()=>{
			if(cityInput.value=="")
			alert("Input a new city");
		   else
		   {
			   fetch(
			   "https://localhost:7085/FleaMarket/ChangeCity/" + user.username+"&"+ cityInput.value,
				   {
				   method: "PATCH",
				   headers: {
				   "Content-Length": 0
				   },
					   body: {}
				   }
				  ).then(p => {
				   if (p.status == 200)
				   {	
				   user.city = cityInput.value;
				   const city = this.container.querySelector(".user4");
					
					 city.innerHTML = "City: "+user.city;
				   }	
	   else
	   {
		   console.log("Error");
	   }
	   });
	 }
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
		 contactLabel.className="lab2";
		 row4.appendChild(contactLabel);
		 
		 const contactInput = document.createElement("input");
		 contactInput.className = "ui input focus";
		 row4.appendChild(contactInput);

		 const buttContact = document.createElement("button");
		 buttContact.innerHTML = "Confirm";
		 buttContact.className = "ui green button button2";
		 thirdMiddleDiv.appendChild(buttContact);

		 buttContact.onclick = ()=>{
			if(contactInput.value=="")
				alert("Input a contact");
	  		 else
	 		  {
	  			 fetch(
		 		  "https://localhost:7085/FleaMarket/ChangeContact/" + user.username+"&"+ contactInput.value,
		  			 {
		  			 method: "PATCH",
		   			headers: {
		  			 "Content-Length": 0
		  			 },
		  				 body: {}
	  				 }
	 				 ).then(p => {
					   if (p.status == 200)
		  			 {	
					   user.contact = contactInput.value;
			 		  const contact = this.container.querySelector(".user3");
			   		 
			   		  contact.innerHTML = "Contact: "+user.contact;
					   }	
		   else
		   {
			   console.log("Error");
		   }
		   });
		 }
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
		 //moneyLabel.style.textAlign ="center";
		 moneyLabel.className="lab2";
		 row5.appendChild(moneyLabel);
		 
		 const moneyInput = document.createElement("div");
		 //moneyInput.type = "number";
		 moneyInput.className = "ui right labeled input";
		 const lab = document.createElement("label");
		 lab.className = "ui label";
		
		 lab.innerHTML = "$";
		 moneyInput.appendChild(lab);
		 const inp = document.createElement("input");
		 inp.type= "text";
		 inp.placeholder = "Amount";
		 moneyInput.appendChild(inp);
		 const div = document.createElement("div");
		 div.className = "ui basic label";
		 div.innerHTML = ".00";
		 moneyInput.appendChild(div);
		 
		 row5.appendChild(moneyInput);

		 const buttMoney = document.createElement("button");
		 buttMoney.innerHTML = "Pay in";
		 buttMoney.className = "ui green button";
		 buttMoney.classList.add("button2");
		 
		 rightDiv.appendChild(buttMoney);

		 buttMoney.onclick = ()=>{
			
			 if(inp.value=="")
			 	alert("Input an amount");
			else
			{
			fetch(
				"https://localhost:7085/FleaMarket/GiveMeMoney/" + user.username+"&"+ parseInt(inp.value),
				{
				method: "PUT",
				headers: {
				"Content-Length": 0
				},
				body: {}
			}
			).then(p => {
				if (p.status == 200)
				{	
					user.money+=parseInt(inp.value);
					const money = this.container.querySelector(".user5");
					console.log(money);
					money.innerHTML = "Money: "+user.money+" $";
				}	
				else
				{
					console.log("Error");
				}
				});
		 }
		}
		 }
		}
	


	