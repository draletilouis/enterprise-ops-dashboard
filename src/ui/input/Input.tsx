import { forwardRef, useId } from 'react';
import type { InputProps } from './Input.types';
import styles from './Input.module.css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      isSuccess = false,
      fullWidth = true,
      className,
      id: providedId,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    
    const hasError = Boolean(error);
    const showSuccess = isSuccess && !hasError;
    
    const wrapperClasses = [
      styles.wrapper,
      fullWidth && styles.fullWidth,
    ]
      .filter(Boolean)
      .join(' ');
    
    const inputClasses = [
      styles.input,
      hasError && styles.inputError,
      showSuccess && styles.inputSuccess,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : 
            undefined
          }
          {...rest}
        />
        
        {hasError && (
          <span id={`${inputId}-error`} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
        
        {!hasError && helperText && (
          <span id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';