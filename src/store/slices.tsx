import { createSlice, current } from '@reduxjs/toolkit';
import { timeSeries, TimeSeries } from 'pondjs';

// type MeasurementInfo = {
//   at: BigInt,
//   value: String,
//   unit: String,
// };

type Measurement = {
  oil?: any,
  weather?: any,
};

type InitialState = {
  loading: boolean,
  metrics: string[],
  measurements: Measurement,
};

const metricsSlice = createSlice({
  name: 'Metrics',
  initialState: {
    loading: false as boolean,
    metrics: [] as string[],
    measurements: {} as Measurement,
  } as InitialState,
  reducers: {
    setMetrics: (state, action) => {
      state.loading = false;
      state.metrics = action.payload;
    },
    setMeasurements: (state, action) => {
      const { measurements } = current(state);
      const { metric } : any = action.payload;

      const metricId: keyof typeof measurements = metric as keyof typeof measurements;

      const metricMeasurements = measurements[metricId] || timeSeries({
        name: metric,
        columns: ['time', 'value', 'unit'],
        points: [],
      });

      const series = timeSeries({
        name: metric,
        columns: ['time', 'value', 'unit'],
        points: [[action.payload.at, action.payload.value, action.payload.unit]],
      }) as TimeSeries<any>;

      const test = TimeSeries.timeSeriesListMerge({
        name: metric,
        seriesList: [metricMeasurements as any, series],
      }) as TimeSeries<any>;

      state.measurements = {
        ...measurements,
        [action.payload.metric]: test,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMetrics, setMeasurements } = metricsSlice.actions;

export default metricsSlice.reducer;
