import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {useHistory, NavLink} from 'react-router-dom';

import {
  useSetProfileSkillsMutation,
  useFetchProfileSkillSetQuery,
  useFetchRecommendedSkillsQuery
} from 'services/profile';
import useModal from 'hooks/useModal';
import {setBasicSkills} from 'store/skills';
import {ArrayObjsToArrayIds} from 'utils/helpers';
import {SKILLS_LEVELS} from 'constants/common';
import routes from 'constants/routes';
import {ButtonContained, ButtonOutlined} from 'components/Button';
import {PageLoader} from 'components/Loader';
import {formSubmitHandling} from 'utils/forms';
import {Paragraph} from 'components/Typography';
import Card from 'components/Card';
import PageLayout from 'components/Common/Layout/PageLayout';
import {ButtonGroupBasic} from 'components/ButtonGroup';

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

  const {data: {data: skillsSet = []} = {}, isLoading} = useFetchProfileSkillSetQuery();
  const Recommended = useFetchRecommendedSkillsQuery();

  const onToggleModal = () => setIsOpen(value => !value);

  const onSelectSkill = skill => dispatch(setBasicSkills(skill));

  const handleSubmitSkills = () => {
    const values = {
      basic: ArrayObjsToArrayIds(allSkills[SKILLS_LEVELS.BASIC]),
      intermediate: ArrayObjsToArrayIds(allSkills[SKILLS_LEVELS.INTERMEDIATE]),
      advanced: ArrayObjsToArrayIds(allSkills[SKILLS_LEVELS.ADVANCED])
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
        enqueueSnackbar('Your skills have not saved, please add skills', {variant: 'error'});
      }
    );
  };

  return isLoading || Recommended.isLoading ? (
    <PageLayout type="cardsLayout" title="My Skill Set" hiddenHeader>
      <PageLoader />
    </PageLayout>
  ) : (
    <PageLayout type="cardsLayout" title="My Skill Set" hiddenHeader>
      <Card title="Input skills" data-testid="input-skills-box">
        <Paragraph>Type skill name or click on recommended skill below</Paragraph>
        <SkillsAutocomplete onSelectSkill={onSelectSkill} onProposeSkill={onToggleModal} />
        <RecommendationSkills onSelectSkill={onSelectSkill} />
        <SkillSetModal isOpen={isOpen} onClose={onToggleModal} />
      </Card>

      {skillsSet && <SkillSetSeniority initialSkillsSet={skillsSet} />}

      <ButtonGroupBasic position="right">
        <ButtonOutlined to={routes.profile} component={NavLink} disabled={isAddLoading}>
          Cancel
        </ButtonOutlined>
        <ButtonContained onClick={handleSubmitSkills} disabled={isAddLoading}>
          Finish
        </ButtonContained>
      </ButtonGroupBasic>
      {isAddLoading && <PageLoader />}
    </PageLayout>
  );
}

export default SkillSet;
