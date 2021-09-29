import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { getComparator } from '../common/helpers';
import SortedTableHead from '../components/table/sortedTableHead';
import { useFindSkillsQuery } from '../slices/smartSkillsSlice';

const headCells = [
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

export default function SkillsRegistry() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [skillGroupName, setSkillGroupName] = React.useState('');
  const [skillName, setSkillName] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const cleanFilters = () => {
    setSkillGroupName('');
    setSkillName('');
  };

  const { data: skills = [] } = useFindSkillsQuery('all');

  const filterSkills = skillsList => {
    let filteredSkills = [...skillsList];
    if (skillGroupName) {
      filteredSkills = filteredSkills
        .filter(({ SkillGroupName }) => SkillGroupName === skillGroupName);
    }
    if (skillName) {
      filteredSkills = filteredSkills
        .filter(({ SkillName }) => SkillName.includes(skillName));
    }
    return filteredSkills;
  };

  const skillsGroupNameList = skills.map(({ SkillGroupName }) => SkillGroupName);
  const skillsGroupNameListOption = [...new Set(skillsGroupNameList)];

  const filteredSkills = filterSkills(skills);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Skills Registry
      </Typography>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="skill-group-name">Skill Group Name</InputLabel>
            <Select
              labelId="skill-group-name"
              id="skill-group-name"
              value={skillGroupName}
              onChange={event => setSkillGroupName(event.target.value)}
              label="Skill Group Name"
            >
              {skillsGroupNameListOption.map(skillsGroupName => <MenuItem
                  key={skillsGroupName}
                  value={skillsGroupName}>
                    {skillsGroupName}
                </MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{
            m: 1, minWidth: 220, display: 'flex', flexDirection: 'row',
          }}>
            <TextField
              id="standard-helperText"
              label="Skill Name"
              variant="standard"
              placeholder="Skill Name (full / partial / RegExp)"
              onChange={event => setSkillName(event.target.value)}
              value={skillName}
            />
            <Link
              style={{
                color: '#000',
                fontSize: 12,
                margin: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-end',
                marginLeft: '10px',
              }}
              underline="hover"
              onClick={cleanFilters}>
              Clean Up
            </Link>
          </FormControl>
        </Box>
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
                {filteredSkills.slice().sort(getComparator(order, orderBy)).map(row => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
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
