import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.errorCode}>404</div>
        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.description}>
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <div style={styles.suggestions}>
          <p style={styles.suggestionsTitle}>Try these instead:</p>
          <ul style={styles.list}>
            <li>
              <button onClick={() => navigate("/")} style={styles.link}>
                🏠 Back to Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/favoraties-recipies")}
                style={styles.link}
              >
                ❤️ View Favorites
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/recent-recipies")}
                style={styles.link}
              >
                🕐 View Recents
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  },
  content: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "60px 40px",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
  },
  errorCode: {
    fontSize: "120px",
    fontWeight: "bold",
    color: "#667eea",
    margin: "0",
    lineHeight: "1",
  },
  title: {
    fontSize: "32px",
    color: "#333",
    margin: "20px 0 10px 0",
    fontWeight: "600",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 30px 0",
    lineHeight: "1.6",
  },
  suggestions: {
    marginTop: "30px",
    textAlign: "left",
  },
  suggestionsTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
  },
  list: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    textAlign: "left",
  },
};

export default NotFound;
