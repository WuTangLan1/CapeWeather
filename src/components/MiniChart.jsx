// src/components/MiniChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const MiniChart = ({ data }) => (
  <LineChart width={150} height={50} data={data}>
    <Line type="monotone" dataKey="temp" stroke="#00e5ff" strokeWidth={2} dot={false} />
    <XAxis dataKey="time" hide />
    <YAxis hide domain={['auto', 'auto']} />
    <Tooltip />
  </LineChart>
);

export default MiniChart;
