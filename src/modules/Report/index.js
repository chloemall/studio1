// Report.js
import React from "react";
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Report = () => {
  return (
    <Card style={{ marginTop: '20px', padding: '20px' }}>
      <img
        src="https://app.yafreeka.com/splash/img/light-1x.png"  // Replace with the actual HTTPS image URL
        alt="Report Image"
        style={{ width: '30%', maxWidth: '100px' }} // Set the width as per your requirement
      />
      <Title level={3} style={{ marginTop: '10px', fontWeight: 'bold' }}>
        PRIVACY POLICY FOR YAFREEKA APP
      </Title>
      <Paragraph style={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
        1. INTRODUCTION<br/>
        Welcome to Yafreeka. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you use our app. By downloading, accessing, or using our app, you consent to the practices described in this Privacy Policy.
      </Paragraph>
    </Card>
  );
}; 

export default Report;
