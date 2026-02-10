export default function Divider({ position = "top" }) {
  return (
    <div
      className={`divider-line ${position === "top" ? "top-0" : "bottom-0"}`}
    />
  );
}
