import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Button } from 'antd';
import { GiftOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { useAuth } from '../../components/AuthContext';
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import './Wallet.css';


const Wallet = () => {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState('');
  const [userUID, setUserUID] = useState('');
  const [giftAmount, setGiftAmount] = useState(0);
  const [contentAmount, setContentAmount] = useState(0);
  const [mpesaVisible, setMpesaVisible] = useState(false);
  const [bankTransferVisible, setBankTransferVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');
  const profileImageUrl = 'https://parade.com/.image/t_share/MTk0NDg3NzEyODkwMjM0Mzcz/margot-robbie-barbie-movie-2023.webp'; // Replace with the actual HTTPS profile image URL

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
      setUserUID(user.uid);

      const fetchAmounts = async () => {
        const userInformationDocRef = doc(db, 'users', userEmail, 'information', userUID);

        const userDocSnapshot = await getDoc(userInformationDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setGiftAmount(userData.giftAmount || 0);
          setContentAmount(userData.contentAmount || 0);
        } else {
          // If the document does not exist, create it with default values
          await setDoc(userInformationDocRef, {
            giftAmount: 0,
            contentAmount: 0,
          });
          setGiftAmount(0);
          setContentAmount(0);
        }
      };

      fetchAmounts();
    }
  }, [user, userEmail, userUID]);

  const handleWithdraw = async () => {
    if (withdrawAmount <= 0) {
      return;
    }

    const userInformationDocRef = doc(db, 'users', userEmail, 'information', userUID);
    const balanceToUpdate = mpesaVisible ? 'giftAmount' : 'contentAmount';

    if (withdrawAmount > (mpesaVisible ? giftAmount : contentAmount)) {
      alert('Insufficient balance.');
      return;
    }

    if (mpesaVisible) {
      setGiftAmount(giftAmount - withdrawAmount);
    } else {
      setContentAmount(contentAmount - withdrawAmount);
    }

    await updateDoc(userInformationDocRef, {
      [balanceToUpdate]: db.FieldValue.increment(-withdrawAmount),
    });

    setWithdrawAmount(0);
    setCardNumber('');
    setExpirationMonth('');
    setExpirationYear('');
    setCvv('');
  };

  const handleMpesaClick = () => {
    setMpesaVisible(true);
    setBankTransferVisible(false);
  };

  const handleBankTransferClick = () => {
    setBankTransferVisible(true);
    setMpesaVisible(false);
  };

  return (
      <div className="report-container">
      <div className="profile-image">
        <img src={profileImageUrl} alt="Profile" />
      </div>
      <div className="spacer"></div>
      <div className="content-container" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#3D4849', margin: '20px 0' }}>
  <div className="left-corner">
    <div className="icon-title">
      <GiftOutlined style={{ fontSize: '48px', color: 'white' }} />
      <p style={{ color: 'white' }}>Gift</p>
      <p style={{ color: 'white' }}>Gift Amount: ${giftAmount}</p>
    </div>
  </div>
  <div className="right-corner">
    <div className="icon-title">
      <DollarCircleOutlined style={{ fontSize: '48px', color: 'white' }} />
      <p style={{ color: 'white' }}>Content Payment</p>
      <p style={{ color: 'white' }}>Content Amount: ${contentAmount}</p>
    </div>
  </div>
</div>

<div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', margin: '20px 0' }}>
  <div style={{ position: 'relative', flex: 1 }}>
    <img
      src="https://www.thefastmode.com/media/k2/items/src/812a717c689c11bf1c8c2052ebf534d9.jpg?t=20230517_090115"
      alt="Mpesa"
      style={{
        maxWidth: mpesaVisible ? '90%' : '100%',
        maxHeight: '250px',
        cursor: 'pointer',
        position: 'absolute',
        zIndex: mpesaVisible ? 2 : 1,
        left: mpesaVisible ? '-5%' : '0',
        transition: 'max-width 0.3s, left 0.3s',
      }}
      onClick={handleMpesaClick}
    />
  </div>
  <div style={{ flex: 1 }}>
    {mpesaVisible && (
      <Card
        style={{
          background: '#3D4849',
          color: 'white',
          width: '500px',
        }}
      >
        <h4 style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
          Payment Detail
        </h4>
        <Input placeholder="Phone number" style={{ marginBottom: '10px' }} />
        <Input
          placeholder="Amount"
          onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
          style={{ marginBottom: '10px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" onClick={handleWithdraw} style={{ background: 'blue', color: 'white' }}>
            Withdraw
          </Button>
          <Button type="default" style={{ background: 'white' }}>
            Cancel
          </Button>
        </div>
      </Card>
    )}
  </div>
</div>

<div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', margin: '20px 0' }}>
  <div style={{ position: 'relative', flex: 1 }}>
    <img
      src="https://www.nbk.com/dam/jcr:1e859a9e-aee0-4a55-b889-4cc7e6b3cff7/NBK-World-Mastercard-Credit-Card-Thumbnail.jpg"
      alt="Bank Transfer"
      style={{
        maxWidth: bankTransferVisible ? '90%' : '100%',
        maxHeight: '280px',
        cursor: 'pointer',
        position: 'absolute',
        zIndex: bankTransferVisible ? 2 : 1,
        left: bankTransferVisible ? '-5%' : '0',
        transition: 'max-width 0.3s, left 0.3s',
      }}
      onClick={handleBankTransferClick}
    />
  </div>
  <div style={{ flex: 1 }}>
    {bankTransferVisible && (
      <Card
        style={{
          background: '#3D4849',
          color: 'white',
          width: '500px',
        }}
      >
        <h4 style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
          Payment Detail
        </h4>
        <div style={{ marginBottom: '20px' }}>
          <Input placeholder="Card number" />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder="Amount"
            onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
          />
        </div>
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Input placeholder="Expiration Month" />
          </Col>
          <Col span={8}>
            <Input placeholder="Expiration Year" />
          </Col>
          <Col span={8}>
            <Input placeholder="CVV" />
          </Col>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" onClick={handleWithdraw} style={{ background: 'blue', color: 'white' }}>
            Withdraw
          </Button>
          <Button type="default" style={{ background: 'white' }}>
            Cancel
          </Button>
        </div>
      </Card>
    )}
  </div>
</div>

      </div>
  );
};

export default Wallet;
