import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios"
import "../style.scss"

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const cat = useLocation().search; // Example: "?cat=medical"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/campaigns${cat}`);
        setCampaigns(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cat]);

  return (
    <div className='home'>
      <div className='posts'>
        {campaigns.map(campaign => {
          const percentage = Math.min((campaign.current_amount / campaign.amount_req) * 100, 100); // Cap at 100%
          
          return (
            <div className='post' key={campaign.campaign_id}>
              <div className='img'>
                <img src={campaign.img} alt={campaign.title} />
              </div>
              <div className='content'>
                <Link className='link' to={`/campaign/${campaign.campaign_id}`}>
                  <h1>{campaign.title}</h1>
                </Link>
                <p>{campaign.description}</p>
                
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="filled" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="progress-text">
                    ₹{campaign.current_amount} raised of ₹{campaign.amount_req}
                  </div>
                </div>

                <div className='deadline'>
                  Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                </div>

                <div className='button-group'>
                  <button>Contribute Now</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Home;
