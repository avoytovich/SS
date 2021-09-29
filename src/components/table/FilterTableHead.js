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

export default function FilterTableHead({
  headCells,
  primaryData,
  onFiltersChange,
}) {
  const filterKeys = useMemo(
    () => headCells.filter(({ filterable, searchable }) => filterable || searchable)
      .map(({ id }) => id),
  );
  const [filters] = useState(filterKeys.reduce((obj, item) => ({
    ...obj,
    [item]: [],
  }), {}));

  const filterValues = useMemo(() => primaryData.reduce((acc, current) => {
    filterKeys.forEach(key => {
      acc[key].add(current[key]);
    });
    return acc;
  }, filterKeys.reduce((o, key) => ({ ...o, [key]: new Set() }), {})));

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
    <TableHead>
      <TableRow>
        {headCells.map(({
          id, width, disablePadding, filterable, searchable, label,
        }) => (
          <TableCell
            key={id}
            align={'left'}
            width={width ?? 'auto'}
            padding={disablePadding ? 'none' : 'normal'}
          >
            <form id="filter-table-head-form">
              {searchable
                && <TextField
                  defaultValue=''
                  size='small'
                  placeholder={`Search by ${label}`}
                  onChange={e => {
                    filters[id] = e.target.value;
                    onFiltersChange(filters);
                  }}
                  style={{ width: '100%' }}
               />
              }
              {filterable
              && <FormControl style={{ width: '190px' }}>
                <Select
                  value={filters[id]}
                  displayEmpty
                  multiple={true}
                  onChange={handleChange(id)}
                  style={{ width: '100%', height: '40px' }}
                  renderValue={selected => {
                    if (selected.length === 0) {
                      return <MenuItem disabled value="">
                        -- Select All --
                      </MenuItem>;
                    }
                    return selected.join(', ');
                  }}
                >
                  {[...(filterValues[id])].sort().map(item => <MenuItem
                    key={item}
                    value={item}>
                    {item}
                  </MenuItem>)}
                </Select>
              </FormControl>}
            </form>
          </TableCell>
        ))}
        <TableCell
          key="clean-all"
          align={'left'}
          width="20%"
        >
          <Link underline="hover"
            onClick={cleanAllHandler}
            style={{
              color: '#000',
              fontSize: 12,
              margin: 0,
              cursor: 'pointer',
            }}>
            Clean all
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
