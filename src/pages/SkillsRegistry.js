import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import { getComparator } from '../common/helpers';
import { useFindSkillsQuery } from '../slices/smartSkillsSlice';
import CustomPaginationActionsTable from '../components/table/CustomPaginationActionsTable';
import PageTitle from '../components/PageTitle';
import { PagePanel } from '../components/PagePanel';

const headCells = [
  {
    id: 'ID',
    numeric: true,
    label: 'ID',
    width: '10%',
  },
  {
    id: 'Group',
    numeric: false,
    label: 'Skills Group',
    width: '35%',
  },
  {
    id: 'Name',
    numeric: false,
    label: 'Skill Name',
    customRender: row => <Link underline="hover"
      href={`/skills/${row.Name}`}>
      {row.Name}
    </Link>,
    width: '43%',
  },
  {
    id: 'EngineersCount',
    numeric: true,
    label: '# Engineers',
    width: '12%',
  },
];

export default function SkillsRegistry() {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [skillGroupName, setSkillGroupName] = React.useState('all');
  const [skillName, setSkillName] = React.useState('');

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const cleanFilters = () => {
    setSkillGroupName('all');
    setSkillName('');
  };

  const { data: { data = [] } = {}, isLoading } = useFindSkillsQuery('all');

  let rows = useMemo(() => [...data]
    .sort(getComparator(order, orderBy)), [data, order, orderBy]);

  const filterSkills = skillsList => {
    let filteredSkills = [...skillsList];
    if (skillGroupName !== 'all') {
      filteredSkills = filteredSkills
        .filter(({ Group }) => Group === skillGroupName);
    }
    if (skillName) {
      filteredSkills = filteredSkills
        .filter(({ Name }) => Name.includes(skillName));
    }
    return filteredSkills;
  };

  const skillsGroupNameList = data.map(({ Group }) => Group);
  const skillsGroupNameListOption = [...new Set(skillsGroupNameList)]
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  rows = filterSkills(rows);

  return (
    <>
      <PageTitle title="Skills Registry" />
      <Typography variant="h4" component="h1" margin='24px 0'>
        Skills Registry
      </Typography>
      <PagePanel>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          borderBottom: `1px solid ${theme.palette.primary.separator}`,
          padding: '10px 10px 20px',
        }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="skill-group-name">Filter by</InputLabel>
            <Select
              labelId="skill-group-name"
              id="skill-group-name"
              value={skillGroupName}
              onChange={event => setSkillGroupName(event.target.value)}
            >
              <MenuItem key="select-all" value="all">
                -- Skill Group Name --
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
              placeholder="Skill Name"
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
                marginTop: '30px',
                verticalAlign: 'middle',
                marginLeft: '10px',
                fontWeight: 500,
              }}
              underline="none"
              onClick={cleanFilters}>
              Clean Up
            </Link>
          </FormControl>
        </Box>
        <Box sx={{ padding: '0 20px' }}>
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
      </PagePanel>
    </>
  );
}
