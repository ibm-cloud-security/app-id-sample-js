const AppID = require('ibmcloud-appid-js');
const config = require('./config.json');

const $login = document.getElementById('login');
const $welcome = document.getElementById('welcome');
const $afterLogin = document.getElementById('afterLogin');

function hideElement($element) {
	$element.style.display = 'none';
}

function showElement($element) {
	$element.style.display = 'block';
}

function errorDisplay(e) {
	document.getElementById('error').style.display = 'block';
	document.getElementById('error').textContent = e;
	showElement($login);
}

function textContentDisplay(id, content) {
	document.getElementById(id).textContent = content;
}

(async () => {
	const appID = new AppID();
	try {
		await appID.init(config);
		showElement($login);
		const tokens = await appID.silentSignin();
      if (tokens) {
			document.getElementById('tokenContent').textContent = JSON.stringify(tokens.idTokenPayload);
		}
		$login.addEventListener('click', async () => {
			try {
				const tokens = await appID.signinWithPopup();
				let userInfo = await appID.getUserInfo(tokens.accessToken);
	
				hideElement($welcome);
				showElement($afterLogin);
	
				let decodeIDToken = tokens.idTokenPayload;
				let welcomeNameText = 'Hi ' + decodeIDToken.name + ', Congratulations!';
				const textContentObject = {
					welcomeNameID: welcomeNameText,
					tokenContent: JSON.stringify(decodeIDToken),
					userContent: JSON.stringify(userInfo)
				}
				const textContentProperties = Object.entries(textContentObject);
				for (const [id, content] of textContentProperties) {textContentDisplay(id, content)}	
	
			} catch (e) {
				errorDisplay(e);
			}
		});
	} catch (e) {
		errorDisplay(e);
	}
})();

var col = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < col.length; i++) {
  col[i].addEventListener("click", function() {
	 this.classList.toggle("active");
	 let c = this.children;
	 c[0].classList.toggle('changeRotation');
	 var content = this.nextElementSibling;
    if (content.style.display === "block") {
		content.style.display = "none";
	 } else {
		content.style.display = "block";
	 }
  });
}