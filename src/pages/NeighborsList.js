import React, { useMemo } from 'react';
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BarChartIcon from '@mui/icons-material/BarChart';
import CircularProgress from '@mui/material/CircularProgress';
import { ErrorBoundary } from 'react-error-boundary';
import { useNeighborSkillsQuery } from '../slices/smartSkillsSlice';
import { getComparator, decodeQueryParam } from '../common/helpers';
import CustomPaginationActionsTable from '../components/table/CustomPaginationActionsTable';
import PageTitle from '../components/PageTitle';
import { PagePanel } from '../components/PagePanel';
import ErrorFallback from '../components/ErrorFallback';
import { useStyles } from './styles';
import CircularBarplot from '../components/charts/circular-barplot';

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

export default function NeighborsList() {
  const { name } = useParams();
  const skillName = decodeQueryParam(name);
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Proximity');

  const hotLegendRectangle = <div className={classes.shape} style={{ background: '#67001f' }} />;
  const coldLegendRectangle = <div className={classes.shape} style={{ background: '#053061' }} />;

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { data: { data = [] } = {}, isFetching } = useNeighborSkillsQuery({
    neighbors: skillName,
    groups: true,
  });

  const tagCloudData = [...data.slice(0, 25)];
  const details = data?.[0];

  const rows = useMemo(() => [...data].sort(getComparator(order, orderBy)), [data, order, orderBy]);

  return (
    <>
      <PageTitle title={`${skillName}: Neighbors List`} />
      <Breadcrumbs aria-label="breadcrumb" separator="">
        <a data-cy="neighbor-backBtn" onClick={history.goBack}>
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                  }}
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
                  <Box
                    className="legend"
                    sx={{
                      textAlign: 'right',
                      marginTop: '50px',
                      marginRight: '50px',
                    }}
                  >
                    <Box className={classes.legendItem}>
                      {hotLegendRectangle}
                      <Typography variant="caption">
                        As it closer to red this skill is more closer to current
                      </Typography>
                    </Box>
                    <Box className={classes.legendItem}>
                      {coldLegendRectangle}
                      <Typography variant="caption">
                        As it closer to blue this skill is less closer to current
                      </Typography>
                    </Box>
                    <Box className={classes.legendItem}>
                      <BarChartIcon className={classes.shape} style={{ width: '30px' }} />
                      <Typography variant="caption">
                        The height of column means how popular skill is
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <CircularBarplot data={tagCloudData || []} />
                </Box>
              </Box>
              <Box sx={{ padding: '0 20px' }}>
                <CustomPaginationActionsTable
                  data-cy="neighbors-table"
                  rows={rows}
                  headCells={headCells}
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
