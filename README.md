# SmartSkills Frontend

Smart Skills React web application

## ENV

- API_URL - API URL 
- PUBLIC_URL - client URL

ENV variables described in `.env.example`

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


