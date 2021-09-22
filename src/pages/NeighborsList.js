import * as React from 'react';
import PropTypes from 'prop-types';
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
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TagCloud } from 'react-tagcloud';
import { useParams } from 'react-router-dom';
import { useNeighborSkillsQuery } from '../slices/smartSkillsSlice';

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
    id: 'skillsGroup',
    numeric: false,
    label: 'Skills Group',
  },
  {
    id: 'skillName',
    numeric: false,
    label: 'Skill Name',
  },
  {
    id: 'engineersNumber',
    numeric: false,
    label: '# of Engineers',
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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

const SimpleCloud = (
    <TagCloud
        minSize={12}
        maxSize={35}
        tags={data}
        disableRandomColor={true}
        renderer={customRenderer}
    />
);

function EnhancedTableHead(props) {
  const {
    order, orderBy, onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function NeighborsList() {
  const { name } = useParams();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('proximity');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { data2, error, isLoading } = useNeighborSkillsQuery(name);
  console.log(data2, error, isLoading);

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
                {SimpleCloud}
              </Box>
          </Box>
          <Box>
              <div style={{ height: 400, width: '100%' }}>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                          />
                          <TableBody>
                              {rows.slice()
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
                                      <TableCell>{row.skillsGroup}</TableCell>
                                      <TableCell>
                                          <Link underline="hover" href={`/skills/${row.skillName}`}>
                                              {row.skillName}
                                          </Link>
                                      </TableCell>
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
