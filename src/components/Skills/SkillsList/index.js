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
  rowHeight,
  searchParamName
} from 'constants/dataGrid';
import {useDataGridPagination, useDataGridSort, useURLParams} from 'hooks/dataGrid';

import SkillsListFilter from 'components/Skills/SkillsList/SkillsListFilter';
import {getColumns, getConfirmSkillValues} from 'components/Skills/SkillsList/utils';
import {useStyles} from 'components/Skills/SkillsList/styles';
import {useFetchTagsQuery} from 'api/tags';

const SkillsList = () => {
  const classes = useStyles();
  const {queryParams, updateURLParams} = useURLParams();
  const {sortModel, sort, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmValues, setConfirmValues] = useState({});

  const [skillFilter, setSkillFilter] = useState(queryParams.get(filterSkillParamName) || '');
  const [tagsFilter, setTagsFilter] = useState(queryParams.get(filterTagParamName) || []);
  const [tagsSearch, setTagsSearch] = useState('');
  const {data: {tags = []} = {}, isLoading: isTagsSearchLoading} = useFetchTagsQuery({page: 1});

  const queryOptions = useMemo(() => ({...(page && {page}), ...(sort && {sort})}), [page, sort]);

  const {
    data: {skills = [], total = 0} = {},
    isLoading,
    isError
  } = useFetchSkillsQuery(queryOptions);

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
    updateURLParams(value, searchParamName);
  };

  const handleTagFilter = value => {
    setTagsFilter([...tagsFilter, value]);
    resetPage();
    updateURLParams(value.toString(), filterTagParamName);
  };

  const handleClearFilter = () => handleSkillSearch('');

  const handleSortChange = newModel => onSortChange(newModel);

  return (
    <>
      <SkillsListFilter
        onClearFilter={handleClearFilter}
        onAddTagFilter={handleTagFilter}
        onChangeSkillName={handleSkillSearch}
        onSearchTag={handleTagSearch}
        tagsFilter={handleTagSearch}
        tagsSearch={tagsSearch}
        tagsSearchResult={tags}
        isTagsSearchLoading={isTagsSearchLoading}
        skillName={skillFilter}
      />
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
