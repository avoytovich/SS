import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {SKILLS_LEVELS} from 'constants/common';
import {removeSkill, moveSkills, setInitialSkillsSet} from 'store/skills';
import {Subtitle} from 'components/Typography';
import {ButtonOutlined} from 'components/Button';
import Card from 'components/Card';
import {BoxSubtitle} from 'components/Box';

import SeniorityGroup from '../SeniorityGroup';

const SkillSetSeniority = ({initialSkillsSet}) => {
  const dispatch = useDispatch();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const skills = useSelector(state => state.skills);

  useEffect(() => {
    console.log(initialSkillsSet);
    dispatch(setInitialSkillsSet(initialSkillsSet));
    console.log('initialSkillsSet changed');
  }, [initialSkillsSet]);

  const filterSkills = skill => {
    const newSelectedSkills = selectedSkills.filter(item => skill.id !== item);
    if (newSelectedSkills.length === 0) {
      setSelectedGroup('');
    }
    return newSelectedSkills;
  };

  const handleDeleteSkill = (group, skill) => {
    dispatch(removeSkill({from: group, selectedSkill: skill}));
    const newSelectedSkills = filterSkills(skill);

    setSelectedSkills(newSelectedSkills);
  };

  const handleSelectSkill = (group, skill) => {
    //  const groupName = newSelectedSkills.length > 0 ? group : '';
    if (!selectedGroup || selectedGroup !== group) setSelectedGroup(group);

    const index = selectedSkills.indexOf(skill.id);
    let newSelectedSkills = [];

    if (index === -1) {
      newSelectedSkills = [...selectedSkills, skill.id];
    } else {
      newSelectedSkills = filterSkills(skill);
    }

    setSelectedSkills(newSelectedSkills);
  };

  const handleClickOnGroup = group => {
    if (!selectedGroup || selectedGroup === group) return;
    dispatch(moveSkills({from: selectedGroup, to: group, selectedSkillsId: selectedSkills}));
    setSelectedGroup('');
    setSelectedSkills([]);
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
              isCanToMoved={selectedGroup && selectedGroup !== SKILLS_LEVELS.BASIC}
              selectedSkills={selectedSkills}
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
            <Subtitle>Intermediate</Subtitle>
            <Subtitle size="sm">Enough knowledge to implement technical tasks her/himself</Subtitle>
          </BoxSubtitle>
          <SeniorityGroup
            isCanToMoved={selectedGroup && selectedGroup !== SKILLS_LEVELS.INTERMEDIATE}
            selectedSkills={selectedSkills}
            name={SKILLS_LEVELS.INTERMEDIATE}
            skills={skills[SKILLS_LEVELS.INTERMEDIATE]}
            onDeleteSkill={handleDeleteSkill}
            onSelectSkill={handleSelectSkill}
            onClickGroup={handleClickOnGroup}
          />
        </Grid>
        <Grid item xs={4}>
          <BoxSubtitle>
            <Subtitle>Advanced</Subtitle>
            <Subtitle size="sm">
              Strong knowledge, can set/explain technical tasks and guide others
            </Subtitle>
          </BoxSubtitle>
          <SeniorityGroup
            isCanToMoved={selectedGroup && selectedGroup !== SKILLS_LEVELS.ADVANCED}
            selectedSkills={selectedSkills}
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
            isCanToMoved={selectedGroup && selectedGroup !== SKILLS_LEVELS.EXPERT}
            selectedSkills={selectedSkills}
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

SkillSetSeniority.propTypes = {
  initialSkillsSet: PropTypes.object
};

SkillSetSeniority.defaultProps = {
  initialSkillsSet: {}
};

export default SkillSetSeniority;
