// ── Subject View: Documents & Attendance ──
async function openSubject(subject) {
  currentSubject = subject;
  $("subjectHeader").innerHTML = `
    <h2>${subject.subject_number}. ${escapeHtml(subject.subject_name)}</h2>
    ${subject.subject_code ? `<p class="muted">Subject Code: ${escapeHtml(subject.subject_code)}</p>` : ""}
  `;
  // Reset attendance UI
  $("attendanceDate").value = new Date().toISOString().split('T')[0];
  $("attendanceTotal").value = "";
  $("rollGrid").style.display = "none";
  $("rollGridContainer").innerHTML = "";
  showMessage("attendanceMessage", "");
  // Reset upload UI
  $("uploadMessage").textContent = "";
  $("fileInput").value = "";
  openModal("subjectViewModal");
  await loadDocuments(subject.id);
  await loadAttendance(subject.id);
}

// ── Attendance Grid ──
let attendanceState = { total: 0, absent: new Set() };

$("generateGridBtn").addEventListener("click", () => {
  const total = parseInt($("attendanceTotal").value);
  if (!total || total < 1) {
    showMessage("attendanceMessage", "Please enter a valid number of students.", true);
    return;
  }
  attendanceState.total = total;
  attendanceState.absent = new Set();
  renderGrid();
  $("rollGrid").style.display = "block";
  showMessage("attendanceMessage", `Grid generated for ${total} students. Click roll numbers to mark absent.`);
});

function renderGrid() {
  const container = $("rollGridContainer");
  container.innerHTML = "";
  const total = attendanceState.total;
  if (!total) return;

  const gridDiv = document.createElement("div");
  gridDiv.className = "roll-number-grid";

  for (let i = 1; i <= total; i++) {
    const btn = document.createElement("div");
    btn.className = "roll-number present";
    btn.textContent = i;
    btn.dataset.roll = i;
    btn.addEventListener("click", () => {
      toggleRoll(i);
    });
    gridDiv.appendChild(btn);
  }
  container.appendChild(gridDiv);
  updateGridUI();
}

function toggleRoll(roll) {
  if (attendanceState.absent.has(roll)) {
    attendanceState.absent.delete(roll);
  } else {
    attendanceState.absent.add(roll);
  }
  updateGridUI();
}

function updateGridUI() {
  const items = $("rollGridContainer").querySelectorAll(".roll-number");
  items.forEach(el => {
    const roll = parseInt(el.dataset.roll);
    if (attendanceState.absent.has(roll)) {
      el.className = "roll-number absent";
    } else {
      el.className = "roll-number present";
    }
  });
}

$("clearGridBtn").addEventListener("click", () => {
  attendanceState.absent = new Set();
  updateGridUI();
  showMessage("attendanceMessage", "Grid reset. All students marked present.");
});

// ── Save Attendance ──
$("saveAttendanceBtn").addEventListener("click", async () => {
  if (!currentSubject) return;
  const date = $("attendanceDate").value;
  if (!date) {
    showMessage("attendanceMessage", "Please select a date.", true);
    return;
  }
  if (attendanceState.total === 0) {
    showMessage("attendanceMessage", "Please generate the roll number grid first.", true);
    return;
  }

  const absentRolls = Array.from(attendanceState.absent).map(String);
  if (absentRolls.length === 0) {
    showMessage("attendanceMessage", "No absent students. Attendance not saved.", true);
    return;
  }

  showMessage("attendanceMessage", "Saving attendance...");

  const { error } = await supabaseClient.from("attendance").insert({
    subject_id: currentSubject.id,
    date: date,
    roll_numbers: absentRolls,
    user_id: currentUser.id
  });

  if (error) {
    showMessage("attendanceMessage", error.message, true);
    return;
  }

  showMessage("attendanceMessage", `✅ Attendance saved! ${absentRolls.length} student(s) marked absent.`);
  // Reset grid but keep total
  attendanceState.absent = new Set();
  updateGridUI();
  await loadAttendance(currentSubject.id);
});

// ── Load Attendance History ──
async function loadAttendance(subjectId) {
  const container = $("attendanceList");
  container.innerHTML = `<p class="muted">Loading...</p>`;

  const { data, error } = await supabaseClient
    .from("attendance")
    .select("*")
    .eq("subject_id", subjectId)
    .order("date", { ascending: false });

  if (error) {
    container.innerHTML = `<p class="message">${escapeHtml(error.message)}</p>`;
    return;
  }

  if (!data.length) {
    container.innerHTML = `<p class="muted">No attendance records yet.</p>`;
    return;
  }

  container.innerHTML = "";
  for (const record of data) {
    const div = document.createElement("div");
    div.className = "attendance-history-item";
    const rolls = Array.isArray(record.roll_numbers) ? record.roll_numbers.join(', ') : record.roll_numbers;
    const count = Array.isArray(record.roll_numbers) ? record.roll_numbers.length : 0;
    div.innerHTML = `
      <span class="date">${new Date(record.date).toLocaleDateString()}</span>
      <span class="rolls"><strong>${count}</strong> absent: ${escapeHtml(rolls)}</span>
      <div class="actions">
        <button class="danger sm delete-attendance-btn" data-id="${record.id}">Delete</button>
      </div>
    `;
    container.appendChild(div);
  }

  container.querySelectorAll('.delete-attendance-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteAttendance(btn.dataset.id));
  });
}

// ── Delete Attendance ──
async function deleteAttendance(id) {
  if (!confirm("Delete this attendance record?")) return;

  const { error } = await supabaseClient
    .from("attendance")
    .delete()
    .eq("id", id);

  if (error) {
    showMessage("attendanceMessage", error.message, true);
    return;
  }

  await loadAttendance(currentSubject.id);
}
