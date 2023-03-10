import {useState} from 'react';
import {useSnackbar} from 'notistack';

import {useDeleteSkillMutation, useFetchSkillsQuery} from 'services/skills';
import usePermissions from 'hooks/permissions';
import useTable from 'hooks/useTable';
import useModal from 'hooks/useModal';
import {useURLParams} from 'hooks/dataGrid';
import {PermissionEnum} from 'constants/permissions';
import {
  NoRowsOverlay,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FilterContainer
} from 'components/Table';
import {PageLoader} from 'components/Loader';
import {SearchField} from 'components/Common/DataGrid';
import {ChipOutlined} from 'components/Chip';
import {Box} from 'components/Box';
import {IconButton} from 'components/Button';
import {DeleteIcon, EditIcon} from 'components/Icons';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import {useFetchAutocompleteGroupsQuery} from 'services/groups';
import Autocomplete from 'components/Autocomplete';
import {getOptions} from 'utils/dataGridUtils';

const headCells = [
  {key: 'name', label: 'Skill name', sortable: true},
  {key: 'groups', label: 'Groups'},
  {key: 'engineers_count', label: '#Engineers', sortable: true},
  {key: 'action', label: 'Actions', align: 'right'}
];

const SkillsList = ({onChanges}) => {
  const [selectedSkill, setSelectedSkill] = useState({});
  const {enqueueSnackbar} = useSnackbar();
  const confirmModal = useModal();
  const {hasPermissions} = usePermissions();
  const {clearQueryParams} = useURLParams();
  const {page, search, sort, onSearchChange, onFilterChange, getFilterValue} = useTable();
  const groupFilters = getFilterValue('groups');
  const [deleteSkill] = useDeleteSkillMutation();
  const {data: groups = []} = useFetchAutocompleteGroupsQuery();
  const {data: {skills = [], pages = 0} = {}, isLoading} = useFetchSkillsQuery({
    ...(page && {page}),
    ...(search && {search}),
    ...(sort && {sort}),
    ...(groupFilters.length > 0 && {groups: groupFilters.toString()})
  });
  const groupOptions = getOptions(groups, 'id', 'name');
  const selectedGroupOptions = getOptions(
    groups.filter(t => groupFilters.includes(t.id)),
    'id',
    'name'
  );

  const isSkillsEmpty = skills.length === 0;

  const handleSkillSearch = value => {
    onSearchChange(value);
  };

  const onEditSkill = skill => {
    if (onChanges) onChanges(skill);
    setSelectedSkill(skill);
  };

  const onDeleteSkill = skill => {
    confirmModal.toggle();
    setSelectedSkill(skill);
  };

  const onCloseConfirmModal = () => {
    confirmModal.toggle();
    setSelectedSkill({});
  };

  const handleConfirmDelete = () => {
    if (skills.length === 1) {
      clearQueryParams();
    }

    deleteSkill({id: selectedSkill.id})
      .unwrap()
      .then(() => {
        enqueueSnackbar('Skill have successfully removed');
      })
      .catch(() => {
        enqueueSnackbar('Skill have not removed', {variant: 'error'});
      })
      .finally(() => {
        confirmModal.toggle();
        setSelectedSkill({});
      });
  };

  const onSelectGroups = selectedGroups => {
    const selectedGroupIds = selectedGroups.map(v => v.id);

    onFilterChange('groups', selectedGroupIds);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <TableContainer>
        <FilterContainer data-testid="skills-list-filter">
          <SearchField
            id="requested-name-search"
            data-testid="skill-name-search-input"
            value={search}
            label="Search by name"
            onChange={handleSkillSearch}
            onClear={() => onSearchChange()}
          />
          <Autocomplete
            multiple
            name="groups"
            label="Groups"
            options={groupOptions}
            values={selectedGroupOptions}
            onSelect={onSelectGroups}
          />
        </FilterContainer>
        <Table id="requested-skill-list">
          <TableHead headCells={headCells} />
          <TableBody>
            {skills.map(skill => (
              <TableRow key={skill.id}>
                <TableCell maxWidth={300}>{skill.name}</TableCell>
                <TableCell maxWidth={400}>
                  {skill.groups?.map(item => (
                    <ChipOutlined size="small" key={item.name} label={item.name} />
                  ))}
                </TableCell>
                <TableCell>{skill.engineers_count}</TableCell>
                <TableCell>
                  <Box justifyContent="flex-end">
                    {hasPermissions([PermissionEnum.SKILLS_EDIT]) && (
                      <IconButton onClick={() => onEditSkill(skill)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    {hasPermissions([PermissionEnum.SKILLS_DELETE]) && (
                      <IconButton onClick={() => onDeleteSkill(skill)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isSkillsEmpty && <NoRowsOverlay />}
        <TablePagination count={pages} />
      </TableContainer>
      {confirmModal.isOpen && (
        <CustomizedDialogs
          isOpen={confirmModal.isOpen}
          isRemove
          onClose={onCloseConfirmModal}
          handleSubmit={handleConfirmDelete}
          text={`Are you sure you want  to delete "${selectedSkill.name}" skill? You can not undo this action.`}
          confirmText="Remove"
        />
      )}
    </>
  );
};
export default SkillsList;
