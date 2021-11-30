import React, { useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { SvgIcon } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { ErrorBoundary } from 'react-error-boundary';
import PageTitle from '../components/PageTitle';
import { PagePanel } from '../components/PagePanel';
import ErrorFallback from '../components/ErrorFallback';
import { useFetchEmployeeQuery, useFetchSkillGroupsQuery } from '../slices/smartSkillsSlice';
import { getComparator, yesNo, stringToColor } from '../common/helpers';

import { useStyles } from './styles';
import CustomPaginationActionsTable from '../components/table/CustomPaginationActionsTable';

const levels = { 0: 'None', 1: 'Basic', 2: 'Intermediate', 3: 'Advanced', 4: 'Expert' };

const headCells = [
  {
    id: 'skill',
    numeric: false,
    filterable: true,
    label: 'Skill Name',
    width: '50%',
  },
  {
    id: 'level',
    numeric: false,
    filterable: true,
    label: 'Seniority',
    width: '25%',
  },
];

export default function EmployeeDetails() {
  const theme = useTheme();
  const classes = useStyles();
  const { employeeId } = useParams();
  const history = useHistory();
  const [showUnfilledSkills, setShowUnfilledSkills] = useState(true);
  const [techMatrixChecked, setTechMatrixChecked] = useState(true);
  const [employeesDBChecked, setEmployeesDBChecked] = useState(true);
  const [projectsInfoChecked, setProjectsInfoChecked] = useState(false);
  const [selectedSkillGroup, setSelectedSkillGroup] = useState(null);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('level');

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { data: employeeDetails = {}, isLoading: employeeLoading } = useFetchEmployeeQuery({
    id: employeeId,
  });
  const { data: skillGroups = [], isLoading: skillsLoading } = useFetchSkillGroupsQuery();
  const isLoading = employeeLoading || skillsLoading;

  const {
    ID,
    FirstName = '',
    LastName = '',
    Competency,
    Level,
    PrimarySpecialization,
    isOnBench,
    SkillGroups: employeeSkillGroups = [],
  } = employeeDetails;

  const fullName = `${FirstName} ${LastName}`;

  const stringAvatar = (id, firstName, lastName) => ({
    sx: {
      bgcolor: stringToColor(id),
    },
    children: `${firstName[0]}${lastName[0]}`,
  });

  // set whole skillGroups List with total count
  // and number of skills which are selected for employee
  const skillGroupsList = useMemo(
    () =>
      skillGroups.map(({ Name, Skills }) => {
        // find whether employee has current skillGroup
        const employeeSkillGroup = employeeSkillGroups.find(
          ({ Name: employeeSkillGroupName }) =>
            employeeSkillGroupName === Name || employeeSkillGroupName === `${Name} skills`
        );
        // set new array to render actual list of skillGropus
        return {
          name: Name,
          totalCount: Skills.length,
          skills: Skills,
          employeesSkillsCount: employeeSkillGroup
            ? Skills.filter(skill =>
                employeeSkillGroup.Skills.map(sk => Object.keys(sk))[0].includes(skill)
              ).length
            : 0,
        };
      }),
    [employeeDetails, skillGroups]
  );

  // set an array of employee's skills according to selected skillGroup
  const employeeSkillsList = useMemo(
    () =>
      [...employeeSkillGroups]
        .filter(
          ({ Name }) => Name === selectedSkillGroup || Name === `${selectedSkillGroup} skills`
        )
        .map(({ Skills }) => [...Skills])
        .flat()[0],
    [selectedSkillGroup, employeeDetails]
  );

  const fullSkillList = useMemo(
    () =>
      skillGroups
        .filter(({ Name }) => Name === selectedSkillGroup)
        .map(({ Skills }) => [...Skills])
        .flat()
        .map(skill => {
          const employeeSkill =
            employeeSkillsList &&
            Object.entries({ ...employeeSkillsList }).find(
              sk => sk[0] === skill || sk[0] === `${skill} skills`
            );
          return {
            skill,
            level: employeeSkill ? employeeSkill[1] : 'None',
          };
        })
        .filter(({ level }) => showUnfilledSkills || (!showUnfilledSkills && level !== 'None')),
    [skillGroups, selectedSkillGroup, showUnfilledSkills]
  );

  const transformLevelForSort = item => {
    switch (item.level) {
      case 'Basic':
        item.level = 1;
        break;
      case 'Intermediate':
        item.level = 2;
        break;
      case 'Advanced':
        item.level = 3;
        break;
      case 'Expert':
        item.level = 4;
        break;
      default:
        item.level = 0;
    }
    return item;
  };

  const rows = useMemo(
    () =>
      [...fullSkillList]
        .map(item => transformLevelForSort(item))
        .sort(getComparator(order, orderBy))
        .map(item => {
          item.level = levels[item.level];
          return item;
        }),
    [fullSkillList, order, orderBy]
  );

  const noEmployeeSkillsError =
    selectedSkillGroup === null ? (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SvgIcon sx={{ mr: 1 }} component={WarningAmberIcon} color={'warning'} />
        <Typography>Please choose skill group to see employee&apos;s skills</Typography>
      </Box>
    ) : (
      !fullSkillList.length && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SvgIcon sx={{ mr: 1 }} component={WarningAmberIcon} color={'warning'} />
          <Typography>
            This employee doesn&apos;t have any filled skills in selected skill group
          </Typography>
        </Box>
      )
    );

  return (
    <>
      <PageTitle title={fullName} />
      <Breadcrumbs aria-label="breadcrumb" separator="">
        <a onClick={history.goBack}>
          <Typography>
            <ArrowBackIcon />
          </Typography>
        </a>
        <Typography variant={'h4'}>
          {ID && <Avatar {...stringAvatar(ID, FirstName, LastName)} />}
          &nbsp;
          {fullName}
        </Typography>
      </Breadcrumbs>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          {isLoading ? (
            <Box className={classes.centerContent}>
              <CircularProgress disableShrink />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  borderBottom: `1px solid ${theme.palette.primary.separator}`,
                  padding: '10px 20px 20px',
                  flex: '0 1 0',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant={'employeeDetailsSettingsTitle'}>Details</Typography>
                    <Box>
                      <Typography>
                        Specialization: <strong>{PrimarySpecialization}</strong>
                      </Typography>
                      <Typography>
                        Competency: <strong>{Competency}</strong>
                      </Typography>
                      <Typography>
                        Level: <strong>{Level}</strong>
                      </Typography>
                      <Typography>
                        Is on bench: <strong>{yesNo(isOnBench)}</strong>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant={'employeeDetailsSettingsTitle'}>Setting</Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showUnfilledSkills}
                          onChange={() => setShowUnfilledSkills(!showUnfilledSkills)}
                        />
                      }
                      label="Show unfilled skills"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant={'employeeDetailsSettingsTitle'}>
                      Recommendations based on:
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={techMatrixChecked}
                          onChange={() => setTechMatrixChecked(!techMatrixChecked)}
                        />
                      }
                      label="Tech Matrix"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={employeesDBChecked}
                          onChange={() => setEmployeesDBChecked(!employeesDBChecked)}
                        />
                      }
                      label="Employees DB"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={projectsInfoChecked}
                          onChange={() => setProjectsInfoChecked(!projectsInfoChecked)}
                        />
                      }
                      label="Projects info"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Grid container spacing={2} sx={{ padding: '36px 0 20px', flexGrow: 1 }}>
                <Grid
                  item
                  xs={6}
                  sx={{ borderRight: `1px solid ${theme.palette.primary.separator}` }}
                  className={classes.flexColumn}
                >
                  <Typography variant="employeeSkillsTitle">Skill Group</Typography>
                  <Box className={classes.parentScrollContainer}>
                    <Box className={classes.parentScroll}>
                      {skillGroupsList.map(({ name, employeesSkillsCount, totalCount }) => (
                        <Typography
                          variant={`${
                            selectedSkillGroup === name
                              ? 'skillGroupNameSelected'
                              : 'skillGroupName'
                          }`}
                          component={'p'}
                          key={name}
                          onClick={() => setSelectedSkillGroup(name)}
                        >
                          {name}
                          <Typography variant={'skillsCount'}>
                            ({employeesSkillsCount}/{totalCount})
                          </Typography>
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.flexColumn}>
                  {noEmployeeSkillsError ? (
                    <Typography variant={'employeeSkill'} component={'p'}>
                      {noEmployeeSkillsError}
                    </Typography>
                  ) : (
                    <>
                      <Box className={classes.parentScrollContainer}>
                        <Box className={classes.parentScroll}>
                          <CustomPaginationActionsTable
                            rows={rows}
                            headCells={headCells}
                            order={order}
                            orderBy={orderBy}
                            onSortHandler={onSortHandler}
                            isLoading={isLoading}
                            showFooter={false}
                            stickyHeader
                          />
                        </Box>
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </PagePanel>
      </ErrorBoundary>
    </>
  );
}
