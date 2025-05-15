document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Validate form
    if (validateForm()) {
        // If validation passes, send email
        sendEmail();
    }
});

function validateForm() {
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name').value.trim();
    if (!name) {
        showError('name', 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone').value.trim();
    if (!phone) {
        showError('phone', 'Please enter your phone number');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message').value.trim();
    if (!message) {
        showError('message', 'Please enter your message');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement('div');
    error.className = 'error-message text-danger small mt-1';
    error.textContent = message;
    field.parentNode.appendChild(error);
    field.focus();
}

function sendEmail() {
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    emailjs.send('service_cj30g2j', 'template_yxlmi3b', formData)
        .then(function(response) {
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset(); // Reset form
        }, function(error) {
            alert('Failed to send message: ' + error.text);
        });
}


