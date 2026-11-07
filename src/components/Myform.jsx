

import React, { useState } from "react";

function MyForm() {

  // Store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    message: ""
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    console.log("Form Data:", formData);

    alert(`Welcome ${formData.name}!`);

    setFormData({
      name: "",
      email: "",
      password: "",
      message: ""
    });
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>

        <h2 style={styles.title}>Contact Us</h2>

        <label style={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Message</label>
        <textarea
          name="message"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Submit
        </button>

      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f4f7",
    padding: "20px",
  },

  form: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  title: {
    textAlign: "center",
    color: "#222",
  },

  label: {
    fontWeight: "bold",
    color: "#333",
  },

  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "7px",
    fontSize: "15px",
  },

  textarea: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "7px",
    fontSize: "15px",
    minHeight: "100px",
  },

  button: {
    padding: "13px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "7px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default MyForm;
