import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from './AuthContext';


export default function Membership_Options() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleUpdate = async () => {
    const member = {
      role : "premium"
    };
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/member/${auth.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(member)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Congrats you are now a premium member!');
        navigate('/profile');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('There was an error in buying the premium membership:', error);
      alert('There was an error in buying the premium membership.');
    }
  };

  return (
    <>
      <div className="hero">
        <h1>Membership</h1>
      </div>
      <div className="regular-membership-tile">
        <b>Regular membership - <i>FREE</i></b>

        <ul>
          <h2>View your current tickets</h2>
          <h2>Collect reward points and redeem for movie tickets</h2>
          <h2>View your movie watch history</h2>
          <h2>Book up to 8 seats for you and your friends</h2>
          <h2>Cancel your tickets before showtime for a full refund</h2>
        </ul>
      </div>

      <div className="premium-membership-tile">
        <b>Premium membership - <i>$15/year</i></b>

        <ul>
          <h2>All the perks of regular membership</h2>
          <h2><i>PLUS</i> online service fee waived for any booking!</h2>
          {auth.isAuthenticated && auth.role === 'regular' && (
          <div className="admin-controls">
            <button style = {{marginLeft:450}} onClick={() => handleUpdate()}>Buy</button>
          </div>
          )}
        </ul>
      </div>

      <button className="membership-button">
      {!auth.isAuthenticated || (auth.isAuthenticated && auth.role === 'guest') ?
        (<Link to="/signup">Become a member</Link>) :
        (<p>Do nothing</p>)}
          {/*(<Link to="/profile">Update your membership</Link>)}*/} {/* Why does isAuth reset? */}  
      </button>
    </>
  );
}
