document.addEventListener('DOMContentLoaded', () => {
    const videoOverlay = document.getElementById('videoOverlay');
    const introVideo = document.getElementById('introVideo');
    const skipButton = document.getElementById('skipButton');

    // Function to hide the video overlay
    function hideVideoOverlay() {
        videoOverlay.style.display = 'none';
    }

    // Event listener for video end
    introVideo.addEventListener('ended', hideVideoOverlay);

    // Event listener for skip button
    skipButton.addEventListener('click', hideVideoOverlay);

    // Automatically play the video on load
    introVideo.play();
});
