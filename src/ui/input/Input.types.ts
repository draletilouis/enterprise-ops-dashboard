import type { HtmlHTMLAttributes } from "react";

export interface InputProps extends HtmlHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  isSuccess?: boolean;
  fullWidth?: boolean;  
}