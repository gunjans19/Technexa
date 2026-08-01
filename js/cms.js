/* ============================================================
   TECHNEXA — Central CMS & Data Synchronization Engine
   ============================================================ */

const DEFAULT_TECHNEXA_DATA = {
  site: {
    name: "TECHNEXA 2026",
    tagline: "CODE • COMPETE • CONNECT",
    dates: "September 11 & 12, 2026",
    heroHeadline: "Where Innovation Meets Ambition",
    heroSubtitle: "2 Days of high-stakes technology, robotics racing, GenAI masterclass, 24H hackathon sprint, and Free Fire LAN esports.",
    totalPrizePool: "Rs 1.5L+",
    participantCount: "1000+",
    collegeCount: "50+",
    tickerText: [
      "🏆 Rs 1,50,000+ Total Prize Pool",
      "💻 Hackathon — 24H Build Sprint",
      "🏎️ Robo Race Championship",
      "🧠 GenAI Workshop Masterclass",
      "🎮 LAN Event of Free Fire Esports"
    ]
  },

  events: [
    {
      id: "genai-workshop",
      title: "GenAI Workshop",
      category: "Day 1 • Workshop",
      badgeColor: "purple",
      icon: "🧠",
      desc: "Hands-on Generative AI & LLM masterclass. Build custom AI Agents, RAG pipelines, and fine-tune models.",
      duration: "4 Hours",
      date: "Sept 11, 2026",
      venue: "Main Seminar Hall",
      prize: "Certificates Included",
      teamSize: "Individual",
      featured: true,
      url: "events/genai-workshop.html"
    },
    {
      id: "roborace",
      title: "Robo Race",
      category: "Day 2 • Robotics",
      badgeColor: "green",
      icon: "🏎️",
      desc: "High-speed RC & wireless robotics racing championship across an intense multi-terrain obstacle track.",
      duration: "Half Day",
      date: "Sept 12, 2026",
      venue: "Outdoor Robotics Arena",
      prize: "Rs 30,000 Prize Pool",
      teamSize: "2–4 Members",
      featured: true,
      url: "events/roborace.html"
    },
    {
      id: "hackathon",
      title: "Hackathon — 24H Build Sprint",
      category: "Flagship",
      badgeColor: "blue",
      icon: "💻",
      desc: "Non-stop 24-hour hackathon. Build innovative software/hardware solutions and pitch to tech leaders.",
      duration: "24 Hours",
      date: "Sept 11–12, 2026",
      venue: "Innovation Hub",
      prize: "Rs 50,000 Prize Pool",
      teamSize: "2–4 Members",
      featured: true,
      url: "events/hackathon.html"
    },
    {
      id: "freefire",
      title: "LAN Event — Free Fire",
      category: "Day 2 • Esports",
      badgeColor: "pink",
      icon: "🎮",
      desc: "High-octane mobile battle royale esports tournament live on LAN stage with custom lobbies and shoutcasting.",
      duration: "Live LAN",
      date: "Sept 12, 2026",
      venue: "Auditorium Gaming Arena",
      prize: "Rs 20,000 Prize Pool",
      teamSize: "Squad (4 Players)",
      featured: true,
      url: "events/freefire.html"
    }
  ],

  schedule: {
    isTBA: true,
    tbaMessage: "The complete minute-by-minute session timeline, track venues, and speaker slots for September 11 & 12, 2026 will be revealed shortly!",
    days: [
      {
        dayNumber: 1,
        date: "Sept 11, 2026",
        title: "GenAI Masterclass & Hackathon Launch",
        desc: "Opening Ceremony, Hands-on GenAI Workshop, and 24H Hackathon Sprint kick-off."
      },
      {
        dayNumber: 2,
        date: "Sept 12, 2026",
        title: "Robo Race, Free Fire LAN & Grand Finals",
        desc: "Obstacle Robo Race, Free Fire Mobile LAN Esports Finals, Hackathon Pitches & Prize Distribution."
      }
    ]
  },

  team: [
    {
      id: 1,
      name: "Arnav Sharma",
      role: "Lead Organiser",
      category: "Organiser",
      bio: "Overall Tech Fest Convenor & Platform Architecture.",
      icon: "⚡"
    },
    {
      id: 2,
      name: "Riya Verma",
      role: "Co-Organiser",
      category: "Organiser",
      bio: "Operations, Sponsorship & Public Relations.",
      icon: "🚀"
    },
    {
      id: 3,
      name: "Karan Patel",
      role: "Technical Lead",
      category: "Organiser",
      bio: "Hackathon & Speed Coding Platform Management.",
      icon: "🎯"
    },
    {
      id: 4,
      name: "Rohan Mehta",
      role: "Robotics Domain Head",
      category: "Domain Lead",
      bio: "Managing Robo Race track logistics & judging.",
      icon: "🤖"
    },
    {
      id: 5,
      name: "Ananya Roy",
      role: "GenAI Masterclass Head",
      category: "Domain Lead",
      bio: "Managing LLM labs & workshop curriculum.",
      icon: "🧠"
    },
    {
      id: 6,
      name: "Vikram Singh",
      role: "Esports Domain Head",
      category: "Domain Lead",
      bio: "Managing Free Fire LAN tournaments & shoutcasting.",
      icon: "🎮"
    },
    {
      id: 7,
      name: "Sneha Gupta",
      role: "Design & Media Head",
      category: "Domain Lead",
      bio: "Branding, UI/UX aesthetics, and media coverage.",
      icon: "🎨"
    }
  ],

  sponsors: [
    { name: "Google Cloud", tier: "Title", logo: "☁️", link: "https://cloud.google.com" },
    { name: "GitHub", tier: "Gold", logo: "🐙", link: "https://github.com" },
    { name: "Vercel", tier: "Gold", logo: "▲", link: "https://vercel.com" },
    { name: "OpenAI", tier: "Silver", logo: "🧠", link: "https://openai.com" }
  ],

  faqs: [
    {
      q: "When and where is TECHNEXA 2026 taking place?",
      a: "TECHNEXA 2026 takes place on September 11 & 12, 2026 at the college campus grounds and computer labs."
    },
    {
      q: "Who can participate in TECHNEXA 2026?",
      a: "Students from any recognized college or university (undergraduate & postgraduate) can register and participate!"
    },
    {
      q: "Is there a registration fee?",
      a: "Entry and workshop participation is free for all registered students!"
    },
    {
      q: "How will cash prize pools be distributed?",
      a: "Winners and runners-up across all 4 major competitions receive official trophies, cash prize transfers, and merit certificates during the Day 2 Grand Finale."
    }
  ],

  registrations: [
    {
      id: "REG-101",
      name: "Rahul Sharma",
      email: "rahul.s@gmail.com",
      phone: "+91 9876543210",
      event: "GenAI Workshop",
      college: "IIT Bombay",
      date: "2026-07-28"
    },
    {
      id: "REG-102",
      name: "Priya Patel",
      email: "priya.p@tech.edu",
      phone: "+91 9812345678",
      event: "Hackathon — 24H Build Sprint",
      college: "BITS Pilani",
      date: "2026-07-28"
    }
  ]
};

