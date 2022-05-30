import React, {useEffect, useState} from 'react';

import {GridActionsCellItem} from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {useFetchTagsQuery} from 'api/tags';
import {filterTagParamName} from 'constants/dataGrid';

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
    headerAlign: 'right',
    align: 'right',
    getActions: ({id, row}) => [
      <GridActionsCellItem
        data-testid={`${id}-edit`}
        key={`${id}-edit`}
        onClick={() => onEdit(row)}
        icon={<EditOutlinedIcon sx={{fontSize: 24}} />}
        label="Edit"
      />,
      <GridActionsCellItem
        key={`${id}-remove`}
        data-testid="remove-skill-btn"
        icon={<DeleteOutlinedIcon sx={{fontSize: 24}} />}
        onClick={() => onDelete(row)}
        label="Delete"
      />
    ]
  }
];

export const useTagFilter = (queryParams, updateURLParams) => {
  const filterParams = queryParams.get(filterTagParamName);
  const {data: {tags = []} = {}} = useFetchTagsQuery({});
  const [tagFilter, setTagFilter] = useState([]);

  useEffect(() => {
    if (!filterParams) {
      setTagFilter([]);
    } else if (tagFilter.length === 0) {
      const newTagFilter = [];

      filterParams.split(',').forEach(id => {
        const tagFound = tags.find(t => t.id === +id);

        if (tagFound) {
          newTagFilter.push(tagFound);
        }
      });

      setTagFilter(newTagFilter);
    }
  }, [filterParams, tags]);

  const onTagFilterChange = (value, onPageChange) => {
    onPageChange(0);
    setTagFilter(value);
    updateURLParams(value.map(v => v.id).toString(), filterTagParamName);
  };

  return {
    tagFilter,
    onTagFilterChange
  };
};
