"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DogInfo from "./DogInfo";
import Link from "next/link";
import Image from "next/image";
import Home from "./home";

const DogLayout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dogImages, setDogImages] = useState([]);
  const [error, setError] = useState(null);

  const fetchDogImages = (breed) => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched dog images:", data.message);
        setDogImages([data.message]);
      })
      .catch((error) => {
        console.error("Error fetching dog images:", error);
        setError(error.message);
      });
  };

  const fetchRandomDogImages = () => {
    fetch("https://dog.ceo/api/breeds/image/random/6")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched random dog images:", data.message);
        setDogImages(data.message);
      })
      .catch((error) => {
        console.error("Error fetching random dog images:", error);
        setError(error.message);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchDogImages(searchTerm.toLowerCase());
    }
  };

  return (
    <div className="container-fluid" style={styles.container}>
      <header className="d-flex justify-content-between align-items-center p-3" style={styles.header}>
        <h1 style={styles.heading}>Dog Info 🐶</h1>
      </header>
      <nav className="navbar navbar-expand-lg" style={styles.nav}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="btn btn-gradient"
              onClick={fetchRandomDogImages}
              style={styles.button}
            >
              Random Dogs
            </button>
          </li>
        </ul>
      </nav>
      <main className="p-3" style={styles.main}>
        {children}
        <form onSubmit={handleSearch} className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a breed"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <button type="submit" className="btn btn-search mt-2" style={styles.searchButton}>
            Search
          </button>
        </form>
        <DogInfo />
        {error && <p style={styles.error}>Error fetching dog info: {error}</p>}
        {dogImages.length > 0 && (
          <div>
            <h2 style={styles.imageHeading}>Dog Images</h2>
            <div className="d-flex flex-wrap" style={styles.imageContainer}>
              {dogImages.map((image, index) => (
                <div key={index} className="m-2" style={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt="Dog"
                    width={300}
                    height={300}
                    layout="intrinsic"
                    objectFit="cover"
                    style={styles.image}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="text-center p-3" style={styles.footer}>
        <p style={styles.footerText}>&copy; 2024 Dog Info</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateAreas: `
      "header header"
      "nav nav"
      "main main"
      "footer footer"
    `,
    gridTemplateRows: "auto auto 1fr auto",
    gridTemplateColumns: "1fr",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9", // Light grayish background
  },
  header: {
    gridArea: "header",
    backgroundColor: "#ff6f61", // Bright coral for header
    color: "#ffffff",
    borderBottom: "4px solid #ffffff", // White border for a clean separation
    padding: "20px 40px",
    borderRadius: "0 0 20px 20px", // Rounded bottom corners for a smooth design
  },
  heading: {
    fontSize: "3rem",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "bold",
    letterSpacing: "2px",
  },
  nav: {
    gridArea: "nav",
    backgroundColor: "#ffffff", // Light background for the navbar
    borderBottom: "1px solid #ddd",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  button: {
    background: "linear-gradient(45deg, #ff6f61, #ff9e80)", // Gradient for the button
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    padding: "10px 20px",
    fontWeight: "600",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  buttonHover: {
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(255, 111, 97, 0.3)",
  },
  input: {
    borderRadius: "50px", // Rounded corners for the search input
    border: "1px solid #ccc",
    padding: "10px 20px",
    fontSize: "1.1rem",
  },
  searchButton: {
    backgroundColor: "#ff6f61", // Matching color with header for consistency
    color: "#fff",
    borderRadius: "50px",
    padding: "10px 30px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    justifyContent: "center",
  },
  imageWrapper: {
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transform: "scale(1)",
    transition: "transform 0.3s ease",
  },
  image: {
    borderRadius: "15px",
    transition: "transform 0.3s ease",
  },
  footer: {
    gridArea: "footer",
    backgroundColor: "#ff6f61", // Matching footer color with header
    color: "#fff",
    padding: "20px 0",
    borderTop: "4px solid #ffffff",
    borderRadius: "20px 20px 0 0",
  },
  footerText: {
    fontSize: "1rem",
    letterSpacing: "1px",
    marginBottom: "0",
  },
  error: {
    color: "#ff4040", // Red error text
    fontWeight: "bold",
  },
  imageHeading: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "bold",
  },
};

export default DogLayout;
