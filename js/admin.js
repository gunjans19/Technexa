/* ============================================================
   TECHNEXA — Admin Dashboard Interactive Logic Engine
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initAdminDashboard();
});

function initAdminDashboard() {
  const data = window.TECHNEXA_CMS.getData();

  // Populate Overview Stats
  document.getElementById("dash-events-count").textContent = data.events.length;
  document.getElementById("dash-prize-pool").textContent = data.site.totalPrizePool;
  document.getElementById("dash-regs-count").textContent = data.registrations ? data.registrations.length : 0;
  document.getElementById("dash-dates").textContent = data.site.dates;

  // Populate General Settings Tab
  document.getElementById("setting-name").value = data.site.name || "";
  document.getElementById("setting-tagline").value = data.site.tagline || "";
  document.getElementById("setting-dates").value = data.site.dates || "";
  document.getElementById("setting-prizepool").value = data.site.totalPrizePool || "";
  document.getElementById("setting-headline").value = data.site.heroHeadline || "";
  document.getElementById("setting-subtitle").value = data.site.heroSubtitle || "";
  document.getElementById("setting-ticker").value = (data.site.tickerText || []).join(", ");

  // Populate Schedule Tab
  document.getElementById("schedule-tba-toggle").value = data.schedule.isTBA ? "true" : "false";
  document.getElementById("schedule-tba-msg").value = data.schedule.tbaMessage || "";

  // Render Lists
  renderAdminEventsList(data.events);
  renderAdminTeamList(data.team);
  renderAdminSponsorsList(data.sponsors);
  renderAdminRegistrationsTable(data.registrations || []);
  renderAdminFAQsList(data.faqs);
}

/* ── Tab Switching ─────────────────────────────────────────── */
function switchAdminTab(tabId, btnEl) {
  document.querySelectorAll(".admin-tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".admin-nav-btn").forEach(btn => btn.classList.remove("active"));

  const targetTab = document.getElementById("tab-" + tabId);
  if (targetTab) {
    targetTab.classList.add("active");
  }
  if (btnEl) {
    btnEl.classList.add("active");
  }

  const titleEl = document.getElementById("current-tab-title");
  if (titleEl && btnEl) {
    titleEl.textContent = btnEl.textContent;
  }
}

/* ── Toast Notification ────────────────────────────────────── */
function showAdminToast(msg) {
  const toast = document.getElementById("admin-toast");
  if (toast) {
    toast.textContent = msg || "✨ Changes saved successfully!";
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}

/* ── Save Settings ─────────────────────────────────────────── */
function saveGeneralSettings() {
  const data = window.TECHNEXA_CMS.getData();
  data.site.name = document.getElementById("setting-name").value.trim();
  data.site.tagline = document.getElementById("setting-tagline").value.trim();
  data.site.dates = document.getElementById("setting-dates").value.trim();
  data.site.totalPrizePool = document.getElementById("setting-prizepool").value.trim();
  data.site.heroHeadline = document.getElementById("setting-headline").value.trim();
  data.site.heroSubtitle = document.getElementById("setting-subtitle").value.trim();

  const tickerRaw = document.getElementById("setting-ticker").value.trim();
  data.site.tickerText = tickerRaw.split(",").map(s => s.trim()).filter(Boolean);

  window.TECHNEXA_CMS.saveData(data);
  showAdminToast("⚙️ General Settings Saved!");
}

function saveScheduleSettings() {
  const data = window.TECHNEXA_CMS.getData();
  data.schedule.isTBA = document.getElementById("schedule-tba-toggle").value === "true";
  data.schedule.tbaMessage = document.getElementById("schedule-tba-msg").value.trim();

  window.TECHNEXA_CMS.saveData(data);
  showAdminToast("🗓️ Schedule Settings Saved!");
}

function saveAllAdminChanges() {
  saveGeneralSettings();
  saveScheduleSettings();
  showAdminToast("✨ All Admin Changes Saved & Live Site Updated!");
}

/* ── Events Rendering & CRUD ───────────────────────────────── */
function renderAdminEventsList(events) {
  const listEl = document.getElementById("admin-events-list");
  if (!listEl) return;

  listEl.innerHTML = events.map((ev, index) => `
    <div class="admin-card" style="position:relative;margin-bottom:0;">
      <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.75rem;">
        <div>
          <span class="tag tag-purple" style="margin-bottom:0.5rem;display:inline-block;">${ev.category}</span>
          <h4 style="font-size:1.2rem;font-weight:700;margin:0;">${ev.icon || "🏆"} ${ev.title}</h4>
        </div>
        <button onclick="deleteEventItem(${index})" class="btn btn-sm" style="background:rgba(255,77,141,0.2);color:var(--pink);border:none;padding:4px 10px;border-radius:8px;">🗑️ Delete</button>
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

function deleteEventItem(index) {
  if (confirm("Are you sure you want to delete this event?")) {
    const data = window.TECHNEXA_CMS.getData();
    data.events.splice(index, 1);
    window.TECHNEXA_CMS.saveData(data);
    renderAdminEventsList(data.events);
    showAdminToast("🗑️ Event Deleted!");
  }
}

function openAddEventModal() {
  const title = prompt("Enter Event Title (e.g., AI Prompt Clash):");
  if (!title) return;
  const category = prompt("Enter Category (e.g., Day 1 • Coding):", "Day 1 • Tech");
  const prize = prompt("Enter Prize Pool (e.g., Rs 15,000):", "Rs 15,000");

  const data = window.TECHNEXA_CMS.getData();
  data.events.push({
    id: "event-" + Date.now(),
    title: title,
    category: category || "Competition",
    badgeColor: "purple",
    icon: "⚡",
    desc: "Newly added official contest for TECHNEXA 2026.",
    duration: "2 Hours",
    date: "Sept 11, 2026",
    venue: "Lab 3",
    prize: prize || "Certificates & Trophies",
    teamSize: "1–2 Members",
    featured: true,
    url: "events.html"
  });

  window.TECHNEXA_CMS.saveData(data);
  renderAdminEventsList(data.events);
  showAdminToast("🏆 New Event Added!");
}

/* ── Team Rendering & CRUD ─────────────────────────────────── */
function renderAdminTeamList(team) {
  const listEl = document.getElementById("admin-team-list");
  if (!listEl) return;

  listEl.innerHTML = team.map((mem, index) => `
    <div class="admin-card" style="padding:1.5rem;text-align:center;margin-bottom:0;">
      <div style="font-size:2.5rem;margin-bottom:0.5rem;">${mem.icon || "👤"}</div>
      <h4 style="font-weight:700;font-size:1.05rem;">${mem.name}</h4>
      <p style="color:var(--accent);font-size:0.8rem;font-weight:600;margin-bottom:0.5rem;">${mem.role}</p>
      <p style="color:var(--text-muted);font-size:0.75rem;">${mem.bio || ""}</p>
      <button onclick="deleteTeamMember(${index})" style="margin-top:1rem;background:rgba(255,77,141,0.2);color:var(--pink);border:none;padding:4px 10px;border-radius:8px;font-size:0.75rem;cursor:pointer;">Delete</button>
    </div>
  `).join("");
}

function deleteTeamMember(index) {
  if (confirm("Delete team member?")) {
    const data = window.TECHNEXA_CMS.getData();
    data.team.splice(index, 1);
    window.TECHNEXA_CMS.saveData(data);
    renderAdminTeamList(data.team);
    showAdminToast("👤 Member Removed!");
  }
}

function openAddTeamModal() {
  const name = prompt("Enter Member Name:");
  if (!name) return;
  const role = prompt("Enter Role (e.g. Lead Organiser, Domain Head):");

  const data = window.TECHNEXA_CMS.getData();
  data.team.push({
    id: Date.now(),
    name: name,
    role: role || "Organiser",
    category: "Organiser",
    bio: "Core organiser for TECHNEXA 2026.",
    icon: "🚀"
  });

  window.TECHNEXA_CMS.saveData(data);
  renderAdminTeamList(data.team);
  showAdminToast("👥 Team Member Added!");
}

/* ── Sponsors Rendering ────────────────────────────────────── */
function renderAdminSponsorsList(sponsors) {
  const listEl = document.getElementById("admin-sponsors-list");
  if (!listEl) return;

  listEl.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Logo</th>
          <th>Sponsor Name</th>
          <th>Tier</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${sponsors.map((sp, idx) => `
          <tr>
            <td style="font-size:1.5rem;">${sp.logo}</td>
            <td style="font-weight:700;">${sp.name}</td>
            <td><span class="tag tag-purple">${sp.tier}</span></td>
            <td><button onclick="deleteSponsor(${idx})" style="background:rgba(255,77,141,0.2);color:var(--pink);border:none;padding:4px 10px;border-radius:8px;cursor:pointer;">Delete</button></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function deleteSponsor(idx) {
  const data = window.TECHNEXA_CMS.getData();
  data.sponsors.splice(idx, 1);
  window.TECHNEXA_CMS.saveData(data);
  renderAdminSponsorsList(data.sponsors);
  showAdminToast("🤝 Sponsor Deleted!");
}

/* ── Registrations Table & CSV Export ──────────────────────── */
function renderAdminRegistrationsTable(regs) {
  const tbody = document.getElementById("admin-registrations-tbody");
  if (!tbody) return;

  if (regs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);">No registrations yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = regs.map(r => `
    <tr>
      <td style="font-family:monospace;color:var(--accent);">${r.id}</td>
      <td style="font-weight:700;">${r.name}</td>
      <td>${r.email}</td>
      <td>${r.phone}</td>
      <td><span class="tag tag-blue">${r.event}</span></td>
      <td>${r.college}</td>
      <td style="color:var(--text-dim);">${r.date}</td>
    </tr>
  `).join("");
}

function exportRegistrationsCSV() {
  const data = window.TECHNEXA_CMS.getData();
  const regs = data.registrations || [];
  if (regs.length === 0) {
    alert("No registrations available to export.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,ID,Name,Email,Phone,Event,College,Date\n";
  regs.forEach(r => {
    csvContent += `"${r.id}","${r.name}","${r.email}","${r.phone}","${r.event}","${r.college}","${r.date}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "technexa_registrations.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/* ── FAQ Manager ───────────────────────────────────────────── */
function renderAdminFAQsList(faqs) {
  const listEl = document.getElementById("admin-faqs-list");
  if (!listEl) return;

  listEl.innerHTML = faqs.map((f, idx) => `
    <div class="admin-card" style="padding:1.25rem;margin-bottom:1rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <h4 style="font-size:0.95rem;font-weight:700;color:var(--accent);">Q: ${f.q}</h4>
        <button onclick="deleteFAQ(${idx})" style="background:rgba(255,77,141,0.2);color:var(--pink);border:none;padding:4px 10px;border-radius:8px;cursor:pointer;font-size:0.75rem;">Delete</button>
      </div>
      <p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.5rem;">A: ${f.a}</p>
    </div>
  `).join("");
}

function deleteFAQ(idx) {
  const data = window.TECHNEXA_CMS.getData();
  data.faqs.splice(idx, 1);
  window.TECHNEXA_CMS.saveData(data);
  renderAdminFAQsList(data.faqs);
  showAdminToast("❓ FAQ Deleted!");
}

function resetCMSData() {
  if (confirm("Reset all site data back to initial defaults?")) {
    window.TECHNEXA_CMS.resetData();
    initAdminDashboard();
    showAdminToast("🔄 Site Reset to Defaults!");
  }
}

function exportCMSJSON() {
  window.TECHNEXA_CMS.exportJSON();
}
