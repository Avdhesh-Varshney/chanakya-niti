import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContributorDetail() {
  const contributorName = localStorage.getItem('contributorName');
  const [mergedPRs, setMergedPRs] = useState([]);
  const [error, setError] = useState(null);

  const owner = 'Avdhesh-Varshney'; // Replace with your GitHub owner/org
  const repo = 'chanakya-niti'; // Replace with your repository name

  // Function to recursively fetch all PRs using pagination
  const fetchAllPRs = async (page = 1, allPRs = []) => {
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&per_page=100&page=${page}`;
      const response = await axios.get(url);

      console.log(`Fetched PRs from page ${page}:`, response.data);

      // If no more PRs are returned, stop fetching
      if (response.data.length === 0) return allPRs;

      // Recursively fetch the next page of PRs
      return await fetchAllPRs(page + 1, [...allPRs, ...response.data]);
    } catch (error) {
      setError(error);
      console.error('Error fetching PRs:', error);
      return allPRs; // Return what has been fetched so far
    }
  };

  // Fetch and filter the merged PRs
  const fetchMergedPRs = async () => {
    try {
      const allPRs = await fetchAllPRs();
      console.log('All fetched PRs:', allPRs);

      // Filter PRs authored by the contributor and merged
      const filteredPRs = allPRs.filter(
        (pr) =>
          pr.user?.login.toLowerCase() === contributorName.toLowerCase() &&
          pr.merged_at !== null
      );

      console.log('Filtered PRs:', filteredPRs);
      setMergedPRs(filteredPRs);
    } catch (error) {
      setError(error);
      console.error('Error filtering PRs:', error);
    }
  };

  useEffect(() => {
    fetchMergedPRs();
  }, []);

  return (
    <>
      <h2 className="text-center my-4">Merged PRs by {contributorName}</h2>

      {error && <div className="alert alert-danger">Error: {error.message}</div>}

      {mergedPRs.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center">
          {mergedPRs.map((pr) => (
            <div key={pr.number} className="card my-3 mx-2" style={{ width: '350px' }}>
              <div className="card-header fw-bold">PR #{pr.number}</div>
              <div className="card-body">
                <h5 className="card-title">{pr.title}</h5>
               
                <a
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary my-2"
                >
                  View on GitHub
                </a>
               
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-4">
          No merged PRs available for {contributorName}.
        </div>
      )}
    </>
  );
}

export default ContributorDetail;
