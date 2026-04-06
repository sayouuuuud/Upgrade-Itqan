/**
 * Utility function to combine class names without external dependencies
 * Simple implementation for basic class concatenation
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

