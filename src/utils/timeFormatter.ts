/**
 * Format a Unix timestamp as a human-readable "ago" string
 * Supports seconds, minutes, hours, days, weeks, months, years
 */
export const formatTimeAgo = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  
  if (diff < 60) {
    return `${diff} second${diff !== 1 ? 's' : ''} ago`;
  }
  
  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }
  
  const hours = Math.floor(diff / 3600);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  
  const days = Math.floor(diff / 86400);
  if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
  
  const weeks = Math.floor(diff / 604800);
  if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  }
  
  const months = Math.floor(diff / 2592000);
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }
  
  const years = Math.floor(diff / 31536000);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
};