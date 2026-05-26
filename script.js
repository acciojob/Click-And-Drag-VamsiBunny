const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

/* ── Cube drag state ── */
let draggedItem = null;
let offsetX = 0;
let offsetY = 0;

/* ── Container scroll-drag state ── */
let isScrolling = false;
let startX = 0;
let scrollLeft = 0;

/* ─────────────────────────────────────────
   CUBE DRAG  —  mousedown on individual items
───────────────────────────────────────── */
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    e.stopPropagation(); // prevent container scroll-drag from firing

    draggedItem = item;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    item.style.width    = itemRect.width  + 'px';
    item.style.height   = itemRect.height + 'px';
    item.style.position = 'absolute';
    item.style.left     = (itemRect.left - containerRect.left + container.scrollLeft) + 'px';
    item.style.top      = (itemRect.top  - containerRect.top  + container.scrollTop)  + 'px';
    item.style.zIndex   = 1000;

    container.classList.add('active');
    e.preventDefault();
  });
});

/* ─────────────────────────────────────────
   CONTAINER SCROLL-DRAG  —  mousedown on container background
───────────────────────────────────────── */
container.addEventListener('mousedown', (e) => {
  // Only activate if NOT clicking a cube (cubes call stopPropagation)
  isScrolling = true;
  startX     = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  container.classList.add('active');
  e.preventDefault();
});

/* ─────────────────────────────────────────
   SHARED MOUSEMOVE  —  document level
───────────────────────────────────────── */
document.addEventListener('mousemove', (e) => {

  /* Cube drag */
  if (draggedItem) {
    const containerRect = container.getBoundingClientRect();

    let newLeft = e.clientX - containerRect.left - offsetX + container.scrollLeft;
    let newTop  = e.clientY - containerRect.top  - offsetY + container.scrollTop;

    const maxLeft = container.scrollWidth  - draggedItem.offsetWidth;
    const maxTop  = container.scrollHeight - draggedItem.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop  = Math.max(0, Math.min(newTop,  maxTop));

    draggedItem.style.left = newLeft + 'px';
    draggedItem.style.top  = newTop  + 'px';
    return;
  }

  /* Container scroll-drag */
  if (!isScrolling) return;
  e.preventDefault();
  const x    = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2;
  container.scrollLeft = scrollLeft - walk;
});

/* ─────────────────────────────────────────
   SHARED MOUSEUP  —  document level
───────────────────────────────────────── */
document.addEventListener('mouseup', () => {
  if (draggedItem) {
    draggedItem.style.zIndex = '';
    draggedItem = null;
  }

  isScrolling = false;
  container.classList.remove('active');
});