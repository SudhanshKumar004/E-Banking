import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
    } else {
      setMessage("Password reset successfully!");
      // Here, you can integrate API call to reset password in the backend
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <p>Please enter your new password below.</p>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="reset-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
