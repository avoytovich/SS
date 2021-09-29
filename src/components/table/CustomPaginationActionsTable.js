import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import CircularProgress from '@mui/material/CircularProgress';
import SortedTableHead from './sortedTableHead';
import FilterTableHead from './FilterTableHead';

function TablePaginationActions({
  count, page, rowsPerPage, onPageChange,
}) {
  const theme = useTheme();

  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable({
  rows,
  headCells,
  order,
  orderBy,
  onSortHandler,
  isLoading,
  showFilteredColumn = true,
}) {
  const [filters, setFilters] = useState(null);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const onFiltersChange = values => {
    setFilters(values);
    const filtered = rows.filter(row => Object.keys(values)
      .every(key => (typeof values[key] === 'string'
        && row[key].includes(values[key]))
      || values[key].includes(row[key]) || values[key].length === 0));
    setFilteredRows(filtered);
  };

  useEffect(() => {
    if (filters) {
      onFiltersChange(filters);
    } else {
      setFilteredRows(rows);
    }
  }, [rows, order, orderBy]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="custom pagination table">
                <SortedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={onSortHandler}
                    headCells={headCells}
                />
              {showFilteredColumn
                && <FilterTableHead headCells={headCells} primaryData={rows}
                                 onFiltersChange={onFiltersChange}
                />}
                <TableBody>
                    {isLoading
                        && <TableRow style={{ height: 23 * rowsPerPage }}>
                            <TableCell align="center" colSpan={headCells.length}>
                                <CircularProgress disableShrink />
                            </TableCell>
                        </TableRow>
                    }
                    {(rowsPerPage > 0
                      ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : filteredRows
                    ).map(row => (
                        <TableRow key={row.Id}>
                            {headCells.map(({ id, customRender }) => <TableCell
                                key={id}>
                                {customRender ? customRender(row) : row[id]}
                            </TableCell>)}
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 23 * emptyRows }}>
                            <TableCell colSpan={headCells.length} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[25, 50, 100, { label: 'All', value: -1 }]}
                            colSpan={headCells.length}
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
  );
}

CustomPaginationActionsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onSortHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showFilteredColumn: PropTypes.bool,
};
