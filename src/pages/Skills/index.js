import {useState} from 'react';
import {styled} from '@mui/material/styles';

import {PermissionEnum} from 'constants/permissions';
import useModal from 'hooks/useModal';
import usePermissions from 'hooks/permissions';
import {useURLParams} from 'hooks/dataGrid';
import {Box} from 'components/Box';
import {TabPanelContainer, TabPanel, Tab, Tabs} from 'components/Tabs';
import PageLayout from 'components/Common/Layout/PageLayout';
import {ButtonContained} from 'components/Button';

import CreateSkillModal from './components/CreateSkillModal';
import SkillsList from './components/SkillsList';
import RequestedList from './components/RequestedList';

const StyledBox = styled(Box)(() => ({
  marginTop: '-30px',
  height: '100%'
}));

const skillRequestStatus = {
  ACTUAL: 'APPROVED',
  PROPOSED: 'CREATED',
  REJECTED: 'REJECTED'
};

const Skills = () => {
  const {queryParams, updateURLParams, clearQueryParams} = useURLParams();
  const {hasPermissions} = usePermissions();
  const createModal = useModal();
  const [tab, setTab] = useState(
    queryParams.get('tab')?.toUpperCase() || skillRequestStatus.ACTUAL
  );

  const handleClickCreate = () => {
    createModal.toggle();
  };

  const onHandleChanges = skill => {
    createModal.setValues(skill);
    createModal.toggle();
  };

  const onClose = () => {
    createModal.setValues(null);
    createModal.toggle();
  };

  const handleChangeTab = (event, newValue) => {
    clearQueryParams();
    updateURLParams(newValue.toLowerCase(), 'tab');
    setTab(newValue);
  };

  const extraButtons = hasPermissions([PermissionEnum.SKILLS_CREATE])
    ? [
        <ButtonContained key="skill-page-create-btn" onClick={handleClickCreate}>
          Create new skill
        </ButtonContained>
      ]
    : [];

  return (
    <PageLayout title="Skills" type="skills-page" extra={extraButtons}>
      <StyledBox>
        <Tabs value={tab} onChange={handleChangeTab} aria-label="skill tabs">
          <Tab value={skillRequestStatus.ACTUAL} data-testid="skill-tab-actual" label="Actual" />
          <Tab
            value={skillRequestStatus.PROPOSED}
            data-testid="skill-tab-proposed"
            label="Proposed"
          />
          <Tab
            value={skillRequestStatus.REJECTED}
            data-testid="skill-tab-rejected"
            label="Rejected"
          />
        </Tabs>
        <TabPanelContainer>
          <TabPanel value={tab} index={skillRequestStatus.ACTUAL}>
            <SkillsList onChanges={onHandleChanges} />
          </TabPanel>
          <TabPanel value={tab} index={skillRequestStatus.PROPOSED}>
            <RequestedList status={tab} />
          </TabPanel>
          <TabPanel value={tab} index={skillRequestStatus.REJECTED}>
            <RequestedList status={tab} />
          </TabPanel>
        </TabPanelContainer>
        {createModal.isOpen && (
          <CreateSkillModal
            isOpen={createModal.isOpen}
            onClose={onClose}
            skill={createModal.values}
          />
        )}
      </StyledBox>
    </PageLayout>
  );
};

export default Skills;
