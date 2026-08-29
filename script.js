function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

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

document
  .querySelectorAll('#navbar a:not([href="#contact"])')
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

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

document.addEventListener("DOMContentLoaded", () => {
  const contactLink = document.querySelector('#navbar a[href="#contact"]');
  const contactPopup = document.getElementById("contact-popup");
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");
  const messageText = document.getElementById("form-message-text");

  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    contactPopup.style.display =
      contactPopup.style.display === "flex" ? "none" : "flex";
  });

  contactPopup.addEventListener("click", (e) => {
    if (e.target === contactPopup) {
      contactPopup.style.display = "none";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.name.value || !form.email.value || !form.message.value) {
      messageText.textContent = "⚠️ Please fill out all required fields.";
      messageBox.className = "form-message warning";
      messageBox.style.display = "block";
      autoHideMessage();
      return;
    }

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

    autoHideMessage();
  });

  function autoHideMessage() {
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 5000);
  }
});
