"""
Authentication API router.
Endpoints for user registration, login, token management.
"""
from datetime import datetime, timedelta
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt

from ..config import settings
from ..database import get_db
from ..models.user import User
from ..repositories.user_repository import UserRepository
from ..schemas.auth import (
    UserCreate,
    UserPublic,
    LoginRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    VerifyEmailRequest,
    RefreshTokenRequest,
    AuthResponse,
    TokenPair,
    MessageResponse,
)
from ..api.dependencies import get_current_user
from ..utils.security import hash_password, verify_password, create_access_token, create_refresh_token


router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer(auto_error=False)


# ─── Helper Functions ─────────────────────────────────────────────────────────────

def create_token_pair(user: User, remember_me: bool = False) -> TokenPair:
    """Create access and refresh token pair."""
    access_token = create_access_token(
        subject=str(user.id),
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    refresh_token = create_refresh_token(
        subject=str(user.id),
        remember_me=remember_me,
    )
    return TokenPair(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


# ─── Auth Endpoints ────────────────────────────────────────────────────────────────

@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register new user",
)
async def register(
    request: UserCreate,
    db: AsyncSession = Depends(get_db),
) -> AuthResponse:
    """Register a new user account."""
    user_repo = UserRepository(db)

    # Check if email exists
    if await user_repo.email_exists(request.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    # Create user
    password_hash = hash_password(request.password)
    user = await user_repo.create(
        full_name=request.full_name,
        email=request.email,
        password_hash=password_hash,
    )

    tokens = create_token_pair(user)
    return AuthResponse(
        user=UserPublic.model_validate(user),
        tokens=tokens,
        message="Account created successfully",
    )


@router.post(
    "/login",
    response_model=AuthResponse,
    summary="User login",
)
async def login(
    request: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
) -> AuthResponse:
    """Authenticate user and return tokens."""
    user_repo = UserRepository(db)
    user = await user_repo.get_by_email(request.email)

    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Update last login
    await user_repo.update_last_login(user)

    tokens = create_token_pair(user, request.remember_me)
    return AuthResponse(
        user=UserPublic.model_validate(user),
        tokens=tokens,
        message="Login successful",
    )


@router.post(
    "/refresh",
    response_model=TokenPair,
    summary="Refresh access token",
)
async def refresh_token(
    request: RefreshTokenRequest,
    db: AsyncSession = Depends(get_db),
) -> TokenPair:
    """Refresh access token using refresh token."""
    try:
        payload = jwt.decode(
            request.refresh_token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")

        if user_id is None or token_type != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    user_repo = UserRepository(db)
    user = await user_repo.get_by_id(UUID(user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return create_token_pair(user)


@router.post(
    "/logout",
    response_model=MessageResponse,
    summary="User logout",
)
async def logout(
    current_user: User = Depends(get_current_user),
) -> MessageResponse:
    """Logout user (client should discard tokens)."""
    return MessageResponse(message="Logged out successfully")


@router.get(
    "/me",
    response_model=UserPublic,
    summary="Get current user profile",
)
async def get_me(
    current_user: User = Depends(get_current_user),
) -> UserPublic:
    """Get current authenticated user's profile."""
    return UserPublic.model_validate(current_user)


@router.post(
    "/forgot-password",
    response_model=MessageResponse,
    summary="Request password reset",
)
async def forgot_password(
    request: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db),
) -> MessageResponse:
    """Request password reset email."""
    user_repo = UserRepository(db)
    user = await user_repo.get_by_email(request.email)

    # Always return success to prevent email enumeration
    if user:
        # In production: generate reset token, send email
        pass

    return MessageResponse(
        message="If the email exists, a password reset link has been sent",
    )


@router.post(
    "/reset-password",
    response_model=MessageResponse,
    summary="Reset password with token",
)
async def reset_password(
    request: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db),
) -> MessageResponse:
    """Reset password using token from email."""
    # In production: verify token, get user_id, update password
    return MessageResponse(message="Password reset successfully")


@router.post(
    "/verify-email",
    response_model=MessageResponse,
    summary="Verify email address",
)
async def verify_email(
    request: VerifyEmailRequest,
    db: AsyncSession = Depends(get_db),
) -> MessageResponse:
    """Verify user's email address."""
    # In production: verify token, get user, update email_verified
    return MessageResponse(message="Email verified successfully")