"""
Scan SQLAlchemy model.
"""
import uuid
from datetime import datetime
from sqlalchemy import String, Text, DateTime, Enum as SAEnum, ForeignKey, Integer, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from ..database import Base


class Scan(Base):
    """Scan database model."""

    __tablename__ = "scans"

    # Primary key
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )

    # User relation
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Scan type
    scan_type: Mapped[str] = mapped_column(
        SAEnum(
            "text",
            "url",
            "email",
            "sms",
            "whatsapp",
            "qr_code",
            "image",
            "document",
            "phone",
            "social",
            name="scan_type_enum",
        ),
        nullable=False,
        index=True,
    )

    # Original content (text, URL, etc.)
    original_content: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Uploaded file info
    uploaded_file_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    uploaded_file_size: Mapped[int | None] = mapped_column(Integer, nullable=True)
    uploaded_file_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    uploaded_file_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # Status
    status: Mapped[str] = mapped_column(
        SAEnum(
            "queued",
            "processing",
            "completed",
            "failed",
            "cancelled",
            name="scan_status_enum",
        ),
        default="queued",
        nullable=False,
        index=True,
    )

    # AI Analysis results (prepared for future integration)
    ai_scam_probability: Mapped[int | None] = mapped_column(Integer, nullable=True)
    ai_trust_score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    ai_threat_level: Mapped[str | None] = mapped_column(String(20), nullable=True)
    ai_explanation: Mapped[str | None] = mapped_column(Text, nullable=True)
    ai_key_indicators: Mapped[list[str] | None] = mapped_column(
        SAEnum(*[], name="placeholder"), nullable=True
    )
    ai_confidence: Mapped[float | None] = mapped_column(nullable=True)
    ai_model: Mapped[str | None] = mapped_column(String(100), nullable=True)
    ai_analysis_version: Mapped[str | None] = mapped_column(String(50), nullable=True)
    ai_processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # VirusTotal results (prepared for future integration)
    vt_positives: Mapped[int | None] = mapped_column(Integer, nullable=True)
    vt_total: Mapped[int | None] = mapped_column(Integer, nullable=True)
    vt_scan_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    vt_permalink: Mapped[str | None] = mapped_column(String(500), nullable=True)
    vt_reputation: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # OCR results (prepared for future integration)
    ocr_extracted_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    ocr_confidence: Mapped[float | None] = mapped_column(nullable=True)
    ocr_language: Mapped[str | None] = mapped_column(String(10), nullable=True)
    ocr_word_count: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # Community report (prepared for future integration)
    community_report_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    community_verified_scam: Mapped[bool | None] = mapped_column(nullable=True)
    community_categories: Mapped[list[str] | None] = mapped_column(
        SAEnum(*[], name="placeholder"), nullable=True
    )

    # Processing metadata
    processing_time_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    session_id: Mapped[str | None] = mapped_column(String(100), nullable=True, index=True)
    is_public: Mapped[bool] = mapped_column(default=False, nullable=False)
    share_token: Mapped[str | None] = mapped_column(String(100), unique=True, nullable=True, index=True)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="scans")

    # Indexes
    __table_args__ = (
        Index("ix_scans_user_created", "user_id", "created_at"),
        Index("ix_scans_user_status", "user_id", "status"),
    )

    def __repr__(self) -> str:
        return f"<Scan id={self.id} type={self.scan_type} status={self.status}>"