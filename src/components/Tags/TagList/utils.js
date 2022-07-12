import React from 'react';
import {GridActionsCellItem} from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const getActionColumn = (onEdit, onRemove, editPermissions, deletePermissions) => ({
  field: 'actions',
  type: 'actions',
  headerName: 'Actions',
  sortable: false,
  minWidth: 120,
  flex: 1,
  headerAlign: 'right',
  align: 'right',
  getActions: ({id, row}) => [
    editPermissions ? (
      <GridActionsCellItem
        data-testid={`${id}-edit`}
        key={`${id}-edit`}
        onClick={() => onEdit(row)}
        icon={<EditOutlinedIcon sx={{fontSize: 24}} />}
        label="Edit"
      />
    ) : null,
    deletePermissions ? (
      <GridActionsCellItem
        key={`${id}-remove`}
        data-testid="remove-tag-btn"
        icon={<DeleteOutlinedIcon sx={{fontSize: 24}} />}
        onClick={() => onRemove(row)}
        label="Delete"
      />
    ) : null
  ]
});

export const getColumns = (onEdit, onRemove, editPermissions, deletePermissions) => {
  const columns = [
    {
      field: 'name',
      headerName: 'Tag Name',
      minWidth: 120,
      flex: 5
    },
    {
      field: 'skills_count',
      headerName: '# of skills',
      minWidth: 90,
      flex: 3
    }
  ];

  if (editPermissions || deletePermissions) {
    return [...columns, getActionColumn(onEdit, onRemove, editPermissions, deletePermissions)];
  }

  return columns;
};

export const getConfirmTagValues = tag => ({
  isOpen: true,
  text: `Would you like to remove "${tag.name}" tag?`,
  tagId: tag.id
});
