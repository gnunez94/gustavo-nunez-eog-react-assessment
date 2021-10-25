import { createSlice } from '@reduxjs/toolkit';

type MeasurementInfo = {
  at: BigInt,
  value: String,
  unit: String,
};

const metricsSlice = createSlice({
  name: 'Metrics',
  initialState: {
    loading: false,
    metrics: [],
    measurements: {},
  },
  reducers: {
    setMetrics: (state, action) => {
      state.loading = false;
      state.metrics = action.payload;
    },
    setMeasurements: (state, action) => {
      const { measurements } = state.measurements;
      const metricMeasurements: Array<MeasurementInfo> = measurements[action.payload.metric];
      state.measurements = {
        ...measurements,
        [action.payload.metric]: metricMeasurements.push(
          { at: action.payload.at, value: action.payload.value, unit: action.payload.unit },
        ),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMetrics } = metricsSlice.actions;

export default metricsSlice.reducer;
