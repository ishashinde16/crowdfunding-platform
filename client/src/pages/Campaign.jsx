import React, { useState, useContext } from 'react';
import { UserContext } from "../App.jsx";
import axios from 'axios';

const Campaign = () => {
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    amountRequired: '',
    amountRaised: '',
    deadline: '',
    category: '',
    image: ''
  });

  const { email } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email: ', email);
    console.log('Campaign Data:', campaignData);
    // Prepare the data to send to the backend
    const campaignInfo = {
      email: email,
      title: campaignData.title,
      description: campaignData.description,
      amountRequired: campaignData.amountRequired,
      amountRaised: campaignData.amountRaised,
      deadline: campaignData.deadline,
      category: campaignData.category,
      image: campaignData.image
    };

    try {
      // Send data to the backend using axios
      const response = await axios.post('http://localhost:8800/api/campaign/add_campaign', campaignInfo);

      if (response.data.success) {
        alert('Campaign successfully created!');
        setCampaignData({
          title: '',
          description: '',
          amountRequired: '',
          amountRaised: '',
          deadline: '',
          category: '',
          image: ''
        });
      } else {
        alert('Error creating campaign');
      }
    } catch (error) {
      console.error('Error submitting campaign:', error);
      alert('An error occurred while submitting the campaign');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Create a New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={campaignData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={campaignData.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="amountRequired">Amount Required:</label>
          <input
            type="number"
            id="amountRequired"
            name="amountRequired"
            value={campaignData.amountRequired}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
            min="0"
            step="any"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="amountRaised">Amount Raised:</label>
          <input
            type="number"
            id="amountRaised"
            name="amountRaised"
            value={campaignData.amountRaised}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
            min="0"
            step="any"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={campaignData.deadline}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
  <label htmlFor="category">Category:</label>
  <select
    id="category"
    name="category"
    value={campaignData.category}
    onChange={handleChange}
    required
    style={{ width: '100%', padding: '8px' }}
  >
    <option value="">-- Select a Category --</option>
    <option value="HealthCare">HealthCare</option>
    <option value="Business">Business</option>
    <option value="Arts">Arts</option>
    <option value="Education">Education</option>
    <option value="Social">Social</option>
    <option value="Miscellaneous">Miscellaneous</option>
  </select>
</div>


        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={campaignData.image}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#b9e7e7', color: 'black', border: '1px solid teal', cursor: 'pointer' }}>
          Submit Campaign
        </button>
      </form>
    </div>
  );
};

export default Campaign;
