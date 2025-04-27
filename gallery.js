
async function loadGallery() {
    const response = await fetch('/uploads');
    const images = await response.json();

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    images.forEach(image => {
        const img = document.createElement('img');
        img.src = '/uploads/' + image;
        gallery.appendChild(img);
    });
}
loadGallery();
