import React, { useState } from "react";

function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const handleLogin = async (event) => {
event.preventDefault();

```
try {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  if (response.ok) {
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    setMessage("Login successful!");
  } else {
    setMessage(data.message || "Login failed.");
  }
} catch (error) {
  console.error("Login error:", error);
  setMessage("Unable to login. Please try again.");
}
```

};

return ( <div> <h1>Login</h1>

```
  <form onSubmit={handleLogin}>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      required
    />

    <button type="submit">Login</button>
  </form>

  {message && <p>{message}</p>}
</div>
```

);
}

export default LoginPage;
