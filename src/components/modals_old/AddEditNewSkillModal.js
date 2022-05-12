import React, {useState, useMemo, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import {FormControl, IconButton, InputLabel} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {invert} from 'lodash';
import {employeeSkillLevels} from '../../constants/common';
import {getSkillsFromCurrentData, simpleLocaleComparator} from '../../utils/helpers';

export default function AddEditNewSkillModal({
  isOpen,
  toggle,
  onSubmit,
  employees,
  level: levelProp = '',
  skill: skillProp = ''
}) {
  const [data, setData] = useState([{skill: '', level: ''}]);
  const employeeSkills = useMemo(() => getSkillsFromCurrentData(employees), [employees]);
  // employeeSkills = useMemo(
  //   () => employeeSkills.filter(value => !data.find(f => f.skill === value)),
  //   [data]
  // );

  const isDataFilled = useMemo(() => {
    let isFilled = true;
    data.forEach(d => {
      if (!d.skill || !d.level) {
        isFilled = false;
      }
    });
    return isFilled;
  }, [data]);

  const onDataChange = (e, i, field) => {
    const newData = [...data];
    newData[i][field] = e.target.value;
    setData(newData);
  };

  const onOk = () => {
    onSubmit({filterToChange: skillProp, data});
    setData([{level: '', skill: ''}]);
    toggle();
  };

  const onCancel = () => {
    setData([{level: '', skill: ''}]);
    toggle();
  };

  const onAddMore = () => {
    setData([...data, {skill: '', level: ''}]);
  };

  const onDataDelete = deleteIndex => () => {
    setData(data.filter((value, index) => index !== deleteIndex));
  };

  useEffect(() => {
    if (levelProp && skillProp) {
      setData([{level: levelProp, skill: skillProp}]);
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
          {data.map(({skill, level}, i) => (
            <Grid container spacing={2} key={`filter-${i}`}>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink>Skill</InputLabel>
                  <Select onChange={e => onDataChange(e, i, 'skill')} value={skill}>
                    {employeeSkills.sort(simpleLocaleComparator).map((value, key) => (
                      <MenuItem key={`skill${key}`} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={5}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink>Seniority Level</InputLabel>
                  <Select onChange={e => onDataChange(e, i, 'level')} value={level}>
                    {Object.entries({
                      5: 'All',
                      ...invert(Object.fromEntries(employeeSkillLevels))
                    })
                      .filter(s => s[0] !== '0')
                      .map(([key, value]) => (
                        <MenuItem key={`level${key}`} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid display="flex" alignItems="flex-end" item xs={1}>
                {data.length > 1 && (
                  <IconButton onClick={onDataDelete(i)}>
                    <CloseIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
          {!levelProp && !skillProp && (
            <Button startIcon={<AddIcon />} onClick={onAddMore}>
              Add more
            </Button>
          )}
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
  level: PropTypes.string
};
