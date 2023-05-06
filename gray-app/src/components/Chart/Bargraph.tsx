import React from 'react';
import { Bar } from '@ant-design/plots';

const Bargraph = (props:any) => {
  const data= props.data
  const config = {
    data,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    legend: [{
      position: 'top-left',
    }],
  };
  return <Bar {...config} />;
};

export default Bargraph;
