import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../style.scss";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const cat = useLocation().search; // Example: "?cat=medical"
  const navigate = useNavigate(); // Hook for navigation

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

  // Function to handle "Contribute Now" button click
  const handleContributeClick = (campaignId) => {
    navigate(`/Contribute/${campaignId}`); // Navigate to Contribute page with campaign ID
  };

  return (
    <div className='home'>
      <div className='posts'>
        {campaigns.map(campaign => {
          const percentage = Math.min((campaign.current_amount / campaign.amount_req) * 100, 100); // Cap at 100%
          
          return (
            <div className='post' key={campaign.campaign_id}>
              <div className='img'>
                <img src={campaign.image} alt={campaign.title} />
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
                  <button onClick={() => handleContributeClick(campaign.campaign_id)}>Contribute Now</button>
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
