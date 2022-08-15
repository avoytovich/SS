import PropTypes from 'prop-types';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellAction,
  NoRowsOverlay,
  TablePagination
} from 'components/Table';
import {Box} from 'components/Box';
import {SearchField} from 'components/Common/DataGrid';
import {RateReviewIcon} from 'components/Icons';
import {IconButton} from 'components/Button';
import ChipList from 'components/Common/ChipList';
import usePermissions from 'hooks/permissions';
import useTable from 'hooks/useTable';
import {PermissionEnum} from 'constants/permissions';
import {useFetchRequestedSkillsQuery} from 'services/skills';

const headCells = [
  {key: 'name', label: 'Skill name', sortable: true},
  {key: 'tags', label: 'Tags'},
  {key: 'description', label: 'Description'},
  {key: 'action', label: 'Actions', align: 'right'}
];

const RequestedList = ({status}) => {
  const {hasPermissions} = usePermissions();
  const {page, search, sort, onSearchChange} = useTable();
  const {data: {data: skills = [], pages} = {}} = useFetchRequestedSkillsQuery({
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
              <TableCell>{skill.name}</TableCell>
              <TableCell>
                <ChipList values={skill.tags} />
              </TableCell>
              <TableCell>{skill.description}</TableCell>
              <TableCellAction>
                {hasPermissions([PermissionEnum.SKILLS_DETAILS]) && (
                  <IconButton onClick={() => {}}>
                    <RateReviewIcon />
                  </IconButton>
                )}
              </TableCellAction>
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
