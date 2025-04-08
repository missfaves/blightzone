const images = document.querySelectorAll('.responsive-image');
const progressBar = document.querySelector('.progressbar'); 
let currentIndex = 0;


const updateProgressBar = () => {
  const progress = ((currentIndex + 1) / images.length) * 100; 
  progressBar.style.width = `${progress}%`; 
};

const updateActiveImage = (direction) => {
  const currentImage = images[currentIndex];
  let newIndex = currentIndex;

  if (direction === 'next' && currentIndex < images.length - 1) {
    newIndex++;
  } else if (direction === 'prev' && currentIndex > 0) {
    newIndex--;
  }

  if (newIndex !== currentIndex) {
    const nextImage = images[newIndex];

    nextImage.style.transition = 'none';
    nextImage.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';

    setTimeout(() => {
      currentImage.style.transition = 'transform 0.1s ease-in-out';
      nextImage.style.transition = 'transform 0.1s ease-in-out';

      currentImage.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
      nextImage.style.transform = 'translateX(0%)';
    }, 0);

    setTimeout(() => {
      currentImage.style.transition = '';
      currentImage.style.transform = '';
    }, 100);

    currentImage.classList.remove('active');
    nextImage.classList.add('active');
    currentIndex = newIndex;

    updateProgressBar();
  }
};


updateProgressBar();


document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    updateActiveImage('next');
  } else if (event.key === 'ArrowLeft') {
    updateActiveImage('prev');
  }
});


let startX = 0;
let isSwiping = false;

document.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX;
  isSwiping = true;
});

document.addEventListener('touchmove', (event) => {
  event.preventDefault();
}, { passive: false });

document.addEventListener('touchend', (event) => {
  if (isSwiping) {
    const endX = event.changedTouches[0].clientX;
    handleSwipe(startX, endX);
    isSwiping = false;
  }
});

const handleSwipe = (startX, endX) => {
  const swipeDistance = endX - startX;
  const swipeThreshold = 50; 

  if (swipeDistance > swipeThreshold) {
    updateActiveImage('prev');
  } else if (swipeDistance < -swipeThreshold) {
    updateActiveImage('next');
  }
};
