import AppID from 'ibmcloud-appid-js';
import config from './config.json';

const $loginButton = document.getElementById('login');
const $changePasswordButton = document.getElementById('password');
const $welcome = document.getElementById('welcome');
const $afterLogin = document.getElementById('afterLogin');
const $welcomeNameId = document.getElementById('welcomeNameID');
const $tokenContent = document.getElementById('tokenContent');
const $userContent = document.getElementById('userContent');
const $error = document.getElementById('error');

const appID = new AppID();

async function onLoginButtonClick() {
	try {
		hideElement($loginButton);

		const tokens = await appID.signin();
		let userInfo = await appID.getUserInfo(tokens.accessToken);
		let jwtToken = tokens.idToken;
		changePassword(jwtToken);
		hideElement($welcome);
		showElement($afterLogin);

		let decodeIDToken = tokens.idTokenPayload;

		$welcomeNameId.textContent = 'Hi ' + decodeIDToken.name + ', Congratulations!';
		$tokenContent.textContent = JSON.stringify(decodeIDToken);
		$userContent.textContent = JSON.stringify(userInfo);
	} catch (e) {
		if (e == 'Error: Popup closed') {
			$error.textContent = 'The pop-up window closed before sign-in completed. Click Sign in to try again.';
		} else {
			$error.textContent = e;
		}
		showElement($loginButton);
	}
}

(async () => {
	try {
		await appID.init(config);
		const tokens = await appID.silentSignin();
		let userInfo = await appID.getUserInfo(tokens.accessToken);
		let decodeIDToken = tokens.idTokenPayload;
		$welcomeNameId.textContent = 'Hi ' + decodeIDToken.name + ', Congratulations!';
		$tokenContent.textContent = JSON.stringify(decodeIDToken);
		$userContent.textContent = JSON.stringify(userInfo);
	} catch (e) {
		showElement($loginButton);
		$loginButton.addEventListener('click', onLoginButtonClick);
	}
})();

function changePassword(idToken) {
	$changePasswordButton.addEventListener('click', async function(){
		try {
			let tokens = await appID.changePassword(idToken);
		} catch (e) {
			console.log(e)
		}
	});
}

function hideElement($element) {
	$element.classList.add('hidden');
}

function showElement($element) {
	$element.classList.remove('hidden');
}

const collaps = document.getElementsByClassName("collapsible");
for (let collapsible of collaps) {
	const btn = collapsible.getElementsByTagName("button")[0];
	btn.addEventListener("click", () => {
		collapsible.classList.toggle("active");
	});
}

