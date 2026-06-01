/**
 * ZohoLaunch — Client Configuration File
 * ----------------------------------------
 * To white-label this microsite for a new client,
 * update ONLY this file. No touching HTML or CSS needed.
 */

const CLIENT = {

  // ── Basic Info ───────────────────────────────────────────
  name: "Sunshine Coaching Co.",
  contactEmail: "hello@sunshinecoaching.com",

  // ── Your Details ─────────────────────────────────────────
  freelancerName: "Akorede",
  portfolioUrl: "https://ayo-devops.github.io",
  linkedinUrl: "https://linkedin.com/in/da-original-kay",
  email: "zohowayo@gmail.com",
  whatsappUrl: "https://wa.me/2348169463982",
  calUrl: "https://cal.com/akorede-pro",

  // ── Service & Payment ─────────────────────────────────────
  serviceLabel: "Zoho CRM + Books Implementation",
  serviceAmount: "$850",
  paymentLink: "https://books.zoho.com/portal/PLACEHOLDER", // replace with your Zoho Books payment link

  // ── Web3Forms ─────────────────────────────────────────────
  web3formsKey: "9c8049d3-9332-493c-87cf-ae7221a7ea9f",

  // ── Onboarding Steps ──────────────────────────────────────
  // status options: "complete" | "active" | "upcoming"
  steps: [
    {
      title: "Discovery & intake",
      description: "We've aligned on your goals and the scope of the migration. You're officially onboarded.",
      status: "complete"
    },
    {
      title: "Data migration",
      description: "We're moving your data from QuickBooks into Zoho Books — contacts, invoices, and transaction history.",
      status: "active"
    },
    {
      title: "CRM setup",
      description: "Your sales pipeline, contacts, automations, and team permissions get configured in Zoho CRM.",
      status: "upcoming"
    },
    {
      title: "Handoff & training",
      description: "Live walkthrough session with your team. We make sure everyone knows the system before we sign off.",
      status: "upcoming"
    }
  ],

  // ── Client Checklist ──────────────────────────────────────
  // Set checked: true for items already done
  checklist: [
    { label: "Fill out the intake form below", checked: true },
    { label: "Export your QuickBooks data (we'll send step-by-step instructions)", checked: false },
    { label: "Add us as an admin on your current tools", checked: false },
    { label: "Confirm which team members need Zoho access", checked: false },
    { label: "Complete payment to begin the migration", checked: false }
  ],

  // ── Resources ─────────────────────────────────────────────
  resources: [
    {
      icon: "📘",
      title: "Zoho CRM quick start",
      description: "Official getting started guide for new Zoho CRM users.",
      linkLabel: "Open guide →",
      url: "https://www.zoho.com/crm/help/"
    },
    {
      icon: "📗",
      title: "Zoho Books overview",
      description: "How invoicing, payments, and reconciliation work in Books.",
      linkLabel: "Open guide →",
      url: "https://www.zoho.com/books/help/"
    },
    {
      icon: "📅",
      title: "Book a call",
      description: "Schedule time with us at any point during onboarding.",
      linkLabel: "Book now →",
      url: "https://cal.com/akorede-pro"
    },
    {
      icon: "📥",
      title: "QuickBooks export guide",
      description: "Step-by-step: how to export your data before migration.",
      linkLabel: "Download →",
      url: "#"
    },
    {
      icon: "💬",
      title: "WhatsApp us",
      description: "Got a quick question? Reach us directly on WhatsApp.",
      linkLabel: "Chat now →",
      url: "https://wa.me/2348169463982"
    }
  ]

};
