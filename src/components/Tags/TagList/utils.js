import React from 'react';

import {Box, IconButton} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export const getColumns = onSetConfirmValues => [
  {
    field: 'name',
    headerName: 'Tag Name',
    minWidth: 120,
    flex: 5,
    cellClassName: 'paddingLeft'
  },
  {
    field: 'skills_count',
    headerName: '# of skills',
    minWidth: 90,
    flex: 3
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
        <IconButton>
          <EditOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => onSetConfirmValues(row)}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
    )
  }
];

export const getConfirmTagValues = tag => ({
  isOpen: true,
  text: `Would you like to remove "${tag.name}" tag?`,
  confirmText: 'Remove',
  cancelText: 'Cancel'
});
