export const Spinner = ({ size = 24 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      border: "4px solid #ddd",
      borderTop: "4px solid #3b82f6",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    }}
  />
);