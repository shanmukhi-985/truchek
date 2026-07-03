"""
Scan service — business logic layer.
Handles scan processing, validation, and mock AI analysis.
"""
import uuid
import time
from datetime import datetime
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.scan import Scan
from ..repositories.scan_repository import ScanRepository
from ..schemas.scan import (
    ScanRequest,
    ScanTextRequest,
    ScanURLRequest,
    ScanEmailRequest,
    ScanSMSRequest,
    ScanWhatsAppRequest,
    ScanQRCodeRequest,
    ScanImageRequest,
    ScanDocumentRequest,
    ScanSubmitResponse,
    ScanResultResponse,
    ScanHistoryResponse,
    ScanHistoryItemResponse,
    ScanStatus,
    validate_file_upload,
    AIAnalysisResponse,
    TrustScoreResponse,
    ThreatLevel,
)


class ScanService:
    """Service for scan business logic."""

    def __init__(self, db: AsyncSession) -> None:
        self.db = db
        self.repo = ScanRepository(db)

    # ─── Mock AI Analysis ──────────────────────────────────────────────────────────

    async def _mock_analyze(self, scan: Scan, content: str) -> dict:
        """
        Generate mock AI analysis results.
        In production, this would call actual AI models.
        """
        import random

        # Simulate processing time
        await self._simulate_processing()

        # Generate deterministic-ish results based on content
        seed = hash(content) % 10000
        random.seed(seed)

        scam_probability = random.randint(5, 95)
        trust_score = 100 - scam_probability + random.randint(-10, 10)
        trust_score = max(0, min(100, trust_score))

        if scam_probability >= 80:
            threat_level = ThreatLevel.CRITICAL
        elif scam_probability >= 60:
            threat_level = ThreatLevel.HIGH
        elif scam_probability >= 40:
            threat_level = ThreatLevel.MEDIUM
        elif scam_probability >= 20:
            threat_level = ThreatLevel.LOW
        else:
            threat_level = ThreatLevel.SAFE

        # Generate contextual indicators based on scan type
        indicators = self._get_mock_indicators(scan.scan_type, scam_probability)
        red_flags = self._get_mock_red_flags(scan.scan_type, scam_probability)
        positive_signals = self._get_mock_positive_signals(scan.scan_type, scam_probability)

        explanation = self._get_mock_explanation(scan.scan_type, threat_level, scam_probability)
        recommended_action = self._get_mock_action(threat_level)

        return {
            "scam_probability": scam_probability,
            "trust_score": trust_score,
            "threat_level": threat_level,
            "explanation": explanation,
            "key_indicators": indicators,
            "red_flags": red_flags,
            "positive_signals": positive_signals,
            "recommended_action": recommended_action,
            "confidence": round(random.uniform(0.75, 0.98), 2),
            "model": "TruChek-AI-v2.1",
            "analysis_version": "2.1.0",
        }

    async def _simulate_processing(self) -> None:
        """Simulate AI processing delay."""
        import asyncio
        import random
        # Simulate 1-3 seconds of processing
        await asyncio.sleep(random.uniform(1.0, 3.0))

    def _get_mock_indicators(self, scan_type: str, probability: int) -> List[str]:
        """Generate mock key indicators based on scan type."""
        base_indicators = {
            "text": [
                "Urgent language detected",
                "Request for personal information",
                "Poor grammar and spelling",
                "Generic greetings used",
            ],
            "url": [
                "Recently registered domain",
                "Suspicious URL structure",
                "Missing SSL certificate",
                "Redirect chains detected",
            ],
            "email": [
                "Sender domain mismatch",
                "SPF/DKIM verification failed",
                "Urgency tactics in subject",
                "Request for credentials",
            ],
            "sms": [
                "Short code spoofing",
                "Premium rate number",
                "Unsolicited verification code",
                "Link shortener usage",
            ],
            "whatsapp": [
                "Unknown contact",
                "Forwarded many times",
                "Suspicious link in message",
                "Request to forward",
            ],
            "qr_code": [
                "Obfuscated URL destination",
                "Dynamic QR code detected",
                "Shortened URL encoded",
                "Suspicious redirect pattern",
            ],
            "image": [
                "Text extracted via OCR",
                "Suspicious visual patterns",
                "Brand impersonation detected",
                "Fake urgency indicators",
            ],
            "document": [
                "Embedded malicious links",
                "Macro scripts detected",
                "Suspicious form fields",
                "Obfuscated content",
            ],
        }
        indicators = base_indicators.get(scan_type, base_indicators["text"])
        # Return 2-4 indicators based on probability
        count = 2 + (probability // 30)
        return indicators[:min(count, len(indicators))]

    def _get_mock_red_flags(self, scan_type: str, probability: int) -> List[str]:
        """Generate mock red flags based on scan type."""
        red_flags = {
            "text": [
                "Asks for passwords or PINs",
                "Threatens account closure",
                "Claims you won a prize",
                "Requests immediate payment",
            ],
            "url": [
                "Phishing page detected",
                "Credential harvesting form",
                "Malware download link",
                "Fake login portal",
            ],
            "email": [
                "Business email compromise attempt",
                "Invoice fraud detected",
                "CEO impersonation",
                "Malicious attachment",
            ],
            "sms": [
                "Smishing attempt",
                "Bank impersonation",
                "Delivery scam",
                "Tax refund fraud",
            ],
            "whatsapp": [
                "Account takeover attempt",
                "Verification code phishing",
                "Fake job offer",
                "Investment scam",
            ],
            "qr_code": [
                "Quishing attack",
                "Malicious payment redirect",
                "Fake authentication page",
                "Data harvesting form",
            ],
            "image": [
                "Fake invoice screenshot",
                "Phishing page screenshot",
                "Social engineering visual",
                "Counterfeit document",
            ],
            "document": [
                "Weaponized PDF",
                "Embedded exploit",
                "Malicious form",
                "Data exfiltration script",
            ],
        }
        flags = red_flags.get(scan_type, red_flags["text"])
        count = 1 + (probability // 25)
        return flags[:min(count, len(flags))]

    def _get_mock_positive_signals(self, scan_type: str, probability: int) -> List[str]:
        """Generate mock positive signals."""
        signals = [
            "Known legitimate sender",
            "Verified business domain",
            "Proper authentication headers",
            "No suspicious links found",
            "Content matches known safe patterns",
            "Reputable hosting provider",
        ]
        # Fewer positive signals for high probability scams
        count = max(1, 3 - (probability // 35))
        return signals[:count]

    def _get_mock_explanation(self, scan_type: str, threat_level: str, probability: int) -> str:
        """Generate mock explanation."""
        explanations = {
            "safe": f"This {scan_type} appears to be legitimate. Our analysis found no significant indicators of fraud or malicious intent. The content follows normal patterns for genuine communications.",
            "low": f"This {scan_type} shows some minor irregularities but is likely safe. Exercise normal caution. We detected {probability}% probability of suspicious elements.",
            "medium": f"This {scan_type} contains several concerning indicators. While not definitively malicious, we recommend verifying through official channels before taking any action. Suspicion level: {probability}%.",
            "high": f"This {scan_type} is highly suspicious and likely a scam attempt. Multiple red flags were detected. Do not click links, provide information, or download attachments. Threat probability: {probability}%.",
            "critical": f"CRITICAL THREAT: This {scan_type} is almost certainly a sophisticated scam or attack. Immediate action required - do not interact. Report to relevant authorities. Confidence: {probability}%.",
        }
        return explanations.get(threat_level, explanations["medium"])

    def _get_mock_action(self, threat_level: str) -> str:
        """Generate recommended action."""
        actions = {
            "safe": "No action needed. Content appears safe.",
            "low": "Verify independently if requesting sensitive action.",
            "medium": "Contact sender through official channels. Do not use provided links.",
            "high": "Do not interact. Report as spam/phishing. Block sender.",
            "critical": "IMMEDIATE: Delete message. Report to platform and authorities. Scan device for malware.",
        }
        return actions.get(threat_level, actions["medium"])

    # ─── Public Methods ──────────────────────────────────────────────────────────────

    async def submit_scan(
        self,
        user_id: uuid.UUID,
        request: ScanRequest,
    ) -> ScanSubmitResponse:
        """Submit a new scan for processing."""
        start_time = time.time()

        # Extract content based on scan type
        original_content = None
        uploaded_file_name = None
        uploaded_file_size = None
        uploaded_file_type = None
        input_summary = ""

        if isinstance(request, ScanTextRequest):
            original_content = request.text
            input_summary = request.text[:100] + ("..." if len(request.text) > 100 else "")

        elif isinstance(request, ScanURLRequest):
            original_content = str(request.url)
            input_summary = str(request.url)

        elif isinstance(request, ScanEmailRequest):
            original_content = f"From: {request.sender}\nSubject: {request.subject}\nBody: {request.body}"
            input_summary = f"Email: {request.subject} (from {request.sender})"

        elif isinstance(request, ScanSMSRequest):
            original_content = f"From: {request.country_code}{request.phone_number}\nMessage: {request.message}"
            input_summary = f"SMS from {request.country_code}{request.phone_number}: {request.message[:50]}..."

        elif isinstance(request, ScanWhatsAppRequest):
            original_content = f"From: {request.country_code}{request.phone_number}\nMessage: {request.message}\nMedia: {request.has_media}"
            input_summary = f"WhatsApp from {request.country_code}{request.phone_number}: {request.message[:50]}..."

        elif isinstance(request, ScanQRCodeRequest):
            uploaded_file_name = request.image_filename
            uploaded_file_size = request.image_size
            uploaded_file_type = "image/png"  # placeholder
            input_summary = "QR Code image upload"

        elif isinstance(request, ScanImageRequest):
            uploaded_file_name = request.filename
            uploaded_file_size = request.size
            uploaded_file_type = request.content_type
            input_summary = f"Image: {request.filename}"

        elif isinstance(request, ScanDocumentRequest):
            uploaded_file_name = request.filename
            uploaded_file_size = request.size
            uploaded_file_type = request.content_type
            input_summary = f"Document: {request.filename}"

        # Validate file uploads
        if uploaded_file_name and uploaded_file_size and uploaded_file_type:
            error = validate_file_upload(
                uploaded_file_name,
                uploaded_file_size,
                uploaded_file_type,
                request.scan_type,
            )
            if error:
                raise ValueError(error)

        # Create scan record
        session_id = request.session_id or f"sess_{uuid.uuid4().hex[:12]}"
        scan = await self.repo.create(
            user_id=user_id,
            scan_type=request.scan_type,
            original_content=original_content,
            uploaded_file_name=uploaded_file_name,
            uploaded_file_size=uploaded_file_size,
            uploaded_file_type=uploaded_file_type,
            status=ScanStatus.QUEUED,
            session_id=session_id,
        )

        # In production, this would be queued to a background worker
        # For now, process synchronously with mock AI
        scan = await self.repo.update_status(scan, ScanStatus.PROCESSING)

        # Mock AI analysis
        analysis = await self._mock_analyze(scan, original_content or input_summary)

        processing_time = int((time.time() - start_time) * 1000)

        scan = await self.repo.update_status(
            scan,
            ScanStatus.COMPLETED,
            processing_time_ms=processing_time,
        )

        scan = await self.repo.update_ai_results(scan, **analysis)

        return ScanSubmitResponse(
            scan_id=scan.id,
            status=scan.status,
            message="Scan completed successfully",
            estimated_time_ms=processing_time,
        )

    async def get_scan_result(self, scan_id: uuid.UUID, user_id: uuid.UUID) -> ScanResultResponse | None:
        """Get full scan result."""
        scan = await self.repo.get_by_id(scan_id)
        if not scan or scan.user_id != user_id:
            return None

        return self._build_scan_result(scan)

    async def get_scan_by_share_token(self, token: str) -> ScanResultResponse | None:
        """Get scan result by share token (public)."""
        scan = await self.repo.get_by_share_token(token)
        if not scan or not scan.is_public:
            return None

        return self._build_scan_result(scan)

    def _build_scan_result(self, scan: Scan) -> ScanResultResponse:
        """Build full scan result response."""
        ai_analysis = None
        if scan.ai_scam_probability is not None:
            ai_analysis = AIAnalysisResponse(
                scam_probability=scan.ai_scam_probability,
                trust_score=TrustScoreResponse(
                    score=scan.ai_trust_score or 0,
                    label=self._get_trust_label(scan.ai_trust_score or 0),
                    color=self._get_trust_color(scan.ai_trust_score or 0),
                    confidence=scan.ai_confidence or 0.0,
                ),
                threat_level=scan.ai_threat_level or "unknown",
                explanation=scan.ai_explanation or "",
                key_indicators=scan.ai_key_indicators or [],
                red_flags=[],
                positive_signals=[],
                recommended_action=self._get_mock_action(scan.ai_threat_level or "medium"),
                confidence=scan.ai_confidence or 0.0,
                model=scan.ai_model or "unknown",
                analysis_version=scan.ai_analysis_version or "unknown",
                processed_at=scan.ai_processed_at or scan.created_at,
            )

        virus_total = None
        if scan.vt_positives is not None:
            virus_total = VirusTotalResponse(
                positives=scan.vt_positives,
                total=scan.vt_total or 0,
                scan_date=scan.vt_scan_date or scan.created_at,
                permalink=scan.vt_permalink or "",
                detections=[],
                categories=[],
                reputation=scan.vt_reputation or 0,
            )

        ocr_result = None
        if scan.ocr_extracted_text:
            ocr_result = OCRResponse(
                extracted_text=scan.ocr_extracted_text,
                confidence=scan.ocr_confidence or 0.0,
                language=scan.ocr_language or "en",
                word_count=scan.ocr_word_count or 0,
                blocks=[],
            )

        community_report = None
        if scan.community_report_count is not None:
            community_report = CommunityReportResponse(
                id=str(scan.id),
                content_hash="",
                report_count=scan.community_report_count,
                first_reported=scan.created_at,
                last_reported=scan.updated_at,
                verified_scam=scan.community_verified_scam or False,
                categories=scan.community_categories or [],
                upvotes=0,
                downvotes=0,
            )

        return ScanResultResponse(
            id=scan.id,
            user_id=scan.user_id,
            scan_type=scan.scan_type,
            status=scan.status,
            input_summary=scan.original_content or scan.uploaded_file_name or "Scan",
            ai_analysis=ai_analysis,
            virus_total=virus_total,
            ocr_result=ocr_result,
            community_report=community_report,
            processing_time_ms=scan.processing_time_ms,
            is_public=scan.is_public,
            share_token=scan.share_token,
            created_at=scan.created_at,
            updated_at=scan.updated_at,
        )

    def _get_trust_label(self, score: int) -> str:
        if score >= 80:
            return "Trusted"
        elif score >= 60:
            return "Likely Safe"
        elif score >= 40:
            return "Caution Advised"
        elif score >= 20:
            return "High Risk"
        return "Dangerous"

    def _get_trust_color(self, score: int) -> str:
        if score >= 80:
            return "#10b981"
        elif score >= 60:
            return "#f59e0b"
        elif score >= 40:
            return "#f97316"
        elif score >= 20:
            return "#f43f5e"
        return "#7f1d1d"

    async def get_scan_history(
        self,
        user_id: uuid.UUID,
        page: int = 1,
        page_size: int = 20,
        status: str | None = None,
        scan_type: str | None = None,
    ) -> ScanHistoryResponse:
        """Get paginated scan history."""
        scans, total = await self.repo.get_user_scans(
            user_id,
            page=page,
            page_size=page_size,
            status=status,
            scan_type=scan_type,
        )

        items = [
            ScanHistoryItemResponse(
                id=s.id,
                scan_type=s.scan_type,
                input_summary=s.original_content or s.uploaded_file_name or "Scan",
                threat_level=s.ai_threat_level or "unknown",
                trust_score=s.ai_trust_score or 0,
                status=s.status,
                created_at=s.created_at,
            )
            for s in scans
        ]

        return ScanHistoryResponse(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=(total + page_size - 1) // page_size,
        )

    async def get_recent_scans(self, user_id: uuid.UUID, limit: int = 5) -> List[ScanHistoryItemResponse]:
        """Get recent scans for dashboard."""
        scans = await self.repo.get_recent_scans(user_id, limit)
        return [
            ScanHistoryItemResponse(
                id=s.id,
                scan_type=s.scan_type,
                input_summary=s.original_content or s.uploaded_file_name or "Scan",
                threat_level=s.ai_threat_level or "unknown",
                trust_score=s.ai_trust_score or 0,
                status=s.status,
                created_at=s.created_at,
            )
            for s in scans
        ]

    async def get_stats(self, user_id: uuid.UUID) -> dict:
        """Get scan statistics."""
        return await self.repo.get_stats(user_id)