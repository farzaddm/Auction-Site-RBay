export default function formatTimeLeft(createdAt, duration) {
  const startDate = new Date(createdAt);
  const endDate = new Date(startDate.getTime() + duration * 60000);
  const now = new Date();

  if (endDate < now) {
    return 'Expired';
  }

  const diffInMs = endDate - now;

  const diffInMinutes = Math.round(diffInMs / (1000 * 60));
  const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.round(diffInDays / 7);

  if (diffInWeeks >= 1) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} left`;
  }

  if (diffInDays >= 1) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} left`;
  }

  if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} left`;
  }

  if (diffInMinutes >= 1) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} left`;
  }

  return 'Less than a minute left';
}
