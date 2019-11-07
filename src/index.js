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
const $passwordChange = document.getElementById('passwordChange');
const $spinner = document.getElementById('spinner');
hideElement($passwordChange);
hideElement($spinner);

const appID = new AppID();

async function onLoginButtonClick() {
	try {
		hideElement($loginButton);
		showElement($spinner);
		const tokens = await appID.signin();
		displayUserInfo(tokens);
	} catch (e) {
		hideElement($spinner);
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
		showElement($spinner);
		const tokens = await appID.silentSignin();
		displayUserInfo(tokens);
	} catch (e) {
		hideElement($spinner);
		showElement($loginButton);
		$loginButton.addEventListener('click', onLoginButtonClick);
	}
})();

async function displayUserInfo(tokens) {
	let userInfo = await appID.getUserInfo(tokens.accessToken);
	let decodeIDToken = tokens.idTokenPayload;
	let jwtToken = tokens.idToken;
	changePassword(jwtToken);
	hideElement($welcome);
	showElement($afterLogin);
	$welcomeNameId.textContent = 'Hi ' + decodeIDToken.name + ', Congratulations!';
	$tokenContent.textContent = JSON.stringify(decodeIDToken);
	$userContent.textContent = JSON.stringify(userInfo);
}

function changePassword(idToken) {
	$changePasswordButton.addEventListener('click', async function(){
		console.log('here')
		try {
			let tokens = await appID.changePassword(idToken);
			showElement($passwordChange);
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

