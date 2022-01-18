import React, { useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({ chipData = [], onChipClick = () => {}, setChipData }) {
  const [showRest, setShowRest] = useState(false);

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };
  const handleDeleteAll = () => {
    setChipData([]);
  };

  const firstTenItems = useMemo(() => {
    if (chipData.length > 10) {
      return chipData.slice(0, 10);
    }
    return chipData;
  }, [chipData]);

  const restItems = useMemo(() => {
    if (chipData.length > 10) {
      return chipData.slice(10);
    }
    return [];
  }, [chipData]);

  const ChipItem = ({ data = {}, ...props }) => (
    <Chip
      color="primary"
      label={
        <>
          <b>{data?.name}</b>: {data?.level}
        </>
      }
      onClick={() => onChipClick({ skill: data?.name, level: data?.level })}
      onDelete={handleDelete(data)}
      {...props}
    />
  );

  ChipItem.propTypes = { data: PropTypes.object, props: PropTypes.object };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {firstTenItems.map(data => (
        // eslint-disable-next-line react/prop-types
        <ListItem key={data.key}>
          <ChipItem {...{ data }} />
        </ListItem>
      ))}

      {showRest &&
        restItems.map(data => (
          // eslint-disable-next-line react/prop-types
          <ListItem key={data.key}>
            <ChipItem {...{ data }} />
          </ListItem>
        ))}

      {chipData.length > 10 && (
        <ListItem key="rest">
          <ChipItem
            variant="outlined"
            onClick={() => {
              setShowRest(!showRest);
            }}
            onDelete={false}
            label={showRest ? 'Hide rest' : 'Show rest'}
          />
        </ListItem>
      )}

      {chipData.length > 0 && (
        <ListItem key="remove">
          <ChipItem
            color="error"
            variant="outlined"
            onClick={handleDeleteAll}
            onDelete={false}
            label={'Remove all'}
          />
        </ListItem>
      )}
    </Box>
  );
}

ChipsArray.propTypes = {
  chipData: PropTypes.array.isRequired,
  setChipData: PropTypes.func.isRequired,
  onChipClick: PropTypes.func,
};
