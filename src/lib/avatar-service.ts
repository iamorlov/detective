/**
 * Service for generating consistent avatar URLs for characters
 * Uses DiceBear API to create deterministic avatars based on character names
 */
export class AvatarService {
  private baseUrl = 'https://api.dicebear.com/9.x';

  /**
   * Determines avatar style based on character properties
   * Currently uses single style but can be extended for variety
   */
  private getAvatarStyle(character: any): string {
    const styles = ['lorelei-neutral'];
    // Use character name length to ensure consistent style selection
    const index = character.name.length % styles.length;
    return styles[index];
  }

  /**
   * Generates a deterministic avatar URL for a character
   * Same character will always get the same avatar
   */
  generateAvatarUrl(character: any, size: number = 64): string {
    const style = this.getAvatarStyle(character);
    // Remove spaces from name to create consistent seed
    const seed = character.name.toLowerCase().replace(/\s/g, '');

    const params = new URLSearchParams({
      seed: seed,
      size: size.toString(),
      backgroundColor: '615fff', // Blue theme to match game design
      backgroundType: 'gradientLinear'
    });

    return `${this.baseUrl}/${style}/svg?${params.toString()}`;
  }

  /**
   * Generates a warning icon for suspicious behavior indicators
   * Used in UI to highlight potential lies or inconsistencies
   */
  generateSuspiciousIcon(): string {
    return `${this.baseUrl}/icons/svg?seed=suspicious&icon=exclamation&backgroundColor=615fff&foregroundColor=ffffff&size=24`;
  }
}