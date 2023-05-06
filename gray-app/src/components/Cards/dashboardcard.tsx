import { Card, Col, Row } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import {styled} from '@mui/material';

const GreenWords= styled("p")(
  ()=>`color: green;`
)
  

const RedWords= styled("p")(
  ()=>`color: red;`
)

const DashboardCard = (props:any) => (
  <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Total Tickets" bordered={false} headStyle={{backgroundColor: '#ADD8E6', border: 0 }}>
          {props.tickets}  <RedWords>+200%</RedWords>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Total Detections" bordered={false} headStyle={{backgroundColor: '#ADD8E6', border: 0 }}>
          {props.detections} <GreenWords>-50%</GreenWords>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Total Cameras" bordered={false} headStyle={{backgroundColor: '#ADD8E6', border: 0 }}>
        {props.cameras} <GreenWords>-50%</GreenWords>
        </Card>
      </Col>
    </Row>
  </div>
);

export default DashboardCard;
