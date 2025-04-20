import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from "../App.jsx";
import axios from 'axios';

const Contribute = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { email } = useContext(UserContext);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/contribute/${campaignId}`);
        setCampaign(res.data);
      } catch (err) {
        console.error("Error fetching campaign:", err);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only digits
    setAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const numericAmount = parseInt(amount, 10);
    const remaining = campaign.amount_req - campaign.current_amount;

    if (!numericAmount || numericAmount <= 0) {
      setError('Please enter a valid contribution amount.');
    } else if (numericAmount > remaining) {
      setError(`You can only contribute up to ₹${remaining}.`);
    } else {
      try {
        await axios.post('http://localhost:8800/api/contribute/donate', {
          email,
          campaignId,
          contribution: numericAmount,
          paymentMode: paymentMethod
        });

        setSuccess(`You’ve successfully contributed ₹${numericAmount} via ${paymentMethod}! 🎉`);
        setAmount('');
        // Update local campaign data to reflect the new contribution
        setCampaign(prev => ({
          ...prev,
          current_amount: prev.current_amount + numericAmount
        }));
      } catch (err) {
        setError('There was an error processing your donation. Please try again.');
        console.error(err);
      }
    }
  };

  if (!campaign) return <div>Loading campaign data...</div>;

  const percentage = Math.min((campaign.current_amount / campaign.amount_req) * 100, 100);
  const isCampaignClosed = campaign.current_amount >= campaign.amount_req;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Contribute to Campaign: {campaign.title}</h1>
      <p>{campaign.description}</p>
      <p><strong>Goal:</strong> ₹{campaign.amount_req}</p>
      <p><strong>Raised:</strong> ₹{campaign.current_amount}</p>

      <div style={{
        backgroundColor: '#f0f0f0',
        height: '20px',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: '#4caf50',
          transition: 'width 0.3s ease-in-out'
        }}></div>
      </div>

      {isCampaignClosed && (
        <div style={{ color: 'green', fontWeight: 'bold', marginBottom: '20px' }}>
          🎉 This campaign has been successfully closed. Thank you for your support!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Contribution Amount (₹):
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            style={{ padding: '8px', width: '100%' }}
            placeholder="Enter amount"
            required
            disabled={isCampaignClosed}
          />
        </label>

        <label>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ padding: '8px', width: '100%' }}
            disabled={isCampaignClosed}
          >
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </label>

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}

        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: isCampaignClosed ? '#aaa' : '#007bff',
            color: 'white',
            border: 'none',
            cursor: isCampaignClosed ? 'not-allowed' : 'pointer'
          }}
          disabled={isCampaignClosed}
        >
          Contribute
        </button>
      </form>
    </div>
  );
};

export default Contribute;
