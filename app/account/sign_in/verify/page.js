"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`../api/sign_in?token=${token}`,{
          method:'GET'
        });
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          window.location.href = "../../dashboard/crypto/bitcoin";
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("An error occurred. Please try again.");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <p>Verifying your email...</p>
      )}
    </div>
  );
}