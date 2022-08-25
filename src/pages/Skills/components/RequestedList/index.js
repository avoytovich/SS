import PropTypes from 'prop-types';
import {NavLink as RouterLink} from 'react-router-dom';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  NoRowsOverlay,
  TablePagination
} from 'components/Table';
import {PageLoader} from 'components/Loader';
import {Box} from 'components/Box';
import {SearchField} from 'components/Common/DataGrid';
import {RateReviewIcon} from 'components/Icons';
import {IconButton} from 'components/Button';
import {ChipOutlined} from 'components/Chip';
import usePermissions from 'hooks/permissions';
import useTable from 'hooks/useTable';
import {PermissionEnum} from 'constants/permissions';
import {useFetchRequestedSkillsQuery} from 'services/skills';

import routes from '../../../../constants/routes';

const headCells = [
  {key: 'name', label: 'Skill name', sortable: true},
  {key: 'tags', label: 'Tags'},
  {key: 'description', label: 'Description'},
  {key: 'action', label: 'Actions', align: 'right'}
];

const RequestedList = ({status}) => {
  const {hasPermissions} = usePermissions();
  const {page, search, sort, onSearchChange} = useTable();
  const {data: {data: skills = [], pages} = {}, isLoading} = useFetchRequestedSkillsQuery({
    status,
    ...(page && {page}),
    ...(search && {search}),
    ...(sort && {sort})
  });

  const handleSearchChange = value => {
    onSearchChange(value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <TableContainer>
      <Box component="form">
        <SearchField
          id="requested-name-search"
          value={search}
          label="Search by name"
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />
      </Box>
      <Table id="requested-skill-list">
        <TableHead headCells={headCells} />
        <TableBody>
          {skills.map(skill => (
            <TableRow key={skill.id}>
              <TableCell maxWidth={300}>{skill.name}</TableCell>
              <TableCell maxWidth={300}>
                {skill.tags.map(item => (
                  <ChipOutlined size="small" key={item.name} label={item.name} />
                ))}
              </TableCell>
              <TableCell maxWidth={200}>{skill.description}</TableCell>
              <TableCell>
                <Box display="flex" justifyContent="flex-end">
                  {hasPermissions([PermissionEnum.SKILLS_DETAILS]) && (
                    <IconButton component={RouterLink} to={routes.skills.details.link(skill.id)}>
                      <RateReviewIcon />
                    </IconButton>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {skills.length === 0 && <NoRowsOverlay />}
      <TablePagination count={pages} />
    </TableContainer>
  );
};

RequestedList.propTypes = {
  status: PropTypes.string.isRequired
};

export default RequestedList;
