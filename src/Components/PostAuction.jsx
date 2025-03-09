import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PostAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(""); // Auction Name
  const [basePrice, setBasePrice] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [minBidIncrement, setMinBidIncrement] = useState(""); // Minimum Bid Increment

  // Fetch Auctions from Backend
  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auctions");
      setAuctions(response.data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !name || !basePrice || !timeLimit || !minBidIncrement) {
      alert("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("basePrice", basePrice);
    formData.append("timeLimit", timeLimit);
    formData.append("minBidIncrement", minBidIncrement);

    try {
      const response = await axios.post("http://localhost:5000/api/auctions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Auction created successfully!");
      setAuctions([...auctions, response.data]); // Update UI with new auction
      setImage(null);
      setName("");
      setBasePrice("");
      setTimeLimit("");
      setMinBidIncrement("");
      e.target.reset(); // Reset form
    } catch (error) {
      console.error("Error posting auction:", error);
      alert("Failed to create auction. Try again.");
    }
  };

  // Handle Auction Deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auctions/${id}`);
      setAuctions(auctions.filter((auction) => auction._id !== id));
      alert("Auction deleted successfully!");
    } catch (error) {
      console.error("Error deleting auction:", error);
      alert("Failed to delete auction.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create a New Auction</h2>
      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Auction Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Painting Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Base Price ($)</label>
          <input type="number" className="form-control" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Bid Time Limit (in minutes)</label>
          <input type="number" className="form-control" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Minimum Bid Increment ($)</label>
          <input type="number" className="form-control" value={minBidIncrement} onChange={(e) => setMinBidIncrement(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Post Auction</button>
      </form>

      <h3 className="text-center mt-4">Active Auctions</h3>
      <div className="row">
        {auctions.map((auction) => (
          <div key={auction._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={`http://localhost:5000/${auction.imageUrl}`} alt="Auction Painting" className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{auction.name}</h5>
                <p className="card-text">Base Price: ${auction.basePrice}</p>
                <p className="card-text">Current Bid: ${auction.currentBid || auction.basePrice}</p>
                <p className="card-text">Minimum Increment: ${auction.minBidIncrement}</p>
                <p className="card-text">Time Left: {auction.timeLimit} mins</p>
                <button className="btn btn-danger w-100" onClick={() => handleDelete(auction._id)}>Delete Auction</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostAuction;
