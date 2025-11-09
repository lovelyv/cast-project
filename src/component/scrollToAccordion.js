// Utility to get the height of the nav element (navbar)
export function getNavbarHeight() {
  const header = document.querySelector('nav');
  return header ? header.offsetHeight : 0;
}
// Utility to scroll an element to the top of the viewport, accounting for a fixed navbar
export function scrollToElementTop(element) {
  if (!element) return;
  const headerHeight = getNavbarHeight();
  const rect = element.getBoundingClientRect();
  const scrollTop = window.scrollY + rect.top - headerHeight - 12; // 12px breathing room
  window.scrollTo({ top: scrollTop, behavior: 'smooth' });
}
