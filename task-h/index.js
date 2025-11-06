document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tableBody = document.getElementById("registrationTable");

  // --- Validation helpers ---
  const isFullNameValid = (name) => {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2 && parts.every((p) => p.length >= 2);
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = (phone) => /^\+358\d{7,9}$/.test(phone);
  const isBirthValid = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    return date <= now && age >= 13;
  };

  // --- Clear all error messages and borders ---
  const clearErrors = () => {
    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
    form.querySelectorAll("input").forEach((input) => {
      input.classList.remove("border-red-500", "focus:ring-red-300");
    });
  };

  // --- Show specific error ---
  const showError = (id, message) => {
    const span = document.getElementById(id);
    const input = document.querySelector(`#${id.replace("Error", "")}`);
    if (span) span.textContent = message;
    if (input) input.classList.add("border-red-500", "focus:ring-red-300");
  };

  // --- Form submission handler ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const { fullName, email, phone, birthDate, terms } = form;
    let valid = true;

    if (!isFullNameValid(fullName.value)) {
      showError("nameError", "Enter your full name (first + last, min. 2 letters each).");
      valid = false;
    }

    if (!isEmailValid(email.value)) {
      showError("emailError", "Enter a valid email address.");
      valid = false;
    }

    if (!isPhoneValid(phone.value)) {
      showError("phoneError", "Enter a Finnish phone number starting with +358.");
      valid = false;
    }

    if (!isBirthValid(birthDate.value)) {
      showError("birthError", "Birth date must be in the past and at least 13 years old.");
      valid = false;
    }

    if (!terms.checked) {
      showError("termsError", "You must accept the terms to continue.");
      valid = false;
    }

    if (!valid) return;

    // --- Add new row ---
    const timestamp = new Date().toLocaleString();
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="p-2">${timestamp}</td>
      <td class="p-2">${fullName.value}</td>
      <td class="p-2">${email.value}</td>
      <td class="p-2">${phone.value}</td>
      <td class="p-2">${birthDate.value}</td>
      <td class="p-2">${terms.checked ? "Yes" : "No"}</td>
    `;
    newRow.classList.add(
      "bg-green-100",
      "transition",
      "duration-700",
      "ease-in-out"
    );
    tableBody.appendChild(newRow);

    // Remove success highlight after delay
    setTimeout(() => newRow.classList.remove("bg-green-100"), 1000);

    // Reset form
    form.reset();
  });

  // --- Reset handler ---
  form.addEventListener("reset", () => {
    setTimeout(clearErrors, 50);
  });
});
