import React, { useState } from "react";

function RegisterPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const handleRegister = async (event) => {
event.preventDefault();

```
try {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  });

  const data = await response.json();

  if (response.ok) {
    setMessage("Registration successful!");
  } else {
    setMessage(data.message || "Registration failed.");
  }
} catch (error) {
  console.error("Registration error:", error);
  setMessage("Unable to register. Please try again.");
}
```

};

return ( <div> <h1>Register</h1>

```
  <form onSubmit={handleRegister}>
    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(event) => setName(event.target.value)}
      required
    />

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

    <button type="submit">Register</button>
  </form>

  {message && <p>{message}</p>}
</div>
```

);
}

export default RegisterPage;
