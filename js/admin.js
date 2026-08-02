/* ============================================================
   TECHNEXA — Admin Dashboard Complete Logic & Engine
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  checkAdminAuth();
  initAdminDashboard();
});

/* ── Authentication & Role Handling ────────────────────────── */
function checkAdminAuth() {
  const isAuth = sessionStorage.getItem("technexa_admin_auth");
  const overlay = document.getElementById("admin-login-overlay");
  if (isAuth === "true") {
    if (overlay) overlay.style.display = "none";
  } else {
    if (overlay) overlay.style.display = "flex";
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const idInput = document.getElementById("login-admin-id").value.trim();
  const passInput = document.getElementById("login-admin-pass").value.trim();
  const errorMsg = document.getElementById("login-error-msg");

  // Accept admin / 2026 or admin / technexa2026
  if (idInput.toLowerCase() === "admin" && (passInput === "2026" || passInput === "technexa2026")) {
    sessionStorage.setItem("technexa_admin_auth", "true");
    sessionStorage.setItem("technexa_admin_id", idInput);
    document.getElementById("admin-login-overlay").style.display = "none";
    if (errorMsg) errorMsg.style.display = "none";
    showAdminToast("🔓 Logged in successfully as Admin!");
  } else {
    if (errorMsg) errorMsg.style.display = "block";
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem("technexa_admin_auth");
  sessionStorage.removeItem("technexa_admin_id");
  const overlay = document.getElementById("admin-login-overlay");
  if (overlay) overlay.style.display = "flex";
  showAdminToast("🔒 Logged out of Admin Portal.");
}

/* ── Modal Utility Functions ───────────────────────────────── */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("open");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

/* ── Init Admin Dashboard ──────────────────────────────────── */
function initAdminDashboard() {
  const data = window.TECHNEXA_CMS.getData();

  // Populate Overview Stats
  const activeEvents = data.events ? data.events.length : 0;
  const activeRegs   = data.registrations ? data.registrations.length : 0;
  if (document.getElementById("dash-events-count")) document.getElementById("dash-events-count").textContent = activeEvents;
  if (document.getElementById("dash-prize-pool"))   document.getElementById("dash-prize-pool").textContent   = data.site.totalPrizePool || "Rs 1.5L+";
  if (document.getElementById("dash-regs-count"))   document.getElementById("dash-regs-count").textContent   = activeRegs;
  if (document.getElementById("dash-dates"))        document.getElementById("dash-dates").textContent        = data.site.dates || "Sept 11 & 12";

  // Populate General Settings Tab
  if (document.getElementById("setting-name"))      document.getElementById("setting-name").value      = data.site.name || "";
  if (document.getElementById("setting-tagline"))   document.getElementById("setting-tagline").value   = data.site.tagline || "";
  if (document.getElementById("setting-dates"))     document.getElementById("setting-dates").value     = data.site.dates || "";
  if (document.getElementById("setting-prizepool")) document.getElementById("setting-prizepool").value = data.site.totalPrizePool || "";
  if (document.getElementById("setting-headline"))  document.getElementById("setting-headline").value  = data.site.heroHeadline || "";
  if (document.getElementById("setting-subtitle"))  document.getElementById("setting-subtitle").value  = data.site.heroSubtitle || "";
  if (document.getElementById("setting-ticker"))    document.getElementById("setting-ticker").value    = (data.site.tickerText || []).join(", ");

  // Populate Schedule Tab
  if (document.getElementById("schedule-tba-toggle")) document.getElementById("schedule-tba-toggle").value = data.schedule.isTBA ? "true" : "false";
  if (document.getElementById("schedule-tba-msg"))    document.getElementById("schedule-tba-msg").value    = data.schedule.tbaMessage || "";

  // Render Lists
  renderAdminEventsList(data.events || []);
  renderAdminTeamList(data.team || []);
  renderAdminSponsorsList(data.sponsors || []);
  renderAdminRegistrationsTable(data.registrations || []);
  renderAdminFAQsList(data.faqs || []);
}

/* ── Tab Switching ─────────────────────────────────────────── */
function switchAdminTab(tabId, btnEl) {
  document.querySelectorAll(".admin-tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".admin-nav-btn").forEach(btn => btn.classList.remove("active"));

  const targetTab = document.getElementById("tab-" + tabId);
  if (targetTab) targetTab.classList.add("active");
  if (btnEl) btnEl.classList.add("active");

  const titleEl = document.getElementById("current-tab-title");
  if (titleEl && btnEl) titleEl.textContent = btnEl.textContent;
}

/* ── Toast Notification ────────────────────────────────────── */
function showAdminToast(msg) {
  const toast = document.getElementById("admin-toast");
  if (toast) {
    toast.textContent = msg || "✨ Changes saved successfully!";
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
  }
}

/* ── Save Settings ─────────────────────────────────────────── */
function saveGeneralSettings() {
  const data = window.TECHNEXA_CMS.getData();
  data.site.name           = document.getElementById("setting-name").value.trim();
  data.site.tagline        = document.getElementById("setting-tagline").value.trim();
  data.site.dates          = document.getElementById("setting-dates").value.trim();
  data.site.totalPrizePool = document.getElementById("setting-prizepool").value.trim();
  data.site.heroHeadline   = document.getElementById("setting-headline").value.trim();
  data.site.heroSubtitle   = document.getElementById("setting-subtitle").value.trim();

  const tickerRaw = document.getElementById("setting-ticker").value.trim();
  data.site.tickerText = tickerRaw.split(",").map(s => s.trim()).filter(Boolean);

  window.TECHNEXA_CMS.saveData(data);
  showAdminToast("⚙️ General Settings Saved!");
}

function saveScheduleSettings() {
  const data = window.TECHNEXA_CMS.getData();
  data.schedule.isTBA      = document.getElementById("schedule-tba-toggle").value === "true";
  data.schedule.tbaMessage = document.getElementById("schedule-tba-msg").value.trim();

  window.TECHNEXA_CMS.saveData(data);
  showAdminToast("🗓️ Schedule Settings Saved!");
}

function saveAllAdminChanges() {
  saveGeneralSettings();
  saveScheduleSettings();
  showAdminToast("✨ All Admin Changes Saved & Live Site Updated!");
}

/* ── Events Management ─────────────────────────────────────── */
function renderAdminEventsList(events) {
  const listEl = document.getElementById("admin-events-list");
  if (!listEl) return;

  listEl.innerHTML = events.map((ev, index) => `
    <div class="admin-card" style="position:relative;margin-bottom:0;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem;">
        <div>
          <span style="font-size:0.725rem;background:rgba(124,58,237,0.25);color:var(--secondary);padding:3px 8px;border-radius:6px;font-weight:700;margin-bottom:0.5rem;display:inline-block;">${ev.category}</span>
          <h4 style="font-size:1.15rem;font-weight:700;margin:0;">${ev.icon || "🏆"} ${ev.title}</h4>
        </div>
        <button onclick="deleteEventItem(${index})" style="background:rgba(255,77,141,0.2);color:var(--pink);border:none;padding:5px 10px;border-radius:8px;font-size:0.8rem;cursor:pointer;">🗑️ Delete</button>
      </div>
      <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:1rem;">${ev.desc}</p>
      <div class="grid-2 gap-2" style="font-size:0.8rem;color:var(--text-dim);">
        <div>📅 Date: ${ev.date}</div>
        <div>🏆 Prize: ${ev.prize}</div>
        <div>⏱ Duration: ${ev.duration}</div>
        <div>👥 Team: ${ev.teamSize}</div>
      </div>
    </div>
  `).join("");
}

function handleSaveEventForm(e) {
  e.preventDefault();
  const data = window.TECHNEXA_CMS.getData();
  const title    = document.getElementById("event-form-title").value.trim();
  const category = document.getElementById("event-form-category").value.trim();
  const prize    = document.getElementById("event-form-prize").value.trim();
  const date     = document.getElementById("event-form-date").value.trim();
  const venue    = document.getElementById("event-form-venue").value.trim();
  const teamSize = document.getElementById("event-form-teamsize").value.trim();
  const icon     = document.getElementById("event-form-icon").value.trim();
  const desc     = document.getElementById("event-form-desc").value.trim();

  data.events.push({
    id: "event-" + Date.now(),
    title, category, prize, date, venue, teamSize, icon, desc,
    duration: "Full Day",
    featured: true,
    url: "events.html"
  });

  window.TECHNEXA_CMS.saveData(data);
  renderAdminEventsList(data.events);
  closeModal("modal-event");
  e.target.reset();
  showAdminToast("🏆 New Event Added Successfully!");
}

function deleteEventItem(index) {
  if (confirm("Are you sure you want to delete this event?")) {
    const data = window.TECHNEXA_CMS.getData();
    data.events.splice(index, 1);
    window.TECHNEXA_CMS.saveData(data);
    renderAdminEventsList(data.events);
    showAdminToast("🗑️ Event Deleted!");
  }
}

/* ── Team Members Management ───────────────────────────────── */
function renderAdminTeamList(team) {
  const listEl = document.getElementById("admin-team-list");
  if (!listEl) return;

  listEl.innerHTML = team.map((mem, index) => `
    <div class="admin-card" style="padding:1.25rem;text-align:center;margin-bottom:0;">
      <div style="width:70px;height:70px;margin:0 auto 0.75rem;border-radius:50%;overflow:hidden;border:2px solid var(--accent);background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;">
        ${mem.img ? `<img src="${mem.img}" alt="${mem.name}" style="width:100%;height:100%;object-fit:cover;" />` : `<span style="font-size:2rem;">${mem.icon || "👤"}</span>`}
      </div>
      <h4 style="font-weight:700;font-size:1rem;margin:0;">${mem.name}</h4>
      <p style="color:var(--accent);font-size:0.775rem;font-weight:600;margin-top:2px;margin-bottom:0.4rem;">${mem.role}</p>
      ${mem.linkedin ? `<a href="${mem.linkedin}" target="_blank" style="color:#0a66c2;font-size:0.775rem;text-decoration:none;"><i class="ph ph-linkedin-logo"></i> Profile</a>` : ''}
      <div style="margin-top:0.75rem;">
        <button onclick="deleteTeamMember(${index})" style="background:rgba(255,77,141,0.2);color:var(--pink);border:none;padding:4px 10px;border-radius:8px;font-size:0.75rem;cursor:pointer;">Delete</button>
      </div>
    </div>
  `).join("");
}

function handleSaveTeamForm(e) {
  e.preventDefault();
  const data = window.TECHNEXA_CMS.getData();
  const name     = document.getElementById("team-form-name").value.trim();
  const role     = document.getElementById("team-form-role").value.trim();
  const category = document.getElementById("team-form-category").value;
  const img      = document.getElementById("team-form-img").value.trim();
  const linkedin = document.getElementById("team-form-linkedin").value.trim();

  data.team.push({
    id: Date.now(),
    name, role, category, img, linkedin,
    icon: "👤"
  });

  window.TECHNEXA_CMS.saveData(data);
  renderAdminTeamList(data.team);
  closeModal("modal-team");
  e.target.reset();
  showAdminToast("👤 New Team Member Added!");
}

function deleteTeamMember(index) {
  if (confirm("Delete this team member?")) {
    const data = window.TECHNEXA_CMS.getData();
    data.team.splice(index, 1);
    window.TECHNEXA_CMS.saveData(data);
    renderAdminTeamList(data.team);
    showAdminToast("👤 Member Removed!");
  }
}

/* ── Sponsors Management ───────────────────────────────────── */
function renderAdminSponsorsList(sponsors) {
  const listEl = document.getElementById("admin-sponsors-list");
  if (!listEl) return;

  listEl.innerHTML = `
    <div class="table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Tier</th>
            <th>Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${sponsors.map((sp, index) => `
            <tr>
              <td><span style="font-size:1.5rem;">${sp.logo || "🤝"}</span></td>
              <td><strong>${sp.name}</strong></td>
              <td><span style="color:var(--accent);font-weight:600;">${sp.tier} Partner</span></td>
              <td><a href="${sp.link}" target="_blank" style="color:var(--text-muted);">${sp.link}</a></td>
              <td><button onclick="deleteSponsor(${index})" style="background:rgba(255,77,141,0.2);color:var(--pink);border:none;padding:4px 10px;border-radius:6px;font-size:0.75rem;cursor:pointer;">Delete</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function handleSaveSponsorForm(e) {
  e.preventDefault();
  const data = window.TECHNEXA_CMS.getData();
  const name = document.getElementById("sponsor-form-name").value.trim();
  const tier = document.getElementById("sponsor-form-tier").value.trim();
  const logo = document.getElementById("sponsor-form-logo").value.trim();
  const link = document.getElementById("sponsor-form-link").value.trim();

  data.sponsors.push({ name, tier, logo, link });
  window.TECHNEXA_CMS.saveData(data);
  renderAdminSponsorsList(data.sponsors);
  closeModal("modal-sponsor");
  e.target.reset();
  showAdminToast("🤝 Sponsor Added!");
}

function deleteSponsor(index) {
  if (confirm("Delete sponsor?")) {
    const data = window.TECHNEXA_CMS.getData();
    data.sponsors.splice(index, 1);
    window.TECHNEXA_CMS.saveData(data);
    renderAdminSponsorsList(data.sponsors);
    showAdminToast("🤝 Sponsor Removed!");
  }
}

/* ── Registrations Management & Search ─────────────────────── */
function renderAdminRegistrationsTable(registrations) {
  const tbody = document.getElementById("admin-registrations-tbody");
  if (!tbody) return;

  if (registrations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:2rem;">No participant registrations found yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = registrations.map((reg, index) => `
    <tr>
      <td><code>${reg.id}</code></td>
      <td><strong>${reg.name}</strong></td>
      <td>${reg.email}</td>
      <td>${reg.phone}</td>
      <td><span style="color:var(--accent);">${reg.event}</span></td>
      <td>${reg.college}</td>
      <td>${reg.date}</td>
      <td>
        <button onclick="deleteRegistration(${index})" style="background:rgba(255,77,141,0.2);color:var(--pink);border:none;padding:4px 10px;border-radius:6px;font-size:0.75rem;cursor:pointer;">Delete</button>
      </td>
    </tr>
  `).join("");
}

function filterRegistrationsTable() {
  const query = document.getElementById("reg-search-input").value.toLowerCase();
  const data = window.TECHNEXA_CMS.getData();
  const filtered = (data.registrations || []).filter(reg => 
    reg.name.toLowerCase().includes(query) ||
    reg.email.toLowerCase().includes(query) ||
    reg.phone.toLowerCase().includes(query) ||
    reg.event.toLowerCase().includes(query) ||
    reg.college.toLowerCase().includes(query)
  );
  renderAdminRegistrationsTable(filtered);
}

function handleSaveRegistrationForm(e) {
  e.preventDefault();
  const data = window.TECHNEXA_CMS.getData();
  const name    = document.getElementById("reg-form-name").value.trim();
  const email   = document.getElementById("reg-form-email").value.trim();
  const phone   = document.getElementById("reg-form-phone").value.trim();
  const event   = document.getElementById("reg-form-event").value.trim();
  const college = document.getElementById("reg-form-college").value.trim();
  const today   = new Date().toISOString().split('T')[0];

  if (!data.registrations) data.registrations = [];

  data.registrations.unshift({
    id: "REG-" + (Math.floor(100 + Math.random() * 900)),
    name, email, phone, event, college, date: today
  });

  window.TECHNEXA_CMS.saveData(data);
  renderAdminRegistrationsTable(data.registrations);
  closeModal("modal-registration");
  e.target.reset();
  showAdminToast("📝 Manual Participant Entry Added!");
}

function deleteRegistration(index) {
  if (confirm("Delete this participant registration?")) {
    const data = window.TECHNEXA_CMS.getData();
    data.registrations.splice(index, 1);
    window.TECHNEXA_CMS.saveData(data);
    renderAdminRegistrationsTable(data.registrations);
    showAdminToast("🗑️ Registration Deleted!");
  }
}

function clearAllRegistrations() {
  if (confirm("⚠️ Are you sure you want to clear ALL participant registrations? This action cannot be undone.")) {
    const data = window.TECHNEXA_CMS.getData();
    data.registrations = [];
    window.TECHNEXA_CMS.saveData(data);
    renderAdminRegistrationsTable([]);
    showAdminToast("🗑️ All Registrations Cleared!");
  }
}

function exportRegistrationsCSV() {
  const data = window.TECHNEXA_CMS.getData();
  const regs = data.registrations || [];
  if (regs.length === 0) {
    alert("No registrations available to export!");
    return;
  }
  let csv = "ID,Name,Email,Phone,Event,College,Date\n";
  regs.forEach(r => {
    csv += `"${r.id}","${r.name}","${r.email}","${r.phone}","${r.event}","${r.college}","${r.date}"\n`;
  });

  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "technexa_registrations.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/* ── FAQ Management ────────────────────────────────────────── */
function renderAdminFAQsList(faqs) {
  const listEl = document.getElementById("admin-faqs-list");
  if (!listEl) return;

  listEl.innerHTML = faqs.map((faq, index) => `
    <div class="admin-card" style="padding:1.25rem;margin-bottom:1rem;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <h4 style="font-size:0.975rem;font-weight:700;color:var(--accent);margin:0;">❓ ${faq.q}</h4>
        <button onclick="deleteFAQ(${index})" style="background:rgba(255,77,141,0.2);color:var(--pink);border:none;padding:4px 10px;border-radius:6px;font-size:0.75rem;cursor:pointer;">Delete</button>
      </div>
      <p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.5rem;margin-bottom:0;">${faq.a}</p>
    </div>
  `).join("");
}

function handleSaveFAQForm(e) {
  e.preventDefault();
  const data = window.TECHNEXA_CMS.getData();
  const q = document.getElementById("faq-form-q").value.trim();
  const a = document.getElementById("faq-form-a").value.trim();

  data.faqs.push({ q, a });
  window.TECHNEXA_CMS.saveData(data);
  renderAdminFAQsList(data.faqs);
  closeModal("modal-faq");
  e.target.reset();
  showAdminToast("❓ New FAQ Added!");
}

function deleteFAQ(index) {
  if (confirm("Delete FAQ item?")) {
    const data = window.TECHNEXA_CMS.getData();
    data.faqs.splice(index, 1);
    window.TECHNEXA_CMS.saveData(data);
    renderAdminFAQsList(data.faqs);
    showAdminToast("❓ FAQ Removed!");
  }
}

/* ── JSON Export / Import Engine ────────────────────────────── */
function exportCMSJSON() {
  window.TECHNEXA_CMS.exportJSON();
  showAdminToast("💾 Database Exported as JSON!");
}

function importCMSJSONFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const jsonStr = event.target.result;
    const success = window.TECHNEXA_CMS.importJSON(jsonStr);
    if (success) {
      initAdminDashboard();
      showAdminToast("📥 Database Imported & Live Site Updated!");
    } else {
      alert("Invalid JSON Database File!");
    }
  };
  reader.readAsText(file);
}
