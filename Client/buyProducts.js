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
	}
}
