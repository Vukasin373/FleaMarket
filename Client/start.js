import { Hub } from "./hub.js";

export class Start {
	constructor() {
		this.container = null;
		this.username = null;
	}

	// draw(host) {
	// 	let hub = new Hub();
	// 	hub.draw(host);
	// }
	draw(host) {
		this.container = document.createElement("div");
		this.container.className = "main1";
		host.appendChild(this.container);

		const left = document.createElement("div");
		left.className = "left1";
		this.container.appendChild(left);

		const banner = document.createElement("img");
		banner.src = "./banner.png";
		banner.className = "banner1";
		left.appendChild(banner);

		//login form
		const login = document.createElement("div");
		login.className = "login1 ui raised segment";
		left.appendChild(login);

		const loginform = document.createElement("div");
		loginform.className = "loginForm1 ui form";
		login.appendChild(loginform);

		const loginLabel = document.createElement("label");
		loginLabel.className = "loginLabel1 ui Large green ribbon label";
		loginLabel.innerHTML = "Sign in:";
		loginform.appendChild(loginLabel);

		//login username
		const loginUsername = document.createElement("div");
		loginUsername.className = "field";
		loginform.appendChild(loginUsername);

		const loginUsernameLbl = document.createElement("label");
		loginUsernameLbl.innerHTML = "Username";
		loginUsername.appendChild(loginUsernameLbl);

		const loginUsernameInput = document.createElement("input");
		loginUsernameInput.type = "text";
		loginUsernameInput.name = "username";
		loginUsernameInput.placeholder = "Username";
		loginUsername.appendChild(loginUsernameInput);

		//login password
		const loginPassword = document.createElement("div");
		loginPassword.className = "field";
		loginform.appendChild(loginPassword);

		const loginPasswordLbl = document.createElement("label");
		loginPasswordLbl.innerHTML = "Password";
		loginPassword.appendChild(loginPasswordLbl);

		const loginPasswordInput = document.createElement("input");
		loginPasswordInput.type = "text";
		loginPasswordInput.name = "Password";
		loginPasswordInput.placeholder = "Username";
		loginPassword.appendChild(loginPasswordInput);

		const LoginButton = document.createElement("button");
		LoginButton.className = "ui green button";
		LoginButton.innerHTML = "Confirm";
		loginform.appendChild(LoginButton);

		const register = document.createElement("div");
		register.className = "register1";
		this.container.appendChild(register);
	}
}
