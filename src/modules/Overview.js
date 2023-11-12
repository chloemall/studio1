import React, { useState } from 'react';
import { Card, Button, Row, Col, Statistic } from 'antd';
import BarChart from './BarChart';
import FollowersBarChart from './FollowersBarChart';

const Overview = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (button) => {
    setSelectedButton(button);
  };

  const buttonLabels = ['Last 7 Days', 'Last 30 Days', 'Last 60 Days', 'Custom'];

  const followersData = [
    {
      label: 'Month 1',
      value: 100, // Replace with your data
    },
    {
      label: 'Month 2',
      value: 150, // Replace with your data
    },
    {
      label: 'Month 3',
      value: 200, // Replace with your data
    },
    {
      label: 'Month 4',
      value: 250, // Replace with your data
    },
    {
      label: 'Month 5',
      value: 300, // Replace with your data
    },
  ];

  const chartData = [
    {
      label: 'Day 1',
      value: 10,
    },
    {
      label: 'Day 2',
      value: 20,
    },
    {
      label: 'Day 3',
      value: 30,
    },
    {
      label: 'Day 4',
      value: 40,
    },
    {
      label: 'Day 5',
      value: 50,
    },
    {
      label: 'Day 6',
      value: 60,
    },
    {
      label: 'Day 7',
      value: 70,
    },
  ];

  const chartData30 = [
    // ...data for 30 days
    {
        label: 'Week 1',
        value: 200,
      },
      {
        label: 'Week 2',
        value: 190,
      },
      {
        label: 'Week 3',
        value: 180,
      },
      {
        label: 'Week 4',
        value: 170,
      },
  ];

  const chartData60 = [
    {
      label: 'Week 1',
      value: 200,
    },
    {
      label: 'Week 2',
      value: 190,
    },
    {
      label: 'Week 3',
      value: 180,
    },
    {
      label: 'Week 4',
      value: 170,
    },
    {
      label: 'Week 5',
      value: 160,
    },
    {
      label: 'Week 6',
      value: 150,
    },
    {
      label: 'Week 7',
      value: 140,
    },
  ];

  const chartDataCustom = [
    {
      label: 'Month 1',
      value: 45,
    },
    {
      label: 'Month 2',
      value: 50,
    },
    {
      label: 'Month 3',
      value: 55,
    },
    {
      label: 'Month 4',
      value: 60,
    },
    {
      label: 'Month 5',
      value: 65,
    },
  ];

  return (
    <div>
        
      <h2>Overview</h2>
      <Card title="Date Range" style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          {buttonLabels.map((text, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={text}>
              <Button
                block
                style={{
                  backgroundColor: selectedButton === text ? 'black' : 'white',
                  color: selectedButton === text ? 'white' : 'black',
                }}
                onClick={() => handleClick(text)}
              >
                {text}
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="Statistics" style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col xs={24} sm={8} md={8} lg={8}>
            <Card style={{ background: '#AEE0FF' }}>
              <Statistic title="Video Views" value={903} valueStyle={{ color: '#3f8600' }} suffix="-26 (+2.88%)" />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8}>
            <Card style={{ background: '#D3D3D3' }}>
              <Statistic title="Reached Audience" value={581} valueStyle={{ color: '#3f8600' }} suffix="-29 (-3.67%)" />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8}>
            <Card style={{ background: '#FFC0CB' }}>
              <Statistic title="Profile Views" value={20} valueStyle={{ color: '#3f8600' }} suffix="+6 (+3.78%)" />
            </Card>
          </Col>
        </Row>
      </Card>

      {selectedButton === 'Last 7 Days' && (
        <BarChart data={chartData} title="Last 7 Days Traffic" pinkBars={true} />
      )}

      {selectedButton === 'Last 30 Days' && (
        <BarChart data={chartData30} title="Last 30 Days Traffic" pinkBars={true} />
      )}

      {selectedButton === 'Last 60 Days' && (
        <BarChart data={chartData60} title="Last 60 Days Traffic" pinkBars={true} />
      )}

      {selectedButton === 'Custom' && (
        <BarChart data={chartDataCustom} title="Custom Traffic" pinkBars={true} />
      )}

<Card title="Followers" style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col xs={24} sm={8} md={8} lg={8}>
            <Card style={{ background: '#AEE0FF' }}>
              <Statistic title="Net Growth" value={-34} valueStyle={{ color: '#3f8600' }} suffix="-26 (+2.88%)" />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8}>
            <Card style={{ background: '#D3D3D3' }}>
              <Statistic title="New Followers" value={581} valueStyle={{ color: '#3f8600' }} suffix="-29 (-3.67%)" />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8}>
            <Card style={{ background: '#FFC0CB' }}>
              <Statistic title="Lost Follower" value={20} valueStyle={{ color: '#3f8600' }} suffix="+6 (+3.78%)" />
            </Card>
          </Col>
        </Row>
      </Card>

      <FollowersBarChart data={followersData} title="Followers Traffic Per Month" />


      <p>This is the Overview page content.</p>
    </div>
  );
};

export default Overview;
