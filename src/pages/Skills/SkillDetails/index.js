import {useParams} from 'react-router-dom';

import {useFetchSkillRequestQuery} from 'services/skillRequests';

import RejectedSkillDetails from './components/RejectedSkillDetails';
import NewSkillRequest from './components/newSkillRequest';

const SkillDetails = () => {
  const {id} = useParams();

  const {data: {data: skill = {}} = {}} = useFetchSkillRequestQuery({id: Number(id)});
  // TODO : CREATED move to constants
  return skill.status === 'CREATED' ? <NewSkillRequest /> : <RejectedSkillDetails />;
};

export default SkillDetails;
