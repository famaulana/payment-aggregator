export default function Spinner({ size = 60, speed = 1.2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{
        animation: `spin ${speed}s linear infinite`,
      }}>
      <defs>
        <style>
          {`
            @keyframes spin {
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </defs>

      {/* Blue ring */}
      <circle cx="50" cy="50" r="42" stroke="#4a3fb4" strokeWidth="10" />

      {/* Red arc */}
      <path
        d="M 50 8 A 42 42 0 0 1 92 50"
        stroke="#ef3b5d"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
