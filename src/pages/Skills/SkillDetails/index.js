import {useParams} from 'react-router-dom';

import {useFetchSkillRequestQuery} from 'services/skillRequests';

import {PageLoader} from '../../../components/Loader';

import RejectedSkillDetails from './components/RejectedSkillDetails';
import NewSkillRequest from './components/newSkillRequest';

const SkillDetails = () => {
  const {id} = useParams();

  const {data: {data: skill = {}} = {}, isLoading} = useFetchSkillRequestQuery({id: Number(id)});

  const renderSkillComponent = () => {
    switch (skill.status) {
      // TODO : CREATED move to constants
      case 'CREATED':
        return NewSkillRequest;
      default:
        return RejectedSkillDetails;
    }
  };

  const Component = renderSkillComponent();

  return isLoading ? <PageLoader /> : <Component />;
};

export default SkillDetails;
