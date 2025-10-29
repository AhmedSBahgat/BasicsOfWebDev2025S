// Author: Ville Heikkiniemi
// Date: 2025-10-06
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
  const CHECK = "✅";
  const CROSS = "❌";
  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const form = document.getElementById("addCourseForm");
  const tableBody = document.querySelector("#timetable tbody");
  const courseInput = document.getElementById("courseName");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const courseName = courseInput.value.trim();
    if (!courseName) return;

    // Gather checked days
    const checkedDays = new Set(
      Array.from(form.querySelectorAll('input[name="day"]:checked')).map((d) => d.value)
    );

    // Create row
    const row = document.createElement("tr");

    // Course name cell
    const nameCell = document.createElement("td");
    nameCell.textContent = courseName;
    row.appendChild(nameCell);

    // Day cells
    dayOrder.forEach((day) => {
      const cell = document.createElement("td");
      cell.textContent = checkedDays.has(day) ? CHECK : CROSS;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
    form.reset();
    courseInput.focus();
  });
});
