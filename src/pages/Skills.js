import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Link from '@mui/material/Link';
import NeighborsList from './NeighborsList';

export default function SkillsPage() {
  const { path, url } = useRouteMatch();
  return (
		<>
			<Box sx={{ my: 4 }} textAlign="center">
				<Typography variant="h4" component="h1" gutterBottom>
					Skills Page
				</Typography>
				<Typography>
					<Link underline="hover" href={`${url}/Java`}>
						Java
					</Link>
				</Typography>
			</Box>
			<Switch>
				<Route path={`/${path}/:name`} exact={true}>
					<NeighborsList />
				</Route>
			</Switch>
		</>
  );
}
