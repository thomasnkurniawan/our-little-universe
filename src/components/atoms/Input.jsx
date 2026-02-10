import { cn } from "../../utils/cn";

export default function Input({ className, preIcon, postIcon, border = true, ...props }) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center p-2",
        border && "border border-gray-300 rounded-lg",
        className,
      )}
    >
      {preIcon && preIcon}
      <input
        className={cn(
          "w-full border-none pe-2 text-sm focus:outline-none"
        )}
        {...props}
      />
      {postIcon && postIcon}
    </div>
  );
}
