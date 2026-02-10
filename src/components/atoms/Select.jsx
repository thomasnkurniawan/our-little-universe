import { cn } from "../../utils/cn";

export default function Select({
  id,
  className,
  items,
  preIcon,
  postIcon,
  border = true,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center p-2",
        border && "border border-gray-300 rounded-lg",
        className,
      )}
    >
      {preIcon && preIcon}
      <select
        id={id}
        className={cn(
          "w-full border-none pe-2 text-base focus:outline-none",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {postIcon && postIcon}
    </div>
  );
}
