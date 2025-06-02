let activeProductId = null;

function showProductDetail(id) {
  // If same product clicked, toggle off
  if (activeProductId === id) {
    document.getElementById(id).style.display = 'none';
    activeProductId = null;
    return;
  }

  // Hide any active detail
  document.querySelectorAll('.product-detail').forEach(section => {
    section.style.display = 'none';
  });

  // Show clicked product detail
  const detailSection = document.getElementById(id);
  detailSection.style.display = 'block';
  activeProductId = id;

  // Scroll down smoothly to details
  setTimeout(() => {
    detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}
