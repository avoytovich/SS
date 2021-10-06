import React, { useState, useMemo, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory, useLocation } from 'react-router-dom';
import { useFetchEmployeesQuery } from '../slices/smartSkillsSlice';
import { getComparator } from '../common/helpers';
import CustomPaginationActionsTable
  from '../components/table/CustomPaginationActionsTable';
import PageTitle from '../components/PageTitle';

const headCells = [
  {
    id: 'fullName',
    numeric: false,
    label: 'Full Name',
    searchable: true,
    width: '30%',
  },
  {
    id: 'Competencies',
    numeric: false,
    label: 'Competency',
    filterable: true,
    width: '20%',
  },
  {
    id: 'PrimarySpecialization',
    numeric: false,
    label: 'Primary Specialization',
    filterable: true,
    customRender: row => <Link underline="hover"
      href={`/skills/${row.PrimarySpecialization}`}>
        {row.PrimarySpecialization}
    </Link>,
    width: '20%',
  },
  {
    id: 'Level',
    numeric: false,
    label: 'Level',
    filterable: true,
    width: '20%',
  },
];

export default function EmployeeList() {
  const searchInputRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullName');
  const [search, setSearch] = useState(new URLSearchParams(location.search).get('skill'));

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { data = [], isLoading } = useFetchEmployeesQuery({
    ids: 'all',
    groups: true,
  });

  let rows = useMemo(() => data
    .map(item => ({ ...item, fullName: `${item.LastName}, ${item.FirstName}` }))
    .sort(getComparator(order, orderBy)), [data, order, orderBy]);

  if (search) {
    rows = rows.filter(row => search.toLowerCase().split(',')
      .some(skill => row.Skills.some(item => item.toLowerCase().includes(skill))));
  }

  const handleSearchButtonClick = () => {
    const { value } = searchInputRef.current;
    setSearch(value);
    const searchParams = new URLSearchParams(location.search);
    if (value.length) {
      searchParams.set('skill', value);
    } else {
      searchParams.delete('skill');
    }
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <PageTitle title="Employees List" />
      <Box sx={{ my: 4 }} style={{ flex: 1 }}>
        <Typography variant={'h4'}>
          Employee List
        </Typography>
        <Box sx={{ marginTop: '20px', marginBottom: '10px' }}>
          <TextField
            label="Search by Skills"
            defaultValue={search}
            onChange={e => {
              searchInputRef.current.value = e.target.value;
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchButtonClick();
              }
            }}
            ref={searchInputRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchButtonClick}>
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
          />
        </Box>
      </Box>
    </>
  );
}
