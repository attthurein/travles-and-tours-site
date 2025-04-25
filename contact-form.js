// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        // Reset button state when page loads
        const submitButton = form.querySelector('.submit-btn');
        submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        submitButton.disabled = false;

        // Check if returning from Formspree
        if (document.referrer.includes('formspree.io')) {
            form.reset();
            submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            submitButton.disabled = false;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitButton.innerHTML = '<span>Loading...</span><i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;

            // Submit to Formspree
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Clear form
                    form.reset();
                    // Show success message
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                    // Reset button state
                    submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitButton.disabled = false;
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                // Show error message
                showNotification('Sorry, there was an error sending your message. Please try again later.', 'error');
                // Reset button state
                submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                submitButton.disabled = false;
            });
        });
    }
});

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
} 