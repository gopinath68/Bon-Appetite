import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.errorBox}>
            <h1 style={styles.title}>⚠️ Oops! Something went wrong</h1>
            <p style={styles.message}>
              We're sorry, but something unexpected happened.
            </p>
            <details style={styles.details}>
              <summary style={styles.summary}>Error Details</summary>
              <pre style={styles.pre}>{this.state.error?.toString()}</pre>
            </details>
            <button
              onClick={() => (window.location.href = import.meta.env.BASE_URL || "/")}
              style={styles.button}
            >
              Go Back Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  errorBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    textAlign: "center",
  },
  title: {
    color: "#d32f2f",
    marginBottom: "10px",
    fontSize: "28px",
  },
  message: {
    color: "#666",
    marginBottom: "20px",
    fontSize: "16px",
  },
  details: {
    marginBottom: "20px",
    textAlign: "left",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "4px",
  },
  summary: {
    cursor: "pointer",
    fontWeight: "bold",
    color: "#333",
  },
  pre: {
    marginTop: "10px",
    overflow: "auto",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#d32f2f",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
};

export default ErrorBoundary;
