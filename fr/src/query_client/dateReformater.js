export default function dateFormatter(dateString) {
  const targetDate = new Date(dateString);
  const now = new Date();
  const diffTime = targetDate - now;

  if (diffTime <= 0) return 'Expired';

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} left`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  } else {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} left`;
  }
}

