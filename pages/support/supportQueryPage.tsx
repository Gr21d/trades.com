import React, { FormEvent } from 'react';
// import jwt from "jsonwebtoken";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Cookies from 'js-cookie';
import { getToken } from 'next-auth/jwt';
import jwt from "jsonwebtoken";
import { jwtDecode } from 'jwt-decode';
// import * as jwtDecode from 'jwt-decode';



const SubmitSupportQueryPage: React.FC = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const getToken = () => {
      if(typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem("token");
      }
      return null;
    };

    const token = getToken();
    if(token){
      setDecodedToken(jwtDecode(token));
    }
    else {
      console.log("Token not found");
    }
  }, []);

  const submitSupportQuery = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const content = target.content.value;
    let investorId;
    if(decodedToken){
      investorId = decodedToken.userId;
    }
    
    // const adminId = target.adminId.value ? parseInt(target.adminId.value, 10) : null;

    const response = await fetch('/api/supportQuery/addSupportQuery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        investorId,
        // adminId,
      }),
    });

    if (response.ok) {
      console.log('Support Query added');
      // You might want to clear the form or redirect the user
    } else {
      console.error('Error adding support query');
      // Handle the error, possibly show a message to the user
    }
  };


  return (
    <form onSubmit={submitSupportQuery}>
      <textarea id="content" name="content" required />
      {/* <input type="number" id="investorId" name="investorId" required /> */}
      {/* <input type="number" id="adminId" name="adminId" /> */}
      <button type="submit">Submit Support Query</button>
    </form>
    
  );
};

export default SubmitSupportQueryPage;
