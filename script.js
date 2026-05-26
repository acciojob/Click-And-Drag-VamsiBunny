const container = document.querySelector('.items');

let isDown = false;
let startX;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
});

container.addEventListener('mouseup', () => {
  isDown = false;
});

container.addEventListener('mouseleave', () => {
  isDown = false;
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  const walk = startX - e.pageX;

  container.scrollLeft += walk;
  startX = e.pageX;
});