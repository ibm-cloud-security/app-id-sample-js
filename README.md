# JS Sample App

The IBM Cloud AppID SDK can be used with a Vanilla Javascript App. 
You will need an IBM Cloud App ID instance with a singlepageapp 
application created. Use the clientId and discoveryEndpoint from 
the application credentials to initialize the AppID instance.

## Getting Started

In the index.html file replace the <SPA_CLIENT_ID> with your clientId and the <WELL_KNOWN_ENDPOINT> with your discoveryEndpoint

```
const appID = new AppID();
  await appID.init({
  clientId: <SPA_CLIENT_ID>,
  discoveryEndpoint: <WELL_KNOWN_ENDPOINT>
});
```
## Setting up the IBM Cloud App ID SDK

* Navigate to the js-sample folder
* Clone the App ID SDK repo git clone https://github.com/ibm-cloud-security/appid-clientsdk-js.git
* Navigate to the appid-clientsdk-js folder
* Run git checkout development
* Run npm install
* Run npm run build


## To run locally
Navigate back to the js-sample folder

Run ```npm install```

Run ```node index.js```

