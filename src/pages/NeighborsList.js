import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import { TagCloud } from 'react-tagcloud';
import { ErrorBoundary } from 'react-error-boundary';
import { useNeighborSkillsQuery } from '../slices/smartSkillsSlice';
import { getComparator } from '../common/helpers';
import CustomPaginationActionsTable
  from '../components/table/CustomPaginationActionsTable';
import PageTitle from '../components/PageTitle';
import { PagePanel } from '../components/PagePanel';
import ErrorFallback from '../components/ErrorFallback';

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
    customRender: row => <Link underline="hover"
      href={`/skills/${row.Name}`}>
      {row.Name}
    </Link>,
    width: '34%',
  },
  {
    id: 'EngineersCount',
    numeric: true,
    label: '# Engineers',
    width: '12%',
    customRender: row => <Link underline="hover"
      href={`/employees?skill=${row.Name}`}>
      {row.EngineersCount}
    </Link>,
  },
];

// Custom renderer for Tag Cloud
const customRenderer = (tag, size) => (
  <Link key={tag.value} underline="hover" href={`/skills/${tag.value}`}>
    <Box
      key={tag.value}
      sx={{
        margin: '3px',
        padding: '3px',
        fontSize: `${size}px`,
        display: 'inline-block',
        color: '#000',
      }}
      component="span"
    >
      {tag.value}
    </Box>
  </Link>
);

// Tag Cloud component
const SimpleCloud = data => (
  <TagCloud
    minSize={12}
    maxSize={35}
    tags={data}
    disableRandomColor={true}
    renderer={customRenderer}
  />
);

export default function NeighborsList() {
  const { name } = useParams();
  const history = useHistory();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Proximity');

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { data: { data = [] } = {}, isLoading } = useNeighborSkillsQuery({
    skillName: name,
    groups: true,
  });

  const tagCloudData = [...data.slice(0, 12)];
  const details = data?.[0];

  const rows = useMemo(() => [...data].sort(getComparator(order, orderBy)),
    [data, order, orderBy]);

  return (
    <>
      <PageTitle title={`${name}: Neighbors List`}/>
      <ErrorBoundary FallbackComponent={ErrorFallback} >
      <Breadcrumbs aria-label="breadcrumb" separator="">
        <a onClick={history.goBack}>
          <Typography>
            <ArrowBackIcon/>
          </Typography>
        </a>
        <Typography variant={'h4'}>{name}</Typography>
      </Breadcrumbs>
      <PagePanel>
        <Box
          sx={{ display: 'grid', m: 4, gridTemplateColumns: 'repeat(2, 1fr)' }}
          textAlign="center">
          <Box sx={
            {
              border: 1,
              padding: 2,
              maxWidth: { xs: 300, md: 250 },
              height: 125,
              display: 'flex',
              flexDirection: 'column',
            }
          } textAlign="left">
            {isLoading
              ? <Box style={{ justifyContent: 'center', margin: 'auto' }}>
                  <CircularProgress disableShrink />
                </Box>
              : <>
                <Typography>Group: {details?.Group}</Typography>
                <Typography>Engineers: {details?.EngineersCount}</Typography>
              </>
            }
          </Box>
          <Box>
            {SimpleCloud(tagCloudData.map(({ Name, Proximity }) => ({
              value: Name,
              count: (1 - Proximity) * 100,
              color: '#000',
            })))}
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
            isLoading={isLoading}
            showFilteredColumn={false}
          />
        </Box>
      </PagePanel>
      </ErrorBoundary>
    </>
  );
}
