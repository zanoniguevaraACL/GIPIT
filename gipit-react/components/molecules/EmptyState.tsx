import "./emptyState.css";

function EmptyState({
  icon,
  title,
  subheading,
}: {
  icon: React.ReactElement;
  title: string;
  subheading: string;
}) {
  return (
    <div className="empty-state-container">
      {icon}
      <h4>{title}</h4>
      <p className="text-14">{subheading}</p>
    </div>
  );
}

export default EmptyState;
