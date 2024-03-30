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
    .join(" ");
}
