// ════════════════════════════════════════════════
//  SUPABASE CONFIG — Edit these with your credentials
// ════════════════════════════════════════════════
const SUPABASE_URL = "https://kobdbefxahcfdxvuerfm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FTGewZ3U9VpXXMRFUH6UjQ_ycpgu3qA";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let currentSubject = null;

const $ = (id) => document.getElementById(id);

function showMessage(id, text, error = false) {
  const el = $(id);
  el.textContent = text || "";
  el.style.color = error ? "#b91c1c" : "#166534";
}

function openModal(id) { $(id).classList.remove("hidden"); }
function closeModal(id) { $(id).classList.add("hidden"); }

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close));
});

// ── Auth ──
async function init() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    currentUser = session.user;
    showDashboard();
  } else {
    showLogin();
  }

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    if (currentUser) showDashboard();
    else showLogin();
  });
}

function showLogin() {
  $("loginView").classList.remove("hidden");
  $("dashboardView").classList.add("hidden");
}

async function showDashboard() {
  $("loginView").classList.add("hidden");
  $("dashboardView").classList.remove("hidden");
  const name = currentUser?.user_metadata?.full_name || currentUser?.email || "Dr. Mahadev Biradar";
  $("userBadge").textContent = "👤 " + name;
  await loadYears();
}

// ── Login ──
$("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  showMessage("loginMessage", "Signing in...");
  const email = $("email").value.trim();
  const password = $("password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    showMessage("loginMessage", error.message, true);
  } else {
    showMessage("loginMessage", "");
  }
});

$("logoutBtn").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
});

// ── Signup ──
$("showSignupBtn").addEventListener("click", () => {
  $("signupEmail").value = "";
  $("signupPassword").value = "";
  $("signupConfirm").value = "";
  showMessage("signupMessage", "");
  openModal("signupModal");
});

$("showLoginFromSignup").addEventListener("click", () => {
  closeModal("signupModal");
});

$("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  showMessage("signupMessage", "Creating account...");

  const email = $("signupEmail").value.trim();
  const password = $("signupPassword").value;
  const confirm = $("signupConfirm").value;

  if (password !== confirm) {
    showMessage("signupMessage", "Passwords do not match.", true);
    return;
  }
  if (password.length < 6) {
    showMessage("signupMessage", "Password must be at least 6 characters.", true);
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: email.split('@')[0] || "User",
      }
    }
  });

  if (error) {
    showMessage("signupMessage", error.message, true);
    return;
  }

  if (data?.user?.identities?.length === 0) {
    showMessage("signupMessage", "This email is already registered. Please log in.", true);
    return;
  }

  showMessage("signupMessage", "Account created! Please check your email for confirmation (if required).");
  if (data?.session) {
    closeModal("signupModal");
    showMessage("loginMessage", "Signed up and logged in!");
  }
});

// ── Years ──
$("addYearBtn").addEventListener("click", () => {
  $("yearName").value = "";
  openModal("yearModal");
});

$("yearForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = $("yearName").value.trim();
  if (!name) return;

  const { error } = await supabaseClient
    .from("academic_years")
    .insert({ name, user_id: currentUser.id });

  if (error) {
    showMessage("globalMessage", error.message, true);
    return;
  }
  closeModal("yearModal");
  await loadYears();
});

async function loadYears() {
  const { data, error } = await supabaseClient
    .from("academic_years")
    .select("*")
    .order("name", { ascending: false });

  if (error) {
    showMessage("globalMessage", error.message, true);
    return;
  }

  const list = $("yearsList");
  list.innerHTML = "";

  if (!data.length) {
    list.innerHTML = `<div class="year-card"><p class="muted">No academic year yet. Click <b>+ Add Academic Year</b> to create 2026-27.</p></div>`;
    return;
  }

  for (const year of data) {
    const card = document.createElement("div");
    card.className = "year-card";
    card.innerHTML = `
      <div class="year-header">
        <div>
          <h2>${escapeHtml(year.name)}</h2>
          <p class="muted">Semester-wise academic documentation</p>
        </div>
        <button class="primary" data-add-semester="${year.id}">+ Add Semester</button>
      </div>
      <div class="semester-grid" id="semesters-${year.id}">
        <p class="muted">Loading semesters...</p>
      </div>
    `;
    list.appendChild(card);
    card.querySelector("[data-add-semester]").addEventListener("click", () => {
      $("semesterYearId").value = year.id;
      $("semesterNumber").value = "";
      openModal("semesterModal");
    });
    await loadSemesters(year.id);
  }
}

