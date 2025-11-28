import { forwardRef } from "react";

interface ToggleSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const ToggleSwitch = forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  ({ label, checked = false, onChange, disabled = false }, ref) => {
    return (
      <div className="flex items-center">
        {label && (
          <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
        )}
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          className={`
            relative w-11 h-6 rounded-full transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${checked 
              ? "bg-primary-600 dark:bg-primary-500" 
              : "bg-gray-300 dark:bg-gray-600"
            }
          `}
          onClick={() => !disabled && onChange && onChange(!checked)}
        >
          <span
            className={`
              block w-5 h-5 rounded-full bg-white shadow-md
              transform transition-transform
              ${checked ? "translate-x-6" : "translate-x-0.5"}
            `}
          />
        </button>
      </div>
    );
  }
);

ToggleSwitch.displayName = "ToggleSwitch";