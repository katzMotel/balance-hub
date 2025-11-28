import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const textAreaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textAreaId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textAreaId}
          className={`
            w-full px-4 py-2 rounded-lg border transition-colors
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2
            ${error 
              ? 'border-danger-500 focus:ring-danger-500' 
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
            }
            disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';