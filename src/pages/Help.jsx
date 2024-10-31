import React, { useState } from "react";

export default function Help() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    complaint: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a server). For now it just logs the form data in console.
    console.log(formData);
  };

  const faqs = [
    {
      question: "How do I log in to my account?",
      answer:
        "To log in, simply enter your email address and password in the designated fields on the login page and click 'Login'",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "If you forget your password, click the 'Forgot Password' link on the login page. You'll be prompted to enter your email address, and a password reset link will be sent to you.",
    },
    {
      question: "Who was Chanakya?",
      answer:
        "Chanakya was a renowned Indian philosopher, economist, and statesman, believed to have lived during the 4th century BC. He is best known for his treatise 'Arthashastra' a comprehensive work on statecraft, economics, and political science.",
    },
    {
      question: "What is Chanakya's significance in Indian history?",
      answer:
        "Chanakya played a pivotal role in the rise of the Mauryan Empire, advising its founder, Chandragupta Maurya. His strategic guidance and political acumen contributed to the empire's expansion and consolidation.",
    },
    {
      question: "What are Chanakya's most famous works?",
      answer:
        "Chanakya's most renowned work is the 'Arthashastra' a comprehensive treatise on statecraft, economics, and political science. It covers a wide range of topics, including governance, diplomacy, military strategy, and finance.",
    },
    {
      question: "How is the Arthashastra relevant today?",
      answer:
        "The Arthashastra's principles and insights continue to be studied and discussed today, providing valuable perspectives on leadership, governance, and economic development.",
    },
    {
      question: "What is the Arthashastra?",
      answer:
        "The Arthashastra is a comprehensive treatise on statecraft, economics, and political science, attributed to Chanakya. It provides insights into the governance, administration, and economic policies of ancient India.",
    },

    // Add more FAQs here
  ];


  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-center h1 font-weight-bold mb-4">
        Let us know what you think
      </h2>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please enter your name.</div>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email Address
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="phone" className="col-sm-2 col-form-label">
            Phone Number (Optional)
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="complaint" className="col-sm-2 col-form-label">
            Message
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="complaint"
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              rows={5}
              required
            />
            <div className="invalid-feedback">
              Please enter your complaint or feedback.
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <div className="container my-5">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="accordionExample">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${openIndex === index ? "" : "collapsed"}`}
                type="button"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`collapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${openIndex === index ? "show" : ""}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          