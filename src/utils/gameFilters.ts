
/**
 * Returns true if the game is allowed to be shown (not adults-only and has esrb_rating).
 */
export function isGameAllowed(game: { esrb_rating?: { slug?: string } } | undefined | null): boolean {
  if (!game || !game.esrb_rating || game.esrb_rating.slug === "adults-only") {
    return false;
  }
  return true;
}
