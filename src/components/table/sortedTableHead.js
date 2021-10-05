import * as React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';

export default function SortedTableHead(props) {
  const {
    order, orderBy, onRequestSort, headCells,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell, i) => (
					<TableCell
						key={`${headCell.id}-${i}`}
						align={'left'}
            width={headCell.width ?? 'auto'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
  );
}

SortedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.array.isRequired,
};
