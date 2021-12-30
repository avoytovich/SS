import React, { useState, useMemo, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel } from '@mui/material';
import { employeeSkillLevels } from '../../common/constants';
import { getSkillsFromCurrentData, simpleLocaleComparator } from '../../common/helpers';

export default function AddEditNewSkillModal({
  isOpen,
  toggle,
  onSubmit,
  employees,
  level: levelProp = '',
  skill: skillProp = '',
}) {
  const [level, setLevel] = useState(levelProp);
  const [skill, setSkill] = useState(skillProp);
  const employeeSkills = useMemo(() => getSkillsFromCurrentData(employees), [employees]);

  const isDataFilled = level && skill;

  const onSkillChange = e => {
    setSkill(e.target.value);
  };

  const onLevelChange = e => {
    setLevel(e.target.value);
  };

  const onOk = () => {
    onSubmit({ filterToChange: skillProp, level, skill });
    setLevel('');
    setSkill('');
    toggle();
  };

  const onCancel = () => {
    setLevel('');
    setSkill('');
    toggle();
  };

  useEffect(() => {
    if (levelProp && skillProp) {
      setLevel(levelProp);
      setSkill(skillProp);
    }
  }, [levelProp, skillProp]);

  return (
    <div>
      <Button variant="outlined" onClick={toggle}>
        Add New Skill
      </Button>

      <Dialog open={isOpen} onClose={onCancel}>
        <DialogTitle>Skill Filter</DialogTitle>

        <DialogContent>
          <Typography marginBottom variant="body2" color="gray">
            Pick the Skill and its Seniority level that you want to find among the employees.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink>Skill</InputLabel>
                <Select onChange={onSkillChange} value={skill}>
                  {employeeSkills.sort(simpleLocaleComparator).map((value, key) => (
                    <MenuItem key={`skill${key}`} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink>Seniority Level</InputLabel>
                <Select onChange={onLevelChange} value={level}>
                  {Object.entries({ 5: 'All', ...employeeSkillLevels })
                    .filter(s => s[0] !== '0')
                    .map(([key, value]) => (
                      <MenuItem key={`level${key}`} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button disabled={!isDataFilled} onClick={onOk}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddEditNewSkillModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired,
  levelProp: PropTypes.string,
  skillProp: PropTypes.string,
  skill: PropTypes.string,
  level: PropTypes.string,
};
