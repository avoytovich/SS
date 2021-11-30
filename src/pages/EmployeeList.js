import React, { useState, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useFetchEmployeesQuery } from '../slices/smartSkillsSlice';
import { getStringFieldComparator, simpleLocaleComparator } from '../common/helpers';
import CustomPaginationActionsTable from '../components/table/CustomPaginationActionsTable';
import PageTitle from '../components/PageTitle';
import { PagePanel } from '../components/PagePanel';
import ErrorFallback from '../components/ErrorFallback';

const EMPTY_VALUE = ' <Empty>';

const headCells = [
  {
    id: 'fullName',
    numeric: false,
    label: 'Full Name',
    searchable: true,
    width: '23%',
    customRender: ({ ID, FirstName, LastName }) => (
      <Link component={RouterLink} underline="hover" to={`/employees/${ID}`}>
        {FirstName} {LastName}
      </Link>
    ),
  },
  {
    id: 'Competency',
    numeric: false,
    label: 'Competency',
    filterable: true,
    width: '23%',
  },
  {
    id: 'PrimarySpecialization',
    numeric: false,
    label: 'Primary Specialization',
    filterable: true,
    customRender: row => (
      <Link
        underline="hover"
        component={RouterLink}
        to={`/skills/${encodeURIComponent(row.PrimarySpecialization)}`}
      >
        {row.PrimarySpecialization}
      </Link>
    ),
    width: '23%',
  },
  {
    id: 'Level',
    numeric: false,
    label: 'Level',
    filterable: true,
    width: '21%',
  },
];

export default function EmployeeList() {
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullName');
  const [search, setSearch] = useState(new URLSearchParams(location.search).get('skill') || '');

  const filterKeys = useMemo(() => headCells.map(({ id }) => id, [headCells]));
  const [filters, setFilters] = useState(
    filterKeys.reduce(
      (obj, item) => ({
        ...obj,
        [item]: [],
      }),
      {}
    )
  );

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { data = [], isLoading } = useFetchEmployeesQuery({
    ids: 'all',
    groups: true,
  });

  let rows = useMemo(
    () =>
      [...data]
        .map(item => ({ ...item, fullName: `${item.FirstName} ${item.LastName}` }))
        .sort(getStringFieldComparator(order, orderBy)),
    [data, order, orderBy]
  );

  const getFilteredData = filter =>
    rows.filter(row =>
      filterKeys.every(
        key =>
          (typeof filter[key] === 'string' &&
            row[key].toLowerCase().includes(filter[key].toLowerCase())) ||
          filter[key].includes(row[key]) ||
          (filter[key].includes(EMPTY_VALUE) && !row[key]) ||
          filter[key].length === 0
      )
    );

  const setDynamicValues = (values, filterName) => {
    values[filterName].clear();
    const filtersCopy = { ...filters };
    filtersCopy[filterName] = [];

    const valuesForDynamicFilter = getFilteredData(filtersCopy);
    valuesForDynamicFilter.forEach(item => {
      values[filterName].add(item[filterName]);
    });
  };

  const filterValues = useMemo(() => {
    const values = data.reduce(
      (acc, current) => {
        filterKeys.forEach(key => {
          acc[key].add(current[key] ?? EMPTY_VALUE);
        });
        return acc;
      },
      filterKeys.reduce((o, key) => ({ ...o, [key]: new Set() }), {})
    );

    if (filters.Competency.length > 0) {
      setDynamicValues(values, 'PrimarySpecialization');
    }
    if (filters.PrimarySpecialization.length > 0) {
      setDynamicValues(values, 'Competency');
    }
    if (filters.Competency.length > 0 || filters.PrimarySpecialization.length > 0) {
      setDynamicValues(values, 'Level');
    }
    return values;
  }, [filters.Competency, filters.PrimarySpecialization, data, filterKeys]);

  const handleChange = key => e => {
    const { value } = e.target;
    filters[key] = value;
    setFilters({ ...filters });
  };

  const cleanAllHandler = () => {
    document.getElementById('filter-table-head-form').reset();
    filterKeys.forEach(key => {
      filters[key] = [];
    });
    setFilters({ ...filters });
  };

  const handleSkillsSearch = value => {
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

  if (search) {
    rows = rows.filter(row =>
      search
        .toLowerCase()
        .split(',')
        .some(skill =>
          (row.Skills || []).some(item => Object.keys(item)[0].toLowerCase().includes(skill))
        )
    );
  }

  const FilterSelect = ({ id, name = id }) => (
    <FormControl style={{ width: '100%' }}>
      <Select
        value={filters[id]}
        displayEmpty
        multiple={true}
        onChange={handleChange(id)}
        style={{ width: '100%', height: '40px' }}
        renderValue={selected => {
          if (selected.length === 0) {
            return (
              <MenuItem disabled value="">
                -- Select All --
              </MenuItem>
            );
          }
          return selected.map(filter => filter || EMPTY_VALUE).join(', ');
        }}
      >
        <MenuItem key="select-all" value={`-- ${name} Name --`} disabled>
          -- {name} Name --
        </MenuItem>
        {[...filterValues[id]].sort(simpleLocaleComparator).map(item => (
          <MenuItem key={item} value={item}>
            {item || EMPTY_VALUE}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  FilterSelect.propTypes = { id: PropTypes.string, name: PropTypes.string };

  return (
    <>
      <PageTitle title="Employees List" />
      <Typography variant={'h4'} component="h1" margin="24px 0">
        Employee List
      </Typography>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <Box
            sx={{
              borderBottom: `1px solid ${theme.palette.primary.separator}`,
              padding: '10px 20px 20px',
            }}
          >
            <TextField
              id="skill-search-input"
              label="Search by Skills"
              variant="standard"
              placeholder="Search by"
              onChange={e => handleSkillsSearch(e.target.value)}
              value={search}
              style={{ width: '300px' }}
              InputLabelProps={{ shrink: true }}
            />
            <form id="filter-table-head-form">
              <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
                <Grid item xs={6} md={3}>
                  <TextField
                    defaultValue=""
                    size="small"
                    placeholder="Search by Full Name"
                    onChange={e => {
                      filters.fullName = e.target.value;
                      setFilters({ ...filters });
                    }}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FilterSelect id="Competency" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FilterSelect id="PrimarySpecialization" name="Primary Specialization" />
                </Grid>
                <Grid item xs={6} md={2}>
                  <FilterSelect id="Level" />
                </Grid>
                <Grid item xs={6} md={1}>
                  <Link
                    underline="none"
                    onClick={cleanAllHandler}
                    style={{
                      margin: 0,
                      lineHeight: '38px',
                      fontWeight: 500,
                    }}
                  >
                    Clean up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box sx={{ padding: '0 20px' }}>
            <CustomPaginationActionsTable
              rows={getFilteredData(filters)}
              headCells={headCells}
              rowsPerPage={25}
              order={order}
              orderBy={orderBy}
              onSortHandler={onSortHandler}
              isLoading={isLoading}
            />
          </Box>
        </PagePanel>
      </ErrorBoundary>
    </>
  );
}
