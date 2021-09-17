import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { TagCloud } from 'react-tagcloud';

const data = [
  { value: 'JavaScript', count: 38, color: '#000000' },
  { value: 'React', count: 30, color: '#000000' },
  { value: 'Nodejs', count: 28, color: '#000000' },
  { value: 'Express.js', count: 25, color: '#000000' },
  { value: 'HTML5', count: 33, color: '#000000' },
  { value: 'MongoDB', count: 18, color: '#000000' },
  { value: 'CSS3', count: 10, color: '#000000' },
  { value: 'JavaScript', count: 38, color: '#000000' },
  { value: 'React', count: 30, color: '#000000' },
  { value: 'Nodejs', count: 28, color: '#000000' },
  { value: 'Express.js', count: 25, color: '#000000' },
  { value: 'HTML5', count: 33, color: '#000000' },
  { value: 'MongoDB', count: 18, color: '#000000' },
  { value: 'CSS3', count: 10, color: '#000000' },
];

const SimpleCloud = (
    <TagCloud
        minSize={12}
        maxSize={35}
        tags={data}
        disableRandomColor={true}
    />
);

export default function NeighborsList() {
  return (
      <Box sx={{ my: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" separator=''>
              <Link underline="hover" href="/">
                  Arrow to back icon
              </Link>
              <Typography>Java</Typography>
          </Breadcrumbs>
          <Box sx={{ display: 'grid', my: 4, gridTemplateColumns: 'repeat(2, 1fr)' }} textAlign="center">
              <Box sx={
                  {
                    border: 1,
                    padding: 2,
                    maxWidth: { xs: 300, md: 250 },
                  }
              } textAlign="left">
                  <Typography>Group: Programming Languages</Typography>
                  <Typography>Engineers: 500</Typography>
                  <Typography>Description: Bla-bla</Typography>
              </Box>
              <Box>
                {SimpleCloud}
              </Box>
          </Box>
      </Box>
  );
}
