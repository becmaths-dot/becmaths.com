<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BEC Bagalkote – Academic Documentation Portal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2">
  </script>
  <style>
    /* ───────── RESET & BASE ───────── */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --primary-dark: #0f2b4f;
      --primary: #1a3e6f;
      --primary-light: #2b5a9c;
      --primary-gradient: linear-gradient(135deg, #0f2b4f, #1a3e6f, #2b5a9c);
      --gold: #c9a84c;
      --gold-light: #e8d28a;
      --gold-dark: #a88a2e;
      --accent: #2d9cdb;
      --accent-light: #6ab7e8;
      --bg: #f0f4fa;
      --card-bg: #ffffff;
      --text: #1e293b;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --shadow: 0 12px 40px rgba(15, 43, 79, 0.12);
      --shadow-hover: 0 20px 60px rgba(15, 43, 79, 0.20);
      --radius: 16px;
      --radius-sm: 10px;
      --transition: 0.25s ease;
      --font: 'Inter', system-ui, -apple-system, sans-serif;
    }

    html {
      font-family: var(--font);
      background: var(--bg);
      color: var(--text);
      scroll-behavior: smooth;
    }

    body {
      min-height: 100vh;
      background: linear-gradient(145deg, #e8edf5 0%, #d5dfec 100%);
    }

    /* ───────── UTILITY ───────── */
    .hidden {
      display: none !important;
    }
    .muted {
      color: var(--text-muted);
    }
    .small {
      font-size: 0.85rem;
    }
    .full {
      width: 100%;
    }
    .message {
      min-height: 1.6em;
      margin-top: 10px;
      font-weight: 500;
    }
    .message.error {
      color: #b91c1c;
    }
    .message.success {
      color: #0b6e4f;
    }

    /* ───────── BUTTONS ───────── */
    button {
      font-family: var(--font);
      font-weight: 600;
      font-size: 0.95rem;
      border: none;
      border-radius: var(--radius-sm);
      padding: 10px 22px;
      cursor: pointer;
      transition: var(--transition);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
    }
    button.primary {
      background: var(--primary-gradient);
      color: #fff;
      box-shadow: 0 4px 14px rgba(26, 62, 111, 0.30);
    }
    button.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(26, 62, 111, 0.40);
    }
    button.secondary {
      background: var(--gold);
      color: #fff;
      box-shadow: 0 4px 14px rgba(201, 168, 76, 0.30);
    }
    button.secondary:hover {
      background: var(--gold-dark);
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(201, 168, 76, 0.40);
    }
    button.outline {
      background: transparent;
      color: var(--primary);
      border: 2px solid var(--primary);
    }
    button.outline:hover {
      background: var(--primary);
      color: #fff;
    }
    button.danger {
      background: #b91c1c;
      color: #fff;
    }
    button.danger:hover {
      background: #7f1d1d;
    }
    button.sm {
      padding: 6px 14px;
      font-size: 0.8rem;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    /* ───────── LOGIN SCREEN ───────── */
    #loginView {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: var(--primary-gradient);
      position: relative;
      overflow: hidden;
    }
    #loginView::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -30%;
      width: 80%;
      height: 120%;
      background: radial-gradient(ellipse, rgba(201, 168, 76, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    #loginView::after {
      content: '';
      position: absolute;
      bottom: -40%;
      left: -20%;
      width: 60%;
      height: 100%;
      background: radial-gradient(ellipse, rgba(45, 156, 219, 0.08) 0%, transparent 70%);
      pointer-events: none;
    }

    .login-card {
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(8px);
      border-radius: var(--radius);
      padding: 44px 36px;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.30);
      position: relative;
      z-index: 2;
      border: 1px solid rgba(255, 255, 255, 0.20);
      transition: var(--transition);
    }
    .login-card:hover {
      transform: translateY(-4px);
    }
    .login-card .brand-mark {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--gold));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      font-weight: 800;
      color: #fff;
      margin: 0 auto 18px;
      box-shadow: 0 8px 28px rgba(26, 62, 111, 0.30);
    }
    .login-card h1 {
      font-size: 1.6rem;
      font-weight: 700;
      text-align: center;
      color: var(--primary);
      letter-spacing: -0.02em;
    }
    .login-card .subhead {
      text-align: center;
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-top: 4px;
    }
    .login-card .college-name {
      text-align: center;
      font-weight: 700;
      font-size: 1.15rem;
      color: var(--primary-dark);
      margin-top: 8px;
      letter-spacing: 0.3px;
    }
    .login-card .dept-name {
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
      color: var(--gold-dark);
      margin-top: 2px;
    }
    .login-card form {
      margin-top: 28px;
    }
    .login-card label {
      display: block;
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--text);
      margin-top: 16px;
      margin-bottom: 4px;
    }
    .login-card input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid var(--border);
      border-radius: var(--radius-sm);
      font-size: 0.95rem;
      font-family: var(--font);
      transition: var(--transition);
      background: #f8fafc;
    }
    .login-card input:focus {
      outline: none;
      border-color: var(--primary-light);
      box-shadow: 0 0 0 4px rgba(43, 90, 156, 0.12);
      background: #fff;
    }
    .login-card button.primary {
      margin-top: 24px;
      padding: 14px;
      font-size: 1rem;
      border-radius: var(--radius-sm);
    }
    .login-card .login-footer {
      margin-top: 16px;
      font-size: 0.8rem;
      color: var(--text-muted);
      text-align: center;
    }

    /* ───────── DASHBOARD ───────── */
    #dashboardView {
      width: 100%;
      min-height: 100vh;
      background: var(--bg);
    }

    /* Topbar */
    .topbar {
      background: var(--primary-gradient);
      padding: 16px 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      box-shadow: 0 4px 20px rgba(15, 43, 79, 0.25);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .topbar .brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .topbar .brand-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.2rem;
      color: #fff;
      border: 2px solid rgba(255, 255, 255, 0.20);
      flex-shrink: 0;
    }
    .topbar .brand-text h1 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.02em;
      margin: 0 0 2px;
    }
    .topbar .brand-text .sub {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.75);
      font-weight: 400;
    }
    .topbar .brand-text .sub strong {
      color: var(--gold-light);
      font-weight: 600;
    }
    .topbar .user-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .topbar .user-badge {
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
      font-size: 0.9rem;
      padding: 6px 18px;
      background: rgba(255, 255, 255, 0.10);
      border-radius: 50px;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .topbar button.secondary {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      box-shadow: none;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 8px 18px;
    }
    .topbar button.secondary:hover {
      background: rgba(255, 255, 255, 0.22);
      transform: none;
      box-shadow: none;
    }

    /* Container */
    .container {
      width: min(1360px, 92%);
      margin: 28px auto 60px;
    }

    /* Toolbar */
    .toolbar {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 28px;
      padding: 22px 28px;
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
    }
    .toolbar h2 {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary);
      margin: 0 0 4px;
    }
    .toolbar p.muted {
      font-size: 0.9rem;
      margin: 0;
    }

    /* Year List */
    .year-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .year-card {
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
      overflow: hidden;
      transition: var(--transition);
    }
    .year-card:hover {
      box-shadow: var(--shadow-hover);
    }
    .year-card .year-header {
      padding: 18px 24px;
      background: linear-gradient(135deg, #f8fafc, #f1f5f9);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      border-bottom: 1px solid var(--border);
    }
    .year-card .year-header h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary);
      margin: 0;
    }
    .year-card .year-header .muted {
      margin: 0;
    }
    .semester-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      padding: 20px 24px 24px;
    }

    .semester-card {
      background: #f8fafc;
      border-radius: var(--radius-sm);
      padding: 16px 18px;
      border: 1px solid var(--border);
      transition: var(--transition);
    }
    .semester-card:hover {
      border-color: var(--primary-light);
      background: #fff;
    }
    .semester-card h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--primary);
      margin: 0 0 10px;
    }
    .semester-card .subject-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .semester-card .subject-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: #fff;
      border-radius: 6px;
      border: 1px solid #eef2f6;
      transition: var(--transition);
    }
    .semester-card .subject-row:hover {
      border-color: var(--accent);
      background: #f0f7fe;
    }
    .semester-card .subject-row .doc-meta {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 2px;
    }
    .semester-card .add-btn {
      margin-top: 12px;
      width: 100%;
      padding: 8px;
      font-size: 0.8rem;
      border: 2px dashed var(--border);
      background: transparent;
      color: var(--text-muted);
      border-radius: 6px;
      transition: var(--transition);
    }
    .semester-card .add-btn:hover:not(:disabled) {
      border-color: var(--primary-light);
      color: var(--primary);
      background: rgba(43, 90, 156, 0.04);
    }
    .semester-card .add-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ───────── OTHER SECTIONS ───────── */
    .other-sections {
      margin-top: 48px;
      padding-top: 32px;
      border-top: 2px solid var(--border);
    }
    .other-sections h2 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--primary);
      margin: 0 0 16px;
    }
    .section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 14px;
    }
    .section-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 18px 16px;
      text-align: center;
      font-weight: 600;
      color: var(--primary);
      transition: var(--transition);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
      cursor: default;
    }
    .section-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow);
      border-color: var(--gold-light);
      background: linear-gradient(135deg, #fff, #fdf9ef);
    }
    .other-sections .muted.small {
      margin-top: 14px;
      font-style: italic;
    }

    /* ───────── MODALS ───────── */
    .modal {
      position: fixed;
      inset: 0;
      background: rgba(15, 43, 79, 0.60);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      z-index: 999;
      animation: fadeIn 0.2s ease;
    }
    .modal.hidden {
      display: none !important;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.97);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .modal-card {
      background: var(--card-bg);
      border-radius: var(--radius);
      max-width: 520px;
      width: 100%;
      padding: 36px 32px 32px;
      box-shadow: 0 40px 80px rgba(0, 0, 0, 0.35);
      position: relative;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-card.wide {
      max-width: 780px;
    }
    .modal-card .close {
      position: absolute;
      top: 14px;
      right: 18px;
      background: transparent;
      border: none;
      font-size: 2rem;
      line-height: 1;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 8px;
      transition: var(--transition);
    }
    .modal-card .close:hover {
      background: #f1f5f9;
      color: var(--text);
    }
    .modal-card h2 {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary);
      margin: 0 0 20px;
    }
    .modal-card label {
      display: block;
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--text);
      margin-top: 16px;
      margin-bottom: 4px;
    }
    .modal-card input,
    .modal-card select {
      width: 100%;
      padding: 11px 14px;
      border: 2px solid var(--border);
      border-radius: var(--radius-sm);
      font-size: 0.95rem;
      font-family: var(--font);
      transition: var(--transition);
      background: #f8fafc;
    }
    .modal-card input:focus,
    .modal-card select:focus {
      outline: none;
      border-color: var(--primary-light);
      box-shadow: 0 0 0 4px rgba(43, 90, 156, 0.10);
      background: #fff;
    }
    .modal-card button.primary {
      margin-top: 22px;
      padding: 13px;
      font-size: 1rem;
    }

    /* Upload box */
    .upload-box {
      background: #f8fafc;
      border-radius: var(--radius-sm);
      padding: 20px 20px 16px;
      margin: 16px 0 20px;
      border: 2px dashed var(--border);
    }
    .upload-box h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--primary);
      margin: 0 0 12px;
    }
    .upload-box label {
      margin-top: 10px;
      font-weight: 500;
      font-size: 0.8rem;
    }
    .upload-box select,
    .upload-box input[type="file"] {
      margin-top: 2px;
    }
    .upload-box input[type="file"] {
      padding: 8px 0;
      border: none;
      background: transparent;
    }
    .upload-box .message {
      margin-top: 10px;
      font-size: 0.85rem;
    }

    /* Documents list */
    #documentsList {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 12px;
      max-height: 260px;
      overflow-y: auto;
    }
    #documentsList .doc-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    #documentsList .doc-row .doc-name {
      font-weight: 500;
    }
    #documentsList .doc-row .doc-meta {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 2px;
    }
    #documentsList .doc-row .doc-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }
    #documentsList .doc-row .doc-actions button {
      padding: 4px 10px;
      font-size: 0.7rem;
    }

    /* ───────── RESPONSIVE ───────── */
    @media (max-width: 768px) {
      .topbar {
        padding: 12px 16px;
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      .topbar .brand-text h1 {
        font-size: 1.1rem;
      }
      .topbar .user-actions {
        justify-content: space-between;
      }
      .container {
        width: 94%;
        margin: 16px auto;
      }
      .toolbar {
        flex-direction: column;
        align-items: stretch;
        padding: 16px;
      }
      .login-card {
        padding: 32px 20px;
      }
      .modal-card {
        padding: 24px 18px;
      }
      .modal-card.wide {
        max-width: 100%;
        margin: 12px;
      }
      .semester-grid {
        grid-template-columns: 1fr;
        padding: 12px 0;
      }
      .year-card .year-header {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      .section-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 480px) {
      .section-grid {
        grid-template-columns: 1fr;
      }
      .topbar .brand-text .sub {
        font-size: 0.7rem;
      }
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #eef2f6;
      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--primary-light);
      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--primary);
    }
  </style>
