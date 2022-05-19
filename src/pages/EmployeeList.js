import React, {useState, useMemo, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {useTheme} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {useHistory, useLocation, Link as RouterLink} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {
  useFetchEmployeeQuery,
  useFetchEmployeesQuery,
  useFetchSimilarEmployeesQuery
} from '../slices/smartSkillsSlice';
import CustomPaginationActionsTable from '../components/table/CustomPaginationActionsTable';
import PageTitle from '../components/PageTitle';
import {PagePanel} from '../components/PagePanel';
import ErrorFallback from '../components/ErrorFallback';
import {useStyles} from './styles';
import ChipsArray from '../components/ChipsArray';
import {
  getStringFieldComparator,
  simpleLocaleComparator,
  yesNo
  // transformSkillGroupsToArray,
} from '../utils/helpers';
// import AddEditNewSkillModal from '../components/modals_old/AddEditNewSkillModal';
import {useModal} from '../hooks/hooks';
import {employeeSkillLevels} from '../constants/common';

const EMPTY_VALUE = ' <Empty>';
const filterModes = {simple: {id: 1, label: 'Simple'}, extended: {id: 2, label: 'Extended'}};

const headCells = [
  {
    id: 'fullName',
    numeric: false,
    label: 'Full Name',
    searchable: true,
    width: '23%',
    customRender: ({ID, FirstName, LastName}) => (
      <Link component={RouterLink} underline="hover" to={`/employees/${ID}`}>
        {FirstName} {LastName}
      </Link>
    )
  },
  {
    id: 'Competency',
    numeric: false,
    label: 'Competency',
    filterable: true,
    width: '23%'
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
    width: '23%'
  },
  {
    id: 'Level',
    numeric: false,
    label: 'Level',
    filterable: true,
    width: '21%'
  },
  {
    id: 'isOnBench',
    numeric: false,
    label: 'Bench',
    filterable: true,
    width: '21%'
  }
];

export default function EmployeeList() {
  const theme = useTheme();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [similarEmployeeId, setSimilarEmployeeId] = useState(
    new URLSearchParams(location.search).get('similar') || ''
  );
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(similarEmployeeId || 'fullName');
  const [search, setSearch] = useState(new URLSearchParams(location.search).get('skill') || '');
  const [extendedFilter, setExtendedFilter] = useState(
    JSON.parse(localStorage.getItem('employeeFilters'))?.extendedFilter ?? []
  );
  const [filterMode, setFilterMode] = useState(
    extendedFilter.length > 0 ? filterModes.extended.id : filterModes.simple.id
  );

  // eslint-disable-next-line no-unused-vars
  const [filterToEdit, setFilterToEdit] = useState({level: '', skill: ''});
  const AddEditSkillModal = useModal();

  const filterKeys = useMemo(() => headCells.map(({id}) => id, [headCells]));
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem('employeeFilters'))?.filters ??
      filterKeys.reduce(
        (obj, item) => ({
          ...obj,
          [item]: []
        }),
        {}
      )
  );

  localStorage.setItem('employeeFilters', JSON.stringify({filters, extendedFilter}));

  // const onExtendedFilterChange = ({filterToChange, data}) => {
  //   if (filterToChange) {
  //     setExtendedFilter(
  //       extendedFilter.map(f => {
  //         if (f.name === filterToChange) {
  //           f.name = data[0].skill;
  //           f.level = data[0].level;
  //         }
  //         return f;
  //       })
  //     );
  //   } else {
  //     const newFilters = data.map(({skill, level}, i) => ({
  //       key: extendedFilter.length + i,
  //       name: skill,
  //       level
  //     }));
  //     setExtendedFilter([...newFilters, ...extendedFilter]);
  //   }
  //
  //   setFilterToEdit({level: '', skill: ''});
  // };

  const onChipClick = ({level, skill}) => {
    setFilterToEdit({level, skill});
    AddEditSkillModal.toggle();
  };

  const onFilterModeChange = e => {
    setFilterMode(+e.target.value);
  };

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const {data: employeeDetails = {}, isLoading: employeeLoading} = useFetchEmployeeQuery({
    id: similarEmployeeId
  });

  const {data: employees = [], isLoading: isEmployeesLoading} = useFetchEmployeesQuery({
    ids: 'all',
    groups: true
  });

  const {data: similarEmployeesIds = [], isLoading: isSimilarLoading} =
    useFetchSimilarEmployeesQuery({
      similar: similarEmployeeId
    });

  const similarEmployees = useMemo(() => {
    if (similarEmployeesIds.length > 0) {
      filters.fullName = [];
      setFilters({...filters});
      const similar = [];
      similarEmployeesIds.forEach(id => {
        const foundSimilar = employees.find(row => row.ID === id);
        if (foundSimilar) similar.push(foundSimilar);
      });
      return similar;
    }
    return [];
  }, [similarEmployeesIds]);

  const data = similarEmployeeId ? similarEmployees : employees;

  let rows = useMemo(
    () =>
      [...data]
        .map(item => ({
          ...item,
          fullName: `${item.FirstName} ${item.LastName}`,
          isOnBench: yesNo(item.isOnBench)
        }))
        .sort(getStringFieldComparator(order, orderBy)),
    [data, order, orderBy]
  );

  const getFilteredData = filter => {
    let filteredData = rows.filter(row =>
      filterKeys.every(
        key =>
          (typeof filter[key] === 'string' &&
            row[key].toLowerCase().includes(filter[key].toLowerCase())) ||
          filter[key].includes(row[key]) ||
          (filter[key].includes(EMPTY_VALUE) && !row[key]) ||
          filter[key].length === 0
      )
    );
    if (extendedFilter.length > 0) {
      // TODO:add extended filter logic
      const rowsByExtendedFilter = [];
      filteredData.forEach(row => {
        let numberOfMatches = 0;

        extendedFilter.forEach(f => {
          const findBySkillAndLevel = skill =>
            Object.keys(skill)[0] === f.name && Object.values(skill)[0] === f.level;
          const findBySkillAndAllLevels = skill =>
            Object.keys(skill)[0] === f.name &&
            [...employeeSkillLevels.keys()]
              .filter(l => l !== 'None')
              .includes(Object.values(skill)[0]);

          const skillFound = row.Skills.find(
            f.level === 'All' ? findBySkillAndAllLevels : findBySkillAndLevel
          );

          if (skillFound) {
            numberOfMatches += 1;
          }
        });

        if (numberOfMatches === extendedFilter.length) {
          rowsByExtendedFilter.push(row);
        }
      });
      filteredData = rowsByExtendedFilter;
    }
    return filteredData;
  };

  const setDynamicValues = (values, filterName) => {
    values[filterName].clear();
    const filtersCopy = {...filters};
    filtersCopy[filterName] = [];

    const valuesForDynamicFilter = getFilteredData(filtersCopy);
    valuesForDynamicFilter.forEach(item => {
      values[filterName].add(item[filterName]);
    });
  };

  const filterValues = useMemo(() => {
    const values = rows.reduce(
      (acc, current) => {
        filterKeys.forEach(key => {
          acc[key].add(current[key] ?? EMPTY_VALUE);
        });
        return acc;
      },
      filterKeys.reduce((o, key) => ({...o, [key]: new Set()}), {})
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
  }, [filters.Competency, filters.PrimarySpecialization, rows, filterKeys]);

  const handleChange = key => e => {
    const {value} = e.target;
    filters[key] = value;
    setFilters({...filters});
  };

  const cleanAllHandler = () => {
    document.getElementById('filter-table-head-form').reset();
    filterKeys.forEach(key => {
      filters[key] = [];
    });
    setFilters({...filters});
    setSearch('');
    history.push('/employees');
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
      search: searchParams.toString()
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

  const SimilarEngineer = () => {
    const {
      FirstName = '',
      LastName = '',
      Competency,
      Level,
      PrimarySpecialization,
      isOnBench
    } = employeeDetails;

    const onCloseClick = () => {
      history.push('/employees');
      setSimilarEmployeeId('');
      setFilterMode(filterModes.simple.id);
      setExtendedFilter([]);
    };

    return (
      <>
        {similarEmployeeId && (
          <Paper classes={{root: classes.similarEngineerPaper}}>
            {employeeLoading ? (
              <CircularProgress disableShrink />
            ) : (
              <>
                <Grid container>
                  <Grid item xs={11}>
                    <Typography color="gray">Showing engineers similar to:</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="flex-end">
                    <IconButton onClick={onCloseClick}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                <Typography variant="h4">{`${FirstName} ${LastName}`}</Typography>

                <Box className={classes.similarEngineerDetails}>
                  <Typography>
                    Specialization: <b>{PrimarySpecialization}</b>
                  </Typography>
                  <Typography>
                    Competency: <b>{Competency}</b>
                  </Typography>
                  <Typography>
                    Level: <b>{Level}</b>
                  </Typography>
                  <Typography>
                    Is on bench: <b>{yesNo(isOnBench)}</b>
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        )}
      </>
    );
  };

  const FilterSelect = ({id, name = id, ...props}) => (
    <FormControl style={{width: '100%'}}>
      <Select
        {...props}
        value={filters[id]}
        displayEmpty
        multiple={true}
        onChange={handleChange(id)}
        style={{width: '100%', height: '40px'}}
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
        <MenuItem
          key="select-all"
          value={id === name ? `-- ${name} Name --` : `-- ${name} --`}
          disabled
        >
          {id === name ? `-- ${name} Name --` : `-- ${name} --`}
        </MenuItem>
        {[...filterValues[id]].sort(simpleLocaleComparator).map(item => (
          <MenuItem key={item} value={item}>
            {item || EMPTY_VALUE}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  FilterSelect.propTypes = {id: PropTypes.string, name: PropTypes.string};

  useEffect(() => {
    if (similarEmployeeId) {
      setOrderBy('');
    } else {
      setOrderBy('fullName');
    }
  }, [similarEmployeeId]);

  return (
    <>
      <PageTitle title="Employees List" />
      <Typography variant={'h4'} component="h1" margin="24px 0">
        Employee List
      </Typography>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SimilarEngineer />

        <PagePanel>
          <Box
            sx={{
              borderBottom: `1px solid ${theme.palette.primary.separator}`,
              padding: '10px 20px 20px'
            }}
            data-cy="employee-filter-block"
          >
            <Typography color="gray">Search by Skills</Typography>

            <FormControl>
              <RadioGroup
                classes={{root: classes.employeeListRadioContainer}}
                row
                value={filterMode}
                onChange={onFilterModeChange}
              >
                <FormControlLabel
                  value={filterModes.simple.id}
                  control={<Radio />}
                  label={filterModes.simple.label}
                />
                <FormControlLabel
                  value={filterModes.extended.id}
                  control={<Radio />}
                  label={filterModes.extended.label}
                />
              </RadioGroup>
            </FormControl>

            {filterMode === filterModes.extended.id && (
              <ChipsArray
                chipData={extendedFilter}
                setChipData={setExtendedFilter}
                {...{onChipClick}}
              />
            )}

            {/* {filterMode === filterModes.extended.id && (  */}
            {/*  <AddEditNewSkillModal */}
            {/*    employees={data} */}
            {/*    onSubmit={onExtendedFilterChange} */}
            {/*    {...AddEditSkillModal} */}
            {/*    {...filterToEdit} */}
            {/*  />  */}
            {/* )}  */}

            {filterMode === filterModes.simple.id && (
              <Box>
                <TextField
                  id="skill-search-input"
                  variant="standard"
                  placeholder="Search by"
                  onChange={e => handleSkillsSearch(e.target.value)}
                  value={search}
                  style={{width: '300px'}}
                  InputLabelProps={{shrink: true}}
                />
              </Box>
            )}

            <form id="filter-table-head-form">
              <Grid container spacing={2} sx={{paddingTop: '20px'}}>
                <Grid item xs={6} md={2}>
                  <TextField
                    id="employee-name-input"
                    value={filters.fullName}
                    size="small"
                    placeholder="Search by Full Name"
                    onChange={e => {
                      filters.fullName = e.target.value;
                      setFilters({...filters});
                    }}
                    style={{width: '100%'}}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FilterSelect data-cy="employee-select-competency" id="Competency" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FilterSelect
                    data-cy="employee-select-specialization"
                    id="PrimarySpecialization"
                    name="Primary Specialization"
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <FilterSelect data-cy="employee-select-level" id="Level" />
                </Grid>
                <Grid item xs={6} md={2}>
                  <FilterSelect id="isOnBench" name="Is On Bench" />
                </Grid>
                <Grid item xs={6} md={1}>
                  <Link
                    underline="none"
                    data-cy="employee-cleanup-btn"
                    onClick={cleanAllHandler}
                    style={{
                      margin: 0,
                      lineHeight: '38px',
                      fontWeight: 500
                    }}
                  >
                    Clean up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box sx={{padding: '0 20px'}}>
            <CustomPaginationActionsTable
              data-cy="employee-list-table"
              rows={getFilteredData(filters)}
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onSortHandler={onSortHandler}
              isLoading={isEmployeesLoading || isSimilarLoading}
            />
          </Box>
        </PagePanel>
      </ErrorBoundary>
    </>
  );
}
