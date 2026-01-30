import './style.css';

const yearEl = document.querySelector('.footer__copy');
if (yearEl) {
  const year = new Date().getFullYear();
  yearEl.textContent = `© ${year} Câmara Municipal de Cabo Frio. Todos os direitos reservados.`;
}

const carouselTrack = document.querySelector('[data-carousel]');
const carouselButtons = document.querySelectorAll('.carousel__button');

if (carouselTrack) {
  const cards = carouselTrack.querySelectorAll('.parlamentares__card');
  const getScrollAmount = () => {
    if (!cards.length) {
      return 0;
    }
    const cardWidth = cards[0].getBoundingClientRect().width;
    const styles = window.getComputedStyle(carouselTrack);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0');
    return cardWidth + gap;
  };

  const scrollByAmount = (direction) => {
    const amount = getScrollAmount();
    if (!amount) {
      return;
    }
    carouselTrack.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  let autoScrollId = null;

  const startAutoScroll = () => {
    autoScrollId = window.setInterval(() => {
      const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
      if (carouselTrack.scrollLeft >= maxScroll - 4) {
        carouselTrack.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      scrollByAmount('next');
    }, 3500);
  };

  const resetAutoScroll = () => {
    if (autoScrollId) {
      window.clearInterval(autoScrollId);
    }
    startAutoScroll();
  };

  carouselButtons.forEach((button) => {
    button.addEventListener('click', () => {
      scrollByAmount(button.dataset.direction);
      resetAutoScroll();
    });
  });

  carouselTrack.addEventListener('mouseenter', () => {
    if (autoScrollId) {
      window.clearInterval(autoScrollId);
      autoScrollId = null;
    }
  });

  carouselTrack.addEventListener('mouseleave', () => {
    if (!autoScrollId) {
      startAutoScroll();
    }
  });

  startAutoScroll();
}
