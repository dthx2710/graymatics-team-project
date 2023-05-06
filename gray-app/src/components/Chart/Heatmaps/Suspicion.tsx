import React, { useState, useEffect } from 'react';
import { Heatmap } from '@ant-design/plots';

const SuspicionHeatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('http://localhost:3000/api/heatmap/heatmapdata')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    width: 650,
    height: 500,
    autoFit: false,
    data,
    xField: 'time',
    yField: 'mall_section',
    colorField: 'suspicion_probability',
    color: ['#bfff00', '#fdff00', '#ffa500', '#ff7f50', '#ff0800'],
  };
  return <Heatmap {...config} />;
};

export default SuspicionHeatmap;