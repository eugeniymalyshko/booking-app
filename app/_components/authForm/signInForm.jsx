"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "../Button/Button";

export default function signInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function formSubmit(e) {
    e.preventDefault();
    const singInData = await signIn("credentials", {
      username: username,
      password: password,
    });
    console.log(singInData);
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
