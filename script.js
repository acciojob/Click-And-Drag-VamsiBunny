const container = document.querySelector('.items');
const items     = document.querySelectorAll('.item');

/* ── Cube drag state ── */
let draggedItem = null;
let offsetX = 0;
let offsetY = 0;

/* ── Container scroll-drag state ── */
let isScrolling = false;
let startX      = 0;
let scrollLeft  = 0;

/* ─────────────────────────────────
   CUBE DRAG — mousedown on each item
───────────────────────────────── */
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    e.stopPropagation();

    draggedItem = item;
    const cRect = container.getBoundingClientRect();
    const iRect = item.getBoundingClientRect();

    offsetX = e.clientX - iRect.left;
    offsetY = e.clientY - iRect.top;

    item.style.width    = iRect.width  + 'px';
    item.style.height   = iRect.height + 'px';
    item.style.position = 'absolute';
    item.style.left     = (iRect.left - cRect.left + container.scrollLeft) + 'px';
    item.style.top      = (iRect.top  - cRect.top  + container.scrollTop)  + 'px';
    item.style.zIndex   = 1000;

    container.classList.add('active');
    e.preventDefault();
  });
});

/* ─────────────────────────────────
   CONTAINER SCROLL — mousedown on container
───────────────────────────────── */
container.addEventListener('mousedown', (e) => {
  isScrolling = true;
  startX      = e.pageX;          // ✅ raw pageX — no offsetLeft subtraction
  scrollLeft  = container.scrollLeft;
  container.classList.add('active');
  e.preventDefault();
});

/* ─────────────────────────────────
   MOUSEMOVE — on container, not document
   Cypress triggers fire on .items directly;
   attaching here avoids bubbling issues
───────────────────────────────── */
container.addEventListener('mousemove', (e) => {

  /* Cube drag */
  if (draggedItem) {
    const cRect = container.getBoundingClientRect();

    let newLeft = e.clientX - cRect.left - offsetX + container.scrollLeft;
    let newTop  = e.clientY - cRect.top  - offsetY + container.scrollTop;

    newLeft = Math.max(0, Math.min(newLeft, container.scrollWidth  - draggedItem.offsetWidth));
    newTop  = Math.max(0, Math.min(newTop,  container.scrollHeight - draggedItem.offsetHeight));

    draggedItem.style.left = newLeft + 'px';
    draggedItem.style.top  = newTop  + 'px';
    return;
  }

  /* Container scroll-drag */
  if (!isScrolling) return;
  e.preventDefault();
  const walk = (e.pageX - startX) * 2; // ✅ simple delta, no offsetLeft
  container.scrollLeft = scrollLeft - walk;
});

/* ─────────────────────────────────
   MOUSEUP — document level to catch
   releases anywhere on the page
───────────────────────────────── */
document.addEventListener('mouseup', () => {
  if (draggedItem) {
    draggedItem.style.zIndex = '';
    draggedItem = null;
  }
  isScrolling = false;
  container.classList.remove('active');
});