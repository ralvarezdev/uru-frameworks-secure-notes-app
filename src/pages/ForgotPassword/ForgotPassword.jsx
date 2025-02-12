import Auth from "../../layouts/Auth/Auth.jsx";
import Form from "../../components/Form/Form.jsx";
import Input from "../../components/Input/Input.jsx";
import ButtonPrimary from "../../components/Button/Primary/Primary.jsx";
import Text from "../../components/Text/Text.jsx";
import Link from "../../components/Link/Link.jsx";

// ForgotPassword page
function ForgotPassword() {
    return (
        <Auth title='Forgot Password'>
            <Form method='post'>
                <Input type="email" id="email" name="email"
                       label="Email" placeholder="e.g. johnsmith@mail.com"/>
                <ButtonPrimary
                    className='submit-button'>Continue</ButtonPrimary>
            </Form>
            <ul className='footer-container'>
                <li>
                    <Text className='footer-text'>Don&#39;t you have an
                        account?</Text>
                    <Link className='footer-text' to='/signup'>Sign Up</Link>
                </li>
                <li>
                    <Text className='footer-text'>Remember your password?</Text>
                    <Link className='footer-text' to='/login'>Log In</Link>
                </li>
            </ul>
        </Auth>
    )
}

export default ForgotPassword;

/*
import React, { useState } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const navigate = useNavigate();
  const fetcher = useFetcher(); // Get the fetcher

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use fetcher.submit() for form submission
    fetcher.submit(formData, {
      method: 'post', // or 'POST'
      action: '/api/contact', // Your API endpoint
    });
  };

  // Handle fetcher state changes (loading, data, errors)
  React.useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      // Form submitted successfully, fetcher.data contains the response
      console.log("Form submitted successfully:", fetcher.data);
      navigate('/thank-you'); // Redirect or other action
    }

    if (fetcher.state === "error") {
      // Handle submission errors
      console.error("Error submitting form:", fetcher.error);
      alert("An error occurred. Please try again.");
    }

  }, [fetcher]);


  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        {/ ... your form fields ... /}
        <button type="submit" disabled={fetcher.state !== "idle"}>
          {fetcher.state === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </form>
      {/ ... your form fields ... /}
    </div>
  );
}

export default Contact;

Ramón Álvarez, [2/10/2025 7:06 AM]
import React, { useState } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';

function Contact() {
  // ... (formData, handleChange, handleSubmit remain the same)

  const fetcher = useFetcher();
  const [submissionError, setSubmissionError] = useState(null); // For specific errors
  const [generalError, setGeneralError] = useState(null); // For network or other errors
  const [successMessage, setSuccessMessage] = useState(null);

  React.useEffect(() => {
    if (fetcher.state === "idle") { // Submission finished (either success or error)
      if (fetcher.data) { // Success!
        console.log("Form submitted successfully:", fetcher.data);
        setSuccessMessage("Message sent successfully!"); // Display success message
        setSubmissionError(null); // Clear any previous submission errors
        setGeneralError(null); // Clear any previous general errors
        // Optionally, reset the form here if needed.
        navigate('/thank-you');
      } else if (fetcher.error) { // Error!
        console.error("Error submitting form:", fetcher.error);

        // Check if the error is a validation error from the server:
        if (fetcher.error.status === 400 && fetcher.error.data && fetcher.error.data.errors) {  // Example: 400 Bad Request
          setSubmissionError(fetcher.error.data.errors); // Set specific submission errors
        } else if (fetcher.error.status === 429) { // Example: 429 Too Many Requests
          setGeneralError("Too many requests. Please try again later.");
        } else if (fetcher.error instanceof TypeError && fetcher.error.message === "Failed to fetch") { //network error
          setGeneralError("A network error occurred. Please check your connection.");
        }
        else {
          setGeneralError("An error occurred. Please try again."); // General error message
        }
        setSuccessMessage(null); // Clear any previous success message
      }
    }
  }, [fetcher]);

  return (
    <div>
      {/ ... form fields ... /}
      <form onSubmit={handleSubmit}>
         {/ ... form fields ... /}
        <button type="submit" disabled={fetcher.state !== "idle"}>
          {fetcher.state === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/ Display Success/Error Messages /}
      {successMessage && <div className="success">{successMessage}</div>}
      {generalError && <div className="error">{generalError}</div>}
      {submissionError && typeof submissionError === 'string' && <div className="error">{submissionError}</div>}
      {submissionError && typeof submissionError === 'object' && Object.keys(submissionError).map(key => (
        <div className="error" key={key}>{submissionError[key]}</div>
      ))}
      {/ ... form fields ... /}
    </div>
  );
}

export default Contact;

Ramón Álvarez, [2/10/2025 8:01 AM]
import React, { useState, useEffect } from 'react';

function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => { // Clean up listeners
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline; // Return the online status (true/false)
}

// In your component:
function MyComponent() {
  const isOnline = OfflineDetector();


  return (
    <div>
      {isOnline ? (
        <div>Online! Content is available.</div>
      ) : (
        <div>Offline! No internet connection. Please check your connection.</div>
      )}
    </div>
  );
}
*/