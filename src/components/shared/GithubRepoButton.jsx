import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const GitHubRepoButton = () => {
  const [stars, setStars] = useState(0);

  // Fetch stars count from GitHub API
  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/Avdhesh-Varshney/chanakya-niti');
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error('Error fetching GitHub stars:', error);
      }
    };

    fetchStars();
  }, []);

  return (
    <a
      href="https://github.com/Avdhesh-Varshney/chanakya-niti"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white bg-dark p-2 rounded text-decoration-none d-inline-block"
    >
      <FaGithub className="me-2" /> Star us ⭐ {stars > 0 ? `${stars}` : ''}
    </a>
  );
};

export default GitHubRepoButton;
