"""
Scan API router.
Endpoints for submitting scans and retrieving results.
"""
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query, File, UploadFile, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List

from ..database import get_db
from ..schemas.scan import (
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
    FILE_VALIDATION,
)
from ..services.scan_service import ScanService
from ..api.dependencies import get_current_user
from ..models.user import User


router = APIRouter(prefix="/scan", tags=["scan"])


def get_scan_service(db: AsyncSession = Depends(get_db)) -> ScanService:
    """Dependency to get scan service."""
    return ScanService(db)


# ─── Scan Submission Endpoints ────────────────────────────────────────────────────

@router.post(
    "/text",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit text for scanning",
)
async def scan_text(
    request: ScanTextRequest,
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Submit plain text content for AI analysis."""
    return await service.submit_scan(current_user.id, request)


@router.post(
    "/url",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit URL for scanning",
)
async def scan_url(
    request: ScanURLRequest,
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Submit a website URL for scanning."""
    return await service.submit_scan(current_user.id, request)


@router.post(
    "/email",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit email for scanning",
)
async def scan_email(
    request: ScanEmailRequest,
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Submit email content for analysis."""
    return await service.submit_scan(current_user.id, request)


@router.post(
    "/sms",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit SMS for scanning",
)
async def scan_sms(
    request: ScanSMSRequest,
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Submit SMS message for analysis."""
    return await service.submit_scan(current_user.id, request)


@router.post(
    "/whatsapp",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit WhatsApp message for scanning",
)
async def scan_whatsapp(
    request: ScanWhatsAppRequest,
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Submit WhatsApp message for analysis."""
    return await service.submit_scan(current_user.id, request)


@router.post(
    "/qr-code",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit QR code image for scanning",
)
async def scan_qr_code(
    request: ScanQRCodeRequest,
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Submit QR code image metadata for scanning."""
    return await service.submit_scan(current_user.id, request)


@router.post(
    "/image",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit image for scanning",
)
async def scan_image(
    request: ScanImageRequest,
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Submit image metadata for scanning."""
    return await service.submit_scan(current_user.id, request)


@router.post(
    "/document",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit document (PDF) for scanning",
)
async def scan_document(
    request: ScanDocumentRequest,
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Submit document metadata for scanning."""
    return await service.submit_scan(current_user.id, request)


# ─── File Upload Endpoints ────────────────────────────────────────────────────────

@router.post(
    "/upload/image",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload and scan image file",
)
async def upload_image(
    file: UploadFile = File(...),
    session_id: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Upload an image file and submit for scanning."""
    # Validate file
    content = await file.read()
    size = len(content)

    error = validate_file_upload(
        file.filename or "unknown",
        size,
        file.content_type or "application/octet-stream",
        "image",
    )
    if error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    # Create request
    request = ScanImageRequest(
        filename=file.filename or "image.png",
        size=size,
        content_type=file.content_type or "image/png",
        session_id=session_id,
    )

    return await service.submit_scan(current_user.id, request)


@router.post(
    "/upload/document",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload and scan document (PDF)",
)
async def upload_document(
    file: UploadFile = File(...),
    session_id: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Upload a PDF document and submit for scanning."""
    # Validate file
    content = await file.read()
    size = len(content)

    error = validate_file_upload(
        file.filename or "unknown",
        size,
        file.content_type or "application/octet-stream",
        "document",
    )
    if error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    # Create request
    request = ScanDocumentRequest(
        filename=file.filename or "document.pdf",
        size=size,
        content_type=file.content_type or "application/pdf",
        session_id=session_id,
    )

    return await service.submit_scan(current_user.id, request)


@router.post(
    "/upload/qr-code",
    response_model=ScanSubmitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload and scan QR code image",
)
async def upload_qr_code(
    file: UploadFile = File(...),
    session_id: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanSubmitResponse:
    """Upload a QR code image and submit for scanning."""
    # Validate file
    content = await file.read()
    size = len(content)

    error = validate_file_upload(
        file.filename or "unknown",
        size,
        file.content_type or "application/octet-stream",
        "qr_code",
    )
    if error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    # Create request
    request = ScanQRCodeRequest(
        image_filename=file.filename or "qrcode.png",
        image_size=size,
        session_id=session_id,
    )

    return await service.submit_scan(current_user.id, request)


# ─── Scan Result Endpoints ────────────────────────────────────────────────────────

@router.get(
    "/{scan_id}",
    response_model=ScanResultResponse,
    summary="Get scan result by ID",
)
async def get_scan(
    scan_id: UUID,
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanResultResponse:
    """Get detailed scan result."""
    result = await service.get_scan_result(scan_id, current_user.id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan not found",
        )
    return result


@router.get(
    "/shared/{token}",
    response_model=ScanResultResponse,
    summary="Get public scan result by share token",
)
async def get_shared_scan(
    token: str,
    service: ScanService = Depends(get_scan_service),
) -> ScanResultResponse:
    """Get public scan result via share token (no auth required)."""
    result = await service.get_scan_by_share_token(token)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan not found or not shared",
        )
    return result


# ─── Scan History Endpoints ───────────────────────────────────────────────────────

@router.get(
    "/history",
    response_model=ScanHistoryResponse,
    summary="Get user's scan history",
)
async def get_scan_history(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    scan_status: Optional[ScanStatus] = Query(None, alias="status", description="Filter by status"),
    scan_type: Optional[str] = Query(None, description="Filter by scan type"),
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> ScanHistoryResponse:
    """Get paginated scan history for the current user."""
    return await service.get_scan_history(
        current_user.id,
        page=page,
        page_size=page_size,
        status=scan_status,
        scan_type=scan_type,
    )


@router.get(
    "/history/recent",
    response_model=List[ScanHistoryItemResponse],
    summary="Get recent scans for dashboard",
)
async def get_recent_scans(
    limit: int = Query(5, ge=1, le=20, description="Number of recent scans"),
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> List[ScanHistoryItemResponse]:
    """Get recent scans for dashboard display."""
    return await service.get_recent_scans(current_user.id, limit)


@router.get(
    "/stats",
    summary="Get user's scan statistics",
)
async def get_scan_stats(
    current_user: User = Depends(get_current_user),
    service: ScanService = Depends(get_scan_service),
) -> dict:
    """Get scan statistics for the current user."""
    return await service.get_stats(current_user.id)


# ─── Validation Config Endpoint ───────────────────────────────────────────────────

@router.get(
    "/validation/config",
    summary="Get file upload validation configuration",
)
async def get_validation_config() -> dict:
    """Get file upload validation rules for frontend."""
    return {
        "max_size_mb": FILE_VALIDATION.max_size_mb,
        "allowed_image_types": FILE_VALIDATION.allowed_image_types,
        "allowed_document_types": FILE_VALIDATION.allowed_document_types,
        "allowed_qr_types": FILE_VALIDATION.allowed_qr_types,
    }