window.TECHNEXA_CMS = {
  STORAGE_KEY: "technexa_cms_db",

  getData() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("CMS: Failed to parse localStorage data, using defaults.", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_TECHNEXA_DATA));
  },

  saveData(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      this.syncDOM(data);
      return true;
    } catch (e) {
      console.error("CMS: Save failed.", e);
      return false;
    }
  },

  resetData() {
    localStorage.removeItem(this.STORAGE_KEY);
    const data = JSON.parse(JSON.stringify(DEFAULT_TECHNEXA_DATA));
    this.syncDOM(data);
    return data;
  },

  exportJSON() {
    const data = this.getData();
    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", str);
    a.setAttribute("download", "technexa_database.json");
    document.body.appendChild(a);
    a.click();
    a.remove();
  },

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.site && parsed.events) {
        this.saveData(parsed);
        return true;
      }
    } catch (e) {
      console.error("CMS: Invalid JSON string.", e);
    }
    return false;
  },

  syncDOM(data) {
    const d = data || this.getData();

    // 1. Sync Dates
    document.querySelectorAll(".cms-dates, .badge-tag").forEach(el => {
      if (el.classList.contains("badge-tag")) {
        el.innerHTML = `<span class="dot"></span> ${d.site.name} &bull; ${d.site.dates}`;
      } else {
        el.textContent = d.site.dates;
      }
    });

    // 2. Sync Prize Pool
    document.querySelectorAll(".cms-prize-pool").forEach(el => {
      el.textContent = d.site.totalPrizePool;
    });

    // 3. Sync Hero Headline & Subtitle
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle && d.site.heroHeadline) {
      // Keep styling structure if available
    }

    // 4. Sync Ticker
    const tickerContainer = document.querySelector(".cms-ticker");
    if (tickerContainer && d.site.tickerText) {
      tickerContainer.innerHTML = d.site.tickerText.map(txt => 
        `<span style="font-size:0.875rem;font-weight:700;color:var(--accent);margin-right:2.5rem;">${txt}</span>`
      ).join("");
    }
  },

  init() {
    const data = this.getData();
    this.syncDOM(data);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.TECHNEXA_CMS.init();
});
