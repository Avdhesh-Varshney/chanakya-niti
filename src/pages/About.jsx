// src/pages/About.jsx
import React from 'react';
import '../css/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1> Aacharya Chanakya</h1>
      <div className="about-content">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Chanakya_artistic_depiction.jpg" alt="Chanakya" className="about-image" />
        <div className="about-text">
          <p>Chanakya, also known as Kautilya or Vishnugupta, was an ancient Indian teacher, philosopher, economist, jurist, and royal advisor. He is traditionally identified as the author of the ancient Indian political treatise, the Arthashastra.</p>
          <p>Born in 350 BCE in India, Chanakya played a crucial role in the establishment of the Maurya Empire. He was the chief advisor to both Emperor Chandragupta and his son, Bindusara.</p>
          <p>Chanakya's work is considered pioneering in the fields of political science and economics. His strategies and principles are still studied and revered in modern times.</p>
          <p>His notable works include:</p>
          <ul>
            <li><b>Arthashastra:</b> A treatise on statecraft, economic policy, and military strategy.</li>
            <li><b>Chanakya Niti:</b> A collection of aphorisms offering guidance on various aspects of life.</li>
          </ul>
          <p>Chanakya's wisdom and teachings continue to influence and inspire leaders and scholars around the world.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
