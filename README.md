# SmartSkills Frontend

Smart Skills React web application

## ENV

- API_URL - API URL 
- PUBLIC_URL - client URL

ENV variables described in `.env.example`

Added temporary variable REACT_APP_MSAL_DISABLE to disable login in CCO

## Development

Provide environment variables into `.env` file (see `.env.example`)

### Available Scripts

In the project directory, you can run (For example, `npm run start`):


- `start` - Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `build` - Create build of the app for production to the `build` folder
- `serve` - Serves the static files from `build` folder. You can provide the port the app will be running at:
  `npm run serve -- -l 3001`
- `lint` - Run eslint
- `lint:fix` - Fix linter issues if possible
- `test` - Run unit tests
- `test:watch` - Run tests in watch mode
- `test:coverage` - Run tests and create code coverage reports
- `cypress:open` - Run Cypress e2e (end to end) tests
- `eject` -  will remove the single build dependency from your project
- `prepare` - Create a sample pre-commit hook. Run it once.

For Windows users install next library:

- Global

```shell script
npm install -g win-node-env
```

- Per project

```shell script
npm install --save-optional win-node-env
```


## Deployment details
For build project on server you should follow these steps:

- Install nodejs. **IMPORTANT! Node version should be >= 14.15.4**

```shell script
sudo apt-get update
sudo apt-get install nodejs npm
```

- Clone repository

```shell script
git clone $REPOSITORY_URL$
```

- Create `.env` file and provide environment variables (use repository `env.example` as template)

- Install dependencies and build project

```shell script
cd $PROJECT_DIR$

npm cache clean
rm -rf node_modules
npm install

npm run build
```

- Build will be in `./build` folder

### Local deployment with Docker

The "./docker" directory contains "docker-compose.yml" and "Dockerfile", as well as the "./docker/bin" directory, which contains scripts for launching the external network and Frontend docker container.

#### (The scripts are written taking into account that you are running on Linux or MacOS and the executable docker file is located along the path "/usr/local/bin". If this is not the case, edit the files in the "./docker/bin" directory to reflect your paths)


Create the external network first:

```shell
./docker/bin/network-create.sh
```

Build containers:

```shell
./docker/bin/docker-build.sh
```

Start containers:

```shell
./docker/bin/docker-up.sh
```

Enter to backend console;

```shell
./docker/bin/docker-console.sh
```

After the done actions, the backend will be available to you at the address:

```shell
http://localhost:8000/docs
```

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment


## Cypress e2e (end to end) testing
To run tests in console automatically (provide preferred browser):
`npx cypress run --browser chrome`

It's also possible to run Cypress app using the command:
`yarn cypress:open` or `npm run cypress:open`

## Aliases

You can use aliases for src sub paths.

Aliases described in `jsconfig.json` and in `package.json`.

If you want to add custom alias, keep in memory that you need to do it in `package.json` ("jest") and in `jsconfig.json`


## Utils

Utils described in `utils/*.js`

- helpers.js - common helpers. Mostly pure functions. Can be updated during the development.


## Directory Structure

### src directory
```
.
└── /src
    ├── /assets
    ├── /components
    ├── /constants
    ├── /containers
    ├── /hooks
    ├── /mocks
    ├── /pages
    ├── /services
    ├── /store
    ├── /theme
    ├── /utils
    └── *.js
```

The `src` directory structure will be as follows:

- assets - global static assets (images, company logo, etc.)
- components - global shared/reusable components(layout, form components, buttons, etc.)
- constants - global constants
[comment]: <> (containers rename to providers ?)
- containers - providers, global wrappers
- hooks - Custom hooks
- mocks
- pages - folder indicate the route of the react application. 
- routers -  all routes of the application. It consists of private, protected, and all types of routes.
- services -  API services
- store - Global Redux store
- theme - material UI theme configuration file
- utils - Utilities, helpers, logger etc.

### pages directory 

The `pages` directory structure will be as follow:
```

└── /pages
    ├── /__tests__
    ├── /components
    ├── ...
    └── index.js
```
- components - Sub-components, smaller components used exclusively by this page 
- __tests__ - test files
- index.js

### component directory

The directory structure will be as follow:

```

└── /components
    ├── /__tests__
    ├── *.styles.js
    ├── ...
    └── index.js
```

### Tests

Tests files should be located in `__tests__` folders next to  component, utils etc.

## Styles

All the MUI components are styled with this `styled()` utility.

```
 All the MUI components  which was  styled with this `makeStyles` must be re-write with  `styled()` utility.
```

Store  styled-components in a `ComponentName.styles.js` file and keep that related to a specific component



## Project documents


- [Permissions](/docs/permissions.md)
- [Hooks](/docs/hooks.md)
