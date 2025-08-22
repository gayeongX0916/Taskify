export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-gray-200 rounded-md ${className}`}
    >
      <div
        className="absolute top-0 left-0 h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          animation: "shimmer 1.5s infinite",
          transform: "translateX(-100%)",
        }}
      />
    </div>
  );
}
