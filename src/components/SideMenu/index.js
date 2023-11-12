import React, { useState } from 'react';
import { Menu, Typography, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { WalletOutlined, AreaChartOutlined, DownOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const { Text } = Typography;

const SideMenu = () => {
  const navigate = useNavigate();
  const [analyticsExpanded, setAnalyticsExpanded] = useState(false);

  const menuItems = [
    {
      key: 'menu/wallet',
      label: 'Wallet',
    },
    {
      key: 'report',
      label: 'Report & Problem',
    },
  ];

  const analyticsSubMenu = [
    {
      key: 'report',
      label: 'Overview',
    },
    {
      key: '',
      label: 'Podcasts',
    },
    {
      key: 'quicies',
      label: 'Quickies',
    },
  ];

  const menuStyle = {
    backgroundColor: 'black',
    color: 'white',
  };

  const textStyles = {
    fontWeight: 'bold',
    fontSize: '16px',
    color: 'white', // Set text color to white
  };

  const dropdownArrowStyle = {
    color: 'white', // Set the dropdown arrow color to white
  };

  const handleAnalyticsClick = () => {
    setAnalyticsExpanded(!analyticsExpanded);
  };

  const handleLogout = () => {
    // Display a confirmation dialog before logging out
    if (window.confirm('Are you sure you want to log out?')) {
      signOut(auth)
        .then(() => {
          // Add any additional cleanup or redirection logic here
          navigate('/'); // Redirect to the login page after logout
        })
        .catch((error) => {
          console.error('Logout error:', error.message);
        });
    }
  };

  return (
    <Menu selectedKeys={[window.location.pathname]} mode="vertical" style={menuStyle}>
      {/* Analytics and sub-items */}
      <Menu.Item
        key="analytics"
        onClick={handleAnalyticsClick}
      >
        <Link>
          <Space>
            <Text style={textStyles}>Analytics</Text>
            <DownOutlined style={dropdownArrowStyle} />
          </Space>
        </Link>
      </Menu.Item>
      {analyticsExpanded &&
        analyticsSubMenu.map((item) => (
          <Menu.Item
            key={item.key}
            onClick={() => navigate(`menu/${item.key}`)}
            style={{ paddingLeft: '32px' }}
          >
            <Link to={`menu/${item.key}`}>
              <Text style={textStyles}>{item.label}</Text>
            </Link>
          </Menu.Item>
        ))}

      {menuItems.map((menuItem) => (
        <Menu.Item
          key={menuItem.key}
          onClick={() => navigate(menuItem.key)}
          icon={menuItem.icon}
        >
          <Link to={menuItem.key}>
            <Text style={textStyles}>{menuItem.label}</Text>
          </Link>
        </Menu.Item>
      ))}

      {/* Logout item */}
      <Menu.Item key="logout" onClick={handleLogout}>
        <Text style={textStyles}>Log Out</Text>
      </Menu.Item>
    </Menu>
  );
};

export default SideMenu;
