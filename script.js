const items = document.querySelectorAll('.item');

let isDragging = false;
let currentItem = null;

items.forEach((item) => {

  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentItem = item;

    currentItem.style.position = 'absolute';
    currentItem.style.zIndex = '1000';

    moveAt(e);

    function moveAt(event) {
      const container = document.querySelector('.items');

      const rect = container.getBoundingClientRect();
      const itemWidth = currentItem.offsetWidth;
      const itemHeight = currentItem.offsetHeight;

      let left = event.clientX - rect.left - itemWidth / 2;
      let top = event.clientY - rect.top - itemHeight / 2;

      // Boundary constraints
      left = Math.max(0, Math.min(left, rect.width - itemWidth));
      top = Math.max(0, Math.min(top, rect.height - itemHeight));

      currentItem.style.left = `${left}px`;
      currentItem.style.top = `${top}px`;
    }

    function onMouseMove(event) {
      if (!isDragging) return;
      moveAt(event);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener(
      'mouseup',
      () => {
        isDragging = false;
        currentItem = null;
        document.removeEventListener('mousemove', onMouseMove);
      },
      { once: true }
    );
  });

  item.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

});