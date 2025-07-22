# EmailJS Setup Guide

Follow these steps to set up EmailJS for your contact form:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
To: {{to_name}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

## 4. Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (User ID)

## 5. Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Replace the placeholder values:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

## 6. Test the Contact Form
1. Restart your development server: `npm start`
2. Go to the Contact page
3. Fill out and submit the form
4. Check your email for the message

## Troubleshooting
- Make sure your `.env` file is in the root directory
- Restart the dev server after changing `.env`
- Check the browser console for any error messages
- Verify your EmailJS service is properly configured and active

## Security Notes
- The `.env` file is already in `.gitignore` so your keys won't be committed
- These are public keys, so they're safe to use in frontend applications
- EmailJS has rate limiting and spam protection built-in