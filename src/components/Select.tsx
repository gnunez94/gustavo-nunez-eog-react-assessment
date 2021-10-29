import React, { useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

type AppProps = {
  metrics: string[],
  addedMetrics: Function,
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(metric: string, personName: string[], theme: Theme) {
  const { fontWeightRegular, fontWeightMedium } = theme.typography;
  return {
    fontWeight: personName.indexOf(metric) === -1 ? fontWeightRegular : fontWeightMedium,
  };
}

export default ({ metrics = [], addedMetrics }: AppProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  useEffect(() => {
    addedMetrics(personName);
  }, [personName]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-multiple-chip-label">Metrics</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={personName}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {metrics.map((metric: string) => (
          <MenuItem key={metric} value={metric} style={getStyles(metric, personName, theme)}>
            {metric}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
