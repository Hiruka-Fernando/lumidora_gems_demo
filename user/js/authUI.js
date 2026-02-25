(function () {
  "use strict";

  function toggleForms() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const showLogin = document.getElementById("show-login");
    const showSignup = document.getElementById("show-signup");
    const accountBox = document.getElementById("account-box");

    showLogin?.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      animateBox(accountBox);
    });

    showSignup?.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      animateBox(accountBox);
    });
  }

  function animateBox(box) {
    box.style.transform = "translateY(-10px)";
    setTimeout(() => (box.style.transform = "translateY(0)"), 10);
  }

  function togglePassword(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);

    toggle?.addEventListener("click", () => {
      const icon = toggle.querySelector("i");
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }

  function setupPasswordToggles() {
    togglePassword("signup-password-toggle", "signup-password");
    togglePassword("signup-confirm-password-toggle", "signup-confirm-password");
  }

  function showSuccessMessage(title, message, isLogin = false) {
    const msg = document.getElementById("success-message");
    const titleEl = document.getElementById("success-title");
    const textEl = document.getElementById("success-text");
    const btn = document.getElementById("success-btn");

    titleEl.textContent = title;
    textEl.textContent = message;

    btn.textContent = isLogin ? "Explore Gems" : "Sign In Now";

    btn.onclick = () => {
      if (isLogin) {
        window.location.href = "index.html";
      } else {
        msg.classList.remove("active");
        document.getElementById("login-form").style.display = "block";
        document.getElementById("signup-form").style.display = "none";
      }
    };

    msg.classList.add("active");
  }

  function setupForms() {
    document.getElementById("loginForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      showSuccessMessage("Welcome Back!", "You have successfully signed in.", true);
    });

    document.getElementById("signupForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      showSuccessMessage("Account Created!", "Your account is ready.", false);
    });
  }

  function setupSocialButtons() {
    document.querySelectorAll(".google-btn, .facebook-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        this.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        this.disabled = true;

        setTimeout(() => {
          showSuccessMessage("Connected!", "Social login successful.", true);
        }, 1500);
      });
    });
  }

  function successOutsideClick() {
    const modal = document.getElementById("success-message");
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  function boxHoverEffect() {
    const box = document.getElementById("account-box");
    box?.addEventListener("mouseenter", () => {
      box.style.boxShadow =
        "0 20px 40px rgba(0,0,0,0.7), 0 0 30px rgba(212,175,55,0.2)";
    });

    box?.addEventListener("mouseleave", () => {
      box.style.boxShadow = "0 15px 35px rgba(0,0,0,0.5)";
    });
  }

  window.AuthUI = {
    init() {
      toggleForms();
      setupPasswordToggles();
      setupForms();
      setupSocialButtons();
      successOutsideClick();
      boxHoverEffect();
    },
  };
})();
