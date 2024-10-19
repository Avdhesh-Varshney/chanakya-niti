import React, { useState } from 'react';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback Submitted:', formData);
    // Clear the form after submission
    setFormData({ name: '', email: '', feedback: '', rating: 0 });
    setHoverRating(0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Feedback Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="feedback" style={styles.label}>Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            required
            rows="4"
            style={styles.textarea}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="rating" style={styles.label}>Rating:</label>
          <div style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  ...styles.star,
                  color: (hoverRating || formData.rating) >= star ? '#FFD700' : '#ccc',
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit" style={styles.button}>Submit Feedback</button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  starContainer: {
    display: 'flex',
  },
  star: {
    fontSize: '30px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default FeedbackPage;
