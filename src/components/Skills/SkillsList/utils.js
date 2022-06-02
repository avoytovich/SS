import React from 'react';

import {GridActionsCellItem} from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {filterTagParamName} from 'constants/dataGrid';
import ChipList from 'components/Common/DataGrid/ChipList';

export const getColumns = (onDelete, onEdit, editPermissions, deletePermissions) => {
  const columns = [
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
      renderCell: params => <ChipList value={params.value} />,
      sortable: false,
      minWidth: 90,
      flex: 5
    },
    {
      field: 'engineers_count',
      headerName: '#Engineers',
      minWidth: 90,
      flex: 2
    }
  ];

  if (editPermissions || deletePermissions) {
    columns.push({
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
            data-testid="remove-skill-btn"
            icon={<DeleteOutlinedIcon sx={{fontSize: 24}} />}
            onClick={() => onDelete(row)}
            label="Delete"
          />
        ) : null
      ]
    });
  }

  return columns;
};

export const updateTagFilterParam = (value, updateURLParams) => {
  updateURLParams(value.map(v => v.id).toString(), filterTagParamName);
};

export const getTagFilterByQueryParams = (params, tags) => {
  const paramsArr = params.split(',').map(p => +p);
  return tags.filter(t => paramsArr.includes(t.id));
};
