const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Create email transporter with explicit settings
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test email connection on startup
transporter.verify(function(error, success) {
    if (error) {
        console.log("Email Server Error:", error);
    } else {
        console.log("Email server is ready to take our messages");
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Contact form handler
app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
        console.error('Missing required fields');
        return res.redirect('/contact.html?status=error&message=missing_fields');
    }

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        replyTo: email
    };

    try {
        // Send email with timeout
        const info = await Promise.race([
            transporter.sendMail(mailOptions),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Email timeout')), 10000)
            )
        ]);
        
        console.log('Email sent successfully:', info);
        res.redirect('/contact.html?status=success');
    } catch (error) {
        console.error('Error sending email:', error);
        res.redirect('/contact.html?status=error&message=' + encodeURIComponent(error.message));
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Email configuration:', {
        user: process.env.EMAIL_USER,
        hasPassword: !!process.env.EMAIL_PASS
    });
}); 