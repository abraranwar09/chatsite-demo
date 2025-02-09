//test tool to open google search in a new tab
async function openGoogle(query) {
    console.log(query);
    // Open new tab with Google search
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
    console.log(`Google search opened with query: ${query}`);

    return {
        "status": "success",
        "message": `Google search completed for ${query}`
    };
}

async function displayComponent(component_id, message, data) {
    console.log(component_id);
    console.log(message);
    console.log(data);

    const component = await fetch(`/api/components/${component_id}`);
    const componentData = await component.json();
    console.log(componentData);

    displayMessage(message, 'ai');
    chatMessages.scrollTop = chatMessages.scrollHeight;


    if (componentData.component_name === 'button-component') {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.id = 'buttonContainer'
        document.querySelector('.chat-messages').appendChild(buttonContainer);
        
        for (const item of data) {
            console.log(item.button_text);
            // Use a regular expression to replace all occurrences of [ButtonText]
            const button = componentData.component_html.replace(/\[ButtonText\]/g, item.button_text);
            console.log(button);
            buttonContainer.innerHTML += button;

        }

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. Simply ask the user to select one of the options above` 
        };
    };

    if (componentData.component_name === 'vici-button') {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.id = 'buttonContainer'
        document.querySelector('.chat-messages').appendChild(buttonContainer);
        
        for (const item of data) {
            console.log(item.button_text);
            // Use a regular expression to replace all occurrences of [ButtonText]
            const button = componentData.component_html.replace(/\[ButtonText\]/g, item.button_text);
            console.log(button);
            buttonContainer.innerHTML += button;

        }

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. Simply ask the user to select one of the options above` 
        };
    }

    if (componentData.component_name === 'product-component') {
        const productContainer = document.createElement('div');
        productContainer.className = 'product-container';
        productContainer.id = 'productContainer';
        productContainer.style.display = 'flex';
        productContainer.style.flexWrap = 'wrap';
        productContainer.style.justifyContent = 'space-between';
        document.querySelector('.chat-messages').appendChild(productContainer);

        for (const item of data) {
            console.log(item.main_text);
            console.log(item.image);
            console.log(item.button_text);
            console.log(item.button_link);

            const productHTML = componentData.component_html
                .replace(/\[ProductTitle\]/g, item.main_text)
                .replace(/\[ProductImage\]/g, item.image)
                .replace(/\[ProductPrice\]/g, item.price)
                .replace(/\[ButtonText\]/g, item.button_text)
                .replace(/\[ButtonURL\]/g, item.button_link);

            const productItem = document.createElement('div');
            productItem.style.flex = '1 0 30%';
            productItem.style.boxSizing = 'border-box';
            productItem.style.marginBottom = '10px';
            productItem.innerHTML = productHTML;

            productContainer.appendChild(productItem);

        }

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. The journey is complete. Thank the user for their time and ask them to visit the website. Nothing more.` 
        };
    }

    if (componentData.component_name === 'slide') {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'slider-wrapper';
        sliderWrapper.id = 'sliderWrapper';
        document.querySelector('.chat-messages').appendChild(sliderWrapper);

        const slideContainer = document.createElement('div');
        slideContainer.className = 'slider-container';
        slideContainer.id = 'slideContainer';
        sliderWrapper.appendChild(slideContainer);

        const slider = document.createElement('div');
        slider.className = 'slider';
        slider.id = 'slider';
        slideContainer.appendChild(slider);

        for (const item of data) {
            console.log(item.main_text);
            console.log(item.image);
            console.log(item.description);
            console.log(item.button_text);
            console.log(item.button_link);

            const infoHTML = componentData.component_html
                .replace(/\[MainText\]/g, item.main_text)
                .replace(/\[Image\]/g, item.image)
                .replace(/\[Description\]/g, item.description)
                .replace(/\[ButtonText\]/g, item.button_text)
                .replace(/\[ButtonLink\]/g, item.button_link);

            slider.innerHTML += infoHTML;
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;

        slideContainer.innerHTML += `                    <button class="arrow prev">&#10094;</button>
                    <button class="arrow next">&#10095;</button>`

        function initializeSlider(sliderSelector) {
            const sliderContainers = document.querySelectorAll(sliderSelector);
            const sliderContainer = sliderContainers[sliderContainers.length - 1]; // Select the last slider container
            if (!sliderContainer) return; // Exit if no slider container is found

            const slider = sliderContainer.querySelector('.slider');
            const slides = slider.querySelectorAll('.slide');
            const prevButton = sliderContainer.querySelector('.prev');
            const nextButton = sliderContainer.querySelector('.next');
            
            let currentIndex = 0;
            let startX;
            let scrollLeft;
            let isDragging = false;
            
            const slidesToShow = Math.floor(slider.offsetWidth / slides[0].offsetWidth);
            const maxIndex = slides.length - slidesToShow;
          
            function updateSliderPosition() {
              const offset = -currentIndex * (slides[0].offsetWidth + 8); // 8px is the gap
              slider.style.transform = `translateX(${offset}px)`;
            }
          
            // Button Navigation
            prevButton.addEventListener('click', () => {
              currentIndex = Math.max(currentIndex - 1, 0);
              updateSliderPosition();
            });
          
            nextButton.addEventListener('click', () => {
              currentIndex = Math.min(currentIndex + 1, maxIndex);
              updateSliderPosition();
            });
          
            // Drag to scroll functionality
            slider.addEventListener('mousedown', (e) => {
              isDragging = true;
              slider.style.transition = 'none';
              startX = e.pageX - slider.offsetLeft;
              scrollLeft = slider.offsetLeft;
            });
          
            slider.addEventListener('mouseleave', () => {
              isDragging = false;
            });
          
            slider.addEventListener('mouseup', () => {
              isDragging = false;
              slider.style.transition = 'transform 0.3s ease';
              
              // Snap to nearest slide
              const slideWidth = slides[0].offsetWidth + 8;
              const movement = scrollLeft - slider.offsetLeft;
              const snapIndex = Math.round(movement / slideWidth);
              
              currentIndex = Math.max(0, Math.min(snapIndex, maxIndex));
              updateSliderPosition();
            });
          
            slider.addEventListener('mousemove', (e) => {
              if (!isDragging) return;
              e.preventDefault();
              
              const x = e.pageX - slider.offsetLeft;
              const walk = (x - startX);
              const newPosition = Math.max(
                Math.min(0, walk),
                -(slides[0].offsetWidth + 8) * maxIndex
              );
              
              slider.style.transform = `translateX(${newPosition}px)`;
              scrollLeft = slider.offsetLeft;
            });
          
            // Touch events for mobile
            slider.addEventListener('touchstart', (e) => {
              isDragging = true;
              slider.style.transition = 'none';
              startX = e.touches[0].pageX - slider.offsetLeft;
              scrollLeft = slider.offsetLeft;
            });
          
            slider.addEventListener('touchend', () => {
              isDragging = false;
              slider.style.transition = 'transform 0.3s ease';
              
              // Snap to nearest slide
              const slideWidth = slides[0].offsetWidth + 8;
              const movement = scrollLeft - slider.offsetLeft;
              const snapIndex = Math.round(movement / slideWidth);
              
              currentIndex = Math.max(0, Math.min(snapIndex, maxIndex));
              updateSliderPosition();
            });
          
            slider.addEventListener('touchmove', (e) => {
              if (!isDragging) return;
              
              const x = e.touches[0].pageX - slider.offsetLeft;
              const walk = (x - startX);
              const newPosition = Math.max(
                Math.min(0, walk),
                -(slides[0].offsetWidth + 8) * maxIndex
              );
              
              slider.style.transform = `translateX(${newPosition}px)`;
              scrollLeft = slider.offsetLeft;
            });
          
            // Update slidesToShow on window resize
            window.addEventListener('resize', () => {
              const newSlidesToShow = Math.floor(slider.offsetWidth / slides[0].offsetWidth);
              if (newSlidesToShow !== slidesToShow) {
                currentIndex = Math.min(currentIndex, slides.length - newSlidesToShow);
                updateSliderPosition();
              }
            });
        }

        initializeSlider('sliderWrapper');

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. The journey is complete. Thank the user for their time. Nothing more.` 
        };

    }

    if (componentData.component_name === 'netflix-button') {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.id = 'buttonContainer'
        document.querySelector('.chat-messages').appendChild(buttonContainer);

        for (const item of data) {
            console.log(item.button_text);

            const button = componentData.component_html.replace(/\[ButtonText\]/g, item.button_text);
            buttonContainer.innerHTML += button;
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. Simply ask the user to select one of the options above.` 
        };
    }

    if (componentData.component_name === 'netflix-grid-button') {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'grid-buttons-wrapper';
        buttonWrapper.id = 'buttonWrapper'
        document.querySelector('.chat-messages').appendChild(buttonWrapper);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'grid-button-container';
        buttonContainer.id = 'gridButtonContainer'
        buttonWrapper.appendChild(buttonContainer);

        for (const item of data) {
            console.log(item.button_text);
            const button = componentData.component_html.replace(/\[ButtonText\]/g, item.button_text);
            buttonContainer.innerHTML += button;
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. Simply ask the user to select one of the options above.` 
        };
    }

    if (componentData.component_name === 'netflix-thumbnail-slide') {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'slider-wrapper';
        sliderWrapper.id = 'sliderWrapper'
        document.querySelector('.chat-messages').appendChild(sliderWrapper);

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        sliderContainer.id = 'sliderContainer'
        sliderWrapper.appendChild(sliderContainer);

        sliderContainer.innerHTML += `    
        <button class="slider-button prev">❮</button>
        <button class="slider-button next">❯</button>
        `;

        const slider = document.createElement('div');
        slider.className = 'slider';
        slider.id = 'slider'
        sliderContainer.appendChild(slider);

        for (const item of data) {
            console.log(item.image);
            console.log(item.main_text);

            const slideHTML = componentData.component_html
                .replace(/\[Image\]/g, item.image)
                .replace(/\[MainText\]/g, item.main_text);

            slider.innerHTML += slideHTML;
        }

        function initializeSlider(sliderSelector) {
            const sliderContainers = document.querySelectorAll(sliderSelector);
            const sliderContainer = sliderContainers[sliderContainers.length - 1]; // Select the last slider container
            if (!sliderContainer) return; // Exit if no slider container is found

            const slider = sliderContainer.querySelector('.slider');
            const slides = slider.querySelectorAll('.slide');
            const prevButton = sliderContainer.querySelector('.prev');
            const nextButton = sliderContainer.querySelector('.next');
            
            let currentIndex = 0;
            let startX;
            let scrollLeft;
            let isDragging = false;
            
            const slidesToShow = Math.floor(slider.offsetWidth / slides[0].offsetWidth);
            const maxIndex = slides.length - slidesToShow;
          
            function updateSliderPosition() {
              const offset = -currentIndex * (slides[0].offsetWidth + 8); // 8px is the gap
              slider.style.transform = `translateX(${offset}px)`;
            }
          
            // Button Navigation
            prevButton.addEventListener('click', () => {
              currentIndex = Math.max(currentIndex - 1, 0);
              updateSliderPosition();
            });
          
            nextButton.addEventListener('click', () => {
              currentIndex = Math.min(currentIndex + 1, maxIndex);
              updateSliderPosition();
            });
          
            // Drag to scroll functionality
            slider.addEventListener('mousedown', (e) => {
              isDragging = true;
              slider.style.transition = 'none';
              startX = e.pageX - slider.offsetLeft;
              scrollLeft = slider.offsetLeft;
            });
          
            slider.addEventListener('mouseleave', () => {
              isDragging = false;
            });
          
            slider.addEventListener('mouseup', () => {
              isDragging = false;
              slider.style.transition = 'transform 0.3s ease';
              
              // Snap to nearest slide
              const slideWidth = slides[0].offsetWidth + 8;
              const movement = scrollLeft - slider.offsetLeft;
              const snapIndex = Math.round(movement / slideWidth);
              
              currentIndex = Math.max(0, Math.min(snapIndex, maxIndex));
              updateSliderPosition();
            });
          
            slider.addEventListener('mousemove', (e) => {
              if (!isDragging) return;
              e.preventDefault();
              
              const x = e.pageX - slider.offsetLeft;
              const walk = (x - startX);
              const newPosition = Math.max(
                Math.min(0, walk),
                -(slides[0].offsetWidth + 8) * maxIndex
              );
              
              slider.style.transform = `translateX(${newPosition}px)`;
              scrollLeft = slider.offsetLeft;
            });
          
            // Touch events for mobile
            slider.addEventListener('touchstart', (e) => {
              isDragging = true;
              slider.style.transition = 'none';
              startX = e.touches[0].pageX - slider.offsetLeft;
              scrollLeft = slider.offsetLeft;
            });
          
            slider.addEventListener('touchend', () => {
              isDragging = false;
              slider.style.transition = 'transform 0.3s ease';
              
              // Snap to nearest slide
              const slideWidth = slides[0].offsetWidth + 8;
              const movement = scrollLeft - slider.offsetLeft;
              const snapIndex = Math.round(movement / slideWidth);
              
              currentIndex = Math.max(0, Math.min(snapIndex, maxIndex));
              updateSliderPosition();
            });
          
            slider.addEventListener('touchmove', (e) => {
              if (!isDragging) return;
              
              const x = e.touches[0].pageX - slider.offsetLeft;
              const walk = (x - startX);
              const newPosition = Math.max(
                Math.min(0, walk),
                -(slides[0].offsetWidth + 8) * maxIndex
              );
              
              slider.style.transform = `translateX(${newPosition}px)`;
              scrollLeft = slider.offsetLeft;
            });
          
            // Update slidesToShow on window resize
            window.addEventListener('resize', () => {
              const newSlidesToShow = Math.floor(slider.offsetWidth / slides[0].offsetWidth);
              if (newSlidesToShow !== slidesToShow) {
                currentIndex = Math.min(currentIndex, slides.length - newSlidesToShow);
                updateSliderPosition();
              }
            });
        }

        initializeSlider('.slider-container');

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. Ask the user to select one of the options above.` 
        };
    }

    if (componentData.component_name === 'netflix-detail-slide') {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'details-slider-wrapper';
        sliderWrapper.id = 'sliderWrapper'
        document.querySelector('.chat-messages').appendChild(sliderWrapper);

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'details-slider-container';
        sliderContainer.id = 'sliderContainer'
        sliderWrapper.appendChild(sliderContainer);

        const slider = document.createElement('div');
        slider.className = 'details-slider';
        slider.id = 'slider'
        sliderContainer.appendChild(slider);

       

        for (const item of data) {
            console.log(item.image);
            console.log(item.description);

            const slideHTML = componentData.component_html
                .replace(/\[Image\]/g, item.image)
                .replace(/\[Description\]/g, item.description);

            slider.innerHTML += slideHTML;
        }

        sliderContainer.innerHTML += `
        <div class="details-buttons">
            <a href="https://netflix.com" class="details-action-button">Watch Now</a>
            <a href="https://netflix.com" class="details-action-button">Visit our Website</a>
        </div>
        `;

        function initializeDetailsSlider(sliderSelector) {
            const sliderContainers = document.querySelectorAll(sliderSelector);
            const sliderContainer = sliderContainers[sliderContainers.length - 1]; // Select the last slider container
            if (!sliderContainer) return; // Exit if no slider container is found

            const slider = sliderContainer.querySelector('.details-slider');
            const slides = slider.querySelectorAll('.details-slide');
            const prevButtons = sliderContainer.querySelectorAll('.prev');
            const nextButtons = sliderContainer.querySelectorAll('.next');
            
            let currentIndex = 0;
            const totalSlides = slides.length;
          
            function updateSlider() {
              slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
          
            function nextSlide() {
              currentIndex = (currentIndex + 1) % totalSlides;
              updateSlider();
            }
          
            function prevSlide() {
              currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
              updateSlider();
            }
          
            // Event Listeners
            prevButtons.forEach(button => button.addEventListener('click', prevSlide));
            nextButtons.forEach(button => button.addEventListener('click', nextSlide));
          
            // Touch Events
            let touchStartX = 0;
            let touchEndX = 0;
          
            slider.addEventListener('touchstart', (e) => {
              touchStartX = e.touches[0].clientX;
            });
          
            slider.addEventListener('touchend', (e) => {
              touchEndX = e.changedTouches[0].clientX;
              if (touchStartX - touchEndX > 50) {
                nextSlide();
              }
              if (touchStartX - touchEndX < -50) {
                prevSlide();
              }
            });
        }

        // Initialize the slider
        initializeDetailsSlider('.details-slider-wrapper');

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. The journey is complete. Thank the user for their time. Nothing more.` 
        };
    }

    if (componentData.component_name === 'netflix-cta-button') { 
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.id = 'buttonContainer'
        document.querySelector('.chat-messages').appendChild(buttonContainer);

        for (const item of data) {
            console.log(item.button_text);
            const button = componentData.component_html.replace(/\[ButtonText\]/g, item.button_text).replace(/\[ButtonLink\]/g, item.button_link);
            buttonContainer.innerHTML += button;
        }

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. The journey is complete. Thank the user for their time. Nothing more.` 
        };
    }

    if (componentData.component_name === 'nissan-details-slider') {
      console.log('nissan-details-slider');
      const sliderWrapper = document.createElement('div');
      sliderWrapper.className = 'details-slider-wrapper';
      sliderWrapper.id = 'sliderWrapper'
      document.querySelector('.chat-messages').appendChild(sliderWrapper);

      const sliderContainer = document.createElement('div');
      sliderContainer.className = 'details-slider-container';
      sliderContainer.id = 'sliderContainer'
      sliderWrapper.appendChild(sliderContainer);

      const slider = document.createElement('div');
      slider.className = 'details-slider';
      slider.id = 'slider'
      sliderContainer.appendChild(slider);

     

      for (const item of data) {
          console.log(item.image);
          console.log(item.description);

          const slideHTML = componentData.component_html
              .replace(/\[Image\]/g, item.image)
              .replace(/\[Description\]/g, item.description);

          slider.innerHTML += slideHTML;
      }

      sliderContainer.innerHTML += `
      <div onclick="handleSendMessage('Configure the Nissan Magnite')" class="details-action-button">
          Configure your own Nissan Magnite
      </div>
      `;

      function initializeDetailsSlider(sliderSelector) {
          const sliderContainers = document.querySelectorAll(sliderSelector);
          const sliderContainer = sliderContainers[sliderContainers.length - 1]; // Select the last slider container
          if (!sliderContainer) return; // Exit if no slider container is found

          const slider = sliderContainer.querySelector('.details-slider');
          const slides = slider.querySelectorAll('.details-slide');
          const prevButtons = sliderContainer.querySelectorAll('.prev');
          const nextButtons = sliderContainer.querySelectorAll('.next');
          
          let currentIndex = 0;
          const totalSlides = slides.length;
        
          function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
          }
        
          function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
          }
        
          function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
          }
        
          // Event Listeners
          prevButtons.forEach(button => button.addEventListener('click', prevSlide));
          nextButtons.forEach(button => button.addEventListener('click', nextSlide));
        
          // Touch Events
          let touchStartX = 0;
          let touchEndX = 0;
        
          slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
          });
        
          slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
              nextSlide();
            }
            if (touchStartX - touchEndX < -50) {
              prevSlide();
            }
          });
      }

      // Initialize the slider
      initializeDetailsSlider('.details-slider-wrapper');

      chatMessages.scrollTop = chatMessages.scrollHeight;

      return {
          "status": "success",
          "message": `Component displayed for ${component_id}. Ask the user to explore what you have displayed above. Nothing more.` 
      };
  }

  if (componentData.component_name === 'nissan-details-slider-two') {
    console.log('nissan-details-slider');
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'details-slider-wrapper';
    sliderWrapper.id = 'sliderWrapper'
    document.querySelector('.chat-messages').appendChild(sliderWrapper);

    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'details-slider-container';
    sliderContainer.id = 'sliderContainer'
    sliderWrapper.appendChild(sliderContainer);

    const slider = document.createElement('div');
    slider.className = 'details-slider';
    slider.id = 'slider'
    sliderContainer.appendChild(slider);

   

    for (const item of data) {
        console.log(item.image);
        console.log(item.description);

        const slideHTML = componentData.component_html
            .replace(/\[Image\]/g, item.image)
            .replace(/\[Description\]/g, item.description);

        slider.innerHTML += slideHTML;
    }

    sliderContainer.innerHTML += `
    <div onclick="handleSendMessage('Book A Test Drive Now')" class="details-action-button">
        Book A Test Drive Now
    </div>
    `;

    function initializeDetailsSlider(sliderSelector) {
        const sliderContainers = document.querySelectorAll(sliderSelector);
        const sliderContainer = sliderContainers[sliderContainers.length - 1]; // Select the last slider container
        if (!sliderContainer) return; // Exit if no slider container is found

        const slider = sliderContainer.querySelector('.details-slider');
        const slides = slider.querySelectorAll('.details-slide');
        const prevButtons = sliderContainer.querySelectorAll('.prev');
        const nextButtons = sliderContainer.querySelectorAll('.next');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
      
        function updateSlider() {
          slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
      
        function nextSlide() {
          currentIndex = (currentIndex + 1) % totalSlides;
          updateSlider();
        }
      
        function prevSlide() {
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          updateSlider();
        }
      
        // Event Listeners
        prevButtons.forEach(button => button.addEventListener('click', prevSlide));
        nextButtons.forEach(button => button.addEventListener('click', nextSlide));
      
        // Touch Events
        let touchStartX = 0;
        let touchEndX = 0;
      
        slider.addEventListener('touchstart', (e) => {
          touchStartX = e.touches[0].clientX;
        });
      
        slider.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].clientX;
          if (touchStartX - touchEndX > 50) {
            nextSlide();
          }
          if (touchStartX - touchEndX < -50) {
            prevSlide();
          }
        });
    }

    // Initialize the slider
    initializeDetailsSlider('.details-slider-wrapper');

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return {
        "status": "success",
        "message": `Component displayed for ${component_id}. Ask the user to explore what you have displayed above. Nothing more.` 
    };
}

  if (componentData.component_name === 'netflix-cta-button') { 
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'button-container';
      buttonContainer.id = 'buttonContainer'
      document.querySelector('.chat-messages').appendChild(buttonContainer);

      for (const item of data) {
          console.log(item.button_text);
          const button = componentData.component_html.replace(/\[ButtonText\]/g, item.button_text).replace(/\[ButtonLink\]/g, item.button_link);
          buttonContainer.innerHTML += button;
      }

      chatMessages.scrollTop = chatMessages.scrollHeight;

      return {
          "status": "success",
          "message": `Component displayed for ${component_id}. The journey is complete. Thank the user for their time. Nothing more.` 
      };
  }

  if (componentData.component_name === 'nissan-slide-two') {
    console.log('nissan-slider-component');

    const container = document.createElement('div');
    container.className = 'nissan-slider-container';
    container.id = 'nissanSliderContainer'
    document.querySelector('.chat-messages').appendChild(container);

    const slider = document.createElement('div');
    slider.className = 'nissan-slider';
    slider.id = 'nissanSlider'
    container.appendChild(slider);

    slider.innerHTML += `
        <button class="nissan-nav-button nissan-prev" id="nissanPrev">‹</button>
        <button class="nissan-nav-button nissan-next" id="nissanNext">›</button>
    `;

    for (const item of data) {
      console.log(item.main_text);
      console.log(item.image);
      console.log(item.description);

      const slideHTML = componentData.component_html
          .replace(/\[MainText\]/g, item.main_text)
          .replace(/\[Image\]/g, item.image)
          .replace(/\[Description\]/g, item.description);

      slider.innerHTML += slideHTML;
    }

    class NissanSlider {
      constructor(container) {
          this.container = container;
          this.slider = container.querySelector('.nissan-slider');
          this.slides = container.querySelectorAll('.nissan-slide');
          this.prevButton = container.querySelector('.nissan-prev');
          this.nextButton = container.querySelector('.nissan-next');
          this.currentIndex = 0;
          
          this.init();
      }
      
      init() {
          // Add event listeners
          this.prevButton.addEventListener('click', () => this.slide('prev'));
          this.nextButton.addEventListener('click', () => this.slide('next'));
          
          // Optional: Add touch support
          let startX;
          let isDragging = false;
          
          this.slider.addEventListener('touchstart', (e) => {
              startX = e.touches[0].clientX;
              isDragging = true;
          });
          
          this.slider.addEventListener('touchmove', (e) => {
              if (!isDragging) return;
              const currentX = e.touches[0].clientX;
              const diff = startX - currentX;
              
              if (Math.abs(diff) > 50) { // Minimum swipe distance
                  this.slide(diff > 0 ? 'next' : 'prev');
                  isDragging = false;
              }
          });
          
          this.slider.addEventListener('touchend', () => {
              isDragging = false;
          });
      }
      
      slide(direction) {
          if (direction === 'next') {
              this.currentIndex = (this.currentIndex + 1) % this.slides.length;
          } else {
              this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
          }
          
          const offset = -this.currentIndex * 100;
          this.slider.style.transform = `translateX(${offset}%)`;

          // Ensure buttons remain visible
          this.prevButton.style.display = 'block';
          this.nextButton.style.display = 'block';
      }
    }
    
    const sliders = document.querySelectorAll('.nissan-slider-container');
    sliders.forEach(slider => new NissanSlider(slider));

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return {
      "status": "success",
      "message": `Component displayed for ${component_id}. Ask the user to look through the slider above.` 
    };
  }

  if (componentData.component_name === 'nissan-iframe') {
    console.log('nissan-iframe');
    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'iframe-container';
    iframeContainer.id = 'iframeContainer'
    document.querySelector('.chat-messages').appendChild(iframeContainer);

    for (const item of data) {
      console.log(item.main_text);
      const iframe = componentData.component_html.replace(/\[mainText\]/g, item.main_text);
      console.log('iframe', iframe);
      iframeContainer.innerHTML += iframe;
    }

    iframeContainer.innerHTML += `
    <div style="margin-bottom:20px !important;" onclick="handleSendMessage('Learn More About Inova Solutions')" class="details-action-button">
        Learn More About Inova Solutions
    </div>
    <div style="margin-bottom:20px !important;" onclick="handleSendMessage('View our products')" class="details-action-button">
        View our products
    </div>

    `;

    iframeContainer.style.marginTop = '20px';
    iframeContainer.style.marginBottom = '20px';

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return {
      "status": "success",
      "message": `Component displayed for ${component_id}. Tell the user to a bit more about Inova Solutions.` 
    };
  }

  

}

