/**
 * Formats a string to a more friendly version. Capitalizes the
 * first letter of each word and replaces underscores with spaces.
 * @param str String to be converted to friendly string
 * @returns A friendly string
 */
export function toFriendlyString(str: string): string {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Gets the ISO week number of the date.
 * @param date Date to get the week number of
 * @returns The ISO week number
 * @see https://weeknumber.com/how-to/javascript
 */
export function getWeekNumber(date: Date): number {
  const dateCopy = new Date(date.getTime())
  dateCopy.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  dateCopy.setDate(dateCopy.getDate() + 3 - ((dateCopy.getDay() + 6) % 7))
  // January 4 is always in week 1.
  const week1 = new Date(dateCopy.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((dateCopy.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  )
}
