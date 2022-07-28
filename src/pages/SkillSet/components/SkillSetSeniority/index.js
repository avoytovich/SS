import React, {useState} from 'react';
import {Grid} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';

import {removeSkill} from 'store/skills';
import {Subtitle} from 'components/Typography';
import {ButtonOutlined} from 'components/Button';
import Card from 'components/Card';
import {BoxOutlined, BoxSubtitle} from 'components/Box';
import {ChipContained} from 'components/Chip';
import {SKILLS_LEVELS} from 'constants/common';

const SkillSetSeniority = () => {
  const dispatch = useDispatch();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const skills = useSelector(state => state.skills);

  const handleDeleteSkill = (group, skill) => {
    console.log(skill);
    dispatch(removeSkill({from: group, selectedSkill: skill}));
  };

  const handleSelectSkill = (group, skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    if (!selectedGroup || selectedGroup !== group) setSelectedGroup(group);
  };

  return (
    <Card title="Set skills seniority">
      <p>Select several skills and choose seniority</p>

      <Grid container spacing={2}>
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={8}>
            <Subtitle>Basic skills</Subtitle>
            <Subtitle size="sm">
              Need technical guidelines & supervision to implement tasks
            </Subtitle>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <ButtonOutlined disabled>Change seniority</ButtonOutlined>
          </Grid>
          <Grid item xs={12}>
            <BoxOutlined>
              {skills[SKILLS_LEVELS.BASIC].map(skill => (
                <ChipContained
                  key={skill.id}
                  label={skill.name}
                  onClick={() => {
                    handleSelectSkill(SKILLS_LEVELS.BASIC, skill);
                  }}
                  onDelete={() => {
                    handleDeleteSkill(SKILLS_LEVELS.BASIC, skill);
                  }}
                />
              ))}
            </BoxOutlined>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <BoxSubtitle>
            <Subtitle>Intermidiete</Subtitle>
            <Subtitle size="sm">Enough knowledge to implement technical tasks her/himself</Subtitle>
          </BoxSubtitle>
          <BoxOutlined></BoxOutlined>
        </Grid>
        <Grid item xs={4}>
          <BoxSubtitle>
            <Subtitle>Avdanced</Subtitle>
            <Subtitle size="sm">
              Strong knowledge, can set/explain technical tasks and guide others
            </Subtitle>
          </BoxSubtitle>
          <BoxOutlined></BoxOutlined>
        </Grid>
        <Grid item xs={4}>
          <BoxSubtitle>
            <Subtitle>Expert</Subtitle>
            <Subtitle size="sm">May technically lead dedicated area</Subtitle>
          </BoxSubtitle>
          <BoxOutlined></BoxOutlined>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SkillSetSeniority;
