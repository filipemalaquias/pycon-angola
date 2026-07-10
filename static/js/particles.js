/* ========================================
   PARTICLES BACKGROUND
   ======================================== */

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout;
    
    // Configuration
    const CONFIG = {
        particleCount: 80,
        maxSize: 3,
        minSize: 1,
        speed: 0.5,
        opacity: 0.4,
        color: '#FFD43B',
        connectionDistance: 150,
        connectionOpacity: 0.1
    };
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;
            this.speedX = (Math.random() - 0.5) * CONFIG.speed;
            this.speedY = (Math.random() - 0.5) * CONFIG.speed;
            this.opacity = Math.random() * CONFIG.opacity + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            
            // Mouse interaction
            if (isMouseMoving) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    this.x -= dx * force * 0.01;
                    this.y -= dy * force * 0.01;
                }
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = CONFIG.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < CONFIG.particleCount; i++) {
            particles.push(new Particle());
        }
    }
    createParticles();
    
    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < CONFIG.connectionDistance) {
                    const opacity = (1 - distance / CONFIG.connectionDistance) * CONFIG.connectionOpacity;
                    ctx.beginPath();
                    ctx.strokeStyle = CONFIG.color;
                    ctx.globalAlpha = opacity;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY + window.scrollY;
        isMouseMoving = true;
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    // Update particles on scroll
    window.addEventListener('scroll', () => {
        // Particles follow scroll
        canvas.height = document.documentElement.scrollHeight;
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// Export for use in main.js
export default initParticles;