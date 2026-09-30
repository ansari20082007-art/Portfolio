/* =========================================================
   SHAIK ANSARI PORTFOLIO
   JAVASCRIPT
========================================================= */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });


    /* Close menu after clicking a link */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* ================= TYPING EFFECT ================= */

const typingText = document.getElementById("typingText");

const roles = [
    "Frontend Developer",
    "Web Developer",
    "CSE Student",
    "Technology Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) {
        return;
    }

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }

    const speed = deleting ? 50 : 90;

    setTimeout(typeEffect, speed);
}

typeEffect();


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


/* ================= BACK TO TOP ================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".card, .section-heading, .hero-content, .hero-visual"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const sendBtn = document.getElementById("sendBtn");
const sendText = document.getElementById("sendText");
const sendIcon = document.getElementById("sendIcon");


if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* Clear previous message */

        formMessage.className = "form-message";
        formMessage.textContent = "";


        /* Disable button */

        sendBtn.disabled = true;

        sendText.textContent = "Sending...";

        sendIcon.className = "fas fa-spinner fa-spin";


        try {

            /*
                FormSubmit AJAX endpoint.

                IMPORTANT:
                The form must be running through a web server
                such as VS Code Live Server or a deployed website.
            */

            const formData = new FormData(contactForm);

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify(
                        Object.fromEntries(formData.entries())
                    )
                }
            );


            /* Try to read JSON response */

            let result = null;

            try {

                result = await response.json();

            } catch (error) {

                result = null;

            }


            /*
                Check whether FormSubmit accepted
                the request.
            */

            if (
                !response.ok ||
                !result ||
                result.success === false
            ) {

                throw new Error(
                    result && result.message
                        ? result.message
                        : "Unable to send message."
                );

            }


            /* ================= SUCCESS ================= */

            formMessage.className =
                "form-message success";

            formMessage.textContent =
                "✓ Your message was sent successfully! Thank you for contacting me.";


            /* Clear form */

            contactForm.reset();


        } catch (error) {


            /* ================= ERROR ================= */

            console.error(
                "Contact form error:",
                error
            );


            formMessage.className =
                "form-message error";

            formMessage.textContent =
                "✕ Message could not be sent. Please try again or contact me directly by email.";


        } finally {


            /* Enable button again */

            sendBtn.disabled = false;

            sendText.textContent =
                "Send Message";

            sendIcon.className =
                "fas fa-paper-plane";


            /* Automatically hide message */

            setTimeout(() => {

                formMessage.className =
                    "form-message";

                formMessage.textContent = "";

            }, 7000);

        }

    });

}


/* ================= CURRENT YEAR ================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* ================= EMAIL VALIDATION ================= */

const emailInput = document.getElementById("email");

if (emailInput) {

    emailInput.addEventListener("input", () => {

        if (emailInput.validity.valid) {

            emailInput.style.borderColor = "";

        } else {

            emailInput.style.borderColor =
                "rgba(255, 90, 90, 0.6)";

        }

    });

}


/* ================= PREVENT EMPTY SPACES ================= */

const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");

if (nameInput) {

    nameInput.addEventListener("blur", () => {

        nameInput.value =
            nameInput.value.trim();

    });

}

if (messageInput) {

    messageInput.addEventListener("blur", () => {

        messageInput.value =
            messageInput.value.trim();

    });

}
