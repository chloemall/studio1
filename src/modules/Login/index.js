import React, { useState } from "react";
import { Card, Button, Input } from "antd";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext"; // Import the AuthContext

import "./Login.css"; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Get the setUser function from AuthContext

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);

        // Send email verification
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Verification email sent");
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
          });

        window.alert("Sign up successful. Please verify your email.");
      })
      .catch((error) => {
        console.log("Sign up error:", error.message);
        if (error.code === "auth/email-already-in-use") {
          window.alert("Sign up failed: Email already exists");
        } else {
          window.alert("Sign up failed: " + error.message);
        }
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);

        if (!user.emailVerified) {
          // Send email verification if the user is not verified
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log("Verification email sent");
            })
            .catch((error) => {
              console.error("Error sending verification email:", error);
            });
        }

        setUser(user); // Set the user object in AuthContext
        window.alert("Login successful");
        navigate("menu/wallet"); // Navigate to cart after successful login
      })
      .catch((error) => {
        console.log("Login error:", error.message);
        window.alert("Login failed: " + error.message);
      });
  };

 

  return (
    <div className="login-container" style={{ background: 'black', minHeight: '100vh', color: 'white' }}>
      <Card
        title=""
        style={{
          width: "90%",
          maxWidth: "600px",
          borderRadius: "0", // Remove sharp corners
        }}
      >
        <div className="logo-container">
          <div className="logo-rotate">
            <img
              src="https://app.yafreeka.com/splash/img/light-1x.png"
              alt="Logo"
              className="logo"
            />
          </div>
          <h4>Yafreeka Studios</h4>
        </div>
        <Input
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          style={{ marginBottom: 10 }}
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" onClick={handleSignUp} style={{ marginRight: 10 }}>
          Sign Up
        </Button>
       
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Login;
