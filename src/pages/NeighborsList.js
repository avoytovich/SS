import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

function createData(proximity, id, skillsGroup, skillName, engineersNumber) {
  return {
    proximity, id, skillsGroup, skillName, engineersNumber,
  };
}

const rows = [
  createData(0.2, 1, 'Programming Languages', '.NET', 100),
  createData(0.18, 2, 'Java', 'Eclipse', 34),
  createData(0.67, 3, 'Platforms', 'Maven', 2321),
  createData(0.12, 4, 'Platforms', 'Swing', 432),
  createData(0.01, 5, 'Java', 'JDBS', 344),
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
                    maxHeight: 125,
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
          <Box>
              <div style={{ height: 400, width: '100%' }}>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                              <TableRow>
                                  <TableCell>Proximity</TableCell>
                                  <TableCell>ID</TableCell>
                                  <TableCell>Skills Group</TableCell>
                                  <TableCell>Skill Name</TableCell>
                                  <TableCell># of Engineers</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {rows.map(row => (
                                  <TableRow
                                      key={row.id}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                      <TableCell component="th" scope="row">
                                          {row.proximity}
                                      </TableCell>
                                      <TableCell>{row.id}</TableCell>
                                      <TableCell>{row.skillsGroup}</TableCell>
                                      <TableCell>{row.skillName}</TableCell>
                                      <TableCell>{row.engineersNumber}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </div>
          </Box>
      </Box>
  );
}
