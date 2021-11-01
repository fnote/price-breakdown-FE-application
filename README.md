Cloud PCI - Frontend
================================

Front-end application for Cloud PCI

### `npm install`
Before installing the dependencies, do the following.
Set the default npm registry with an Artifactory npm repository using the following command:

`npm config set registry https://syscobt.jfrog.io/artifactory/api/npm/npm/`

Login

`npm login`

When prompted, provide the JFrog Artifactory login credentials as follows:

`Username : bt-pricingplatform`

`Pass: <Request from a Pricing team member/lead>`

`Email: 000-BT-PricingPlatform@Corp.sysco.com`

For cloud deployments using AWS codebuild, make sure the following environment variable is set with the value of a correct JFrog API Key.

`JFROG_AUTH`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
