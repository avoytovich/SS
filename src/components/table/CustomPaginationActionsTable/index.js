import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import SortedTableHead from '../SortedTableHead';
import FilterTableHead from '../FilterTableHead';
import useStyles from './styles';
import TablePaginationActions from '../TablePaginationActions';

export default function CustomPaginationActionsTable({
  rows,
  headCells,
  order,
  orderBy,
  onSortHandler,
  isLoading,
  showFilteredColumn = false,
  showFooter = true,
  rowsPerPage: rowsPerPageProp,
  ...props
}) {
  const [filters, setFilters] = useState(null);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(showFooter ? rowsPerPageProp ?? 25 : -1);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;
  const classes = useStyles({rowsPerPage, emptyRows});

  const onFiltersChange = values => {
    setFilters(values);
    const filtered = rows.filter(row =>
      Object.keys(values).every(
        key =>
          (typeof values[key] === 'string' && row[key].includes(values[key])) ||
          values[key].includes(row[key]) ||
          values[key].length === 0
      )
    );
    setFilteredRows(filtered);
  };

  useEffect(() => {
    if (filters) {
      onFiltersChange(filters);
    } else {
      setFilteredRows(rows);
    }
  }, [rows, order, orderBy]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ContentCenterRow = ({children}) => (
    <TableRow classes={{root: classes.loadingRow}}>
      <TableCell align="center" colSpan={headCells.length}>
        {children}
      </TableCell>
    </TableRow>
  );

  ContentCenterRow.propTypes = {
    children: PropTypes.any
  };
  return (
    <>
      <TableContainer classes={{root: classes.customTableContainer}} component={Paper}>
        <Table data-testid="custom-table" aria-label="custom pagination table" {...props}>
          <colgroup>
            {headCells.map(({width, id}) => (
              <col key={id} width={width} />
            ))}
          </colgroup>
          <SortedTableHead
            order={Array.isArray(order) ? order[0] : order}
            orderBy={Array.isArray(orderBy) ? orderBy[0] : orderBy}
            onRequestSort={onSortHandler}
            headCells={headCells}
          />
          {showFilteredColumn && (
            <FilterTableHead
              headCells={headCells}
              primaryData={rows}
              onFiltersChange={onFiltersChange}
            />
          )}
          <TableHead>
            <TableRow />
          </TableHead>
          <TableBody>
            {isLoading ? (
              <ContentCenterRow>
                <CircularProgress disableShrink />
              </ContentCenterRow>
            ) : (
              <>
                {filteredRows.length === 0 && !isLoading && (
                  <ContentCenterRow>
                    <Typography variant="body1" component="div">
                      No data received.
                    </Typography>
                  </ContentCenterRow>
                )}
                {(rowsPerPage > 0
                  ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredRows
                ).map((row, i) => (
                  <TableRow key={`${row.Id}-${i}`}>
                    {headCells.map(({id, customRender}) => (
                      <TableCell key={id}>{customRender ? customRender(row) : row[id]}</TableCell>
                    ))}
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow classes={{root: classes.emptyRow}}>
                    <TableCell colSpan={headCells.length} />
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
          {showFooter && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  data-cy="custom-table-pagination"
                  rowsPerPageOptions={[10, 25, 50, 100, {label: 'All', value: -1}]}
                  colSpan={headCells.length}
                  count={filteredRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

CustomPaginationActionsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  order: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ]),
  orderBy: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ]),
  onSortHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showFooter: PropTypes.bool,
  showFilteredColumn: PropTypes.bool,
  rowsPerPageProp: PropTypes.number,
  rowsPerPage: PropTypes.number
};
