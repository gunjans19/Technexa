schedule_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Schedule | TECHNEXA 2026</title>
  <meta name="description" content="TECHNEXA 2026 Event Schedule — To Be Announced Soon." />
  <link rel="stylesheet" href="css/styles.css" />
  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js" defer></script>
</head>
<body>

  <div id="loading-screen">
    <div style="text-align:center;">
      <img src="assets/techie.png" alt="Techie Mascot" style="width:100px;height:auto;filter:drop-shadow(0 10px 25px rgba(168,85,247,0.5));" />
      <div style="margin-top:1rem;"><img src="assets/logo.png" alt="TECHNEXA" style="max-height:40px;" /></div>
    </div>
    <div class="loading-bar-wrap" style="margin-top:1.5rem;"><div class="loading-bar"></div></div>
    <div class="loading-text">Loading Schedule...</div>
  </div>

  <div class="cursor-dot" id="cursor-dot"></div>
  <div class="cursor-ring" id="cursor-ring"></div>
  <canvas id="particle-canvas"></canvas>

  <div class="navbar-wrap">
    <nav class="navbar">
      <a href="index.html" class="nav-logo">
        <img src="assets/logo.png" alt="TECHNEXA Logo" />
      </a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="schedule.html" class="active">Schedule</a></li>
        <li><a href="team.html">Organising Team</a></li>
        <li><a href="sponsors.html">Sponsors</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <div class="nav-cta"><a href="events.html" class="btn btn-primary btn-sm btn-ripple">Register Now</a></div>
      <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
    </nav>
  </div>

  <div class="mobile-nav" id="mobile-nav">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="events.html">Events</a>
    <a href="schedule.html">Schedule</a>
    <a href="team.html">Organising Team</a>
    <a href="sponsors.html">Sponsors</a>
    <a href="faq.html">FAQ</a>
    <a href="contact.html">Contact</a>
  </div>

  <div class="page-content">

    <section class="page-hero">
      <div class="grid-bg"></div>
      <div class="glow-orb glow-orb-1"></div>
      <div class="container text-center">
        <div class="breadcrumb justify-center"><a href="index.html">Home</a><span>&rsaquo;</span><span>Schedule</span></div>
        <div class="section-label" style="display:inline-flex;"><span class="dot"></span> September 11 &amp; 12, 2026</div>
        <h1 class="page-hero-title">Event <span class="gradient-text">Schedule</span></h1>
        <p class="page-hero-subtitle">2 Days of non-stop tech innovation, robotics racing, GenAI bootcamp, and LAN esports.</p>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section">
      <div class="container" style="max-width:900px;">
        
        <div class="glass-card card-3d reveal text-center" style="padding:4rem 2.5rem;border:1.5px solid rgba(0,245,255,0.4);background:linear-gradient(135deg,rgba(124,58,237,0.2),rgba(0,245,255,0.1));box-shadow:0 25px 60px rgba(0,0,0,0.6);">
          <div style="font-size:4rem;margin-bottom:1rem;">🗓️</div>
          <div class="section-label" style="display:inline-flex;margin-bottom:0.75rem;"><span class="dot"></span> Official Timeline</div>
          <h2 class="section-title" style="font-size:clamp(2rem, 4vw, 2.8rem);">Detailed Timeline <br /><span class="gradient-text">To Be Announced Soon 🚀</span></h2>
          <p style="color:var(--text-muted);max-width:600px;margin:1rem auto 2.5rem;line-height:1.7;font-size:1.05rem;">
            The complete minute-by-minute session timeline, track venues, and speaker slots for September 11 &amp; 12, 2026 will be revealed shortly!
          </p>

          <div class="grid-2 gap-6 mt-6" style="gap:1.5rem;text-align:left;">
            <div class="glass-card card-3d" style="padding:1.75rem;border-left:4px solid var(--accent);">
              <span class="tag tag-cyan" style="margin-bottom:0.75rem;display:inline-block;">Day 1 &bull; Sept 11, 2026</span>
              <h4 style="font-family:var(--font-head);font-size:1.2rem;font-weight:700;margin-bottom:0.5rem;">GenAI Masterclass &amp; Hackathon Launch</h4>
              <p style="color:var(--text-muted);font-size:0.85rem;margin:0;">Opening Ceremony, Hands-on GenAI Workshop, and 24H Hackathon Sprint kick-off.</p>
              <div style="margin-top:1rem;font-size:0.8rem;color:var(--accent);font-weight:700;">🕒 Detailed Timings: Reveal Soon</div>
            </div>

            <div class="glass-card card-3d" style="padding:1.75rem;border-left:4px solid var(--secondary);">
              <span class="tag tag-purple" style="margin-bottom:0.75rem;display:inline-block;">Day 2 &bull; Sept 12, 2026</span>
              <h4 style="font-family:var(--font-head);font-size:1.2rem;font-weight:700;margin-bottom:0.5rem;">Robo Race, Free Fire LAN &amp; Grand Finals</h4>
              <p style="color:var(--text-muted);font-size:0.85rem;margin:0;">Obstacle Robo Race, Free Fire Mobile LAN Esports Finals, Hackathon Pitches &amp; Prize Distribution.</p>
              <div style="margin-top:1rem;font-size:0.8rem;color:var(--secondary);font-weight:700;">🕒 Detailed Timings: Reveal Soon</div>
            </div>
          </div>

          <div style="margin-top:2.5rem;">
            <a href="events.html" class="btn btn-primary btn-lg btn-ripple btn-3d">
              <span>Explore Official 4 Events &rarr;</span>
            </a>
          </div>

        </div>

      </div>
    </section>

  </div>

  <footer>
    <div class="container">
      <div class="footer-grid" style="grid-template-columns: 2fr 1fr 1fr;">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" style="background:transparent;box-shadow:none;padding:0;">
            <img src="assets/logo.png" alt="TECHNEXA" style="max-height:42px;filter:drop-shadow(0 0 15px rgba(168,85,247,0.8));" />
          </a>
          <p style="white-space:nowrap;font-size:0.95rem;color:var(--text-muted);margin-top:0.75rem;">TECHNEXA &mdash; Code &bull; Compete &bull; Connect.</p>
          <div class="footer-social" style="margin-top:1.25rem;">
            <a href="https://instagram.com" class="social-btn">📸</a>
            <a href="#" class="social-btn">💼</a>
            <a href="https://discord.gg" class="social-btn">🎮</a>
            <a href="mailto:technexa@college.edu" class="social-btn">📧</a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="events.html">All Events</a></li>
            <li><a href="schedule.html">Schedule</a></li>
            <li><a href="team.html">Organising Team</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-heading">Explore</h4>
          <ul class="footer-links">
            <li><a href="sponsors.html">Sponsors</a></li>
            <li><a href="faq.html">FAQs</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom"><span>© 2026 TECHNEXA. All rights reserved.</span></div>
    </div>
  </footer>

  <script src="js/particles.js"></script>
  <script src="js/main.js"></script>
</body>
</html>"""

with open('schedule.html', 'w', encoding='utf-8') as f:
    f.write(schedule_content)
print("schedule.html updated successfully!")
