# SmartSkills UI

Smart Skills React web application

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test` or `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn lint` or `npm run lint`

Launches the linter using "airbnb-base",
"plugin:react/recommended"
See the section about [runing tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn serve` or `npm run serve`
Serves the static files from `build` folder. You can provide the port the app will be running at:
`npm run serve -- -l 3001`

### `yarn eject` or `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## API
For local development, an API proxy for webpack dev server is used so under the hood we go to http://172.20.134.20/.

The following RTK query hooks can be used:

### `useFindSkillsQuery(skillName)` 
Returns skills list by name.
Accepts `all` to obtain all records, exact skill names or regex expressions.
Usage:
```
import { useFindSkillsQuery } from '../slices/smartSkillsSlice’;
...
const { data, error, isLoading } = useFindSkillsQuery('TypeScript');

if (isLoading) {
  return <div>Loading...</div>;
}
if (error) {
  return <div>Oops, an error occured</div>;
}
return <div>{JSON.stringify(data)}</div>;
```

### `useSimilarSkillsQuery({ skillName, limit })`
Returns skills similar to the one provided.
By default algorithm limits the number of skills returned in the response to 3. Provide the parameter `limit` to override.

### `useNeighborSkillsQuery({ skillName, limit })`
Returns the nearest neighbors of a requested skill.
By default, algorithm returns the 10 nearest neighbors of the skill in request including itself. Provide the parameter `limit` to override.
Set the parameter `groups` equal true to get information about corresponding groups of the nearest neighbors.

### `useFetchEmployeesQuery({ ids, recommend })`
Returns skill names and corresponding seniority levels for the employee(s) with ID(s) specified in `ids` param.
Use `recommend` parameter to predict the most appropriate employees based on some job-specific skills.

## Cypress e2e (end to end) testing
To run tests in console automatically (provide preferred browser):
`npx cypress run --browser chrome`
It's also possible to run Cypress app using the command:
`yarn cypress:open` or `npm run cypress:open`