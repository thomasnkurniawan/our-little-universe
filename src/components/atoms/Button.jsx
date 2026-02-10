export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition active:scale-[0.98]";

  const variants = {
    primary:
      "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm",
    ghost:
      "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
