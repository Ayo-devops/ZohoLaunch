/**
 * ZohoLaunch — app.js
 * Reads from config.js and renders everything dynamically.
 * Swap config.js per client — this file never changes.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Inject client name everywhere ──────────────────────
  document.querySelectorAll('.client-name').forEach(el => {
    el.textContent = CLIENT.name;
  });

  // ── Page title ─────────────────────────────────────────
  document.title = `ZohoLaunch — ${CLIENT.name}`;

  // ── Footer ─────────────────────────────────────────────
  const footerName = document.getElementById('footerName');
  if (footerName) {
    footerName.textContent = CLIENT.freelancerName;
    footerName.href = CLIENT.portfolioUrl;
  }
  setHref('footerPortfolio', CLIENT.portfolioUrl);
  setHref('footerLinkedin',  CLIENT.linkedinUrl);
  setHref('footerEmail',     `mailto:${CLIENT.email}`);

  // ── Payment section ────────────────────────────────────
  setText('payAmount', CLIENT.serviceAmount);
  setText('payDesc',   `${CLIENT.serviceLabel} — ${CLIENT.name}`);
  setHref('payBtn',    CLIENT.paymentLink);

  // ── Web3Forms ──────────────────────────────────────────
  const w3fKey = document.getElementById('w3fKey');
  const w3fSubject = document.getElementById('w3fSubject');
  if (w3fKey)     w3fKey.value     = CLIENT.web3formsKey;
  if (w3fSubject) w3fSubject.value = `ZohoLaunch intake — ${CLIENT.name}`;

  // ── Build timeline ─────────────────────────────────────
  const timeline = document.getElementById('timeline');
  if (timeline) {
    CLIENT.steps.forEach((step, i) => {
      const isLast = i === CLIENT.steps.length - 1;
      const num    = step.status === 'complete' ? '✓' : i + 1;
      const tagClass = `tag-${step.status}`;
      const tagLabel = step.status === 'complete' ? 'Complete'
                     : step.status === 'active'   ? 'In progress'
                     : 'Upcoming';

      const div = document.createElement('div');
      div.className = `step ${step.status}`;
      div.innerHTML = `
        <div class="step-num">${num}</div>
        <div class="step-body" ${isLast ? 'style="padding-bottom:0"' : ''}>
          <span class="step-tag ${tagClass}">${tagLabel}</span>
          <h4>${step.title}</h4>
          <p>${step.description}</p>
        </div>
      `;
      timeline.appendChild(div);
    });
  }

  // ── Build checklist ────────────────────────────────────
  const checklistEl = document.getElementById('checklistItems');
  if (checklistEl) {
    CLIENT.checklist.forEach((item, i) => {
      const saved   = localStorage.getItem(`zl_check_${i}`);
      const checked = saved !== null ? saved === 'true' : item.checked;

      const div = document.createElement('div');
      div.className = `checklist-item${checked ? ' done' : ''}`;
      div.id = `ci${i}`;
      div.innerHTML = `
        <input type="checkbox" id="c${i}" ${checked ? 'checked' : ''}>
        <label for="c${i}">${item.label}</label>
      `;
      div.querySelector('input').addEventListener('change', () => updateChecklist());
      checklistEl.appendChild(div);
    });
    updateChecklist();
  }

  // ── Build resources ────────────────────────────────────
  const grid = document.getElementById('resourcesGrid');
  if (grid) {
    CLIENT.resources.forEach(r => {
      const card = document.createElement('div');
      card.className = 'resource-card';
      card.innerHTML = `
        <div class="resource-icon">${r.icon}</div>
        <h4>${r.title}</h4>
        <p>${r.description}</p>
        <a class="resource-link" href="${r.url}" target="_blank" rel="noopener">${r.linkLabel}</a>
      `;
      grid.appendChild(card);
    });
  }

  // ── Progress ring (hero) ───────────────────────────────
  updateRing();

  // ── Scroll reveal ──────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Intake form ────────────────────────────────────────
  const form = document.getElementById('intakeForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn     = document.getElementById('submitBtn');
      const success = document.getElementById('formSuccess');

      btn.disabled    = true;
      btn.textContent = 'Sending…';

      // Collect checkbox pills
      const tools = [...form.querySelectorAll('input[name="tools"]:checked')]
        .map(cb => cb.value).join(', ');

      const formData = new FormData(form);
      formData.set('tools_replacing', tools || 'None selected');

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();

        if (data.success) {
          success.style.display = 'block';
          btn.textContent = '✓ Submitted';
          form.reset();
        } else {
          btn.disabled    = false;
          btn.textContent = 'Submit intake form →';
          alert('Something went wrong. Please try again or email us directly.');
        }
      } catch {
        btn.disabled    = false;
        btn.textContent = 'Submit intake form →';
        alert('Network error. Please check your connection and try again.');
      }
    });
  }

});

// ── Helpers ────────────────────────────────────────────

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) el.href = href;
}

function updateChecklist() {
  const items  = document.querySelectorAll('.checklist-item');
  const boxes  = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  let done     = 0;

  boxes.forEach((box, i) => {
    const item = document.getElementById(`ci${i}`);
    const checked = box.checked;
    if (item) item.classList.toggle('done', checked);
    if (checked) done++;
    localStorage.setItem(`zl_check_${i}`, checked);
  });

  const total   = boxes.length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  setText('checkCount', `${done} of ${total} complete`);

  const bar = document.getElementById('checkBar');
  if (bar) bar.style.width = pct + '%';

  updateRing();
}

function updateRing() {
  const boxes   = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const total   = boxes.length;
  const done    = [...boxes].filter(b => b.checked).length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  const circumference = 2 * Math.PI * 40; // r=40 → ~251.3
  const offset  = circumference - (pct / 100) * circumference;

  const fill = document.getElementById('ringFill');
  const text = document.getElementById('ringText');

  if (fill) {
    fill.style.strokeDasharray  = circumference;
    fill.style.strokeDashoffset = offset;
  }
  if (text) text.textContent = pct + '%';
}
