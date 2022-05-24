import React from 'react';

import {Box, IconButton} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export const getColumns = (onDelete, onEdit) => [
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 120,
    flex: 5,
    cellClassName: 'paddingLeft'
  },
  {
    field: 'tags',
    headerName: 'Tags',
    renderCell: params => params.value.map(tag => tag.name).join(','),
    sortable: false,
    minWidth: 90,
    flex: 5
  },
  {
    field: 'engineers_count',
    headerName: 'Engineers Count',
    minWidth: 90,
    flex: 2
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    sortable: false,
    minWidth: 120,
    flex: 1,

    renderCell: ({row}) => (
      <Box>
        <IconButton onClick={onEdit(row)}>
          <EditOutlinedIcon />
        </IconButton>
        <IconButton onClick={onDelete(row)}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
    )
  }
];

export const getConfirmSkillValues = skill => ({
  isOpen: true,
  text: `Would you like to remove "${skill.name}" skill?`,
  confirmText: 'Remove',
  cancelText: 'Cancel'
});
