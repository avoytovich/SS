import React, {useState} from 'react';
import {Grid} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';

import {SKILLS_LEVELS} from 'constants/common';
import {removeSkill, moveSkills} from 'store/skills';
import {Subtitle} from 'components/Typography';
import {ButtonOutlined} from 'components/Button';
import Card from 'components/Card';
import {BoxSubtitle} from 'components/Box';

import SeniorityGroup from '../SeniorityGroup';

const SkillSetSeniority = () => {
  const dispatch = useDispatch();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const skills = useSelector(state => state.skills);

  const handleDeleteSkill = (group, skill) => {
    dispatch(removeSkill({from: group, selectedSkill: skill}));
  };

  const handleSelectSkill = (group, skill) => {
    if (!selectedGroup || selectedGroup !== group) setSelectedGroup(group);
    setSelectedSkills([...selectedSkills, skill.id]);
  };

  const handleClickOnGroup = group => {
    if (!selectedGroup || selectedGroup === group) return;
    dispatch(moveSkills({from: selectedGroup, to: group, selectedSkillsId: selectedSkills}));
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
            <SeniorityGroup
              name={SKILLS_LEVELS.BASIC}
              skills={skills[SKILLS_LEVELS.BASIC]}
              onDeleteSkill={handleDeleteSkill}
              onSelectSkill={handleSelectSkill}
              onClickGroup={handleClickOnGroup}
            />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <BoxSubtitle>
            <Subtitle>Intermidiete</Subtitle>
            <Subtitle size="sm">Enough knowledge to implement technical tasks her/himself</Subtitle>
          </BoxSubtitle>
          <SeniorityGroup
            name={SKILLS_LEVELS.INTERMEDIATE}
            skills={skills[SKILLS_LEVELS.INTERMEDIATE]}
            onDeleteSkill={handleDeleteSkill}
            onSelectSkill={handleSelectSkill}
            onClickGroup={handleClickOnGroup}
          />
        </Grid>
        <Grid item xs={4}>
          <BoxSubtitle>
            <Subtitle>Avdanced</Subtitle>
            <Subtitle size="sm">
              Strong knowledge, can set/explain technical tasks and guide others
            </Subtitle>
          </BoxSubtitle>
          <SeniorityGroup
            name={SKILLS_LEVELS.ADVANCED}
            skills={skills[SKILLS_LEVELS.ADVANCED]}
            onDeleteSkill={handleDeleteSkill}
            onSelectSkill={handleSelectSkill}
            onClickGroup={handleClickOnGroup}
          />
        </Grid>
        <Grid item xs={4}>
          <BoxSubtitle>
            <Subtitle>Expert</Subtitle>
            <Subtitle size="sm">May technically lead dedicated area</Subtitle>
          </BoxSubtitle>
          <SeniorityGroup
            name={SKILLS_LEVELS.EXPERT}
            skills={skills[SKILLS_LEVELS.EXPERT]}
            onDeleteSkill={handleDeleteSkill}
            onSelectSkill={handleSelectSkill}
            onClickGroup={handleClickOnGroup}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default SkillSetSeniority;
