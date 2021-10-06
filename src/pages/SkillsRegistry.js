import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { getComparator } from '../common/helpers';
import { useFindSkillsQuery } from '../slices/smartSkillsSlice';
import CustomPaginationActionsTable from '../components/table/CustomPaginationActionsTable';
import PageTitle from '../components/PageTitle';

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
    customRender: row => <Link underline="hover"
      href={`/skills/${row.SkillName}`}>
      {row.SkillName}
    </Link>,
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

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const cleanFilters = () => {
    setSkillGroupName('');
    setSkillName('');
  };

  const { data = [], isLoading } = useFindSkillsQuery('all');

  let rows = useMemo(() => [...data]
    .sort(getComparator(order, orderBy)), [data, order, orderBy]);

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

  const skillsGroupNameList = data.map(({ SkillGroupName }) => SkillGroupName);
  const skillsGroupNameListOption = [...new Set(skillsGroupNameList)];

  rows = filterSkills(rows);

  return (
    <>
      <PageTitle title="Skills Registry" />
      <Box sx={{ my: 4, flex: 1 }}>
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
                <MenuItem key="select-all" value="">
                  -- Select All --
                </MenuItem>
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
                sx={{
                  color: '#000',
                  fontSize: 12,
                  margin: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginLeft: '10px',
                  fontWeight: 'bold',
                }}
                underline="hover"
                onClick={cleanFilters}>
                Clean Up
              </Link>
            </FormControl>
          </Box>
          <Box sx={{ width: '80%' }}>
            <CustomPaginationActionsTable
              rows={rows}
              headCells={headCells}
              rowsPerPage={25}
              order={order}
              orderBy={orderBy}
              onSortHandler={onSortHandler}
              isLoading={isLoading}
              showFilteredColumn={false}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
