# SmartSkills Frontend Project Documentation

## API
For local development, an API proxy for webpack dev server.

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