async function showHeroSection(description, title) {
  const heroSection = document.createElement('div');
  heroSection.className = 'hero';
  heroSection.id = 'heroSection'
  document.querySelector('.chat-messages').appendChild(heroSection);

  heroSection.innerHTML += `
          <div class="container">
            <div class="hero-content">
                <img src="./assets/fav.png" alt="Hero Logo" class="hero-logo">
                <h1 class="hero-title">${title}</h1>
                <p class="hero-subtitle">
                    ${description}
                </p>
                <div class="cta-buttons">
                    <a href="https://inovasolutions.ai/" class="button button-primary">Request a demo</a>
                    <a href="#" class="button button-secondary" onclick="handleSendMessage('See our products')">See our products</a>
                </div>
            </div>
            
            <div class="features">
                <div class="feature">
                    <div class="feature-icon">🚀</div>
                    <h3>Lightning Fast</h3>
                    <p>Deploy AI agents on your tasks with unprecedented speed and reliability.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🛡️</div>
                    <h3>Enterprise Security</h3>
                    <p>Bank-grade security features to protect your valuable company data. With our own proprietory AI agents, we are able to protect your data from any breaches.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🤖</div>
                    <h3>AI-Powered</h3>
                    <p>Smart automation and insights to boost your productivity. We use the latest AI agents to help you automate your tasks.</p>
                </div>
            </div>
        </div>
  `;

  return {
    "status": "success",
    "message": `Hero section displayed. Ask the user to explore what you have displayed above. Nothing more.` 
  };
}

