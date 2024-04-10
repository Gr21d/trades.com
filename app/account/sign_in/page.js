"use client";
import React from "react";
import Head from "next/head";
import styles from "../styles/start_form.css";
import module from "../../page.module.css";
import Image from "next/image";
import Link from "next/link";
import Form from "../../components/form" 

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Sign In</title>
      </Head>
      <main className="main">
        <Form type="signIn"/>
        <div className="ImageSection">
          <Image
            src="/images/Project.jpg"
            alt="Logo"
            width={1309}
            height={1300}
          />
        </div>
      </main>
    </div>
  );
}