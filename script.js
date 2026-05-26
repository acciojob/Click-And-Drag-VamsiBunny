const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

// ❌ Removed mouseleave — it kills the drag if cursor briefly exits
// ❌ Removed mouseup/mousemove from slider

document.addEventListener('mouseup', () => {
  if (!isDown) return;
  isDown = false;
  slider.classList.remove('active');
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});