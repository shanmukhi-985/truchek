/**
 * TruChek — Scan Constants
 * Definitions for all scan types, threat levels, and trust scores
 */

import type { ScanContentTypeInfo, ThreatLevelConfig } from "@/types/scan";

// ============================================================
// SCAN CONTENT TYPES
// ============================================================

export const SCAN_CONTENT_TYPES: ScanContentTypeInfo[] = [
  {
    type:        "sms",
    label:       "SMS Message",
    description: "Verify suspicious text messages",
    icon:        "MessageSquare",
    placeholder: "Paste the SMS message you received here...",
  },
  {
    type:        "email",
    label:       "Email",
    description: "Check phishing or scam emails",
    icon:        "Mail",
    placeholder: "Paste the email content or subject line here...",
  },
  {
    type:        "whatsapp",
    label:       "WhatsApp Message",
    description: "Analyze WhatsApp messages",
    icon:        "MessageCircle",
    placeholder: "Paste the WhatsApp message here...",
  },
  {
    type:        "url",
    label:       "Website URL",
    description: "Check malicious or phishing websites",
    icon:        "Globe",
    placeholder: "https://example.com",
  },
  {
    type:        "qr_code",
    label:       "QR Code",
    description: "Scan QR codes before visiting",
    icon:        "QrCode",
    acceptedFormats: ["image/jpeg", "image/png", "image/webp"],
    maxSize:     5,
    placeholder: "Upload a QR code image...",
  },
  {
    type:        "image",
    label:       "Image / Screenshot",
    description: "Extract and analyze text from images",
    icon:        "Image",
    acceptedFormats: ["image/jpeg", "image/png", "image/webp"],
    maxSize:     10,
    placeholder: "Upload a screenshot or image...",
  },
  {
    type:        "document",
    label:       "Document",
    description: "Analyze suspicious documents",
    icon:        "FileText",
    acceptedFormats: ["application/pdf", "text/plain"],
    maxSize:     10,
    placeholder: "Upload a document (PDF, TXT)...",
  },
  {
    type:        "phone",
    label:       "Phone Number",
    description: "Check if a number is linked to scams",
    icon:        "Phone",
    placeholder: "+1 (555) 000-0000",
  },
  {
    type:        "social",
    label:       "Social Media",
    description: "Verify social media messages",
    icon:        "Share2",
    placeholder: "Paste the social media message here...",
  },
] as const;

// ============================================================
// THREAT LEVELS
// ============================================================

export const THREAT_LEVELS: ThreatLevelConfig[] = [
  {
    level:       "safe",
    label:       "Safe",
    color:       "#22c55e",
    bgColor:     "rgba(34, 197, 94, 0.1)",
    description: "No threats detected. This content appears to be safe.",
    icon:        "ShieldCheck",
    action:      "You can safely interact with this content.",
  },
  {
    level:       "low",
    label:       "Low Risk",
    color:       "#06b6d4",
    bgColor:     "rgba(6, 182, 212, 0.1)",
    description: "Minor concerns detected. Exercise basic caution.",
    icon:        "Shield",
    action:      "Proceed with caution. Verify before sharing personal info.",
  },
  {
    level:       "medium",
    label:       "Medium Risk",
    color:       "#f59e0b",
    bgColor:     "rgba(245, 158, 11, 0.1)",
    description: "Suspicious patterns detected. Do not share personal data.",
    icon:        "ShieldAlert",
    action:      "Do not click links or share personal information.",
  },
  {
    level:       "high",
    label:       "High Risk",
    color:       "#f97316",
    bgColor:     "rgba(249, 115, 22, 0.1)",
    description: "Likely scam or phishing attempt detected.",
    icon:        "ShieldX",
    action:      "Do NOT engage. Block the sender immediately.",
  },
  {
    level:       "critical",
    label:       "Critical",
    color:       "#f43f5e",
    bgColor:     "rgba(244, 63, 94, 0.1)",
    description: "Confirmed malicious content. High danger detected.",
    icon:        "AlertTriangle",
    action:      "STOP. Block, report, and delete immediately.",
  },
] as const;

// ============================================================
// TRUST SCORE RANGES
// ============================================================

export const TRUST_SCORE_RANGES = {
  CRITICAL: { min: 0,  max: 20,  label: "Dangerous",    color: "#f43f5e" },
  HIGH:     { min: 21, max: 40,  label: "High Risk",     color: "#f97316" },
  MEDIUM:   { min: 41, max: 60,  label: "Suspicious",    color: "#f59e0b" },
  LOW:      { min: 61, max: 80,  label: "Low Risk",      color: "#06b6d4" },
  SAFE:     { min: 81, max: 100, label: "Trustworthy",   color: "#22c55e" },
} as const;

// ============================================================
// SCAM PROBABILITY LABELS
// ============================================================

export const SCAM_PROBABILITY_LABELS = {
  VERY_LOW:  { min: 0,  max: 15,  label: "Very Low",   color: "#22c55e" },
  LOW:       { min: 16, max: 30,  label: "Low",         color: "#84cc16" },
  MODERATE:  { min: 31, max: 55,  label: "Moderate",    color: "#f59e0b" },
  HIGH:      { min: 56, max: 75,  label: "High",        color: "#f97316" },
  VERY_HIGH: { min: 76, max: 100, label: "Very High",   color: "#f43f5e" },
} as const;
