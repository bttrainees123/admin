import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset, valueFormatter } from './dataset';

const chartSetting = {
  yAxis: [
    {
      //   label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'day', }]}
      series={[
        { dataKey: 'noida', label: 'Noida', valueFormatter },
        { dataKey: 'pune', label: 'Pune', valueFormatter },
        { dataKey: 'gurugram', label: 'Gurugram', valueFormatter },
      ]}
      //   loading={true}
      {...chartSetting}
    />
  );
}