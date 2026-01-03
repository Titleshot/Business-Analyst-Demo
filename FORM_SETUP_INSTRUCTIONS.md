# Form Email Setup Instructions

This guide will help you set up the contact form so that Manju receives emails when someone submits the form.

## Option 1: EmailJS (Recommended - Already Implemented)

EmailJS is a free service that allows you to send emails directly from your website without a backend server.

### Setup Steps:

1. **Create a Free Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account (50 emails/month free)

2. **Add Email Service**
   - Go to https://dashboard.emailjs.com/admin
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Copy your **Service ID** (e.g., `service_abc123`)

3. **Create Email Template**
   - Go to https://dashboard.emailjs.com/admin/template/create
   - Create a new template with these variables:
     ```
     Subject: New Contact Form Submission from {{from_name}}
     
     Body:
     You have received a new message from your website contact form.
     
     Name: {{from_name}}
     Email: {{from_email}}
     Company: {{company}}
     
     Message:
     {{message}}
     
     ---
     Reply to: {{from_email}}
     ```
   - Copy your **Template ID** (e.g., `template_xyz789`)

4. **Get Public Key**
   - Go to https://dashboard.emailjs.com/admin/integration
   - Copy your **Public Key** (e.g., `abc123xyz789`)

5. **Update the Code**
   - Open `script.js` file
   - Replace these three values:
     - `YOUR_PUBLIC_KEY` → Your EmailJS Public Key
     - `YOUR_SERVICE_ID` → Your EmailJS Service ID
     - `YOUR_TEMPLATE_ID` → Your EmailJS Template ID
   - The email address is already set to `ajitt742@gmail.com` in the code

6. **Test the Form**
   - Open `index.html` in your browser
   - Fill out and submit the form
   - Check Manju's email inbox

---

## Option 2: Formspree (Alternative - No Code Changes Needed)

Formspree is another popular service that's even simpler to set up.

### Setup Steps:

1. **Create Account**
   - Go to https://formspree.io/
   - Sign up for free (50 submissions/month)

2. **Get Form Endpoint**
   - After signing up, you'll get a form endpoint like: `https://formspree.io/f/YOUR_FORM_ID`

3. **Update HTML**
   - Open `index.html`
   - Find the `<form>` tag (around line 410)
   - Add `action` and `method` attributes:
     ```html
     <form class="contact-form slide-right" id="contactForm" 
           action="https://formspree.io/f/YOUR_FORM_ID" 
           method="POST"
           onsubmit="handleFormSubmit(event)">
     ```

4. **Update JavaScript**
   - Open `script.js`
   - Replace the `handleFormSubmit` function with this simpler version:
     ```javascript
     function handleFormSubmit(event) {
         // Let the form submit naturally to Formspree
         // The form will redirect to Formspree's thank you page
         // You can customize this in Formspree dashboard
     }
     ```

5. **Configure Formspree**
   - In Formspree dashboard, set recipient email to Manju's email
   - Customize email template if desired

---

## Option 3: FormSubmit (Simplest - No Account Needed)

FormSubmit is the simplest option - no account required, just add an email address.

### Setup Steps:

1. **Update HTML Form**
   - Open `index.html`
   - Find the `<form>` tag
   - Add `action` attribute:
     ```html
     <form class="contact-form slide-right" id="contactForm" 
           action="https://formsubmit.co/manju.bhatt@email.com" 
           method="POST"
           onsubmit="handleFormSubmit(event)">
     ```
   - Replace `manju.bhatt@email.com` with `ajitt742@gmail.com` (already updated in code)

2. **Add Hidden Fields (Optional)**
   - Add these hidden fields inside the form for better formatting:
     ```html
     <input type="hidden" name="_subject" value="New Contact Form Submission">
     <input type="hidden" name="_captcha" value="false">
     <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you.html">
     ```

3. **Update JavaScript**
   - Remove or simplify the `handleFormSubmit` function to allow natural form submission

---

## Recommended: EmailJS

I've already implemented EmailJS in the code. Just follow **Option 1** above to complete the setup. It's the most flexible and professional solution.

## Security Note

For production use, consider:
- Adding reCAPTCHA to prevent spam
- Setting up rate limiting
- Using a custom domain for better deliverability

## Need Help?

If you need assistance setting up any of these services, let me know!

