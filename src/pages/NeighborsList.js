import * as React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TagCloud } from 'react-tagcloud';
import SortedTableHead from '../components/table/sortedTableHead';
import { useNeighborSkillsQuery } from '../slices/smartSkillsSlice';
import { getComparator } from '../common/helpers';

const headCells = [
  {
    id: 'proximity',
    numeric: true,
    label: 'Proximity',
  },
  {
    id: 'id',
    numeric: true,
    label: 'ID',
  },
  {
    id: 'SkillGroupName',
    numeric: false,
    label: 'Skills Group',
  },
  {
    id: 'SkillName',
    numeric: false,
    label: 'Skill Name',
  },
  {
    id: 'numberOfEngineers',
    numeric: true,
    label: '# of Engineers',
  },
];

// Custom renderer for Tag Cloud
const customRenderer = (tag, size) => (
    <Link underline="hover" href={`/skills/${tag.value}`}>
        <span
            key={tag.value}
            style={{
              margin: '3px',
              padding: '3px',
              fontSize: `${size}px`,
              display: 'inline-block',
              color: '#000',
            }}
        >
            {tag.value}
        </span>
    </Link>
);

// Tag Cloud component
const SimpleCloud = data => (
    <TagCloud
        minSize={12}
        maxSize={35}
        tags={data}
        disableRandomColor={true}
        renderer={customRenderer}
    />
);

export default function NeighborsList() {
  const { name } = useParams();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('proximity');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { data: skills = [] } = useNeighborSkillsQuery({
    skillName: name,
    groups: true,
  });

  return (
      <Box sx={{ my: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" separator=''>
              <Link underline="hover" href="/skills">
                  <Typography>
                      <ArrowBackIcon />
                  </Typography>
              </Link>
              <Typography variant={'h4'}>{name}</Typography>
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
                {SimpleCloud(skills.map(({ SkillName, proximity }) => ({
                  value: SkillName,
                  count: (1 - proximity) * 100,
                  color: '#000',
                })))}
              </Box>
          </Box>
          <Box>
              <div style={{ height: 400, width: '100%' }}>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <SortedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              headCells={headCells}
                          />
                          <TableBody>
                              {skills.slice()
                                .sort(getComparator(order, orderBy))
                                .map(row => (
                                  <TableRow
                                      key={row.id}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                      <TableCell component="th" scope="row">
                                          {row.proximity}
                                      </TableCell>
                                      <TableCell>{row.id}</TableCell>
                                      <TableCell>{row.SkillGroupName}</TableCell>
                                      <TableCell>
                                          <Link underline="hover" href={`/skills/${row.SkillName}`}>
                                              {row.SkillName}
                                          </Link>
                                      </TableCell>
                                      <TableCell>{row.numberOfEngineers}</TableCell>
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
