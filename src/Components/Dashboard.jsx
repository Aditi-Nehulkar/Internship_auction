import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

const Dashboard = () => {
  const initialAuctions = [
    { id: 1, name: "Sunset Beauty", startBid: 500, endTime: new Date().getTime() + 1 * 60 * 1000 },
    { id: 2, name: "Ocean Waves", startBid: 700, endTime: new Date().getTime() + 15 * 60 * 1000 },
    { id: 3, name: "Golden Fields", startBid: 600, endTime: new Date().getTime() + 20 * 60 * 1000 },
    { id: 4, name: "Starry Night", startBid: 800, endTime: new Date().getTime() + 25 * 60 * 1000 },
  ];

  const [auctions, setAuctions] = useState(initialAuctions.map((auction) => ({
    ...auction,
    currentBid: auction.startBid,
    newBid: "",
    timeLeft: auction.endTime - new Date().getTime(),
    highestBidder: null,
    showPayment: false,
    paymentMethod: "",
    paymentDetails: "",
    address: ""
  })));

  useEffect(() => {
    const timer = setInterval(() => {
      setAuctions((prevAuctions) =>
        prevAuctions.map((auction) => {
          const remainingTime = auction.endTime - new Date().getTime();
          return { ...auction, timeLeft: remainingTime > 0 ? remainingTime : 0 };
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleBid = (id) => {
    setAuctions((prevAuctions) =>
      prevAuctions.map((auction) => {
        if (auction.id === id) {
          const bidAmount = parseInt(auction.newBid, 10);
          const minIncrement = 50;
          if (bidAmount >= auction.currentBid + minIncrement) {
            return { ...auction, currentBid: bidAmount, highestBidder: "You", newBid: "" };
          } else {
            alert(`Your bid must be at least $${auction.currentBid + minIncrement}`);
          }
        }
        return auction;
      })
    );
  };

  const handlePayment = (id) => {
    alert("Payment successful! Your painting will be delivered soon.");
    setAuctions((prevAuctions) => prevAuctions.map((auction) => auction.id === id ? { ...auction, showPayment: false } : auction));
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">🎨 Painting Auctions</h2>
      <div className="row">
        {auctions.map((auction) => (
          <div key={auction.id} className="col-md-6 mb-4">
            <div className="card p-4 shadow">
              <img src={`/dash${auction.id}.jpg`} alt={auction.name} className="img-fluid rounded auction-image" />
              <h4>{auction.name}</h4>
              <h5>Current Bid: <span className="text-success">${auction.currentBid}</span></h5>
              <p className="text-danger">⏳ Time Left: {auction.timeLeft > 0 ? formatTime(auction.timeLeft) : "Auction Ended"}</p>
              
              {auction.timeLeft > 0 ? (
                <>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder={`Enter at least $${auction.currentBid + 50}`}
                    value={auction.newBid}
                    onChange={(e) => setAuctions(auctions.map(a => a.id === auction.id ? { ...a, newBid: e.target.value } : a))}
                  />
                  <button className="btn btn-primary w-100" onClick={() => handleBid(auction.id)}>Place Bid</button>
                </>
              ) : (
                auction.highestBidder === "You" ? (
                  <>
                    <h5 className="text-success">Congratulations! You won the auction.</h5>
                    <h6>Complete your payment:</h6>
                    <select 
                      className="form-control mb-2"
                      value={auction.paymentMethod}
                      onChange={(e) => setAuctions(auctions.map(a => a.id === auction.id ? { ...a, paymentMethod: e.target.value, paymentDetails: "" } : a))}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="UPI">UPI</option>
                    </select>
                    
                    {auction.paymentMethod === "Credit Card" && (
                      <>
                        <input type="text" className="form-control mb-2" placeholder="Cardholder Name" />
                        <input type="text" className="form-control mb-2" placeholder="Card Number" />
                        <input type="text" className="form-control mb-2" placeholder="CVV Code" />
                        <input type="text" className="form-control mb-2" placeholder="Expiry Date" />
                      </>
                    )}
                    {auction.paymentMethod === "PayPal" && (
                      <>
                        <input type="text" className="form-control mb-2" placeholder="Email or Phone Number" />
                        <input type="password" className="form-control mb-2" placeholder="PayPal Password" />
                      </>
                    )}
                    {auction.paymentMethod === "UPI" && (
                      <input type="text" className="form-control mb-2" placeholder="UPI ID" />
                    )}
                    
                    <input 
                      type="text" 
                      className="form-control mb-2" 
                      placeholder="Enter Your Address" 
                      value={auction.address}
                      onChange={(e) => setAuctions(auctions.map(a => a.id === auction.id ? { ...a, address: e.target.value } : a))}
                    />
                    
                    <button 
                      className="btn btn-success w-100" 
                      onClick={() => auction.address ? handlePayment(auction.id) : alert("Please enter your address.")}
                    >
                      Pay Now
                    </button>
                  </>
                ) : (
                  <h5 className="text-danger">Auction Ended</h5>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
