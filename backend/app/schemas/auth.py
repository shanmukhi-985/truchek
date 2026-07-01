"""
Authentication Pydantic schemas (request/response models).
"""
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field, field_validator
import re


# ─── Validators ──────────────────────────────────────────────────────────────────

def validate_password(password: str) -> str:
    """Validate password strength."""
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters")
    if not re.search(r"[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter")
    if not re.search(r"[a-z]", password):
        raise ValueError("Password must contain at least one lowercase letter")
    if not re.search(r"[0-9]", password):
        raise ValueError("Password must contain at least one number")
    if not re.search(r"[^A-Za-z0-9]", password):
        raise ValueError("Password must contain at least one special character")
    return password


# ─── User Schemas ─────────────────────────────────────────────────────────────────

class UserBase(BaseModel):
    """Base user schema."""
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr


class UserCreate(UserBase):
    """Schema for user registration."""
    password: str = Field(..., min_length=8, max_length=128)

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        return validate_password(v)

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, v: str) -> str:
        if not re.match(r"^[a-zA-Z\s'\-]+$", v):
            raise ValueError("Full name can only contain letters, spaces, hyphens, and apostrophes")
        return v.strip()


class UserPublic(BaseModel):
    """Public user schema (returned in responses)."""
    id: UUID
    full_name: str
    email: EmailStr
    email_verified: bool
    avatar: str | None
    role: str
    created_at: datetime
    updated_at: datetime
    last_login: datetime | None

    model_config = {"from_attributes": True}


# ─── Auth Request Schemas ──────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    """Login request schema."""
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=128)
    remember_me: bool = False


class ForgotPasswordRequest(BaseModel):
    """Forgot password request schema."""
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    """Reset password request schema."""
    token: str = Field(..., min_length=1)
    password: str = Field(..., min_length=8, max_length=128)

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        return validate_password(v)


class VerifyEmailRequest(BaseModel):
    """Email verification request schema."""
    token: str = Field(..., min_length=1)


class RefreshTokenRequest(BaseModel):
    """Refresh token request schema."""
    refresh_token: str = Field(..., min_length=1)


# ─── Auth Response Schemas ─────────────────────────────────────────────────────────

class TokenPair(BaseModel):
    """JWT token pair."""
    access_token: str
    refresh_token: str
    token_type: str = "Bearer"
    expires_in: int  # seconds


class AuthResponse(BaseModel):
    """Authentication response with user + tokens."""
    user: UserPublic
    tokens: TokenPair
    message: str | None = None


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
    success: bool = True
