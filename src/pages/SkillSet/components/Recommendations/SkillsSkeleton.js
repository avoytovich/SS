import {Skeleton} from '@mui/material';

import {Box} from 'components/Box';

const SkillsSkeleton = () => (
  <Box>
    <Skeleton animation="wave" />
    <Skeleton animation="wave" width="80%" />
  </Box>
);

export default SkillsSkeleton;
