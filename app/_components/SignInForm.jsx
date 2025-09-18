"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "./Button/Button";

export default function signInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function formSubmit() {
    const singInData = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    console.log(singInData);

    if (singInData?.error) {
      console.log(singInData.error);
    }
  }
  return (
    <form onSubmit={formSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button>submit</Button>
    </form>
  );
}
