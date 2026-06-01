# ZohoLaunch — Client Onboarding Microsite

A branded, client-facing onboarding portal for Zoho CRM + Books migrations.
White-labelable: update `config.js` only to deploy for a new client.

---

## Files

```
zoholaunch/
├── index.html    ← Structure (never edit per client)
├── style.css     ← Styles (never edit per client)
├── app.js        ← Logic (never edit per client)
├── config.js     ← Client data (ONLY file you edit per client)
└── README.md
```

---

## Deploying for a new client

1. Duplicate this folder
2. Open `config.js` and update:
   - `name` — client business name
   - `steps` — set the correct `status` for each step
   - `checklist` — set `checked: true` for completed items
   - `serviceAmount` + `paymentLink` — your Zoho Books payment link
   - `web3formsKey` — your Web3Forms access key (web3forms.com)
3. Deploy to Netlify (drag & drop the folder)
4. Share the URL with your client

---

## Getting your Web3Forms key

1. Go to https://web3forms.com
2. Enter your email (zohowayo@gmail.com)
3. They'll send you an access key
4. Paste it into `config.js` → `web3formsKey`

---

## Deploying to Netlify

### Option A — Drag & drop (fastest)
1. Go to https://app.netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag the entire `zoholaunch` folder onto the page
4. Done — you'll get a live URL in seconds

### Option B — Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --dir=. --prod
```

---

## Checklist state
Client checklist progress is saved in `localStorage` — it persists across browser sessions on the same device/browser automatically. No backend needed.

---

Built by Akorede · https://ayo-devops.github.io
