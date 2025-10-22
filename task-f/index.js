// Task F — Add row behavior
document.addEventListener("DOMContentLoaded", () => {
  const CHECK = '✅';
  const CROSS = '❌';
  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri"]; // match table headers

  const form = document.getElementById("addCourseForm");
  const tbody = document.querySelector("#timetable tbody");
  const courseInput = document.getElementById("courseName");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const courseName = courseInput.value.trim();
    if (!courseName) return;

    // collect checked days
    const checked = new Set(
      Array.from(form.querySelectorAll('input[name="day"]:checked'))
        .map(cb => cb.value)
    );

    // build row
    const tr = document.createElement("tr");

    // course cell
    const tdCourse = document.createElement("td");
    tdCourse.textContent = courseName;
    tr.appendChild(tdCourse);

    // day cells in correct order
    dayOrder.forEach(day => {
      const td = document.createElement("td");
      const has = checked.has(day);
      const span = document.createElement("span");
      span.className = "mark " + (has ? "yes" : "no");
      span.setAttribute("aria-hidden", "true");
      span.textContent = has ? CHECK : CROSS;
      td.appendChild(span);

      // also include a sr-only text for screen readers
      const sr = document.createElement("span");
      sr.className = "visually-hidden";
      sr.textContent = has ? `${day}: yes` : `${day}: no`;
      td.appendChild(sr);

      tr.appendChild(td);
    });

    tbody.appendChild(tr);

    // reset and focus
    form.reset();
    courseInput.focus();
  });
});
