document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const table = document.getElementById("registrationTable").querySelector("tbody");

  const isFullNameValid = (name) => {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2 && parts.every(p => p.length >= 2);
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPhoneValid = (phone) => /^\+358\d{7,9}$/.test(phone);

  const isBirthValid = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    return date <= now && age >= 13;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelectorAll(".error-message").forEach(span => span.textContent = "");

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const birthDate = form.birthDate.value;
    const termsChecked = form.terms.checked;

    let valid = true;

    if (!isFullNameValid(fullName)) {
      document.getElementById("nameError").textContent = 
        "Please enter your full name (first and last, at least 2 letters each).";
      valid = false;
    }

    if (!isEmailValid(email)) {
      document.getElementById("emailError").textContent = 
        "Please enter a valid email address.";
      valid = false;
    }

    if (!isPhoneValid(phone)) {
      document.getElementById("phoneError").textContent = 
        "Please enter a Finnish phone number starting with +358.";
      valid = false;
    }

    if (!isBirthValid(birthDate)) {
      document.getElementById("birthError").textContent = 
        "Birth date must be in the past and age must be at least 13.";
      valid = false;
    }

    if (!termsChecked) {
      document.getElementById("termsError").textContent = 
        "You must accept the terms to proceed.";
      valid = false;
    }

    if (!valid) return;

    // Fill hidden timestamp
    const timestamp = new Date().toLocaleString();
    form.timestamp.value = timestamp;

    // Append new row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${timestamp}</td>
      <td>${fullName}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${birthDate}</td>
      <td>${termsChecked ? "Yes" : "No"}</td>
    `;
    table.appendChild(row);

    form.reset();
  });
});
