import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import "./Contact.css"; // Import your custom CSS file

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        'service_kssjugu',//write service id here 
        'template_cg8qcij',//write templet id here
        {
          from_name: form.name,
          to_name: "FoodiesWeb",
          from_email: form.email,
          to_email: "info@foodiweb.com",
          message: form.message,
        },
        'EJL9aVO3EzRRm0TRE'  //write public_key here
      );

      setLoading(false);
      alert("Thank you. I will get back to you as soon as possible.");

      setForm({
        name: "",
        email: "",
        message: "",
      });

      handleClose();
    } catch (error) {
      setLoading(false);
      console.error(error);

      alert("Sorry, something went wrong while sending your message. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      <div className="close-button" onClick={handleClose}>
        <img src="cr2.png" alt="Close" style={{ width: '2.4rem' }} />
      </div>
      <p className="contact-heading">Get in touch</p>
      <div className="form-container">
        <form
          ref={formRef}
          onSubmit={handleEmailSubmit}
          className="form"
        >
          <label className="form-label">
            <span className="form-label-text">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="form-input"
            />
          </label>
          <label className="form-label">
            <span className="form-label-text">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="form-input"
            />
          </label>
          <label className="form-label">
            <span className="form-label-text">Your Message</span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="form-textarea"
            />
          </label>
          <button
            type="submit"
            className="form-button"
          >
            {loading ? "Sending..." : "Send Mail"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
