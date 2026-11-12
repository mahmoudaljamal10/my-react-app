
import { useState } from "react";

function MyForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    job: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted Successfully!");
  }

  return (
    <div className="page-wrapper">
      <div className="form-layout">

        <aside className="form-sidebar">
          <div className="brand-mark">✦</div>

          <span className="sidebar-tag">WELCOME</span>

          <h2>Let's get to know you.</h2>

          <p>
            Your information helps us create a better
            experience for you. Complete your details
            to get started.
          </p>

          <div className="sidebar-bottom">
            <span className="sidebar-line"></span>
            <span>PERSONAL PROFILE / 2026</span>
          </div>
        </aside>

        <main className="form-content">
          <div className="form-heading">
            <span className="form-label">YOUR DETAILS</span>
            <h1>Personal Information</h1>
            <p>Please fill in your information below.</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Current Job</label>
              <input
                type="text"
                name="job"
                placeholder="Enter your job"
                value={formData.job}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button className="form-button" type="submit">
              Submit Information
              <span>→</span>
            </button>

            <p className="form-footer">
              Your Information Will Send 
            </p>

          </form>
        </main>

      </div>
    </div>
  );
}

export default MyForm;
