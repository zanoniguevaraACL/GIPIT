import './StatusButton.css';

interface StatusButtonProps {
  status: string;
}

const StatusButton = ({ status }: StatusButtonProps) => {
  const normalizedStatus = (status?.toString() || '').toLowerCase();

  return (
    <div className={`status-badge ${normalizedStatus}`}>
      <span className="status-dot"></span>
      <span className="status-text">{status}</span>
    </div>
  );
};

export default StatusButton;
