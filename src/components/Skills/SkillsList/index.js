import React, {useMemo, useState} from 'react';

import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';

import ConfirmModal from 'components/Modals/ConfirmModal';

import {useFetchSkillsQuery} from 'api/skills';

import {GridPagination, NoRows, dataGridRootStyles} from 'components/Common/DataGrid';
import {
  defaultPage,
  filterSkillParamName,
  filterTagParamName,
  headerHeight,
  pageSize,
  rowHeight
} from 'constants/dataGrid';
import {useDataGridPagination, useDataGridSort, useURLParams} from 'hooks/dataGrid';

import {getColumns, getConfirmSkillValues} from 'components/Skills/SkillsList/utils';
import {useStyles} from 'components/Skills/SkillsList/styles';
import {useFetchTagsQuery} from 'api/tags';
import {SearchField} from 'components/Common/DataGrid/Filters/SearchField';
import MultipleAutocomplete from 'components/Common/DataGrid/Filters/MultipleAutocomplete';

const SkillsList = () => {
  const classes = useStyles();
  const {queryParams, updateURLParams} = useURLParams();
  const {sortModel, sort, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmValues, setConfirmValues] = useState({});

  const [skillFilter, setSkillFilter] = useState(queryParams.get(filterSkillParamName) || '');
  const [tagsFilter, setTagsFilter] = useState([]);
  const [tagsSearch, setTagsSearch] = useState('');

  const skillsQueryOptions = useMemo(
    () => ({
      ...(page && {page}),
      ...(tagsFilter.length > 0 && {tags: tagsFilter.map(t => t.name).toString()}),
      ...(skillFilter && {skill: skillFilter}),
      ...(sort && {sort})
    }),
    [page, sort, tagsFilter, skillFilter]
  );

  const tagsQueryOptions = useMemo(() => ({...(tagsSearch && {tagsSearch})}), [tagsSearch]);

  const {data: {tags = []} = {}, isLoading: isTagsSearchLoading} =
    useFetchTagsQuery(tagsQueryOptions);

  const {
    data: {skills = [], total = 0} = {},
    isLoading,
    isError
  } = useFetchSkillsQuery(skillsQueryOptions);

  const onDeleteSkill = skill => () => {
    setIsConfirmOpen(true);
    setConfirmValues(getConfirmSkillValues(skill));
  };

  const onEditSkill = () => () => {};

  const columns = getColumns(onDeleteSkill, onEditSkill);

  const onCloseConfirmModal = () => {
    setIsConfirmOpen(false);
    setConfirmValues({});
  };

  const handlePageChange = nextPage => onPageChange(nextPage);

  const resetPage = () => {
    if (page !== defaultPage) handlePageChange(0);
  };

  const handleTagSearch = e => {
    setTagsSearch(e.target.value);
  };

  const handleSkillSearch = value => {
    setSkillFilter(value);
    resetPage();
    updateURLParams(value, filterSkillParamName);
  };

  const handleTagFilter = (e, value) => {
    setTagsFilter([...value]);
    resetPage();
    updateURLParams(value.map(v => v.name).toString(), filterTagParamName);
  };

  const handleClearFilter = () => handleSkillSearch('');

  const handleSortChange = newModel => onSortChange(newModel);

  return (
    <>
      <Box component="form" className={classes.filterContainer} data-testid="tag-list-filter">
        <SearchField
          id="skill-name-search"
          value={skillFilter}
          label="Skill"
          onChange={handleSkillSearch}
          onClear={handleClearFilter}
        />
        <MultipleAutocomplete
          id="tag-filter"
          label="Tags"
          minWidth="350px"
          value={tagsFilter}
          inputValue={tagsSearch}
          onInputChange={handleTagSearch}
          onAddOption={handleTagFilter}
          loading={isTagsSearchLoading}
          options={tags}
        />
      </Box>
      <Box className={classes.skillsBox} data-testid="skills-list-box">
        <DataGrid
          data-cy="skill-list"
          components={{
            Pagination: GridPagination,
            NoRowsOverlay: NoRows
          }}
          componentsProps={{
            noRowsOverlay: {
              className: classes.tableEmptyMessage,
              emptyMessage: isError ? 'No skills' : 'No skills yet.',
              actionTitle: 'Please add new skill',
              isAction: !isError
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
          loading={isLoading}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          disableColumnMenu
          disableSelectionOnClick
        />
      </Box>
      <ConfirmModal
        modalOpen={isConfirmOpen}
        toggle={onCloseConfirmModal}
        bodyContent={confirmValues}
      />
    </>
  );
};
export default SkillsList;
