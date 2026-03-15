import React, { useState, useEffect } from 'react';
import soundManager from '../utils/soundManager';

const SoundControl = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [volume, setVolume] = useState(0.3);

    useEffect(() => {
        setIsEnabled(soundManager.enabled);
        setVolume(soundManager.volume);
    }, []);

    const toggleSound = () => {
        const newState = soundManager.toggleEnabled();
        setIsEnabled(newState);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        soundManager.setVolume(newVolume);
        setVolume(newVolume);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/20">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSound}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title={isEnabled ? "Mute" : "Unmute"}
                >
                    {isEnabled ? (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                    )}
                </button>
                
                {isEnabled && (
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SoundControl;
