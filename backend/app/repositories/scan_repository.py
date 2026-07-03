"""
Scan repository — database access layer.
All database operations for the Scan model.
"""
from uuid import UUID
from datetime import datetime
from typing import Optional, List
from sqlalchemy import select, func, desc
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.scan import Scan
from ..schemas.scan import ScanStatus


class ScanRepository:
    """Repository for Scan model database operations."""

    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_by_id(self, scan_id: UUID) -> Scan | None:
        """Get scan by primary key."""
        result = await self.db.execute(select(Scan).where(Scan.id == scan_id))
        return result.scalar_one_or_none()

    async def get_by_id_with_user(self, scan_id: UUID) -> Scan | None:
        """Get scan by primary key with user loaded."""
        result = await self.db.execute(
            select(Scan).where(Scan.id == scan_id)
        )
        return result.scalar_one_or_none()

    async def get_by_share_token(self, token: str) -> Scan | None:
        """Get scan by share token."""
        result = await self.db.execute(
            select(Scan).where(Scan.share_token == token)
        )
        return result.scalar_one_or_none()

    async def create(
        self,
        *,
        user_id: UUID,
        scan_type: str,
        original_content: str | None = None,
        uploaded_file_name: str | None = None,
        uploaded_file_size: int | None = None,
        uploaded_file_type: str | None = None,
        uploaded_file_url: str | None = None,
        status: str = ScanStatus.QUEUED,
        session_id: str | None = None,
    ) -> Scan:
        """Create a new scan record."""
        scan = Scan(
            user_id=user_id,
            scan_type=scan_type,
            original_content=original_content,
            uploaded_file_name=uploaded_file_name,
            uploaded_file_size=uploaded_file_size,
            uploaded_file_type=uploaded_file_type,
            uploaded_file_url=uploaded_file_url,
            status=status,
            session_id=session_id,
        )
        self.db.add(scan)
        await self.db.commit()
        await self.db.refresh(scan)
        return scan

    async def update_status(
        self,
        scan: Scan,
        status: str,
        processing_time_ms: int | None = None,
    ) -> Scan:
        """Update scan status."""
        scan.status = status
        if processing_time_ms is not None:
            scan.processing_time_ms = processing_time_ms
        await self.db.commit()
        await self.db.refresh(scan)
        return scan

    async def update_ai_results(
        self,
        scan: Scan,
        *,
        scam_probability: int,
        trust_score: int,
        threat_level: str,
        explanation: str,
        key_indicators: List[str],
        confidence: float,
        model: str,
        analysis_version: str,
    ) -> Scan:
        """Update scan with AI analysis results."""
        scan.ai_scam_probability = scam_probability
        scan.ai_trust_score = trust_score
        scan.ai_threat_level = threat_level
        scan.ai_explanation = explanation
        scan.ai_key_indicators = key_indicators
        scan.ai_confidence = confidence
        scan.ai_model = model
        scan.ai_analysis_version = analysis_version
        scan.ai_processed_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(scan)
        return scan

    async def update_virustotal_results(
        self,
        scan: Scan,
        *,
        positives: int,
        total: int,
        scan_date: datetime,
        permalink: str,
        reputation: int,
    ) -> Scan:
        """Update scan with VirusTotal results."""
        scan.vt_positives = positives
        scan.vt_total = total
        scan.vt_scan_date = scan_date
        scan.vt_permalink = permalink
        scan.vt_reputation = reputation
        await self.db.commit()
        await self.db.refresh(scan)
        return scan

    async def update_ocr_results(
        self,
        scan: Scan,
        *,
        extracted_text: str,
        confidence: float,
        language: str,
        word_count: int,
    ) -> Scan:
        """Update scan with OCR results."""
        scan.ocr_extracted_text = extracted_text
        scan.ocr_confidence = confidence
        scan.ocr_language = language
        scan.ocr_word_count = word_count
        await self.db.commit()
        await self.db.refresh(scan)
        return scan

    async def update_community_report(
        self,
        scan: Scan,
        *,
        report_count: int,
        verified_scam: bool,
        categories: List[str],
    ) -> Scan:
        """Update scan with community report."""
        scan.community_report_count = report_count
        scan.community_verified_scam = verified_scam
        scan.community_categories = categories
        await self.db.commit()
        await self.db.refresh(scan)
        return scan

    async def set_share_token(self, scan: Scan, token: str) -> Scan:
        """Set share token for public sharing."""
        scan.share_token = token
        scan.is_public = True
        await self.db.commit()
        await self.db.refresh(scan)
        return scan

    async def get_user_scans(
        self,
        user_id: UUID,
        *,
        page: int = 1,
        page_size: int = 20,
        status: str | None = None,
        scan_type: str | None = None,
    ) -> tuple[List[Scan], int]:
        """Get paginated scans for a user."""
        # Build base query
        query = select(Scan).where(Scan.user_id == user_id)

        # Apply filters
        if status:
            query = query.where(Scan.status == status)
        if scan_type:
            query = query.where(Scan.scan_type == scan_type)

        # Get total count
        count_query = select(func.count()).select_from(query.subquery())
        total_result = await self.db.execute(count_query)
        total = total_result.scalar_one()

        # Apply pagination and ordering
        query = query.order_by(desc(Scan.created_at))
        query = query.offset((page - 1) * page_size).limit(page_size)

        result = await self.db.execute(query)
        scans = result.scalars().all()

        return list(scans), total

    async def get_recent_scans(self, user_id: UUID, limit: int = 5) -> List[Scan]:
        """Get recent scans for dashboard."""
        result = await self.db.execute(
            select(Scan)
            .where(Scan.user_id == user_id)
            .order_by(desc(Scan.created_at))
            .limit(limit)
        )
        return list(result.scalars().all())

    async def get_stats(self, user_id: UUID) -> dict:
        """Get scan statistics for a user."""
        # Total scans
        total_result = await self.db.execute(
            select(func.count(Scan.id)).where(Scan.user_id == user_id)
        )
        total = total_result.scalar_one()

        # By status
        status_result = await self.db.execute(
            select(Scan.status, func.count(Scan.id))
            .where(Scan.user_id == user_id)
            .group_by(Scan.status)
        )
        by_status = dict(status_result.all())

        # By type
        type_result = await self.db.execute(
            select(Scan.scan_type, func.count(Scan.id))
            .where(Scan.user_id == user_id)
            .group_by(Scan.scan_type)
        )
        by_type = dict(type_result.all())

        # Threat level distribution (completed scans only)
        threat_result = await self.db.execute(
            select(Scan.ai_threat_level, func.count(Scan.id))
            .where(Scan.user_id == user_id, Scan.status == ScanStatus.COMPLETED, Scan.ai_threat_level.isnot(None))
            .group_by(Scan.ai_threat_level)
        )
        by_threat = dict(threat_result.all())

        return {
            "total": total,
            "by_status": by_status,
            "by_type": by_type,
            "by_threat_level": by_threat,
        }

    async def delete(self, scan: Scan) -> None:
        """Delete a scan."""
        await self.db.delete(scan)
        await self.db.commit()