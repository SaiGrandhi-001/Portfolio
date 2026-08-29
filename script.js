// Update Clock
function updateClock() {
  const now = new Date();
  const clockElement = document.getElementById("clock");
  if (clockElement) {
    clockElement.textContent = now.toLocaleTimeString();
  }
}
setInterval(updateClock, 1000);
updateClock();

// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Switch to Light Mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Switch to Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙 Switch to Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");
const navList = document.querySelector("#navbar ul");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navList.classList.toggle("active");
  });

  // Close menu when a link is clicked
  document.querySelectorAll("#navbar a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navList.classList.remove("active");
    });
  });
}

// Smooth Scroll Navigation (excluding Contact)
document
  .querySelectorAll('#navbar a:not([href="#contact"])')
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

// Active Navigation Highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navbar a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Back to Top Button
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Contact Form Popup
document.addEventListener("DOMContentLoaded", () => {
  const contactLink = document.querySelector('#navbar a[href="#contact"]');
  const contactPopup = document.getElementById("contact-popup");
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");
  const messageText = document.getElementById("form-message-text");
  const closePopupBtn = document.getElementById("close-popup");

  // Open popup when Contact link is clicked
  if (contactLink) {
    contactLink.addEventListener("click", (e) => {
      e.preventDefault();
      contactPopup.style.display = "flex";
    });
  }

  // Close popup when X button is clicked
  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", () => {
      contactPopup.style.display = "none";
    });
  }

  // Close popup when clicking outside
  contactPopup.addEventListener("click", (e) => {
    if (e.target === contactPopup) {
      contactPopup.style.display = "none";
    }
  });

  // Close popup on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactPopup.style.display === "flex") {
      contactPopup.style.display = "none";
    }
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.name.value || !form.email.value || !form.message.value) {
      messageText.textContent = "⚠️ Please fill out all required fields.";
      messageBox.className = "form-message warning";
      messageBox.style.display = "block";
      autoHideMessage();
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.value)) {
      messageText.textContent = "⚠️ Please enter a valid email address.";
      messageBox.className = "form-message warning";
      messageBox.style.display = "block";
      autoHideMessage();
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        messageText.textContent = "✅ Thank you! Your message has been sent.";
        messageBox.className = "form-message success";
        messageBox.style.display = "block";
        form.reset();
      } else {
        messageText.textContent =
          "❌ Oops! Something went wrong. Please try again.";
        messageBox.className = "form-message error";
        messageBox.style.display = "block";
      }
    } catch (error) {
      messageText.textContent =
        "❌ Network error. Please check your connection and try again.";
      messageBox.className = "form-message error";
      messageBox.style.display = "block";
    }

    autoHideMessage();
  });

  function autoHideMessage() {
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 5000);
  }
});

// Intersection Observer for lazy loading future images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img.lazy").forEach((img) => imageObserver.observe(img));
}
