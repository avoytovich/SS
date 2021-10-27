import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { simpleLocaleComparator } from '../../../common/helpers';
import { useStyles } from './styles';

export default function FilterTableHead({ headCells, primaryData, onFiltersChange }) {
  const classes = useStyles();
  const filterKeys = useMemo(() =>
    headCells.filter(({ filterable, searchable }) => filterable || searchable).map(({ id }) => id)
  );

  const [filters] = useState(
    filterKeys.reduce(
      (obj, item) => ({
        ...obj,
        [item]: [],
      }),
      {}
    )
  );

  const filterValues = useMemo(() =>
    primaryData.reduce(
      (acc, current) => {
        filterKeys.forEach(key => {
          acc[key].add(current[key]);
        });
        return acc;
      },
      filterKeys.reduce((o, key) => ({ ...o, [key]: new Set() }), {})
    )
  );

  const handleChange = key => e => {
    const { value } = e.target;
    filters[key] = value;
    onFiltersChange(filters);
  };

  const cleanAllHandler = () => {
    document.getElementById('filter-table-head-form').reset();
    filterKeys.forEach(key => {
      filters[key] = [];
    });
    onFiltersChange(filters);
  };

  useEffect(() => {
    onFiltersChange(filters);
  }, [primaryData]);

  return (
    <TableHead data-testid="filter-table-head">
      <TableRow>
        {headCells.map(({ id, width, disablePadding, filterable, searchable, label }) => (
          <TableCell
            key={id}
            align={'left'}
            width={width ?? 'auto'}
            padding={disablePadding ? 'none' : 'normal'}
          >
            <form id="filter-table-head-form">
              {searchable && (
                <TextField
                  defaultValue=""
                  variant="standard"
                  placeholder={`Search by ${label}`}
                  onChange={e => {
                    filters[id] = e.target.value;
                    onFiltersChange(filters);
                  }}
                  classes={{ root: classes.input }}
                />
              )}
              {filterable && (
                <FormControl classes={{ root: classes.formControl }}>
                  <Select
                    value={filters[id]}
                    displayEmpty
                    multiple={true}
                    onChange={handleChange(id)}
                    classes={{ root: classes.input }}
                    renderValue={selected => {
                      if (selected.length === 0) {
                        return (
                          <MenuItem disabled value="">
                            -- Select All --
                          </MenuItem>
                        );
                      }
                      return selected.join(', ');
                    }}
                  >
                    {[...filterValues[id]].sort(simpleLocaleComparator).map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </form>
          </TableCell>
        ))}
        <TableCell key="clean-all" align={'left'} width="20%">
          <Link underline="hover" onClick={cleanAllHandler} classes={{ root: classes.cleanUpLink }}>
            Clean up
          </Link>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

FilterTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  primaryData: PropTypes.array.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
};
