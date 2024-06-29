import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContributorDetail(props) {

  const contributorName=localStorage.getItem('contributorName');

  const [mergedPRs, setMergedPRs] = useState([]);
  const [error, setError] = useState(null);

  const owner = 'Avdhesh-Varshney'; // Replace with actual owner username/organization
  const repo = 'chanakya-niti'; // Replace with actual repo name
  const contributor_username = contributorName; // Replace with contributor username

  const fetchMergedPRs = async () => {
    try {
      const baseUrl = 'https://api.github.com';
      const url = `${baseUrl}/repos/${owner}/${repo}/pulls?state=closed&author=${contributor_username}`;

      const response = await axios.get(url);
      let data = response.data;
      const arr = await data.filter((pr) => {
        return pr.user.login === `${contributorName}` && pr.merged_at != null;

      })
      setMergedPRs(arr);
    } catch (error) {
      setError(error);
      console.error('Error fetching merged PRs:', error);
    }
  };
  useEffect(() => {
    fetchMergedPRs();
  }, [])

  return (
    <>
      {mergedPRs.length > 0 &&
        <div>
          <div className="common">
            <div className="card mx-2 my-2" style={{ width: "18rem" }}>
              <img src={mergedPRs[0].user.avatar_url} className="card-img-top" alt="..." />
              <div className="card-body ">
                <h5 className="card-title">{contributorName}</h5>
                <div className="card-header">
                  No of contributions : {localStorage.getItem('contributions')}
                </div>
                <div className="card-header">
                <p><a href={mergedPRs[0].user.html_url} target='_blank' className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Github &#8599;</a></p>
                </div>
              
              </div>
            </div>
          </div>
          <div className="mergedprs">
        {
          mergedPRs.map((element)=>{
            return <p style={{cursor:"pointer"}} key={mergedPRs.indexOf(element)}><a href={element.html_url} target='_blank' className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">PR No. {element.number}</a></p>

          })
        }
      </div>
        </div>
      }
      {
        mergedPRs.length < 1 && <div>
          Sorry not merged prs available
        </div>
      }

    </>
  )
}

export default ContributorDetail