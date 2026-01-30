import './style.css';

const yearEl = document.querySelector('.footer__copy');
if (yearEl) {
  const year = new Date().getFullYear();
  yearEl.textContent = `© ${year} Câmara Municipal de Cabo Frio. Todos os direitos reservados.`;
}
