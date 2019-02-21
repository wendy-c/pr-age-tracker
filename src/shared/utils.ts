export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('default', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false}).format(date)
}
