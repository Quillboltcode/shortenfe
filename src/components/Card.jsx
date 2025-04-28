export function Card({ children, className = "", padding = "p-4", shadow = "shadow-lg", rounded = "rounded-xl" }) {
  return (
    <div className={`bg-white ${padding} ${shadow} ${rounded} ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}