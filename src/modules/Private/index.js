import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Private = () => {
  const [userInfo, setUserInfo] = useState(null);

  // Use useEffect to listen for changes in the authentication state
  useEffect(() => {
    // Firebase provides an observer to listen to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const userEmail = user.email;
        const firestore = getFirestore();

        // Reference to the user information document
        const userInformationDocRef = doc(
          firestore,
          'users',
          userEmail,
          'information',
          userId
        );

        try {
          // Fetch the user information document from Firestore
          const userInformationDocSnapshot = await getDoc(userInformationDocRef);
          if (userInformationDocSnapshot.exists()) {
            const userData = userInformationDocSnapshot.data();

            // Calculate the number of months from the user's data
            const numberOfMonths = userData.subscriberCountHistory ? userData.subscriberCountHistory.length : 0;

            // Set the user information in the state, including the number of months
            setUserInfo({
              uid: userId,
              email: userEmail,
              profileImage: userData.profileImage,
              fullname: userData.fullname,
              phone: userData.phone,
              subscriberCount: userData.subscriberCount,
              username: userData.username,
              watchTimeHours: userData.watchTimeHours,
              numberOfMonths: numberOfMonths,
            });
          } else {
            console.error('User information document not found in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user information from Firestore:', error);
        }
      } else {
        // User is signed out
        setUserInfo(null);
      }
    });

    // Unsubscribe the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Card title={'Analytics'} style={{ margin: 20 }}>
      {userInfo && (
        <div style={{ textAlign: 'right', marginRight: '20px' }}>
          <p>User ID: {userInfo.uid}</p>
          <p>Email: {userInfo.email}</p>
          <p>Full Name: {userInfo.fullname}</p>
          <p>Phone: {userInfo.phone}</p>
          <p>Subscriber Count: {userInfo.subscriberCount}</p>
          <p>Username: {userInfo.username}</p>
          <p>Watch Time Hours: {userInfo.watchTimeHours}</p>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h2>Subscribers</h2>
          <LineChart width={500} height={300} data={userInfo ? [userInfo] : []}>
            <XAxis dataKey="numberOfMonths" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="subscriberCount" stroke="#8884d8" />
          </LineChart>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Watch Hours</h2>
          <LineChart width={500} height={300} data={userInfo ? [userInfo] : []}>
            <XAxis dataKey="numberOfMonths" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="watchTimeHours" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </Card>
  );
};

export default Private;
