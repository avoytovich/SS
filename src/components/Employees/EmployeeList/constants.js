import React from 'react';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import {yesNo} from 'utils/helpers';
import routes from 'constants/routes';

export const columns = [
  {
    field: 'fullName',
    headerName: 'Full name',
    minWidth: 120,
    flex: 3,
    renderCell: ({row}) => (
      <Link
        component={RouterLink}
        underline="hover"
        to={routes.employees.details.link(row.id)}
        sx={{fontSize: '12px'}}
      >
        {row.first_name} {row.last_name}
      </Link>
    ),
    hideable: false
  },
  {
    field: 'competency',
    headerName: 'Competency',
    minWidth: 90,
    flex: 3,
    sortable: false
  },
  {
    field: 'specialization',
    headerName: 'Specialization',
    minWidth: 90,
    flex: 3,
    sortable: false
  },
  {
    field: 'seniority',
    headerName: 'Level',
    minWidth: 90,
    flex: 2
  },
  {
    field: 'is_on_bench',
    headerName: 'Is on bench',
    valueGetter: ({row}) => `${yesNo(row.is_on_bench)}`,
    minWidth: 90,
    flex: 2
  }
];
