      
    // Access the form and feedback elements
    const form = document.getElementById('registerForm');
    const feedback = document.getElementById('feedback');

    // Add an event listener for form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevents user from submitting an empty form

      // Get the values entered by the user
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // === USERNAME VALIDATION ===
      const hasLetter = /[a-zA-Z]/.test(username); // Checks for at least one letter
      const hasNumber = /[0-9]/.test(username);    // Checks for at least one number

      if (!hasLetter || !hasNumber) {
        feedback.textContent = "Username must contain at least one letter and one number.";
        feedback.className = "error";
        return; // Stop the function if validation fails
      }


      // === PASSWORD VALIDATION ===
      const hasLowercase = /[a-z]/.test(password);       // At least one lowercase
      const hasUppercase = /[A-Z]/.test(password);       // At least one uppercase
      const hasDigit = /[0-9]/.test(password);        // At least one number
      const hasSpecialChar = /[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]/.test(password); // Special character

      // Combine all password requirements
      if (!hasLowercase || !hasUppercase || !hasDigit || !hasSpecialChar) {
        feedback.textContent =
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.";
        feedback.className = "error";
        return;
      }

      // If both username and password are valid
      feedback.textContent = "Form submitted successfully!";
      feedback.className = "success";
      form.submit();
    });