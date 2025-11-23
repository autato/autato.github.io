function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

/* Masonry helper for CSS Grid
     - Uses grid-auto-rows (set in CSS) as a small base row height
     - Calculates and sets grid-row-end: span N for each .project so cards
         keep their natural height and form a masonry layout.
*/
function resizeMasonryItems() {
    const grid = document.querySelector('.project-grid');
    if (!grid) return;

    const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(getComputedStyle(grid).getPropertyValue('gap'));

    grid.querySelectorAll('.project').forEach(item => {
        // Clear any previous span so measurement is accurate
        item.style.gridRowEnd = null;
        const itemHeight = item.getBoundingClientRect().height;
        const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = 'span ' + rowSpan;
    });
}

// Debounce helper
function debounce(fn, wait = 100) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

// Run on load and whenever images finish loading
window.addEventListener('load', () => {
    resizeMasonryItems();
    // ensure each image triggers a recalculation when it loads
    document.querySelectorAll('.project img').forEach(img => {
        if (img.complete) return; // already loaded
        img.addEventListener('load', () => resizeMasonryItems());
    });
});

window.addEventListener('resize', debounce(() => resizeMasonryItems(), 120));