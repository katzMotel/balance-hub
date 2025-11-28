import {HTMLAttributes, forwardRef} from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}
export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', hover = false, children, ...props}, ref) => {
        const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6';
        const hoverStyles = hover ? 'transition-all hover:shadow-lg hover:scale-105' : '';
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
      <h3 ref={ref} className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`} {...props}>
        {children}
      </h3>
    );
  }
);


CardTitle.displayName = 'CardTitle';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`text-gray-700 dark:text-gray-300 ${className}`} 
      {...props}>
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'CardContent';