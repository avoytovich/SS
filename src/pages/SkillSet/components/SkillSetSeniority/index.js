import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {SKILLS_LEVELS, SKILLS_LEVELS_NAMES} from 'constants/common';
import {removeSkill, moveSkills, setInitialSkillsSet} from 'store/skills';
import {Subtitle} from 'components/Typography';
import Card from 'components/Card';
import {BoxSubtitle} from 'components/Box';
import {DropdownMenu} from 'components/Menu';

import SeniorityGroup from '../SeniorityGroup';

const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

const SkillSetSeniority = ({initialSkillsSet}) => {
  const dispatch = useDispatch();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [moveSkillsMenu, setMoveSkillsMenu] = useState([]);

  const skills = useSelector(state => state.skills);

  useEffect(() => {
    dispatch(setInitialSkillsSet(initialSkillsSet));
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
    if (!selectedGroup || selectedGroup !== group) {
      setSelectedGroup(group);
      const levels = [];
      Object.keys(SKILLS_LEVELS).forEach(level => {
        if (SKILLS_LEVELS[level] !== group) {
          levels.push({
            name: SKILLS_LEVELS_NAMES[level],
            level: SKILLS_LEVELS[level]
          });
        }
      });
      setMoveSkillsMenu(levels);
    }

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
            <Subtitle>Beginner</Subtitle>
            <Subtitle size="sm">
              You have exposure to the skill and understand basic concepts, but you lack experience.
              Or you don’t have a commercial experience on this technology. For transparency,
              there’s nothing wrong with writing “beginner” in parentheses next to the skill
            </Subtitle>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <DropdownMenu
              buttonName="Change seniority"
              disabled={!selectedSkills || selectedSkills.length === 0}
              onMenuItemClick={item => handleClickOnGroup(item.level)}
              items={moveSkillsMenu}
            />
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
        <StyledGrid item xs={6}>
          <BoxSubtitle>
            <Subtitle>Competent</Subtitle>
            <Subtitle size="sm">
              You have experience with and can carry out the skill, You have a commercial
              experience, but you don’t ready to evaluate this skill as advanced. For this level
              skill, you normally wouldn’t need a qualifier
            </Subtitle>
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
        </StyledGrid>
        <StyledGrid item xs={6}>
          <BoxSubtitle>
            <Subtitle>Advanced</Subtitle>
            <Subtitle size="sm">
              You have solid experience and training with the skill and understand advanced concepts
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
        </StyledGrid>
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
