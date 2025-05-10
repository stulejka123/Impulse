// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (home link)
            if(targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Download button functionality
    const downloadBtn = document.getElementById('download-btn');
    const progressBar = document.getElementById('progress-bar');
    const downloadProgress = document.getElementById('download-progress');
    const downloadStatus = document.getElementById('download-status');
    
    if(downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Disable the button during "download"
            this.disabled = true;
            this.textContent = 'Downloading...';
            
            // Show progress elements
            downloadProgress.style.display = 'block';
            downloadStatus.style.display = 'block';
            downloadStatus.textContent = 'Preparing download...';
            
            // Simulate download progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Update status
                    downloadStatus.textContent = 'Download complete! Starting installation...';
                    
                    // After a short delay, show completion
                    setTimeout(() => {
                        downloadBtn.textContent = 'Download Complete';
                        downloadStatus.textContent = 'Your download has finished. Run the installer to get started.';
                        
                        // Create a simulated download (would normally be a real file download)
                        simulateFileDownload();
                    }, 1500);
                }
                
                // Update progress bar
                progressBar.style.width = `${progress}%`;
                downloadStatus.textContent = `Downloading: ${Math.round(progress)}%`;
            }, 300);
        });
    }
    
    // Function to simulate a file download (in a real site this would trigger an actual download)
    function simulateFileDownload() {
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'Impulse.exe';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Add animation for feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Use Intersection Observer if supported
    if('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        featureCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
});