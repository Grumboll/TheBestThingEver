document.addEventListener('alpine:init', () => {
    Alpine.data('randomAnimation', () => ({
        animations: [
            'click-pulse',
            'click-spin', 
            'click-bounce',
            'click-flash',
            'click-shake',
            'click-wobble',
            'click-float',
            'click-squeeze',
            'click-flip',
            'click-jelly',
            'click-rubber',
            'click-tada',
            'click-heart',
            'click-swing',
            'click-glow',
            'click-slide-left',
            'click-slide-right',
            'click-zoom',
            'click-drip'
        ],
        sounds: [
            'sounds/cartoon-quick-splat.wav',
            'sounds/cartoon-toy-whistle.wav',
            'sounds/crowd-laugh.wav',
            'sounds/fairy-glitter.wav',
            'sounds/girls-audience-applause.wav',
            'sounds/hard-pop-click.wav',
            'sounds/magic-notification-ring.wav',
            'sounds/sick-man-sneeze.wav'
        ],
        currentAnimation: '',
        soundPlaying: false,
        audio: null,
        
        playRandomEffect() {
            // Always play animation
            this.currentAnimation = '';
            
            setTimeout(() => {
                const animIndex = Math.floor(Math.random() * this.animations.length);
                this.currentAnimation = this.animations[animIndex];
                
                // Only play sound if none is playing
                if (!this.soundPlaying) {
                    const soundIndex = Math.floor(Math.random() * this.sounds.length);
                    this.playSound(this.sounds[soundIndex]);
                }
                
                setTimeout(() => this.currentAnimation = '', 800);
            }, 10);
        },
        
        playSound(url) {
            this.soundPlaying = true;
            
            // Stop previous sound
            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }
            
            // Play new sound
            this.audio = new Audio(url);
            this.audio.volume = 0.7;
            
            this.audio.play().catch(e => {
                console.log("Sound error:", e);
                this.soundPlaying = false;
            });
            
            // Reset when sound ends
            this.audio.onended = () => {
                this.soundPlaying = false;
            };
            
            // Safety timeout (3 seconds max)
            setTimeout(() => {
                if (this.soundPlaying) {
                    this.soundPlaying = false;
                }
            }, 3000);
        }
    }));
});