// ── Semesters ──
async function loadSemesters(yearId) {
  const container = $(`semesters-${yearId}`);
  const { data, error } = await supabaseClient
    .from("semesters")
    .select("*")
    .eq("academic_year_id", yearId)
    .order("semester_number");

  if (error) {
    container.innerHTML = `<p class="message">${escapeHtml(error.message)}</p>`;
    return;
  }

  if (!data.length) {
    container.innerHTML = `<p class="muted">No semesters created yet.</p>`;
    return;
  }

  container.innerHTML = "";

  for (const semester of data) {
    const card = document.createElement("div");
    card.className = "semester-card";
    card.innerHTML = `
      <h3>Semester ${semester.semester_number}</h3>
      <div class="subject-list" id="subjects-${semester.id}">
        <p class="muted">Loading subjects...</p>
      </div>
      <button class="secondary add-btn" data-add-subject="${semester.id}">+ Add Subject</button>
    `;
    container.appendChild(card);

    card.querySelector("[data-add-subject]").addEventListener("click", () => {
      $("subjectSemesterId").value = semester.id;
      $("subjectNumber").value = "";
      $("subjectCode").value = "";
      $("subjectName").value = "";
      openModal("subjectModal");
    });

    await loadSubjects(semester.id);
  }
}

$("semesterForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const academic_year_id = Number($("semesterYearId").value);
  const semester_number = Number($("semesterNumber").value);
  if (!academic_year_id || !semester_number) return;

  const { error } = await supabaseClient.from("semesters").insert({
    academic_year_id,
    semester_number,
    user_id: currentUser.id
  });

  if (error) {
    showMessage("globalMessage", error.message, true);
    return;
  }
  closeModal("semesterModal");
  await loadYears();
});

// ── Subjects ──
async function loadSubjects(semesterId) {
  const container = $(`subjects-${semesterId}`);
  const { data, error } = await supabaseClient
    .from("subjects")
    .select("*")
    .eq("semester_id", semesterId)
    .order("subject_number");

  if (error) {
    container.innerHTML = `<p class="message">${escapeHtml(error.message)}</p>`;
    return;
  }

  if (!data.length) {
    container.innerHTML = `<p class="muted">No subjects yet.</p>`;
    return;
  }

  container.innerHTML = "";
  for (const subject of data) {
    const row = document.createElement("div");
    row.className = "subject-row";
    row.innerHTML = `
      <div>
        <b>${subject.subject_number}. ${escapeHtml(subject.subject_name)}</b>
        ${subject.subject_code ? `<div class="doc-meta">${escapeHtml(subject.subject_code)}</div>` : ""}
      </div>
      <button>Open</button>
    `;
    row.querySelector("button").addEventListener("click", () => openSubject(subject));
    container.appendChild(row);
  }

  const addBtn = container.parentElement.querySelector(".add-btn");
  if (data.length >= 4) addBtn.disabled = true;
}

$("subjectForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const semester_id = Number($("subjectSemesterId").value);
  const subject_number = Number($("subjectNumber").value);
  const subject_code = $("subjectCode").value.trim() || null;
  const subject_name = $("subjectName").value.trim();
  if (!semester_id || !subject_number || !subject_name) return;

  const { error } = await supabaseClient.from("subjects").insert({
    semester_id,
    subject_number,
    subject_code,
    subject_name,
    user_id: currentUser.id
  });

  if (error) {
    showMessage("globalMessage", error.message, true);
    return;
  }
  closeModal("subjectModal");
  await loadYears();
});

