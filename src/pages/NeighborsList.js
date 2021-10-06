import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TagCloud } from 'react-tagcloud';
import { useNeighborSkillsQuery } from '../slices/smartSkillsSlice';
import { getComparator } from '../common/helpers';
import CustomPaginationActionsTable
  from '../components/table/CustomPaginationActionsTable';
import PageTitle from '../components/PageTitle';

const headCells = [
  {
    id: 'proximity',
    numeric: true,
    label: 'Proximity',
  },
  {
    id: 'id',
    numeric: true,
    label: 'ID',
  },
  {
    id: 'SkillGroupName',
    numeric: false,
    label: 'Skills Group',
  },
  {
    id: 'SkillName',
    numeric: false,
    label: 'Skill Name',
    customRender: row => <Link underline="hover"
      href={`/skills/${row.SkillName}`}>
      {row.SkillName}
    </Link>,
  },
  {
    id: 'numberOfEngineers',
    numeric: true,
    label: '# of Engineers',
  },
];

// Custom renderer for Tag Cloud
const customRenderer = (tag, size) => (
    <Link underline="hover" href={`/skills/${tag.value}`}>
        <span
            key={tag.value}
            style={{
              margin: '3px',
              padding: '3px',
              fontSize: `${size}px`,
              display: 'inline-block',
              color: '#000',
            }}
        >
            {tag.value}
        </span>
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
  const [orderBy, setOrderBy] = React.useState('proximity');

  const onSortHandler = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { data = [], isLoading } = useNeighborSkillsQuery({
    skillName: name,
    groups: true,
  });

  const rows = useMemo(() => [...data]
    .sort(getComparator(order, orderBy)), [data, order, orderBy]);

  return (
    <>
      <PageTitle title={`${name}: Neighbors List`} />
      <Box sx={{ my: 4 }} style={{ flex: 1 }}>
          <Breadcrumbs aria-label="breadcrumb" separator=''>
              <a onClick={history.goBack}>
                  <Typography>
                      <ArrowBackIcon />
                  </Typography>
              </a>
              <Typography variant={'h4'}>{name}</Typography>
          </Breadcrumbs>
          <Box sx={{ display: 'grid', my: 4, gridTemplateColumns: 'repeat(2, 1fr)' }} textAlign="center">
              <Box sx={
                  {
                    border: 1,
                    padding: 2,
                    maxWidth: { xs: 300, md: 250 },
                    maxHeight: 125,
                  }
              } textAlign="left">
                  <Typography>Group: Programming Languages</Typography>
                  <Typography>Engineers: 500</Typography>
                  <Typography>Description: Bla-bla</Typography>
              </Box>
              <Box>
                {SimpleCloud(data.map(({ SkillName, proximity }) => ({
                  value: SkillName,
                  count: (1 - proximity) * 100,
                  color: '#000',
                })))}
              </Box>
          </Box>
          <Box sx={{ width: '80%' }}>
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
      </Box>
    </>
  );
}
