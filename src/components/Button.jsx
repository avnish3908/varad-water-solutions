import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component adhering to prompt Section 16:
 * - Primary: Primary Blue (#256B8A) with White text. Hover -> Deep Ocean (#123B52)
 * - Secondary: White background (#FFFFFF) with Primary Blue border (#256B8A) and Dark Ink text (#17252D). Hover -> Pale Blue (#E8F2F7)
 * - Ghost: Transparent with Primary Blue / Ink text
 * - Radius: 999px (rounded-full)
 */
export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  onClick,
  showArrow = true,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseClasses = "group inline-flex items-center justify-center font-medium text-sm sm:text-base px-6 py-3 rounded-full transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primaryBlue active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variantClasses = {
    primary: "bg-[#2C7DA0] text-white font-semibold hover:bg-[#123B52] hover:shadow-[0_8px_25px_rgba(18,59,82,0.18)]",
    secondary: "bg-brand-white text-brand-ink border border-brand-border hover:border-[#2C7DA0] hover:bg-[#E8F3F8] hover:text-[#123B52] transition-colors shadow-subtle",
    ghost: "bg-transparent text-brand-bodyText hover:text-brand-ink hover:bg-[#E8F3F8]/50",
    light: "bg-[#E8F3F8] text-[#2C7DA0] font-semibold hover:bg-[#DCECF5] hover:text-[#123B52]",
  };

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1.5 text-current shrink-0" />
      )}
    </>
  );

  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
