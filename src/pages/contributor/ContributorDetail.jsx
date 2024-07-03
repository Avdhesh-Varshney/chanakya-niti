import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContributorDetail(props) {

  const contributorName = localStorage.getItem('contributorName');

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
      // console.log(arr);
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
        <div className='d-flex flex-wrap justify-content-center'>
          <div className="common">
            <div className="card mx-1 my-2" style={{ width: "18rem" }}>
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
            {
              mergedPRs.map((element) => {
                return <div key={element.number} className="card my-3 mx-2" style={{width:"350px"}}>
                  <div className="card-header fw-bold">
                    #{element.number}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Title: {element.title}</h5>
                    <div className="card-text">
                      <p className='fw-bold'> Labels:</p> 
                      {
                        element.labels.length > 0 &&
                        element.labels.map((label) => {
                          return<div key={label.description} className="ms-2 me-auto">
                            <div className="fw-bold">*{label.name}</div>
                            -{label.description}
                          </div>
                        })
                      }
                    </div>
                    <a href={element.html_url} target='_blank' className="btn btn-primary my-2">View PR</a>
                    <p className='fw-bold'>Created at: {element.created_at.substring(0,10).split("-").reverse().join("-")}</p>
                    <p className='fw-bold'>Closed at: {element.closed_at.substring(0,10).split("-").reverse().join("-")}</p>
                  </div>
                </div>

              })
            }
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