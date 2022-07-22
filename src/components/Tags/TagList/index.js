import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';

import {useDeleteTagMutation, useFetchTagsQuery} from 'services/tags';
import {GridPagination, NoRows, SearchField, dataGridRootStyles} from 'components/Common/DataGrid';
import {
  useDataGridPagination,
  useDataGridSort,
  useURLParams,
  useDataGridSearch
} from 'hooks/dataGrid';
import {PermissionEnum} from 'constants/permissions';
import {headerHeight, pageSize, rowHeight} from 'constants/dataGrid';

import getColumns from './utils';
import styles from './styles';
import useDeleteTagDialog from './components/DeleteTagDialog/hooks/useDeleteTagDialog';
import DeleteTagDialog from './components/DeleteTagDialog';

export default function TagList({onSaveOrUpdate, hasPermissions}) {
  const deleteTagDialog = useDeleteTagDialog();
  const {clearQueryParams, queryParams, updateURLParams} = useURLParams();
  const {sort, sortModel, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);
  const {search, onSearchChange} = useDataGridSearch(queryParams, updateURLParams);
  const queryOptions = useMemo(
    () => ({...(page && {page}), ...(search && {search}), ...(sort && {sort})}),
    [page, search, sort]
  );
  const {
    data: {tags = [], total = 0, pages = 0} = {},
    isLoading,
    isFetching,
    isError
  } = useFetchTagsQuery(queryOptions);
  const [deleteTag] = useDeleteTagMutation();

  const isFilterSelected = search || sort;

  const handleEditTag = tag => {
    onSaveOrUpdate({
      tagName: tag.name,
      ...tag
    });
  };

  const onCreateTag = () => onSaveOrUpdate();

  const handleDeleteTag = tag => {
    deleteTagDialog.setTag(tag);
    deleteTagDialog.setOpen(true);

    if (tags.length === 1) {
      clearQueryParams();
    }
  };

  const handleDeleteTagCancel = useCallback(() => {
    deleteTagDialog.setOpen(false);
  }, [deleteTagDialog.setOpen]);

  const handleDeleteTagConfirm = useCallback(() => {
    deleteTag({id: deleteTagDialog.tag.id});
    deleteTagDialog.setOpen(false);
  }, [deleteTag, deleteTagDialog.setOpen, deleteTagDialog.tag]);

  const columns = getColumns(
    handleEditTag,
    handleDeleteTag,
    hasPermissions([PermissionEnum.TAGS_EDIT]),
    hasPermissions([PermissionEnum.TAGS_DELETE])
  );

  const handlePageChange = nextPage => onPageChange(nextPage);

  const handleSearch = value => onSearchChange(value, onPageChange);

  const handleClearFilter = () => handleSearch('');

  const handleSortChange = newModel => onSortChange(newModel);

  return (
    <>
      <Box component="form" className={styles.filterContainer} data-testid="tag-list-filter">
        <SearchField
          id="tag-name-search"
          value={search}
          label="Tag Name"
          onChange={handleSearch}
          onClear={handleClearFilter}
        />
      </Box>

      <Box className={styles.tagBox} data-testid="tag-list-box">
        <DataGrid
          components={{
            Pagination: pages > 1 && GridPagination,
            NoRowsOverlay: NoRows
          }}
          componentsProps={{
            noRowsOverlay: {
              className: styles.tableEmptyMessage,
              emptyMessage:
                isError || isFilterSelected
                  ? 'No tags. Please select other filters'
                  : 'No tags yet',
              actionTitle: 'Please add new tag',
              isAction:
                !isError && !isFilterSelected && !hasPermissions([PermissionEnum.TAGS_CREATE]),
              onAddNewRow: onCreateTag
            }
          }}
          rows={tags}
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

      <DeleteTagDialog
        onCancel={handleDeleteTagCancel}
        onConfirm={handleDeleteTagConfirm}
        open={deleteTagDialog.open}
        tag={deleteTagDialog.tag}
      />
    </>
  );
}

TagList.propTypes = {
  onSaveOrUpdate: PropTypes.func.isRequired,
  hasPermissions: PropTypes.func.isRequired
};
