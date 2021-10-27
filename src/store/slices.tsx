import { createSlice, current } from '@reduxjs/toolkit';
// import { TimeSeries } from 'pondjs';

type MeasurementInfo = {
  at: BigInt,
  value: String,
  unit: String,
};

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
      const { measurements }: InitialState = current(state);
      const { metric } : any = action.payload;

      const metricId: keyof typeof measurements = metric as keyof typeof measurements;
      const metricMeasurements:
      Array<MeasurementInfo> = measurements[metricId]?.map((item: MeasurementInfo) => (
        { ...item }
      )) || [];

      // const series = new TimeSeries({
      //   name: metric,
      //   columns: ['time', 'value', 'unit'],
      //   points: [[1635305296775, 224.71, 'F']],
      // });

      // console.log(series);

      // console.log('slice', metricId, metricMeasurements);
      metricMeasurements.unshift(
        { at: action.payload.at, value: action.payload.value, unit: action.payload.unit },
      );
      state.measurements = {
        ...measurements,
        [action.payload.metric]: metricMeasurements,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMetrics, setMeasurements } = metricsSlice.actions;

export default metricsSlice.reducer;
