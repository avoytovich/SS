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
import {
  ASC,
  DESC,
  getComparator,
  getLocaleComparator,
  simpleLocaleComparator,
} from '../common/helpers';
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
    customRender: row => <Link underline="hover"
      href={`/employees?skill=${row.Name}`}>
      {row.EngineersCount}
    </Link>,
  },
];

export default function SkillsRegistry() {
  const theme = useTheme();
  const [order, setOrder] = React.useState(ASC);
  const [orderBy, setOrderBy] = React.useState('ID');
  const [skillGroups, setSkillGroups] = React.useState([]);
  const [skillName, setSkillName] = React.useState('');

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === ASC;
    setOrder(isAsc ? DESC : ASC);
    setOrderBy(property);
  };

  const cleanFilters = () => {
    setSkillGroups([]);
    setSkillName('');
  };

  const { data: { data = [] } = {}, isLoading } = useFindSkillsQuery('all');

  const isOrderByFieldNumeric = headCells.find(({ id }) => id === orderBy).numeric;
  let rows = useMemo(() => [...data]
    .sort(isOrderByFieldNumeric
      ? getComparator(order, orderBy)
      : getLocaleComparator(order, orderBy)), [data, order, orderBy]);

  const filterSkills = skillsList => {
    let filteredSkills = [...skillsList];
    if (skillGroups.length !== 0) {
      filteredSkills = filteredSkills
        .filter(({ Group }) => skillGroups.includes(Group));
    }
    if (skillName) {
      filteredSkills = filteredSkills
        .filter(({ Name }) => Name.toLowerCase().includes(skillName.toLowerCase()));
    }
    return filteredSkills;
  };

  const handleSkillGroupsChange = e => {
    const { value } = e.target;
    setSkillGroups([...value]);
  };

  const skillsGroupNameList = data.map(({ Group }) => Group);
  const skillsGroupNameListOption = [...new Set(skillsGroupNameList)]
    .sort(simpleLocaleComparator);

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
           <FormControl variant="standard" sx={{ m: 1, width: 220 }}>
             <InputLabel variant="fixed">Filter by</InputLabel>
             <Select
              label="Filter by"
              id="skill-group-name"
              displayEmpty
              multiple={true}
              value={skillGroups}
              onChange={handleSkillGroupsChange}
              style={{ width: '100%', height: '40px' }}
              renderValue={selected => {
                if (selected.length === 0) {
                  return <MenuItem disabled value="" className='placeholder'>
                    -- Skill Group Name --
                  </MenuItem>;
                }
                return selected.join(', ');
              }}
            >
               <MenuItem key="select-all" value="-- Skill Group Name --" disabled>
                -- Skill Group Name --
               </MenuItem>
              {skillsGroupNameListOption
                .sort(simpleLocaleComparator)
                .map(skillsGroupName => <MenuItem
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
