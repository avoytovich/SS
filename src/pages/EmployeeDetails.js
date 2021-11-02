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
import PageTitle from '../components/PageTitle';
import { PagePanel } from '../components/PagePanel';
import { useFetchEmployeeQuery, useFetchSkillGroupsQuery } from '../slices/smartSkillsSlice';

import { useStyles } from './styles';

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

  const { data: employeeDetails = {}, isLoading: employeeLoading } = useFetchEmployeeQuery({
    id: employeeId,
  });
  const { data: skillGroups = [], isLoading: skillsLoading } = useFetchSkillGroupsQuery();
  const isLoading = employeeLoading || skillsLoading;

  const {
    FirstName = '',
    LastName = '',
    Competency,
    Level,
    PrimarySpecialization,
    SkillGroups: employeeSkillGroups = [],
  } = employeeDetails;

  const fullName = `${FirstName} ${LastName}`;

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
        <Typography variant={'h4'}>{fullName}</Typography>
      </Breadcrumbs>
      <PagePanel>
        {isLoading ? (
          <Box style={{ justifyContent: 'center', margin: 'auto' }}>
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
                sx={{
                  borderRight: `1px solid ${theme.palette.primary.separator}`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="employeeSkillsTitle">Skill Group</Typography>
                <Box className={classes.parentScrollContainer}>
                  <Box className={classes.parentScroll}>
                    {skillGroupsList.map(({ name, employeesSkillsCount, totalCount }) => (
                      <Typography
                        variant={`${
                          selectedSkillGroup === name ? 'skillGroupNameSelected' : 'skillGroupName'
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
              <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                {noEmployeeSkillsError ? (
                  <Typography variant={'employeeSkill'} component={'p'}>
                    {noEmployeeSkillsError}
                  </Typography>
                ) : (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant={'employeeSkillsTitle'}>Skill Name</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant={'employeeSkillsTitle'}>Seniority</Typography>
                      </Grid>
                    </Grid>
                    <Box className={classes.parentScrollContainer}>
                      <Box className={classes.parentScroll}>
                        {fullSkillList.map(({ skill, level }, i) => (
                          <Grid container spacing={2} key={i}>
                            <Grid item xs={6}>
                              <Typography variant={'employeeSkill'} component={'p'} key={skill}>
                                {skill}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant={'employeeSkill'}
                                component={'p'}
                                key={`${level}-${i}`}
                              >
                                {level ?? 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                    </Box>
                  </>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </PagePanel>
    </>
  );
}
