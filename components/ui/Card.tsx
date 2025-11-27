import {HTMLAttributes, forwardRef} from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}
export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', hover = false, children, ...props}, ref) => {
        const baseStyles = 'bg-white rounded-lg shadow border border-gray-200 p-6';
        const hoverStyles = hover ? 'transition-shadow hover:shadow-md' : '';
        const classes = `${baseStyles} ${hoverStyles} ${className}`;
        
        return (
            <div ref={ref} className={classes} {...props}>
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`mb-4 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <h3 ref={ref} className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
        {children}
      </h3>
    );
  }
);
CardTitle.displayName = 'CardTitle';
