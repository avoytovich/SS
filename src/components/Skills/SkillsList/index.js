import React, {useMemo, useState} from 'react';
import {useSnackbar} from 'notistack';

import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';

import {useFetchSkillsQuery, useDeleteSkillMutation} from 'api/skills';
import {useFetchTagsQuery} from 'api/tags';

import {
  GridPagination,
  NoRows,
  SearchField,
  MultipleAutocomplete,
  dataGridRootStyles
} from 'components/Common/DataGrid';
import {filterTagParamName, headerHeight, pageSize, rowHeight} from 'constants/dataGrid';

import {
  useDataGridPagination,
  useDataGridSearch,
  useDataGridSort,
  useURLParams
} from 'hooks/dataGrid';

import {
  getColumns,
  getTagFilterByQueryParams,
  updateTagFilterParam
} from 'components/Skills/SkillsList/utils';
import {useDataGridFilter} from 'hooks/dataGrid/useDataGridFilter';
import {useModal} from 'hooks/useModal';
import CustomizedDialogs from '../../Modals/CustomizedDialogs';

import {useStyles} from './styles';
import usePermissions from '../../../hooks/permissions';
import {PermissionEnum} from '../../../constants/permissions';

const SkillsList = ({onChanges}) => {
  const {hasPermissions} = usePermissions();
  const classes = useStyles();
  const {queryParams, updateURLParams, clearQueryParams} = useURLParams();
  const [deleteSkill] = useDeleteSkillMutation();
  const {enqueueSnackbar} = useSnackbar();

  // Pagination values
  const {sortModel, sort, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);

  // Confirm modal values
  const confirmModal = useModal();
  const [selectedSkill, setSelectedSkill] = useState({});

  // Filters values
  const {search, onSearchChange} = useDataGridSearch(queryParams, updateURLParams);

  const {data: {tags: tagsData = []} = {}} = useFetchTagsQuery({});

  const {filter: tagFilter, onFilterChange: onTagFilterChange} = useDataGridFilter(
    queryParams,
    updateURLParams,
    updateTagFilterParam,
    filterTagParamName,
    tagsData,
    getTagFilterByQueryParams
  );

  const [tagsSearch, setTagsSearch] = useState('');

  const skillsQueryOptions = useMemo(
    () => ({
      ...(page && {page}),
      ...(tagFilter.length > 0 && {tags: tagFilter.map(t => t.id).toString()}),
      ...(search && {search}),
      ...(sort && {sort})
    }),
    [page, sort, tagFilter, search]
  );

  const isFilterSelected = tagFilter.length > 0 || sort || search;

  const tagsQueryOptions = useMemo(() => ({...(tagsSearch && {tagsSearch})}), [tagsSearch]);

  const {data: {tags = []} = {}} = useFetchTagsQuery(tagsQueryOptions);

  const filterOptions = useMemo(() => tags.map(tag => ({id: tag.id, label: tag.name})), [tags]);

  const {
    data: {skills = [], total = 0, pages = 0} = {},
    isLoading,
    isFetching,
    isError
  } = useFetchSkillsQuery(skillsQueryOptions);

  // Handlers on change

  const onClickDeleteBtn = skill => {
    confirmModal.toggle();
    setSelectedSkill(skill);
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

  const onEditSkill = skill => {
    if (onChanges) onChanges(skill);
    setSelectedSkill(skill);
  };

  const onCloseConfirmModal = () => {
    confirmModal.toggle();
    setSelectedSkill({});
  };

  const handlePageChange = nextPage => onPageChange(nextPage);

  const handleSkillSearch = value => {
    onSearchChange(value, onPageChange);
  };

  const handleTagFilter = value => {
    onTagFilterChange(value, onPageChange);
  };

  const handleClearFilter = () => handleSkillSearch('');

  const handleSortChange = newModel => onSortChange(newModel);

  const columns = getColumns(
    onClickDeleteBtn,
    onEditSkill,
    hasPermissions([PermissionEnum.SKILLS_EDIT]),
    hasPermissions([PermissionEnum.SKILLS_DELETE])
  );

  return (
    <>
      <Box component="form" className={classes.filterContainer} data-testid="skills-list-filter">
        <SearchField
          id="skill-name-search"
          value={search}
          label="Skill"
          onChange={handleSkillSearch}
          onClear={handleClearFilter}
        />
        <MultipleAutocomplete
          id="tags"
          label="Tags"
          options={filterOptions}
          values={tagFilter}
          onSelect={handleTagFilter}
          onChange={setTagsSearch}
        />
      </Box>
      <Box className={classes.skillsBox} data-testid="skills-list-box">
        <DataGrid
          data-cy="skill-list"
          components={{
            Pagination: pages > 1 && GridPagination,
            NoRowsOverlay: NoRows
          }}
          componentsProps={{
            noRowsOverlay: {
              className: classes.tableEmptyMessage,
              emptyMessage:
                isError || isFilterSelected
                  ? 'No skills. Please select other filters.'
                  : 'No skills yet.',
              actionTitle: 'Please add new skill',
              isAction: !isError && !isFilterSelected
            }
          }}
          rows={skills}
          page={tablePage}
          columns={columns}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={handleSortChange}
          paginationMode="server"
          pagination
          rowsPerPageOptions={[pageSize]}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          rowCount={total}
          sx={dataGridRootStyles}
          loading={isLoading || isFetching}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          disableColumnMenu
          disableSelectionOnClick
          autoHeight
        />
      </Box>
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
