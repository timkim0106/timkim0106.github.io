import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // EmailJS configuration - these are public keys safe for frontend use
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY!;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Timothy Kim', // Your name
      };

      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      if (result.status === 200) {
        setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="nes-container with-title">
      <p className="title">Contact Me</p>
      
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p>Feel free to reach out to me for any inquiries or opportunities!</p>
        
        {submitMessage && (
          <div 
            className="nes-container is-rounded" 
            style={{ 
              backgroundColor: submitMessage.includes('error') || submitMessage.includes('Sorry') ? '#dc3545' : '#28a745', 
              marginBottom: '20px', 
              borderColor: '#ffffff' 
            }}
          >
            <p style={{ margin: 0, color: 'white' }}>{submitMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="nes-field" style={{ marginBottom: '20px' }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="nes-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="nes-field" style={{ marginBottom: '20px' }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="nes-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="nes-field" style={{ marginBottom: '20px' }}>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="nes-input"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="nes-field" style={{ marginBottom: '20px' }}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="nes-textarea"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={`nes-btn ${isSubmitting ? 'is-disabled' : 'is-primary'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;