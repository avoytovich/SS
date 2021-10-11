import React, { useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import PageTitle from '../components/PageTitle';
import { PagePanel } from '../components/PagePanel';
import { useFetchEmployeeQuery, useFetchSkillGroupsQuery } from '../slices/smartSkillsSlice';

import Employee from '../mocks/employee.json';
import SkillGroups from '../mocks/skillsGroup.json';

export default function EmployeeDetails() {
  const { employeeId } = useParams();
  const theme = useTheme();
  const [showUnfilledSkills, setShowUnfilledSkills] = useState(true);
  const [techMatrixChecked, setTechMatrixChecked] = useState(true);
  const [employeesDBChecked, setEmployeesDBChecked] = useState(true);
  const [projectsInfoChecked, setProjectsInfoChecked] = useState(false);
  const [selectedSkillGroup, setSelectedSkillGroup] = useState(null);

  // TODO: 'data = employee' - mocked data
  const { data: employeeDetails = Employee } = useFetchEmployeeQuery({ id: employeeId });
  const { data: skillGroups = SkillGroups.SkillGroups } = useFetchSkillGroupsQuery();

  const {
    FirstName,
    LastName,
    Competency,
    Level,
    PrimarySpecialization,
  } = employeeDetails;

  const fullName = `${FirstName} ${LastName}`;

  // set whole skillGroups List with total count
  // and number of skills which are selected for employee
  const skillGroupsList = useMemo(() => skillGroups.map(({ Name, Skills }) => {
    // find whether employee has current skillGroup
    const employeeSkillGroup = employeeDetails.SkillGroups
      .find(({ Name: employeeSkillGroupName }) => employeeSkillGroupName === Name);
    // set new array to render actual list of skillGropus
    return {
      name: Name,
      totalCount: Skills.length,
      skills: Skills,
      employeesSkillsCount: employeeSkillGroup
        ? Skills.filter(skill => employeeSkillGroup.Skills
          .map(sk => Object.keys(sk))[0].includes(skill)).length
        : 0,
    };
  }), [employeeDetails, skillGroups]);

  // set an array of employee's skills according to selected skillGroup
  const employeeSkillsList = useMemo(() => [...employeeDetails.SkillGroups]
    .filter(({ Name }) => Name === selectedSkillGroup)
    .map(({ Skills }) => [...Skills])
    .flat()[0], [selectedSkillGroup, employeeDetails]);

  const fullSkillList = useMemo(() => skillGroups
    .filter(({ Name }) => Name === selectedSkillGroup)
    .map(({ Skills }) => [...Skills])
    .flat()
    .map(skill => {
      const employeeSkill = employeeSkillsList
        && Object.entries({ ...employeeSkillsList }).find(sk => sk[0] === skill);
      return {
        skill,
        level: employeeSkill
          ? employeeSkill[1]
          : 'None',
      };
    })
    .filter(({ level }) => showUnfilledSkills
      || (!showUnfilledSkills && level !== 'None')), [skillGroups, selectedSkillGroup, showUnfilledSkills]);

  const noEmployeeSkillsError = selectedSkillGroup === null
    ? 'Please choose skill group to see employee\'s skills'
    : !fullSkillList.length
      && 'This employee doesn\'t have any filled skills in selected skill group';

  return (
    <>
      <PageTitle title={fullName} />
      <Breadcrumbs aria-label="breadcrumb" separator="" margin='24px 0'>
        <a onClick={window.history.goBack}>
          <Typography>
            <ArrowBackIcon/>
          </Typography>
        </a>
        <Typography variant={'h4'}>{fullName}</Typography>
      </Breadcrumbs>
      <PagePanel>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.primary.separator}`,
          padding: '10px 20px 20px',
        }}>
          <Box>
            <Typography variant={'employeeDetailsSettingsTitle'}>Details</Typography>
            <Box>
              <Typography>Specialization: <strong>{PrimarySpecialization}</strong></Typography>
              <Typography>Competency: <strong>{Competency}</strong></Typography>
              <Typography>Level: <strong>{Level}</strong></Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant={'employeeDetailsSettingsTitle'}>Setting</Typography>
            <FormControlLabel control={
              <Checkbox
                checked={showUnfilledSkills}
                onChange={() => setShowUnfilledSkills(!showUnfilledSkills)} />
            } label="Show unfilled skills" />
          </Box>
          <Box>
            <Typography variant={'employeeDetailsSettingsTitle'}>Recommendations based on:</Typography>
            <FormControlLabel control={
              <Checkbox
                checked={techMatrixChecked}
                onChange={() => setTechMatrixChecked(!techMatrixChecked)} />
            } label="Tech Matrix" />
            <FormControlLabel control={
              <Checkbox
                checked={employeesDBChecked}
                onChange={() => setEmployeesDBChecked(!employeesDBChecked)} />
            } label="Employees DB" />
            <FormControlLabel control={
              <Checkbox
                checked={projectsInfoChecked}
                onChange={() => setProjectsInfoChecked(!projectsInfoChecked)} />
            } label="Projects info" />
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: '36px 0 20px',
        }}>
          <Box sx={{
            borderRight: `1px solid ${theme.palette.primary.separator}`,
            width: '50%',
          }}>
            <Typography variant={'employeeSkillsTitle'}>Skill Group</Typography>
            {skillGroupsList.map(({ name, employeesSkillsCount, totalCount }) => (
              <Typography
                variant={`${selectedSkillGroup === name ? 'skillGroupNameSelected' : 'skillGroupName'}`}
                component={'p'}
                key={name}
                onClick={() => setSelectedSkillGroup(name)}>
                {name}
                <Typography variant={'skillsCount'}>({employeesSkillsCount}/{totalCount})</Typography>
              </Typography>
            ))}
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            padding: '0 0 0 20px',
          }}>
            {noEmployeeSkillsError
              ? <Typography variant={'employeeSkill'} component={'p'}>
                {noEmployeeSkillsError}
              </Typography>
              : <>
                <Box sx={{ width: '50%' }}>
                  <Typography variant={'employeeSkillsTitle'}>Skill Name</Typography>
                  {fullSkillList.map(({ skill }) => (
                    <Typography
                      variant={'employeeSkill'}
                      component={'p'}
                      key={skill}>
                      {skill}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ width: '50%' }}>
                  <Typography variant={'employeeSkillsTitle'}>Seniority</Typography>
                  {fullSkillList.map(({ level }, i) => (
                    <Typography
                      variant={'employeeSkill'}
                      component={'p'}
                      key={`${level}-${i}`}>
                    {level}
                    </Typography>
                  ))}
                </Box>
              </>}
          </Box>
        </Box>
      </PagePanel>
    </>
  );
}
