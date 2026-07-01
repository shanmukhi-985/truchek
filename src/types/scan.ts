/**
 * TruChek — Scan & Analysis Types
 * Types for all scan content types and AI analysis results
 */

import type { BaseEntity, ID, ISODateString } from "./common";

// ============================================================
// SCAN CONTENT TYPES
// ============================================================

export type ScanContentType =
  | "sms"
  | "email"
  | "whatsapp"
  | "url"
  | "qr_code"
  | "image"
  | "document"
  | "phone"
  | "social";

export interface ScanContentTypeInfo {
  type:        ScanContentType;
  label:       string;
  description: string;
  icon:        string;
  acceptedFormats?: string[];
  maxSize?:    number;
  placeholder: string;
}

// ============================================================
// THREAT LEVELS
// ============================================================

export type ThreatLevel = "safe" | "low" | "medium" | "high" | "critical";

export interface ThreatLevelConfig {
  level:       ThreatLevel;
  label:       string;
  color:       string;
  bgColor:     string;
  description: string;
  icon:        string;
  action:      string;
}

// ============================================================
// TRUST SCORE
// ============================================================

export interface TrustScore {
  score:        number;  // 0–100
  label:        string;
  color:        string;
  confidence:   number;  // AI confidence 0–1
}

// ============================================================
// SCAN STATUS
// ============================================================

export type ScanStatus =
  | "queued"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

// ============================================================
// SCAN INPUT
// ============================================================

export interface ScanInput {
  contentType: ScanContentType;
  text?:       string;
  url?:        string;
  phoneNumber?: string;
  file?:       File;
  metadata?:   Record<string, string | number | boolean>;
}

// ============================================================
// AI ANALYSIS RESULT
// ============================================================

export interface AiAnalysisResult {
  scamProbability:    number;  // 0–100
  trustScore:         TrustScore;
  threatLevel:        ThreatLevel;
  explanation:        string;
  keyIndicators:      string[];
  redFlags:           string[];
  positiveSignals:    string[];
  recommendedAction:  string;
  confidence:         number;
  model:              string;
  analysisVersion:    string;
  processedAt:        ISODateString;
}

// ============================================================
// VIRUSTOTAL RESULT
// ============================================================

export interface VirusTotalResult {
  positives:    number;
  total:        number;
  scanDate:     ISODateString;
  permalink:    string;
  detections:   VirusTotalDetection[];
  categories:   string[];
  reputation:   number;
}

export interface VirusTotalDetection {
  engine:     string;
  result:     string | null;
  detected:   boolean;
  version?:   string;
  updateDate?: ISODateString;
}

// ============================================================
// OCR RESULT
// ============================================================

export interface OcrResult {
  extractedText:  string;
  confidence:     number;
  language:       string;
  wordCount:      number;
  blocks:         OcrBlock[];
}

export interface OcrBlock {
  text:       string;
  confidence: number;
  boundingBox?: {
    x: number; y: number;
    width: number; height: number;
  };
}

// ============================================================
// COMMUNITY REPORT
// ============================================================

export interface CommunityReport {
  id:              ID;
  contentHash:     string;
  reportCount:     number;
  firstReported:   ISODateString;
  lastReported:    ISODateString;
  verifiedScam:    boolean;
  categories:      string[];
  upvotes:         number;
  downvotes:       number;
}

// ============================================================
// SCAN RESULT (Full)
// ============================================================

export interface ScanResult extends BaseEntity {
  userId:          ID | null;
  sessionId:       string;
  contentType:     ScanContentType;
  status:          ScanStatus;
  inputSummary:    string;
  aiAnalysis:      AiAnalysisResult | null;
  virusTotal:      VirusTotalResult | null;
  ocrResult:       OcrResult | null;
  communityReport: CommunityReport | null;
  processingTime:  number;
  isPublic:        boolean;
  shareToken?:     string;
}

// ============================================================
// SCAN HISTORY
// ============================================================

export interface ScanHistoryItem {
  id:          ID;
  contentType: ScanContentType;
  inputSummary: string;
  threatLevel: ThreatLevel;
  trustScore:  number;
  status:      ScanStatus;
  createdAt:   ISODateString;
}
