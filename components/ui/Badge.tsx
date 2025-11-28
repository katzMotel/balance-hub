import {HTMLAttributes, forwardRef} from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'success' | 'warning' | 'danger' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className = '', variant = 'neutral', size = 'md', children, ...props}, ref) => {
        // Base styles for all badges
        const baseStyles = 'inline-block font-medium rounded-full';

        // Variant styles
        const variantStyles = {
            success: 'bg-success-50 text-success-800 dark:bg-success-900 dark:text-success-300',
            warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            danger: 'bg-danger-50 text-danger-800 dark:bg-danger-900 dark:text-danger-300',
            neutral: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        };

        // Size styles
        const sizeStyles = {
            sm: 'px-2 py-0.5 text-xs',
            md: 'px-3 py-1 text-sm',
            lg: 'px-4 py-1.5 text-base',
        };

        // Combine all classes
        const badgeClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

        return (
            <span ref={ref} className={badgeClasses} {...props}>
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';