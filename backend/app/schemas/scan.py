"""
Scan Pydantic schemas (request/response models).
"""
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field, HttpUrl, EmailStr, field_validator
from typing import Optional, List
from enum import Enum
import re


# ─── Scan Content Type Enums ──────────────────────────────────────────────────────

class ScanContentType(str, Enum):
    TEXT = "text"
    URL = "url"
    EMAIL = "email"
    SMS = "sms"
    WHATSAPP = "whatsapp"
    QR_CODE = "qr_code"
    IMAGE = "image"
    DOCUMENT = "document"
    PHONE = "phone"
    SOCIAL = "social"


class ScanStatus(str, Enum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class ThreatLevel(str):
    SAFE = "safe"
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


# ─── Base Schemas ──────────────────────────────────────────────────────────────────

class ScanBase(BaseModel):
    """Base scan schema."""
    scan_type: str = Field(..., description="Type of content being scanned")
    session_id: Optional[str] = Field(None, description="Session identifier for grouping")


class ScanContentText(BaseModel):
    """Text scan input."""
    text: str = Field(..., min_length=1, max_length=10000, description="Text content to analyze")


class ScanContentURL(BaseModel):
    """URL scan input."""
    url: HttpUrl = Field(..., description="Website URL to analyze")


class ScanContentEmail(BaseModel):
    """Email scan input."""
    sender: EmailStr = Field(..., description="Sender email address")
    subject: str = Field(..., min_length=1, max_length=200, description="Email subject")
    body: str = Field(..., min_length=1, max_length=10000, description="Email body content")
    attachment_count: int = Field(default=0, ge=0, le=10, description="Number of attachments")


class ScanContentSMS(BaseModel):
    """SMS scan input."""
    country_code: str = Field(..., min_length=1, max_length=4, pattern=r"^\+\d{1,3}$", description="Country code (e.g., +1)")
    phone_number: str = Field(..., min_length=7, max_length=15, pattern=r"^\d+$", description="Phone number without country code")
    message: str = Field(..., min_length=1, max_length=1600, description="SMS message content")


class ScanContentWhatsApp(BaseModel):
    """WhatsApp scan input."""
    country_code: str = Field(..., min_length=1, max_length=4, pattern=r"^\+\d{1,3}$", description="Country code (e.g., +1)")
    phone_number: str = Field(..., min_length=7, max_length=15, pattern=r"^\d+$", description="Phone number without country code")
    message: str = Field(..., min_length=1, max_length=10000, description="WhatsApp message content")
    has_media: bool = Field(default=False, description="Whether message has media attachment")


class ScanContentQRCode(BaseModel):
    """QR Code scan input - placeholder for image upload."""
    image_filename: Optional[str] = Field(None, description="Uploaded image filename")
    image_size: Optional[int] = Field(None, ge=0, description="Uploaded image size in bytes")


class ScanContentFile(BaseModel):
    """File upload scan input (image/document)."""
    filename: str = Field(..., description="Original filename")
    size: int = Field(..., ge=0, description="File size in bytes")
    content_type: str = Field(..., description="MIME type")


# ─── Request Schemas ────────────────────────────────────────────────────────────────

class ScanTextRequest(ScanBase, ScanContentText):
    """Text scan request."""
    scan_type: str = Field(default="text", pattern="^text$")


class ScanURLRequest(ScanBase, ScanContentURL):
    """URL scan request."""
    scan_type: str = Field(default="url", pattern="^url$")


class ScanEmailRequest(ScanBase, ScanContentEmail):
    """Email scan request."""
    scan_type: str = Field(default="email", pattern="^email$")


class ScanSMSRequest(ScanBase, ScanContentSMS):
    """SMS scan request."""
    scan_type: str = Field(default="sms", pattern="^sms$")


class ScanWhatsAppRequest(ScanBase, ScanContentWhatsApp):
    """WhatsApp scan request."""
    scan_type: str = Field(default="whatsapp", pattern="^whatsapp$")


class ScanQRCodeRequest(ScanBase, ScanContentQRCode):
    """QR Code scan request."""
    scan_type: str = Field(default="qr_code", pattern="^qr_code$")


class ScanImageRequest(ScanBase, ScanContentFile):
    """Image scan request."""
    scan_type: str = Field(default="image", pattern="^image$")


class ScanDocumentRequest(ScanBase, ScanContentFile):
    """Document (PDF) scan request."""
    scan_type: str = Field(default="document", pattern="^document$")


# Union of all scan requests
ScanRequest = (
    ScanTextRequest
    | ScanURLRequest
    | ScanEmailRequest
    | ScanSMSRequest
    | ScanWhatsAppRequest
    | ScanQRCodeRequest
    | ScanImageRequest
    | ScanDocumentRequest
)


# ─── Response Schemas ────────────────────────────────────────────────────────────────

class TrustScoreResponse(BaseModel):
    """Trust score in response."""
    score: int = Field(..., ge=0, le=100)
    label: str
    color: str
    confidence: float = Field(..., ge=0, le=1)


class AIAnalysisResponse(BaseModel):
    """AI analysis result (mock for now)."""
    scam_probability: int = Field(..., ge=0, le=100)
    trust_score: TrustScoreResponse
    threat_level: str
    explanation: str
    key_indicators: List[str]
    red_flags: List[str]
    positive_signals: List[str]
    recommended_action: str
    confidence: float = Field(..., ge=0, le=1)
    model: str
    analysis_version: str
    processed_at: datetime


class VirusTotalResponse(BaseModel):
    """VirusTotal result (mock for now)."""
    positives: int
    total: int
    scan_date: datetime
    permalink: str
    detections: List[dict]
    categories: List[str]
    reputation: int


class OCRResponse(BaseModel):
    """OCR result (mock for now)."""
    extracted_text: str
    confidence: float
    language: str
    word_count: int
    blocks: List[dict]


class CommunityReportResponse(BaseModel):
    """Community report (mock for now)."""
    id: str
    content_hash: str
    report_count: int
    first_reported: datetime
    last_reported: datetime
    verified_scam: bool
    categories: List[str]
    upvotes: int
    downvotes: int


class ScanResultResponse(BaseModel):
    """Full scan result response."""
    id: UUID
    user_id: UUID
    scan_type: str
    status: str
    input_summary: str
    ai_analysis: Optional[AIAnalysisResponse] = None
    virus_total: Optional[VirusTotalResponse] = None
    ocr_result: Optional[OCRResponse] = None
    community_report: Optional[CommunityReportResponse] = None
    processing_time_ms: Optional[int] = None
    is_public: bool
    share_token: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ScanHistoryItemResponse(BaseModel):
    """Scan history list item."""
    id: UUID
    scan_type: str
    input_summary: str
    threat_level: str
    trust_score: int
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class ScanSubmitResponse(BaseModel):
    """Response after submitting a scan."""
    scan_id: UUID
    status: str
    message: str
    estimated_time_ms: int


class ScanHistoryResponse(BaseModel):
    """Paginated scan history response."""
    items: List[ScanHistoryItemResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


# ─── Validation Schemas ──────────────────────────────────────────────────────────────

class FileValidationConfig(BaseModel):
    """File upload validation configuration."""
    max_size_mb: int = 10
    allowed_image_types: List[str] = ["image/png", "image/jpeg", "image/webp"]
    allowed_document_types: List[str] = ["application/pdf"]
    allowed_qr_types: List[str] = ["image/png", "image/jpeg", "image/webp"]


# Default validation config
FILE_VALIDATION = FileValidationConfig()


def validate_file_upload(
    filename: str,
    size: int,
    content_type: str,
    scan_type: str
) -> Optional[str]:
    """
    Validate file upload.
    Returns error message if invalid, None if valid.
    """
    # Check file size
    max_bytes = FILE_VALIDATION.max_size_mb * 1024 * 1024
    if size > max_bytes:
        return f"File size exceeds {FILE_VALIDATION.max_size_mb}MB limit"

    # Check file type based on scan type
    if scan_type == "image":
        if content_type not in FILE_VALIDATION.allowed_image_types:
            return f"Invalid image format. Allowed: {', '.join(FILE_VALIDATION.allowed_image_types)}"
    elif scan_type == "document":
        if content_type not in FILE_VALIDATION.allowed_document_types:
            return f"Invalid document format. Allowed: {', '.join(FILE_VALIDATION.allowed_document_types)}"
    elif scan_type == "qr_code":
        if content_type not in FILE_VALIDATION.allowed_qr_types:
            return f"Invalid image format for QR code. Allowed: {', '.join(FILE_VALIDATION.allowed_qr_types)}"

    return None