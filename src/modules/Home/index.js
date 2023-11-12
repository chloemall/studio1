import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from 'antd';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import {
  collection,
  doc,
  getDoc,
  query,
  getDocs,
  getFirestore,
  where,
  Timestamp,
} from 'firebase/firestore';
import "./Home.css"; // Import the CSS file for styling

const { Text } = Typography;

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [activeButton, setActiveButton] = useState('Last 7 days');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const userEmail = user.email;
        const firestore = getFirestore();
        const userInformationDocRef = doc(firestore, 'users', userEmail, 'information', userId);

        try {
          const userInformationDocSnapshot = await getDoc(userInformationDocRef);
          if (userInformationDocSnapshot.exists()) {
            const userData = userInformationDocSnapshot.data();
            const numberOfMonths = userData.subscriberCountHistory
              ? userData.subscriberCountHistory.length
              : 0;

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

            const entertainmentCollectionRef = collection(firestore, 'contents', 'PodMusic', 'Entertainment');
            const q = query(entertainmentCollectionRef, where('CreatorId', '==', userId));
            const querySnapshot = await getDocs(q);
            const entertainmentDocs = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              // Convert Firestore Timestamp to JavaScript Date
              const createdAt = data.CreatedAt.toDate();
              return {
                ...data,
                CreatedAt: createdAt,
              };
            });
            setEntertainmentData(entertainmentDocs);
          } else {
            console.error('User information document not found in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user information from Firestore:', error);
        }
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const cardStyle = {
    width: '100%',
    height: '160px',
    top: '294px',
    left: '335px',
    backgroundColor: 'darkgrey',
  };

  const thumbnailStyle = {
    width: '135px',
    height: '115px',
    top: '314px',
    left: '363px',
    borderRadius: '20px',
  };

  const infoStyle = {
    flex: '1',
    fontSize: '20px',
    lineHeight: '24.2px',
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const filteredEntertainmentData = entertainmentData.filter((entertainment) => {
    const currentDate = new Date();
    const createdAt = entertainment.CreatedAt;
    const timeDifference = currentDate - createdAt;
    switch (activeButton) {
      case 'Last 7 days':
        return timeDifference <= 7 * 24 * 60 * 60 * 1000; // Last 7 days
      case 'Last 28 days':
        return timeDifference <= 28 * 24 * 60 * 60 * 1000; // Last 28 days
      case 'Last 60 days':
        return timeDifference <= 60 * 24 * 60 * 60 * 1000; // Last 60 days
      case 'Custom':
        // Implement your custom logic here
        return true; // By default, show all
      default:
        return true; // By default, show all
    }
  });

  return (
    <div className="report-container" style={{ height: '100vh', overflow: 'hidden' }}>
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', overflowY: 'auto' }}>
        <h2 style={{ marginTop: '40px' }}>Podcast</h2>

        {userInfo && (
          <div style={{ textAlign: 'right', marginRight: '20px' }}>
            <p>{userInfo.email}</p>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '.5rem',
          }}
        >
          <Button
            style={{
              backgroundColor: activeButton === 'Last 7 days' ? 'black' : 'white',
              color: activeButton === 'Last 7 days' ? 'white' : 'black',
            }}
            onClick={() => setActiveButton('Last 7 days')}
          >
            Last 7 days
          </Button>
          <Button
            style={{
              backgroundColor: activeButton === 'Last 28 days' ? 'black' : 'white',
              color: activeButton === 'Last 28 days' ? 'white' : 'black',
            }}
            onClick={() => setActiveButton('Last 28 days')}
          >
            Last 28 days
          </Button>
          <Button
            style={{
              backgroundColor: activeButton === 'Last 60 days' ? 'black' : 'white',
              color: activeButton === 'Last 60 days' ? 'white' : 'black',
            }}
            onClick={() => setActiveButton('Last 60 days')}
          >
            Last 60 days
          </Button>
          <Button
            style={{
              backgroundColor: activeButton === 'Custom' ? 'black' : 'white',
              color: activeButton === 'Custom' ? 'white' : 'black',
            }}
            onClick={() => setActiveButton('Custom')}
          >
            Custom
          </Button>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <h3>{filteredEntertainmentData.length} posts</h3>
        </div>

        <div className="entertainment" style={cardStyle}>
          {filteredEntertainmentData.map((entertainment, index) => (
            <div
              key={index}
              style={{
                marginBottom: '20px',
                width: '98%',
                height: '98%',
                backgroundColor: '#EBECF0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <img
                src={`data:image/jpeg;base64, ${entertainment.Thumbnail}`} // Use data URI for base64-encoded images
                alt={''}
                style={{
                  width: '179px',
                  height: '70%',
                  objectFit: 'cover',
                  marginRight: '5px',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', width: '98%' }}>
                <Text style={infoStyle}>{entertainment.Description}</Text>
                <div style={{ height: '20px' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={infoStyle}>Likes: {entertainment.likes}</Text>
                  <Text style={infoStyle}>Dislikes: {entertainment.dislikes}</Text>
                  <Text style={infoStyle}>Comments: {entertainment.comments}</Text>
                  <Text style={infoStyle}>{entertainment.CreatedAt.toLocaleString()}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
