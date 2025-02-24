// eslint-disable-next-line react/prop-types
export default function LongButton({ text, type, bgcolor, color, width }) {
  return (
    <button
      type={type}
      className={`border-1 border-zinc-300 p-2 rounded-md ${bgcolor} ${color} ${width}`}
    >
      {text}
    </button>
  );
}
