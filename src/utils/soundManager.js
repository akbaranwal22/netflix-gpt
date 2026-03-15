class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.3;
        this.audioContext = null;
        
        // Initialize audio context on first user interaction
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    // Create simple sound effects using Web Audio API
    createTone(frequency, duration, type = 'sine') {
        if (!this.audioContext || !this.enabled) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Sound effect methods
    playHoverSound() {
        this.createTone(800, 0.1, 'sine');
    }

    playClickSound() {
        this.createTone(600, 0.15, 'square');
    }

    playScrollSound() {
        this.createTone(400, 0.05, 'triangle');
    }

    playSuccessSound() {
        this.createTone(523, 0.1); // C5
        setTimeout(() => this.createTone(659, 0.1), 100); // E5
        setTimeout(() => this.createTone(784, 0.2), 200); // G5
    }

    playErrorSound() {
        this.createTone(300, 0.2, 'sawtooth');
    }

    playNotificationSound() {
        this.createTone(880, 0.1); // A5
        setTimeout(() => this.createTone(1047, 0.15), 150); // C6
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    toggleEnabled() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Resume audio context if suspended (browser requirement)
    resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager;
