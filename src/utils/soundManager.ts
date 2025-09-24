/**
 * Sound Manager Utility for Enhanced Win/Loss Animations
 * Handles audio playback with volume control and error handling
 */

export class SoundManager {
  private static instance: SoundManager;
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  /**
   * Play a sound file with specified volume
   * @param soundFile - Path to the sound file
   * @param volume - Volume level (0-1), defaults to 0.15 (15%)
   */
  async playSound(soundFile: string, volume: number = 0.15): Promise<void> {
    try {
      // Check if audio is already cached
      let audio = this.audioCache.get(soundFile);
      
      if (!audio) {
        // Create new audio element and cache it
        audio = new Audio(soundFile);
        audio.preload = 'auto';
        this.audioCache.set(soundFile, audio);
      }

      // Clone the audio to allow overlapping sounds
      const audioClone = audio.cloneNode() as HTMLAudioElement;
      audioClone.volume = Math.max(0, Math.min(1, volume));
      
      // Play the sound with error handling
      audioClone.play().catch(error => {
        console.warn('Sound playback failed:', error);
      });

    } catch (error) {
      console.error('Sound manager error:', error);
    }
  }

  /**
   * Play win sound at 15% volume
   */
  playWinSound(): void {
    this.playSound('/win.mp3', 0.15);
  }

  /**
   * Play loss sound at 15% volume
   */
  playLossSound(): void {
    this.playSound('/lose.mp3', 0.15);
  }

  /**
   * Clear cached audio elements to free memory
   */
  clearCache(): void {
    this.audioCache.clear();
  }
}

// Export singleton instance
export const soundManager = SoundManager.getInstance();