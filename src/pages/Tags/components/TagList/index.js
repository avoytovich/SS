import {useCallback} from 'react';
import PropTypes from 'prop-types';

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
import {DeleteIcon, EditIcon} from 'components/Icons';
import {IconButton} from 'components/Button';
import usePermissions from 'hooks/permissions';
import useTable from 'hooks/useTable';
import {PermissionEnum} from 'constants/permissions';
import {useDeleteTagMutation, useFetchTagsQuery} from 'services/tags';
import {useURLParams} from 'hooks/dataGrid';
import useModal from 'hooks/useModal';

import DeleteTagModal from '../DeleteTagModal';

const headCells = [
  {key: 'name', label: 'Tag Name', sortable: true},
  {key: 'skills_count', label: '# of skills'},
  {key: 'action', label: 'Actions', align: 'right'}
];

const TagList = ({onUpdate}) => {
  const {clearQueryParams} = useURLParams();
  const {hasPermissions} = usePermissions();
  const {page, search, sort, onSearchChange} = useTable();
  const [deleteTag] = useDeleteTagMutation();
  const {
    isOpen,
    setIsOpen: setOpenDeleteModal,
    setValues: setDeleteModalTag,
    values: selectedTag
  } = useModal();
  const {
    data: {tags = [], pages = 0} = {},
    isLoading,
    isError
  } = useFetchTagsQuery({
    ...(page && {page}),
    ...(search && {search}),
    ...(sort && {sort})
  });
  const emptyMessage =
    isError || search || sort ? 'No tags. Please select other filters' : 'No tags yet';

  const handleEditTag = tag => {
    onUpdate({
      tagName: tag.name,
      ...tag
    });
  };

  const handleDeleteTag = tag => {
    setDeleteModalTag(tag);
    setOpenDeleteModal(true);

    if (tags.length === 1) {
      clearQueryParams();
    }
  };

  const handleDeleteTagCancel = useCallback(() => {
    setOpenDeleteModal(false);
  }, [setOpenDeleteModal]);

  const handleDeleteTagConfirm = useCallback(() => {
    deleteTag({id: selectedTag.id});
    setOpenDeleteModal(false);
  }, [deleteTag, setOpenDeleteModal, selectedTag]);

  const handleClearSearch = () => {
    onSearchChange('');
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <TableContainer>
        <Box component="form">
          <SearchField
            id="tag-name-search"
            value={search}
            label="Search by name"
            onChange={onSearchChange}
            onClear={handleClearSearch}
          />
        </Box>
        <Table id="tag-list">
          <TableHead headCells={headCells} />
          <TableBody>
            {tags.map(tag => (
              <TableRow key={tag.id}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.skills_count}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="flex-end">
                    {hasPermissions([PermissionEnum.TAGS_EDIT]) && (
                      <IconButton onClick={() => handleEditTag(tag)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    {hasPermissions([PermissionEnum.TAGS_DELETE]) && (
                      <IconButton onClick={() => handleDeleteTag(tag)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {tags.length === 0 && <NoRowsOverlay emptyMessage={emptyMessage} />}
        <TablePagination count={pages} />
      </TableContainer>
      <DeleteTagModal
        onCancel={handleDeleteTagCancel}
        onConfirm={handleDeleteTagConfirm}
        open={isOpen}
        tag={selectedTag}
      />
    </>
  );
};

TagList.propTypes = {
  onUpdate: PropTypes.func.isRequired
};

export default TagList;
