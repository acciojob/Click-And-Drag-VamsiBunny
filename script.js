const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let draggedItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    draggedItem = item;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Capture mouse offset relative to the item's top-left corner
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    // Freeze the item's current size before switching to absolute positioning
    item.style.width  = itemRect.width  + 'px';
    item.style.height = itemRect.height + 'px';

    // Pin it in-place visually, now relative to the container
    item.style.position = 'absolute';
    item.style.left = (itemRect.left - containerRect.left + container.scrollLeft) + 'px';
    item.style.top  = (itemRect.top  - containerRect.top  + container.scrollTop)  + 'px';
    item.style.zIndex = 1000;

    container.classList.add('active');
    e.preventDefault();
  });
});

document.addEventListener('mousemove', (e) => {
  if (!draggedItem) return;

  const containerRect = container.getBoundingClientRect();

  // New position relative to the scrollable container
  let newLeft = e.clientX - containerRect.left - offsetX + container.scrollLeft;
  let newTop  = e.clientY - containerRect.top  - offsetY + container.scrollTop;

  // Boundary constraints — keep cube fully inside the container
  const maxLeft = container.scrollWidth  - draggedItem.offsetWidth;
  const maxTop  = container.scrollHeight - draggedItem.offsetHeight;

  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  newTop  = Math.max(0, Math.min(newTop,  maxTop));

  draggedItem.style.left = newLeft + 'px';
  draggedItem.style.top  = newTop  + 'px';
});

document.addEventListener('mouseup', () => {
  if (!draggedItem) return;

  // Drop — keep absolute position but clear drag state
  draggedItem.style.zIndex = '';
  draggedItem = null;

  container.classList.remove('active');
});