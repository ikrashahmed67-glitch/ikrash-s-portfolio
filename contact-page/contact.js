const form = document.getElementById('contactForm');
const snackbar = document.getElementById('snackbar');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Empty check
    if (name === '' || email === '' || message === '') {
        alert('Please fill all fields!');
        return;
    }

    // Email regex
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email!');
        return;
    }

    // Send to Formspree
    const formData = new FormData(form);

    try {
        const response = await fetch("https://formspree.io/f/xjklknvr", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            snackbar.textContent = `Thanks ${name}! Your message has been sent.`;
            snackbar.className = 'snackbar show';

            setTimeout(() => {
                snackbar.className = 'snackbar';
            }, 3500);

            form.reset();
        } else {
            alert("Error sending message. Please try again!");
        }

    } catch (error) {
        alert("Something went wrong. Try again later!");
    }
});