// ── Subject View & Documents ──
async function openSubject(subject) {
  currentSubject = subject;
  $("subjectHeader").innerHTML = `
    <h2>${subject.subject_number}. ${escapeHtml(subject.subject_name)}</h2>
    ${subject.subject_code ? `<p class="muted">Subject Code: ${escapeHtml(subject.subject_code)}</p>` : ""}
  `;
  $("uploadMessage").textContent = "";
  $("fileInput").value = "";
  openModal("subjectViewModal");
  await loadDocuments(subject.id);
}

async function loadDocuments(subjectId) {
  const list = $("documentsList");
  list.innerHTML = `<p class="muted">Loading...</p>`;

  const { data, error } = await supabaseClient
    .from("documents")
    .select("*")
    .eq("subject_id", subjectId)
    .order("uploaded_at", { ascending: false });

  if (error) {
    list.innerHTML = `<p class="message">${escapeHtml(error.message)}</p>`;
    return;
  }

  if (!data.length) {
    list.innerHTML = `<p class="muted">No documents uploaded for this subject.</p>`;
    return;
  }

  list.innerHTML = "";
  for (const doc of data) {
    const row = document.createElement("div");
    row.className = "doc-row";
    row.innerHTML = `
      <div>
        <div class="doc-name">${escapeHtml(doc.file_name)}</div>
        <div class="doc-meta">${escapeHtml(doc.document_type)} · ${new Date(doc.uploaded_at).toLocaleString()}</div>
      </div>
      <div class="doc-actions">
        <button class="secondary">View</button>
        <button class="secondary">Delete</button>
      </div>
    `;
    const [viewBtn, deleteBtn] = row.querySelectorAll("button");
    viewBtn.addEventListener("click", () => viewDocument(doc));
    deleteBtn.addEventListener("click", () => deleteDocument(doc));
    list.appendChild(row);
  }
}

// ── Upload ──
$("uploadBtn").addEventListener("click", async () => {
  if (!currentSubject) return;
  const file = $("fileInput").files[0];
  const type = $("documentType").value;

  if (!file) {
    showMessage("uploadMessage", "Please choose a file.", true);
    return;
  }

  if (file.size > 50 * 1024 * 1024) {
    showMessage("uploadMessage", "File is larger than the current 50 MB limit.", true);
    return;
  }

  showMessage("uploadMessage", "Uploading...");

  const safeName = file.name.replace(/[^\w.\-() ]+/g, "_");
  const path = `${currentUser.id}/subject-${currentSubject.id}/${Date.now()}_${safeName}`;

  const { error: uploadError } = await supabaseClient.storage
    .from("academic-files")
    .upload(path, file, { upsert: false });

  if (uploadError) {
    showMessage("uploadMessage", uploadError.message, true);
    return;
  }

  const { error: dbError } = await supabaseClient.from("documents").insert({
    subject_id: currentSubject.id,
    document_type: type,
    file_name: file.name,
    file_path: path,
    user_id: currentUser.id
  });

  if (dbError) {
    await supabaseClient.storage.from("academic-files").remove([path]);
    showMessage("uploadMessage", dbError.message, true);
    return;
  }

  $("fileInput").value = "";
  showMessage("uploadMessage", "File uploaded successfully.");
  await loadDocuments(currentSubject.id);
});

// ── View & Delete Document ──
async function viewDocument(doc) {
  const { data, error } = await supabaseClient.storage
    .from("academic-files")
    .createSignedUrl(doc.file_path, 60 * 10);

  if (error) {
    showMessage("uploadMessage", error.message, true);
    return;
  }
  window.open(data.signedUrl, "_blank", "noopener");
}

async function deleteDocument(doc) {
  if (!confirm(`Delete "${doc.file_name}"?`)) return;

  const { error: storageError } = await supabaseClient.storage
    .from("academic-files")
    .remove([doc.file_path]);

  if (storageError) {
    showMessage("uploadMessage", storageError.message, true);
    return;
  }

  const { error: dbError } = await supabaseClient
    .from("documents")
    .delete()
    .eq("id", doc.id);

  if (dbError) {
    showMessage("uploadMessage", dbError.message, true);
    return;
  }

  await loadDocuments(currentSubject.id);
}

// ── Helper ──
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  } [ch]));
}

// ════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════
init();
