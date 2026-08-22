import type { ProcessingStatus } from '../../types/document'

interface StatusBadgeProps {
  status: ProcessingStatus
}

function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-${status}`}>{status}</span>
}

export default StatusBadge
