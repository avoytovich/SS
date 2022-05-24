import React, {useState, useMemo} from 'react';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link as RouterLink, useHistory, useParams} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Button, SvgIcon} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import {ErrorBoundary} from 'react-error-boundary';
import HelmetWrapper from '../components/HelmetWrapper';
import {PagePanel} from '../components/PagePanel';
import ErrorFallback from '../components/ErrorFallback';
import {useFetchEmployeeQuery, useFetchSkillGroupsQuery} from '../slices/smartSkillsSlice';
import {
  getComparator,
  yesNo,
  stringToColor,
  transformLevelForSort,
  getValueByKeyFromMap
} from '../utils/helpers';

import {useStyles} from './styles';
import CustomPaginationActionsTable from '../components/table/CustomPaginationActionsTable';
import {employeeSkillLevels} from '../constants/common';

const headCells = [
  {
    id: 'skill',
    numeric: false,
    filterable: true,
    label: 'Skill Name',
    width: '75%'
  },
  {
    id: 'level',
    numeric: false,
    filterable: true,
    label: 'Seniority',
    width: '25%'
  }
];

export default function EmployeeDetails() {
  const theme = useTheme();
  const classes = useStyles();
  const {employeeId} = useParams();
  const history = useHistory();
  const [showUnfilledSkills, setShowUnfilledSkills] = useState(true);
  const [showUnfilledGroups, setShowUnfilledGroups] = useState(false);
  const [techMatrixChecked, setTechMatrixChecked] = useState(true);
  const [employeesDBChecked, setEmployeesDBChecked] = useState(true);
  const [projectsInfoChecked, setProjectsInfoChecked] = useState(false);
  const [selectedSkillGroup, setSelectedSkillGroup] = useState(null);
  const [order, setOrder] = useState(['desc', 'asc']);
  const [orderBy, setOrderBy] = useState(['level', 'skill']);

  const onSortHandler = (event, property) => {
    const isAsc =
      (Array.isArray(orderBy) ? orderBy[0] : orderBy) === property &&
      (Array.isArray(order) ? order[0] : order) === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const {data: employeeDetails = {}, isLoading: employeeLoading} = useFetchEmployeeQuery({
    id: employeeId
  });
  const {data: skillGroups = [], isLoading: skillsLoading} = useFetchSkillGroupsQuery();
  const isLoading = employeeLoading || skillsLoading;

  const {
    ID,
    FirstName = '',
    LastName = '',
    Competency,
    Level,
    PrimarySpecialization,
    isOnBench,
    SkillGroups: employeeSkillGroups = []
  } = employeeDetails;

  const fullName = `${FirstName} ${LastName}`;

  const stringAvatar = (id, firstName, lastName) => ({
    sx: {
      bgcolor: stringToColor(id)
    },
    children: `${firstName[0]}${lastName[0]}`
  });

  // set whole skillGroups List with total count
  // and number of skills which are selected for employee
  const unfilledSkillGroups = useMemo(
    () =>
      skillGroups.map(({Name, Skills}) => {
        // find whether employee has current skillGroup
        const employeeSkillGroup = employeeSkillGroups.find(
          ({Name: employeeSkillGroupName}) =>
            employeeSkillGroupName === Name || employeeSkillGroupName === `${Name} skills`
        );
        // set new array to render actual list of skillGroups
        return {
          name: Name,
          totalCount: Skills.length,
          skills: Skills,
          employeesSkillsCount: employeeSkillGroup
            ? Skills.filter(skill =>
                employeeSkillGroup.Skills.map(sk => Object.keys(sk))[0].includes(skill)
              ).length
            : 0
        };
      }),
    [employeeDetails, skillGroups]
  );

  const filledSkillGroups = useMemo(
    () => unfilledSkillGroups.filter(s => s.employeesSkillsCount > 0),
    [unfilledSkillGroups]
  );

  const skillGroupsList = showUnfilledGroups ? unfilledSkillGroups : filledSkillGroups;

  // set an array of employee's skills according to selected skillGroup
  const employeeSkillsList = useMemo(
    () =>
      [...employeeSkillGroups]
        .filter(({Name}) => Name === selectedSkillGroup || Name === `${selectedSkillGroup} skills`)
        .map(({Skills}) => [...Skills])
        .flat()[0],
    [selectedSkillGroup, employeeDetails]
  );

  const fullSkillList = useMemo(
    () =>
      skillGroups
        .filter(({Name}) => Name === selectedSkillGroup)
        .map(({Skills}) => [...Skills])
        .flat()
        .map(skill => {
          const employeeSkill =
            employeeSkillsList &&
            Object.entries({...employeeSkillsList}).find(
              sk => sk[0] === skill || sk[0] === `${skill} skills`
            );
          return {
            skill,
            level: employeeSkill ? employeeSkill[1] : 'None'
          };
        })
        .filter(({level}) => showUnfilledSkills || (!showUnfilledSkills && level !== 'None')),
    [skillGroups, selectedSkillGroup, showUnfilledSkills]
  );

  const rows = useMemo(
    () =>
      [...fullSkillList]
        .map(item => transformLevelForSort(item))
        .sort(getComparator(order, orderBy))
        .map(item => {
          item.level = getValueByKeyFromMap(employeeSkillLevels, item.level);
          return item;
        }),
    [fullSkillList, order, orderBy]
  );

  const noEmployeeSkillsError =
    selectedSkillGroup === null ? (
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <SvgIcon sx={{mr: 1}} component={WarningAmberIcon} color={'warning'} />
        <Typography>Please choose skill group to see employee&apos;s skills</Typography>
      </Box>
    ) : (
      !fullSkillList.length && (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <SvgIcon sx={{mr: 1}} component={WarningAmberIcon} color={'warning'} />
          <Typography>
            This employee doesn&apos;t have any filled skills in selected skill group
          </Typography>
        </Box>
      )
    );

  return (
    <>
      <HelmetWrapper title={fullName} />
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Breadcrumbs aria-label="breadcrumb" separator="">
            <a data-cy="employee-details-backBtn" onClick={history.goBack}>
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
        </Grid>

        <Grid display="flex" alignItems="center" item xs={2}>
          <Button
            component={RouterLink}
            to={`/employees?similar=${ID}`}
            color="info"
            variant="contained"
          >
            Find similar engineer
          </Button>
        </Grid>
      </Grid>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel data-cy="employee-details-page">
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
                  flex: '0 1 0'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant={'employeeDetailsSettingsTitle'}>Details</Typography>
                    <Box data-cy="employee-details-block">
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
                          data-cy="employee-details-show-unfilled-skills"
                          checked={showUnfilledSkills}
                          onChange={() => setShowUnfilledSkills(!showUnfilledSkills)}
                        />
                      }
                      label="Show unfilled skills"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          data-cy="employee-details-show-unfilled-skill-groups"
                          checked={showUnfilledGroups}
                          onChange={() => setShowUnfilledGroups(!showUnfilledGroups)}
                        />
                      }
                      label="Show unfilled groups"
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
              <Grid container spacing={2} sx={{padding: '36px 0 20px', flexGrow: 1}}>
                <Grid
                  item
                  xs={6}
                  sx={{borderRight: `1px solid ${theme.palette.primary.separator}`}}
                  className={classes.flexColumn}
                >
                  <Typography variant="employeeSkillsTitle">Skill Group</Typography>
                  <Box className={classes.parentScrollContainer}>
                    <Box data-cy="employee-details-skill-group" className={classes.parentScroll}>
                      {skillGroupsList.map(({name, employeesSkillsCount, totalCount}) => (
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
                <Grid
                  data-cy="employee-details-skill-list-grid"
                  item
                  xs={6}
                  className={classes.flexColumn}
                >
                  {noEmployeeSkillsError ? (
                    <Typography variant={'employeeSkill'} component={'p'}>
                      {noEmployeeSkillsError}
                    </Typography>
                  ) : (
                    <>
                      <Box className={classes.parentScrollContainer}>
                        <Box className={classes.parentScroll}>
                          <CustomPaginationActionsTable
                            data-cy="employee-details-skill-list"
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
