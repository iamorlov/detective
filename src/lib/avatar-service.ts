export class AvatarService {
  private baseUrl = 'https://api.dicebear.com/7.x';
  
  // Different avatar styles for different character types
  private getAvatarStyle(character: any): string {
    const styles = ['avataaars', 'personas', 'open-peeps', 'micah', 'lorelei'];
    // Use character name to consistently get same style
    const index = character.name.length % styles.length;
    return styles[index];
  }

  generateAvatarUrl(character: any, size: number = 64): string {
    const style = this.getAvatarStyle(character);
    const seed = character.name.toLowerCase().replace(/\s/g, '');
    
    const params = new URLSearchParams({
      seed: seed,
      size: size.toString(),
      backgroundColor: character.isKiller ? 'ff4444' : '444444',
      backgroundType: 'gradientLinear'
    });

    return `${this.baseUrl}/${style}/svg?${params.toString()}`;
  }

  generateSuspiciousIcon(): string {
    // Generate a warning/suspicious icon
    return `${this.baseUrl}/icons/svg?seed=suspicious&icon=exclamation&backgroundColor=ff4444&foregroundColor=ffffff&size=24`;
  }
}