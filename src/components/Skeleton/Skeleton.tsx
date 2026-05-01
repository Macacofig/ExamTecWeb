import "./Skeleton.scss";

export default function Skeleton() {
  return (
    <div className="grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card" />
      ))}
    </div>
  );
}