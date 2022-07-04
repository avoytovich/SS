import React from 'react';
import ChipList from 'components/Common/ChipList';
import {capitalizeFirstLetter} from 'utils/helpers';

export const columns = [
  {
    field: 'name',
    headerName: 'Skill name',
    minWidth: 120,
    flex: 3,
    hideable: false
  },
  {
    field: 'tags',
    headerName: 'Tag name',
    minWidth: 90,
    renderCell: params => <ChipList value={params.value} />,
    flex: 3,
    sortable: false
  },
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 90,
    flex: 3,
    sortable: false
  },
  {
    field: 'level',
    headerName: 'Level',
    minWidth: 90,
    valueGetter: ({row}) => `${capitalizeFirstLetter(row.level)}`,
    flex: 2
  }
];
