# EmailJS Setup Instructions

Follow these steps to enable the contact form functionality:

## 1. Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## 2. Create Email Service

1. Go to the **Email Services** page
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (e.g., `service_abc123`)

## 3. Create Email Template

1. Go to the **Email Templates** page
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New message from {{from_name}} - Portfolio Contact Form

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Save and copy the **Template ID** (e.g., `template_xyz789`)

## 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `YOUR_PUBLIC_KEY`)

## 5. Update the Code

Open `script.js` and replace these values:

```javascript
// Line ~318 in script.js
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

// Line ~331 in script.js
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
```

### Example:
```javascript
emailjs.init("9xK3mD_abc123XYZ");

emailjs.sendForm('service_gmail123', 'template_contact456', this)
```

## 6. Test the Contact Form

1. Open your portfolio in a browser
2. Navigate to the Contact section
3. Fill out and submit the test form
4. Check your email inbox

## 7. Troubleshooting

### Form not sending?
- Check browser console for errors (F12)
- Verify all three values are correctly entered
- Ensure your EmailJS account is verified
- Check EmailJS dashboard for monthly quota

### Emails not arriving?
- Check spam/junk folder
- Verify template configuration
- Test with a different email address
- Review EmailJS dashboard logs

## Free Tier Limits

EmailJS free tier includes:
- ✅ 200 emails per month
- ✅ Unlimited templates
- ✅ 2 email services

For higher volume, upgrade to a paid plan.

## Alternative: Direct Email Links

If you prefer not to use EmailJS, the contact section already includes direct email links that work without configuration.

---

**Need Help?** Visit [EmailJS Documentation](https://www.emailjs.com/docs/)
