import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Profile.css";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/AuthProvider";

function Profile() {
  const [auth, setAuth] = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send edited user data to the backend (replace with your actual API endpoint)
    axios
      .put(
        `${process.env.REACT_APP_API}/api/auth/user/${auth?.user?._id}`,
        editedUser
      ) // Replace with your actual API endpoint
      .then((response) => {
        setAuth(response.data); // Update the user state with the new data
        setIsEditing(false); // Close the edit form
        navigate("/login");
        toast.success("User Data updated successfully. Please login again.");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <Layout>
      <div className="profile__container">
        <h1 className="profile__heading">User Profile</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit__form">
            <label>
              Name:
              <input
                type="text"
                value={editedUser.name || auth?.user?.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={editedUser.email || auth?.user?.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                value={editedUser.contact || auth?.user?.contact}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, contact: e.target.value })
                }
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={editedUser.address || auth?.user?.address}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, address: e.target.value })
                }
              />
            </label>
            <button type="submit" className="save__button">
              Save
            </button>
          </form>
        ) : (
          <div className="user__details">
            <p>Name: {auth?.user?.name}</p>
            <p>Email: {auth?.user?.email}</p>
            <p>Contact: {auth?.user?.contact}</p>
            <p>Address: {auth?.user?.address}</p>
            <button onClick={() => setIsEditing(true)} className="edit__button">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Profile;
