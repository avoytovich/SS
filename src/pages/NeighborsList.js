import React, { useMemo } from 'react';
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import { TagCloud } from 'react-tagcloud';
import { ErrorBoundary } from 'react-error-boundary';
import { useNeighborSkillsQuery } from '../slices/smartSkillsSlice';
import { getComparator, decodeQueryParam } from '../common/helpers';
import CustomPaginationActionsTable from '../components/table/CustomPaginationActionsTable';
import PageTitle from '../components/PageTitle';
import { PagePanel } from '../components/PagePanel';
import ErrorFallback from '../components/ErrorFallback';
import { BLACK } from '../common/colors';

import { useStyles } from './styles';

const headCells = [
  {
    id: 'Proximity',
    numeric: true,
    label: 'Proximity',
    width: '10%',
  },
  {
    id: 'ID',
    numeric: true,
    label: 'ID',
    width: '10%',
  },
  {
    id: 'Group',
    numeric: false,
    label: 'Skills Group',
    width: '34%',
  },
  {
    id: 'Name',
    numeric: false,
    label: 'Skill Name',
    customRender: row => (
      <Link component={RouterLink} underline="hover" to={`/skills/${encodeURIComponent(row.Name)}`}>
        {row.Name}
      </Link>
    ),
    width: '34%',
  },
  {
    id: 'EngineersCount',
    numeric: true,
    label: '# Engineers',
    width: '12%',
    customRender: row => (
      <Link
        component={RouterLink}
        underline="hover"
        to={`/employees?skill=${encodeURIComponent(row.Name)}`}
      >
        {row.EngineersCount}
      </Link>
    ),
  },
];

// Custom renderer for Tag Cloud
const customRenderer = (tag, size) => (
  <Link
    component={RouterLink}
    key={tag.value}
    underline="hover"
    to={`/skills/${encodeURIComponent(tag.value)}`}
  >
    <Box
      key={tag.value}
      sx={{
        margin: '3px',
        padding: '3px',
        fontSize: `${size}px`,
        display: 'inline-block',
        color: BLACK,
      }}
      component="span"
    >
      {tag.value}
    </Box>
  </Link>
);

// Tag Cloud component
const SimpleCloud = ({ data }) => (
  <TagCloud
    minSize={12}
    maxSize={35}
    tags={data}
    disableRandomColor={true}
    renderer={customRenderer}
  />
);
SimpleCloud.propTypes = { data: PropTypes.array };

export default function NeighborsList() {
  const { name } = useParams();
  const skillName = decodeQueryParam(name);
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Proximity');

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { data: { data = [] } = {}, isFetching } = useNeighborSkillsQuery({
    neighbors: skillName,
    groups: true,
  });

  const tagCloudData = [...data.slice(0, 12)];
  const details = data?.[0];

  const rows = useMemo(() => [...data].sort(getComparator(order, orderBy)), [data, order, orderBy]);

  return (
    <>
      <PageTitle title={`${skillName}: Neighbors List`} />
      <Breadcrumbs aria-label="breadcrumb" separator="">
        <a onClick={history.goBack}>
          <Typography>
            <ArrowBackIcon />
          </Typography>
        </a>
        <Typography variant={'h4'}>{skillName}</Typography>
      </Breadcrumbs>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          {isFetching ? (
            <Box className={classes.centerContent}>
              <CircularProgress disableShrink />
            </Box>
          ) : (
            <>
              <Box
                sx={{ display: 'grid', m: 4, gridTemplateColumns: 'repeat(2, 1fr)' }}
                textAlign="center"
              >
                <Box
                  sx={{
                    border: 1,
                    padding: 2,
                    maxWidth: { xs: 300, md: 250 },
                    height: 125,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  textAlign="left"
                >
                  <Typography>Group: {details?.Group}</Typography>
                  <Typography>Engineers: {details?.EngineersCount}</Typography>
                </Box>
                <Box>
                  <SimpleCloud
                    data={tagCloudData.map(({ Name, Proximity }) => ({
                      value: Name,
                      count: (1 - Proximity) * 100,
                    }))}
                  />
                </Box>
              </Box>
              <Box sx={{ padding: '0 20px' }}>
                <CustomPaginationActionsTable
                  rows={rows}
                  headCells={headCells}
                  rowsPerPage={25}
                  order={order}
                  orderBy={orderBy}
                  onSortHandler={onSortHandler}
                  isLoading={isFetching}
                  showFilteredColumn={false}
                />
              </Box>
            </>
          )}
        </PagePanel>
      </ErrorBoundary>
    </>
  );
}
