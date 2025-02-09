/*import React, { useState } from "react";
import "../css/Feedback.css";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && rating && feedback) {
      setIsSubmitted(true);
      // Here, handle actual submission, such as sending to a backend API
      console.log({
        name,
        email,
        rating,
        feedback,
      });
      // Reset form after submission
      setName("");
      setEmail("");
      setRating(0);
      setFeedback("");
      setHoverRating(0);
    } else {
      alert("Please fill out all fields");
    }
  };

  const closePopup = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="feedback-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Feedback Form</h1>

        /* Name Input 
        <input
          className="name"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email Input 
        <input
          className="email"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Star Rating 
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={
                star <= (hoverRating || rating) ? "star-filled" : "star"
              }
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Feedback Textarea 
        <textarea
          className="message"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Describe your experience.."
          required
        />

        {/* Submit Button 
        <button type="submit" className="post-button">
          Submit
        </button>
      </form>

      {/* Success Pop-up 
      {isSubmitted && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Thank You!</h3>
            <p>Your feedback has been successfully submitted.</p>
            <button onClick={closePopup} className="close-popup-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};*/












import React, { useState } from "react";
import "../css/Feedback.css";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [impactfulTeachings, setImpactfulTeachings] = useState([]);
  const [inspired, setInspired] = useState("");
  const [personalInsights, setPersonalInsights] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [layoutRating, setLayoutRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    rating: false,
    impactfulTeachings: false,
    inspired: false,
    personalInsights: false,
    suggestions: false,
    layoutRating: false,
  });

  const handleRating = (rate) => {
    setRating(rate);
    setErrors((prev) => ({ ...prev, rating: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;

    if (!name) {
      setErrors((prev) => ({ ...prev, name: true }));
      hasErrors = true;
    }
    if (!email || !isValidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      hasErrors = true;
    }
    if (rating === 0) {
      setErrors((prev) => ({ ...prev, rating: true }));
      hasErrors = true;
    }
    if (impactfulTeachings.length === 0) {
      setErrors((prev) => ({ ...prev, impactfulTeachings: true }));
      hasErrors = true;
    }
    if (inspired === "") {
      setErrors((prev) => ({ ...prev, inspired: true }));
      hasErrors = true;
    }
    if (inspired === "Yes" && !personalInsights) {
      setErrors((prev) => ({ ...prev, personalInsights: true }));
      hasErrors = true;
    }
    if (!suggestions) {
      setErrors((prev) => ({ ...prev, suggestions: true }));
      hasErrors = true;
    }
    if (layoutRating === 0) {
      setErrors((prev) => ({ ...prev, layoutRating: true }));
      hasErrors = true;
    }

    if (!hasErrors) {
      setIsSubmitted(true);
      console.log({
        name,
        email,
        rating,
        impactfulTeachings,
        inspired,
        personalInsights,
        suggestions,
        layoutRating,
      });
      // Reset form fields
      resetForm();
    }
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setImpactfulTeachings((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    setErrors((prev) => ({ ...prev, impactfulTeachings: false }));
  };

  const closePopup = () => {
    setIsSubmitted(false);
  };

  const isValidEmail = (email) => {
    // Simple email validation
    return /^[a-zA-Z0-9]+(?:[\.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[\.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,3}$/.test(email);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setRating(0);
    setImpactfulTeachings([]);
    setInspired("");
    setPersonalInsights("");
    setSuggestions("");
    setLayoutRating(0);
    setHoverRating(0);
    setErrors({
      name: false,
      email: false,
      rating: false,
      impactfulTeachings: false,
      inspired: false,
      personalInsights: false,
      suggestions: false,
      layoutRating: false,
    });
  };

  return (
    <div className="feedback-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Feedback Form</h1>

        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className={`name ${errors.name ? "error" : ""}`}
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <span className="error-message">Please enter your name.</span>}
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email"> Email</label>
          <input
            className={`email ${errors.email ? "error" : ""}`}
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error-message">Please enter a valid email address.</span>}
        </div>

        {/* Content Rating */}
        <div className="section">
          <h3>How would you rate the overall content?</h3>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (hoverRating || rating) ? "star-filled" : ""} ${
                  errors.rating && rating === 0 ? "error" : ""
                }`}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
            {errors.rating && <span className="error-message">Please rate the content.</span>}
          </div>
        </div>

        {/* Most Impactful Teachings */}
        <div className="section">
          <h3>Which teachings were most impactful for you?</h3>
          <div className={`checkbox-group ${errors.impactfulTeachings ? "error" : ""}`}>
            <label>
              <input type="checkbox" value="Life Philosophy" onChange={handleCheckboxChange} /> Life Philosophy
            </label>
            <label>
              <input type="checkbox" value="Leadership Skills" onChange={handleCheckboxChange} /> Leadership Skills
            </label>
            <label>
              <input type="checkbox" value="Strategic Thinking" onChange={handleCheckboxChange} /> Strategic Thinking
            </label>
            <label>
              <input type="checkbox" value="Relationship Management" onChange={handleCheckboxChange} /> Relationship Management
            </label>
            <label>
              <input type="checkbox" value="Personal Development" onChange={handleCheckboxChange} /> Personal Development
            </label>
            {errors.impactfulTeachings && (
              <span className="error-message">Please select at least one impactful teaching.</span>
            )}
          </div>
        </div>

        {/* Personal Insights */}
        <div className="section">
          <h3>Did Chanakya's teachings inspire you to make changes in your life?</h3>
          <div className={`form-group ${errors.inspired ? "error" : ""}`}>
            <select value={inspired} onChange={(e) => setInspired(e.target.value)} required>
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.inspired && <span className="error-message">Please select an option.</span>}
          </div>
          {inspired === "Yes" && (
            <div className={`form-group ${errors.personalInsights ? "error" : ""}`}>
              
              <textarea
                className="personal-insights"
                id="personal-insights"
                value={personalInsights}
                onChange={(e) => setPersonalInsights(e.target.value)}
                placeholder="Describe your personal insights..."
                required
              />
              {errors.personalInsights && (
                <span className="error-message">Please share your personal insights.</span>
              )}
            </div>
          )}
        </div>
        <div className="section">
  <h3>Do you have any suggestions for additional content or improvements?</h3>
  <div className={`form-group ${errors.suggestions ? "error" : ""}`}>
    <textarea
      className="suggestions"
      id="suggestions"
      value={suggestions}
      onChange={(e) => setSuggestions(e.target.value)}
      placeholder="Provide your suggestions..."
      required
    />
    {errors.suggestions && (
      <span className="error-message">Please provide your suggestions.</span>
    )}
  </div>
</div>

       

        {/* Layout Rating */}
        <div className="section">
          <h3>How would you rate the website layout and design?</h3>
          <div className={`stars ${errors.layoutRating ? "error" : ""}`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= layoutRating ? "star-filled" : ""}`}
                onClick={() => setLayoutRating(star)}
              >
                ★
              </span>
            ))}
            {errors.layoutRating && <span className="error-message">Please rate the layout and design.</span>}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="post-button">
          Submit
        </button>
      </form>

      {/* Success Pop-up */}
      {isSubmitted && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Thank You!</h3>
            <p>Your feedback has been successfully submitted.</p>
            <button onClick={closePopup} className="close-popup-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;