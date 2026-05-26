const container = document.querySelector('.items');

let isDown = false;
let startX = 0;
let scrollLeft = 0;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  container.classList.add('active');

  startX = e.pageX;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseup', () => {
  isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mouseleave', () => {
  isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  const walk = startX - e.pageX;

  container.scrollLeft = scrollLeft + walk;
});