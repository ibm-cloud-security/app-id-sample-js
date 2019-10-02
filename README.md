# JS Sample App

The IBM Cloud App ID SDK can be used with a Vanilla Javascript App. Read the [official documentation](https://cloud.ibm.com/docs/services/appid?topic=appid-single-page) for information on getting started with IBM Cloud App ID and single-page applications.

## Table of Contents
- [Getting Started][1]
- [Running the App Locally][2]

## Getting Started
Before you begin, you will need an [IBM Cloud App ID](https://www.ibm.com/cloud/app-id) instance with a `singlepageapp` application created. For more information on how to create a `singlepageapp`, visit the [documentation](https://cloud.ibm.com/docs/services/appid?topic=appid-single-page#create-spa-credentials).

In the `config.json` file, replace <CLIENT_ID> and <WELL_KNOWN_ENDPOINT> with the `clientId` and `discoveryEndpoint` from the application credentials.

```
{
    "clientId": "<CLIENT_ID>",
    "discoveryEndpoint": "<WELL_KNOWN_ENDPOINT>"
}
```

## Running the App Locally
Make sure you have updated the `config.json` with your application credentials.
1. Run ```npm install```
2. Start the sample application by running ```npm start```

[1]: #getting-started
[2]: #running-the-app-locally