async function showProductSection() {
  const productSection = document.createElement('div');
  productSection.className = 'pr-products';
  productSection.id = 'productSection'
  document.querySelector('.chat-messages').appendChild(productSection);

  productSection.innerHTML += `
          <div class="pr-container">
            <div class="pr-section-header">
                <h2 class="pr-section-title">Our Products</h2>
                <p class="pr-section-subtitle">Discover our suite of powerful tools designed to enhance your workflow</p>
            </div>

            <div class="pr-products-grid">
                <!-- Product 1 -->
                <div class="pr-product-card">
                    <img src="./assets/logos/bldr.png" alt="Code Intelligence" class="pr-product-image">
                    <h3 class="pr-product-name">BLDR</h3>
                    <p class="pr-product-description">
                        An innovative platform that merges intuitive drag-and-drop design with powerful no-code development, enabling anyone to build and launch custom AI solutions without programming experience
                    </p>
                    <a href="https://bldr.bot/" target="_blank" class="pr-product-button">Take a tour</a>
                </div>

                <!-- Product 2 -->
                <div class="pr-product-card">
                    <img src="./assets/logos/chat.png" alt="Security Scanner" class="pr-product-image">
                    <h3 class="pr-product-name">CHAT</h3>
                    <p class="pr-product-description">
                        Generative Chat with custom built LLMs, Rag, & Tools. Fully deployable both Online and On Prem with full Admin Capability and Data Sovereignty and Security.
                    </p>
                    <a href="https://chat.inovasolutions.ai/" target="_blank" class="pr-product-button">Take a tour</a>
                </div>

                <!-- Product 3 -->
                <div class="pr-product-card">
                    <img src="./assets/logos/lens.png" alt="Cloud Deploy" class="pr-product-image">
                    <h3 class="pr-product-name">LENS</h3>
                    <p class="pr-product-description">
                        AI Analytics over Maps with Dynamic Dashboards. Completely Deployable Online and On-Prem with Full Admin Capability and Data Sovereignty and Security
                    </p>
                    <a href="https://datalens.replit.app/" target="_blank" class="pr-product-button">Take a tour</a>
                </div>

                <!-- Product 4 -->
                <div class="pr-product-card">
                    <img src="./assets/logos/core.png" alt="Team Collaboration" class="pr-product-image">
                    <h3 class="pr-product-name">CORE</h3>
                    <p class="pr-product-description">
                        Our Inova Core platform empowers you to automate tasks, allowing you to focus on what truly matters – growing your business.
                    </p>
                    <a href="https://core.inovasolutions.ai/" target="_blank" class="pr-product-button">Take a tour</a>
                </div>

                <!-- Product 5 -->
                <div class="pr-product-card">
                    <img src="./assets/logos/academy.png" alt="Analytics Dashboard" class="pr-product-image">
                    <h3 class="pr-product-name">ACADEMY</h3>
                    <p class="pr-product-description">
                        The AI-powered Content Delivery Platform is a state-of-the art engine which creates personalized learning experiences for each student while giving management a complete overview of all data.
                    </p>
                    <a href="https://bldr.bot/" target="_blank" class="pr-product-button">Take a tour</a>
                </div>
            </div>
        </div>
  `

  return {
    "status": "success",
    "message": `Product section displayed. Ask the user to explore what you have displayed above. Nothing more.` 
  };
  
}





