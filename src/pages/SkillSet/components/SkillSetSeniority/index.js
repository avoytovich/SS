import React from 'react';
import {Grid} from '@mui/material';
import {useSelector} from 'react-redux';

import {Subtitle} from 'components/Typography';
import {ButtonOutlined} from 'components/Button';
import Card from 'components/Card';
import {BoxOutlined, BoxSubtitle} from 'components/Box';
import {ChipContained} from 'components/Chip';

const SkillSetSeniority = () => {
  const {basicSkills} = useSelector(state => state.skills);

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
              {basicSkills.map(skill => (
                <ChipContained
                  key={skill.id}
                  label={skill.name}
                  onClick={() => {}}
                  onDelete={() => {}}
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
