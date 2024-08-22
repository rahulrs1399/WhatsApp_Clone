import React from "react";
import { auth, GoogleAuthProvider, signInWithPopup } from "./firebase";
import { Button } from "@mui/material";
import "./login.css";

function Login() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user); // The signed-in user info.
      // You can now redirect the user or perform other actions based on the signed-in user.
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://w7.pngwing.com/pngs/922/489/png-transparent-whatsapp-icon-logo-whatsapp-logo-whatsapp-logo-text-trademark-grass-thumbnail.png" />

        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
      
      <Button type="submit" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
      </div>
    </div>
  );
}

export default Login;
