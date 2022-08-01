import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {useHistory} from 'react-router-dom';

import PageLayout from 'components/Common/Layout/PageLayout';
import {useSetProfileSkillsMutation} from 'services/profile';
import {ButtonContained} from 'components/Button';

import {formSubmitHandling} from '../../utils/forms';
import Paragraph from '../../components/Typography/components/Paragraph';
import Card from '../../components/Card';
import useModal from '../../hooks/useModal';
import {setBasicSkills} from '../../store/skills';
import {SKILLS_LEVELS} from '../../constants/common';
import {ArrayObjsToArrayIds} from '../../utils/helpers';
import routes from '../../constants/routes';

import SkillSetSeniority from './components/SkillSetSeniority';
import SkillsAutocomplete from './components/SkillsAutocomplete';
import RecommendationSkills from './components/Recommendations';
import SkillSetModal from './components/SkillSetModal';

function SkillSet() {
  const dispatch = useDispatch();
  const {isOpen, setIsOpen} = useModal();
  const [setProfileSkills, {isLoading: isAddLoading}] = useSetProfileSkillsMutation();
  const allSkills = useSelector(state => state.skills);
  const history = useHistory();
  const {enqueueSnackbar} = useSnackbar();

  const onToggleModal = () => setIsOpen(value => !value);

  const onSelectSkill = skill => dispatch(setBasicSkills(skill));

  const handleSubmitSkills = () => {
    const values = {
      basic: ArrayObjsToArrayIds(allSkills[SKILLS_LEVELS.BASIC]),
      intermediate: ArrayObjsToArrayIds(allSkills[SKILLS_LEVELS.INTERMEDIATE]),
      advanced: ArrayObjsToArrayIds(allSkills[SKILLS_LEVELS.ADVANCED]),
      expert: ArrayObjsToArrayIds(allSkills[SKILLS_LEVELS.EXPERT])
    };

    formSubmitHandling(
      setProfileSkills,
      {...values},
      false,
      () => {
        enqueueSnackbar('Your skills have successfully saved');
        history.push(routes.profile);
      },
      () => {
        enqueueSnackbar('Your skills have not saved, please check form fields', {variant: 'error'});
      }
    );
  };
  return (
    <PageLayout type="cardsLayout" title="My Skill Set" hiddenHeader>
      <Card title="Input skills" data-testid="input-skills-box">
        <Paragraph>Type skill name or click on recommended skill below</Paragraph>
        <SkillsAutocomplete onSelectSkill={onSelectSkill} onProposeSkill={onToggleModal} />
        <RecommendationSkills onSelectSkill={onSelectSkill} />
        <SkillSetModal isOpen={isOpen} onClose={onToggleModal} />
      </Card>
      <SkillSetSeniority />
      <ButtonContained onClick={handleSubmitSkills} disabled={isAddLoading}>
        Finish
      </ButtonContained>
    </PageLayout>
  );
}

export default SkillSet;
