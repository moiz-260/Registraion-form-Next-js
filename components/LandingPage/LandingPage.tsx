import React from "react";
import Link from "next/link";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Background decoration */}
      <div className="bg-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-logo">NextApp</div>
        <div className="nav-actions">
          <Link href="/SignIn">
            <button className="btn-nav-signin">Sign In</button>
          </Link>
          <Link href="/SignUp">
            <button className="btn-nav-signup">Get Started</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="landing-hero">
        <div className="hero-content">
          <div className="hero-glow"></div>

          <h1 className="hero-title">
            Build Something <br className="break-hidden" />
            <span>Extraordinary</span>
          </h1>

          <p className="hero-description">
            A powerful platform to launch your next big idea. Secure
            authentication, beautiful interface, and seamless experience.
          </p>

          <div className="hero-actions">
            <Link href="/SignUp" style={{ width: "100%", maxWidth: "fit-content" }}>
              <button className="btn-hero btn-hero-primary">
                <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  Start Your Journey
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </Link>

            <Link href="/SignIn" style={{ width: "100%", maxWidth: "fit-content" }}>
              <button className="btn-hero btn-hero-secondary">
                Welcome Back
              </button>
            </Link>
          </div>
        </div>

        {/* Floating Features */}
        <div className="landing-features">
          {[
            { title: "Secure by Design", icon: "🔒", delay: "0s" },
            { title: "Lightning Fast", icon: "⚡", delay: "1.5s" },
            { title: "Modern UI", icon: "✨", delay: "3s" },
          ].map((feature, i) => (
            <div
              key={i}
              className="feature-card"
              style={{ animationDelay: feature.delay }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <span className="feature-title">{feature.title}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;