</head>
<body>
  <div id="app">

    <!-- ═══ LOGIN VIEW ═══ -->
    <section id="loginView" class="center-screen">
      <div class="login-card">
        <div class="brand-mark">B</div>
        <h1>Academic Documentation Portal</h1>
        <p class="subhead">Streamline your academic records</p>
        <div class="college-name">🏛️ Basaveshwar Engineering College, Bagalkote</div>
        <div class="dept-name">📐 Department of Mathematics</div>
        <form id="loginForm">
          <label>Email</label>
          <input id="email" type="email" required placeholder="your.email@becbgk.edu" />
          <label>Password</label>
          <input id="password" type="password" required placeholder="••••••••" />
          <button type="submit" class="primary full">🔐 Login</button>
          <p id="loginMessage" class="message"></p>
        </form>
        <div class="login-footer">Secure · Academic · Documentation</div>
      </div>
    </section>

    <!-- ═══ DASHBOARD VIEW ═══ -->
    <section id="dashboardView" class="hidden">
      <!-- Topbar -->
      <header class="topbar">
        <div class="brand">
          <div class="brand-icon">B</div>
          <div class="brand-text">
            <h1>BEC Bagalkote</h1>
            <div class="sub"><strong>Department of Mathematics</strong> · Academic Documentation Portal</div>
          </div>
        </div>
        <div class="user-actions">
          <span class="user-badge" id="userBadge">👤 Dr. Mahadev Biradar</span>
          <button id="logoutBtn" class="secondary">🚪 Logout</button>
        </div>
      </header>

      <main class="container">
        <div id="globalMessage" class="message"></div>

        <!-- Toolbar -->
        <div class="toolbar">
          <div>
            <h2>📚 Academic Years</h2>
            <p class="muted">Create an academic year and maintain up to 4 subjects per semester.</p>
          </div>
          <button id="addYearBtn" class="primary">➕ Add Academic Year</button>
        </div>

        <!-- Year List -->
        <div id="yearsList" class="year-list"></div>

        <!-- Other Sections -->
        <div class="other-sections">
          <h2>📂 Other Academic Records</h2>
          <div class="section-grid">
            <div class="section-card">🏅 NBA</div>
            <div class="section-card">⭐ NAAC</div>
            <div class="section-card">🔬 Research</div>
            <div class="section-card">📄 Publications</div>
            <div class="section-card">🎓 FDP / STTP</div>
            <div class="section-card">📋 BOS / University Duties</div>
            <div class="section-card">📜 Certificates</div>
            <div class="section-card">🏆 Awards &amp; Achievements</div>
          </div>
          <p class="muted small">These sections are placeholders in Version 1. We will connect them to storage later.</p>
        </div>
      </main>
    </section>
  </div>

  <!-- ═══ MODALS ═══ -->

  <!-- Add Year -->
  <div id="yearModal" class="modal hidden">
    <div class="modal-card">
      <button class="close" data-close="yearModal">×</button>
      <h2>📅 Add Academic Year</h2>
      <form id="yearForm">
        <label>Academic Year</label>
        <input id="yearName" required placeholder="e.g. 2026-27" />
        <button class="primary full" type="submit">Create Year</button>
      </form>
    </div>
  </div>

  <!-- Add Semester -->
  <div id="semesterModal" class="modal hidden">
    <div class="modal-card">
      <button class="close" data-close="semesterModal">×</button>
      <h2>📖 Add Semester</h2>
      <form id="semesterForm">
        <input id="semesterYearId" type="hidden" />
        <label>Semester</label>
        <select id="semesterNumber" required>
          <option value="">Select semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
          <option value="7">Semester 7</option>
          <option value="8">Semester 8</option>
        </select>
        <button class="primary full" type="submit">Create Semester</button>
      </form>
    </div>
  </div>

  <!-- Add Subject -->
  <div id="subjectModal" class="modal hidden">
    <div class="modal-card">
      <button class="close" data-close="subjectModal">×</button>
      <h2>📘 Add Subject</h2>
      <form id="subjectForm">
        <input id="subjectSemesterId" type="hidden" />
        <label>Subject Number</label>
        <select id="subjectNumber" required>
          <option value="">Select</option>
          <option value="1">Subject 1</option>
          <option value="2">Subject 2</option>
          <option value="3">Subject 3</option>
          <option value="4">Subject 4</option>
        </select>
        <label>Subject Code</label>
        <input id="subjectCode" placeholder="e.g. 21MAT31" />
        <label>Subject Name</label>
        <input id="subjectName" required placeholder="Engineering Mathematics" />
        <button class="primary full" type="submit">Create Subject</button>
      </form>
    </div>
  </div>

  <!-- Subject View (documents) -->
  <div id="subjectViewModal" class="modal hidden">
    <div class="modal-card wide">
      <button class="close" data-close="subjectViewModal">×</button>
      <div id="subjectHeader"></div>
      <div class="upload-box">
        <h3>📤 Upload Academic Document</h3>
        <label>Document Category</label>
        <select id="documentType">
          <option>Syllabus</option>
          <option>Lesson Plan</option>
          <option>Course Plan</option>
          <option>Student List</option>
          <option>Attendance</option>
          <option>CIE-I</option>
          <option>CIE-II</option>
          <option>CIE-III</option>
          <option>Question Paper</option>
          <option>Evaluated Answer Scripts</option>
          <option>CIE Result</option>
          <option>CO-PO-PSO Mapping</option>
          <option>CO Attainment</option>
          <option>Result Analysis</option>
          <option>Student Feedback</option>
          <option>Action Taken Report</option>
          <option>Course File</option>
          <option>Activity Photographs</option>
          <option>Other</option>
        </select>
        <label>File</label>
        <input id="fileInput" type="file" />
        <button id="uploadBtn" class="primary" style="margin-top:12px;">⬆ Upload File</button>
        <p class="muted small" style="margin-top:6px;">Maximum file size: 50 MB (current bucket limit).</p>
        <p id="uploadMessage" class="message"></p>
      </div>
      <h3 style="margin-top:8px;">📄 Documents</h3>
      <div id="documentsList"></div>
    </div>
  </div>

  <script>
    // ════════════════════════════════════════════════
    //  SUPABASE CONFIG — Using your provided keys
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
      // Try to get existing session
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        currentUser = session.user;
        showDashboard();
      } else {
        showLogin();
      }

      // Listen for auth changes
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
      // Update user badge
      const name = currentUser?.user_metadata?.full_name || currentUser?.email || "Dr. Mahadev Biradar";
      $("userBadge").textContent = "👤 " + name;
      await loadYears();
    }

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

      // Enforce max 4 subjects visually
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
        // If DB record fails, remove the uploaded file.
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
  </script>
</body>
</html>
