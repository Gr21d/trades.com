'use client'
import React , {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import jwt from "jsonwebtoken";



export default function Form(props) {
  const router = useRouter();
  const [errorMessage , setErrorMessage] = useState("")


  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch("./api/sign_up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          userType: values.userType,
          password: values.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        
        router.push("./sign_in");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  const handleSignIn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch("./api/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(jwt.decode(data.token))
        localStorage.setItem('token', data.token); // stores data (userId = .userId) // need to decode 
        router.push("../Blog/posBlog");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }
  return (
    <div className="FormContainer">
      <div>
        <div className="logo">
          <Image src="/images/iconBull.png" alt="Logo" width={97} height={92} />
        </div>
        <div>
          <h2 id="header">{props.type === "signIn" ? "Sign In" : "Sign Up"}</h2>
          <p>
            {props.type === "signIn"
              ? "Welcome back! Please sign in to your account."
              : "Let's get you an account and discover the right cryptocurrencies to trade."}
          </p>
          <form onSubmit={props.type === "signIn" ? handleSignIn : handleSignUp}>
            <div className="Form">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="youremail@domain.com"
                required
              />
              {props.type !== "signIn" && (
                <>
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" required />
                  <label htmlFor="userType">User Type</label>
                  <select name="userType" id="userType" className="selectBox">
                    <option value="BusinessAccount">Business Account</option>
                    <option value="TraderAccount">Trader Account</option>
                  </select>
                </>
              )}
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
              {errorMessage && <div className="alert">{errorMessage}</div>}
              <div className="buttonsContainer">
               
                <button type="submit">
                  {props.type === "signIn" ? "Sign In" : "Sign Up"}
                </button>
                {props.type === "signIn" ? (
                  <Link href="./sign_up" className="__nav__">
                    Sign Up
                  </Link>
                ) : (
                  <Link href="./sign_in" className="__nav__">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </form>
          <div className="separator">-or-</div>
          <div className="socialForm">
            <button>
              {props.type === "signIn"
                ? "Sign in with your Gmail account"
                : "Sign up with your Gmail account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}