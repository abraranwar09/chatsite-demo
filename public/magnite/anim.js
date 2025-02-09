document.addEventListener('DOMContentLoaded', function() {
    var lottieCar = lottie.loadAnimation({
        container: document.getElementById('lottieCar'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './assets/magnite.json' // Path to your Lottie JSON file
    });

    function animateCar() {
        const carElement = document.getElementById('lottieCar');
        carElement.style.transition = 'transform 5s linear';
        carElement.style.transform = 'translateX(100vw)';

        setTimeout(() => {
            carElement.style.transition = 'none';
            carElement.style.transform = 'translateX(-100px)';
        }, 5000);
    }

    setInterval(animateCar, 6000); // Adjust timing as needed

});
