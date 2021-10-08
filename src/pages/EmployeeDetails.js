import React, { useState } from 'react';
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
import { useFetchEmployeeQuery } from '../slices/smartSkillsSlice';

import employee from '../mocks/employee.json';

export default function EmployeeDetails() {
  const { employeeId } = useParams();
  const theme = useTheme();
  const [showUnfilledSkills, setShowUnfilledSkills] = useState(true);
  const [techMatrixChecked, setTechMatrixChecked] = useState(true);
  const [employeesDBChecked, setEmployeesDBChecked] = useState(true);
  const [projectsInfoChecked, setProjectsInfoChecked] = useState(false);

  // TODO: 'data = employee' - mocked data
  const { data = employee } = useFetchEmployeeQuery({ id: employeeId });

  const {
    FirstName,
    LastName,
    Competency,
    Level,
    PrimarySpecialization,
  } = data;
  const fullName = `${FirstName} ${LastName}`;

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
      </PagePanel>
    </>
  );
}
