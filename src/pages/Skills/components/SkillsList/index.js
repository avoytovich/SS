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
  TableCellAction,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FilterContainer
} from 'components/Table';
import {PageLoader} from 'components/Loader';
import {SearchField} from 'components/Common/DataGrid';
import {ChipOutlined} from 'components/Chip';
import {IconButton} from 'components/Button';
import {DeleteIcon, EditIcon} from 'components/Icons';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import {useFetchAutocompleteTagsQuery} from 'services/tags';
import Autocomplete from 'components/Autocomplete';
import {getOptions} from 'utils/dataGridUtils';

const headCells = [
  {key: 'name', label: 'Skill name', sortable: true},
  {key: 'tags', label: 'Tags'},
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
  const tagFilters = getFilterValue('tags');
  const [deleteSkill] = useDeleteSkillMutation();
  const {data: tags = []} = useFetchAutocompleteTagsQuery();
  const {data: {skills = [], pages = 0} = {}, isLoading} = useFetchSkillsQuery({
    ...(page && {page}),
    ...(search && {search}),
    ...(sort && {sort}),
    ...(tagFilters.length > 0 && {tags: tagFilters.toString()})
  });
  const tagOptions = getOptions(tags, 'id', 'name');
  const selectedTagOptions = getOptions(
    tags.filter(t => tagFilters.includes(t.id)),
    'id',
    'name'
  );

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

  const onSelectTags = selectedTags => {
    const selectedTagIds = selectedTags.map(v => v.id);

    onFilterChange('tags', selectedTagIds);
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
            name="tags"
            label="Tags"
            options={tagOptions}
            values={selectedTagOptions}
            onSelect={onSelectTags}
          />
        </FilterContainer>
        <Table id="requested-skill-list">
          <TableHead headCells={headCells} />
          <TableBody>
            {skills.map(skill => (
              <TableRow key={skill.id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell maxWidth={400}>
                  {skill.tags.map(item => (
                    <ChipOutlined size="small" key={item.name} label={item.name} />
                  ))}
                </TableCell>
                <TableCell>{skill.engineers_count}</TableCell>
                <TableCellAction>
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
                </TableCellAction>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {skills.length === 0 && <NoRowsOverlay />}
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
