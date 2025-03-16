import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <img src="https://wallpapercave.com/wp/wp6603070.png" alt="E-Banking" className="about-banner" />
        <h1 className="about-title">Welcome to Our E-Banking Platform</h1>
        <p className="about-intro">Experience seamless, secure, and modern banking services at your fingertips.</p>
      </header>

      <div className="about-content">
        <section className="about-section features">
          <h2 className="about-subtitle">Why Choose Us?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <img src="https://static.vecteezy.com/system/resources/previews/000/566/954/original/lock-icon-vector.jpg" alt="Security" className="feature-image" />
              <h3 className="feature-title">Advanced Security</h3>
              <p className="feature-text">We use encryption, multi-factor authentication, and real-time fraud detection.</p>
            </div>
            <div className="feature-card">
              <img src="https://img.freepik.com/premium-vector/247-hours-timer-symbol-black-color-flat-style_824631-673.jpg?w=2000" alt="Support" className="feature-image" />
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-text">Our team is available round the clock to assist you with any concerns.</p>
            </div>
            <div className="feature-card">
              <img src="https://cdn0.iconfinder.com/data/icons/cashless-society-30/512/TransactionSpeed-transaction-perform-faster-convenience-transactionprocessing-fast-1024.png" alt="Fast Transactions" className="feature-image" />
              <h3 className="feature-title">Fast Transactions</h3>
              <p className="feature-text">Enjoy instant transfers, bill payments, and hassle-free banking services.</p>
            </div>
          </div>
        </section>

        <section className="about-section blogs">
          <h2 className="about-subtitle">Latest Blogs & Insights</h2>
          <div className="blog-grid">
            <article className="blog-card">
              <img src="https://www.pngplay.com/wp-content/uploads/7/Digital-Marketing-PNG-HD-Quality.png" alt="Blog 1" className="blog-image" />
              <h3 className="blog-title">The Future of Digital Banking</h3>
              <p className="blog-text">Discover how AI and blockchain are shaping the future of online banking.</p>
              <a href="/blogs/future-of-banking" className="blog-link">Read More</a>
            </article>
            <article className="blog-card">
              <img src="https://skytechgeek.com/wp-content/uploads/2018/11/Account_Security_Tips-copy.jpg" alt="Blog 2" className="blog-image" />
              <h3 className="blog-title">How to Keep Your Bank Account Secure</h3>
              <p className="blog-text">Tips and best practices to safeguard your online banking credentials.</p>
              <a href="/blogs/security-tips" className="blog-link">Read More</a>
            </article>
            <article className="blog-card">
              <img src="http://www.parthenonsupermarket.com/wp-content/uploads/2021/11/mobile-banking-app.jpg" alt="Blog 3" className="blog-image" />
              <h3 className="blog-title">The Rise of Mobile Banking</h3>
              <p className="blog-text">Find out why mobile banking is becoming the preferred choice worldwide.</p>
              <a href="/blogs/mobile-banking" className="blog-link">Read More</a>
            </article>
          </div>
        </section>

        <section className="about-section call-to-action">
          <h2 className="about-subtitle">Get Started Today</h2>
          <p className="about-text">Join thousands of users enjoying seamless and secure banking services.</p>
          <button className="about-button">Open an Account</button>
        </section>
      </div>
    </div>
  );
};

export default About;
