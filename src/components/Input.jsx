export function Input({ type, value, onChange, placeholder, className }) {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-3 border border-gray-300 rounded-lg w-full ${className}`}
      />
    );
  }
  