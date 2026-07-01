/**
 * TruChek — Input Component
 * Premium text input with icon support, validation states, and labels
 */

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================
// INPUT
// ============================================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:       string;
  error?:       string;
  hint?:        string;
  leftIcon?:    React.ReactNode;
  rightIcon?:   React.ReactNode;
  leftAddon?:   React.ReactNode;
  rightAddon?:  React.ReactNode;
  isLoading?:   boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#f1f5f9] select-none"
          >
            {label}
            {props.required && (
              <span className="text-[#f43f5e] ml-1" aria-hidden>*</span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div
          className={cn(
            "flex items-center",
            "rounded-lg border bg-white/4",
            "transition-all duration-200",
            hasError
              ? "border-[#f43f5e] focus-within:border-[#f43f5e] focus-within:ring-2 focus-within:ring-[rgba(244,63,94,0.25)]"
              : "border-white/10 focus-within:border-[#6366f1] focus-within:ring-2 focus-within:ring-[rgba(99,102,241,0.2)]",
            disabled && "opacity-40 pointer-events-none",
          )}
        >
          {/* Left addon */}
          {leftAddon && (
            <div className="flex items-center pl-3 pr-2 text-[#475569] text-sm select-none shrink-0 border-r border-white/8 mr-3">
              {leftAddon}
            </div>
          )}

          {/* Left icon */}
          {leftIcon && !leftAddon && (
            <div className="pl-3 text-[#475569] shrink-0">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={cn(
              "flex-1 min-w-0 bg-transparent",
              "text-sm text-[#f1f5f9] placeholder:text-[#334155]",
              "px-3 py-2.5",
              "outline-none",
              "disabled:cursor-not-allowed",
              (leftIcon && !leftAddon) && "pl-2",
              rightIcon && "pr-2",
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div className="pr-3 text-[#475569] shrink-0">
              {rightIcon}
            </div>
          )}

          {/* Right addon */}
          {rightAddon && (
            <div className="flex items-center pr-3 pl-2 text-[#475569] text-sm select-none shrink-0 border-l border-white/8 ml-3">
              {rightAddon}
            </div>
          )}
        </div>

        {/* Error / Hint */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-[#fb7185] flex items-center gap-1 mt-0.5"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="text-xs text-[#475569] mt-0.5"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ============================================================
// TEXTAREA
// ============================================================

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?:       string;
  error?:       string;
  hint?:        string;
  resize?:      "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, resize = "vertical", id, disabled, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#f1f5f9] select-none"
          >
            {label}
            {props.required && (
              <span className="text-[#f43f5e] ml-1" aria-hidden>*</span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            "w-full rounded-lg border bg-white/4",
            "text-sm text-[#f1f5f9] placeholder:text-[#334155]",
            "px-3 py-2.5",
            "outline-none",
            "transition-all duration-200",
            "min-h-[100px]",
            resize === "none"       && "resize-none",
            resize === "vertical"   && "resize-y",
            resize === "horizontal" && "resize-x",
            resize === "both"       && "resize",
            hasError
              ? "border-[#f43f5e] focus:border-[#f43f5e] focus:ring-2 focus:ring-[rgba(244,63,94,0.25)]"
              : "border-white/10 focus:border-[#6366f1] focus:ring-2 focus:ring-[rgba(99,102,241,0.2)]",
            disabled && "opacity-40 cursor-not-allowed",
            className
          )}
          {...props}
        />

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-[#fb7185] mt-0.5">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-[#475569] mt-0.5">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
