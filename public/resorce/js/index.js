$('.js--section-features').waypoint(function (direction) {
  if (direction == 'down') {
    $('nav').addClass('sticky')
  }
  else {
    $('nav').removeClass('sticky')
  }
}, {
  offset: '60px'
})
$('.js--scroll-to-login').click(function () {
  $('html,body').animate({ scrollTop: $('.js--section-login').offset().top }, 1000)
})
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
$('.js--wp-1').waypoint(function (direction) {
  $('.js--wp-1').addClass('animated animate__bounceInRight')
}, {
  offset: '50%'
})
$('.js--wp-2').waypoint(function (direction) {
  $('.js--wp-2').addClass('animated animate__flipInX')
}, {
  offset: '50%'
})
$('.js--wp-3').waypoint(function (direction) {
  $('.js--wp-3').addClass('animated animate__slideInUp')
}, {
  offset: '50%'
})
$('.js--wp-4').waypoint(function (direction) {
  $('.js--wp-4').addClass('animated animate__flipInX')
}, {
  offset: '50%'
})

document.addEventListener("DOMContentLoaded", function () {
  // SIGNUP FORM
  const signupForm = document.getElementById("signup-form");
  const signupTitle = document.getElementById("signup-title");
  const signupMessage = document.getElementById("signup-message");
  const signupFields = document.getElementById("signup-fields");
  const signupButton = signupForm?.querySelector("button[type='submit']");

  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = signupForm.username.value;
      const email = signupForm.email.value;
      const password = signupForm.password.value;
      const confirmPassword = signupForm.confirm_password.value;

      if (password !== confirmPassword) {
        signupMessage.textContent = "Passwords do not match.";
        signupMessage.style.color = "red";
        return;
      }

      try {
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
          // Success behavior
          signupTitle.textContent = "Signup Successful!";
          signupTitle.style.color = "white";
          signupTitle.style.fontSize = "2rem";
          signupMessage.textContent = "";
          signupForm.reset();

          [...signupFields.querySelectorAll("input")].forEach(input => input.style.display = "none");
          if (signupButton) signupButton.style.display = "none";

          setTimeout(() => {
            [...signupFields.querySelectorAll("input")].forEach(input => input.style.display = "block");

            if (signupButton) {
              signupButton.style.display = "block";      // Make button a block element
              signupButton.style.margin = "0 auto";      // Center it
            }

            signupTitle.textContent = "Signup";
            signupTitle.style.color = "";
            signupTitle.style.fontSize = "";
          }, 5000); // Show again after 5 seconds

        } else {
          signupMessage.textContent = "Signup failed. Try again.";
          signupMessage.style.color = "red";
        }
      } catch (error) {
        console.error("Signup error:", error);
        signupMessage.textContent = "An error occurred. Try again.";
        signupMessage.style.color = "red";
      }
    });
  }

  // LOGIN FORM
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = loginForm.email.value;
      const password = loginForm.pswd.value;

      const storedUsername = localStorage.getItem("username");
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if ((email === storedEmail || email === storedUsername) && password === storedPassword) {
        loginMessage.textContent = "Login Successful!";
        loginMessage.style.color = "green";
      } else {
        loginMessage.textContent = "Invalid credentials.";
        loginMessage.style.color = "black";
      }
    });
  }
});
document.querySelectorAll('.effect a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // prevent default open behavior

        const songUrl = this.getAttribute('href');
        const imgSrc = this.querySelector('img').getAttribute('src');
        const [songTitle, , artistName] = this.querySelector('p').innerHTML.split('<br>');

        // Set values in popup
        document.getElementById('popup-img').src = imgSrc;
        document.getElementById('popup-title').textContent = songTitle.trim();
        document.getElementById('popup-artist').textContent = artistName.trim();
        const audio = document.getElementById('popup-audio');
        audio.src = songUrl;
        audio.play();

        // Show the popup
        document.getElementById('music-popup').classList.remove('hidden');
    });
});
document.getElementById('popup-close').addEventListener('click', () => {
    document.getElementById('music-popup').classList.add('hidden');
    document.getElementById('popup-audio').pause();
});
