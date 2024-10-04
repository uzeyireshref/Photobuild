// Resim dizisi (büyük resimler ve thumbnail'ler için kullanılacak)
const imageSources = [
    '2.jpeg',
    '1.jpeg',
    '11.jpeg',
    '4.jpeg',
    '5.jpeg',
    '6.jpeg',
    '7.jpeg',
    '8.jpeg',
    '9.jpeg',
    '3.jpeg'
];



const close=document.querySelector('.remove-pic');
close.addEventListener('click',()=>{
fullPicPage.style.display='none';
})
const fullPicPage=document.querySelector('#fullPic');
const fullPic = document.getElementById('fullPic').querySelector('img');

// Tüm küçük resimleri dinamik oluşturmak için dizide tutuyoruz
const images = document.querySelectorAll('.dov img');

// Her bir küçük resim için tıklama olayı ekleyelim
images.forEach(image => {
    image.addEventListener('click', () => {
        const clickedImageSrc = image.src; // Tıklanan resmin src'sini al
        fullPic.src = clickedImageSrc; // Full-pic alanındaki resmin src'sini güncelle
    });
});

// Ana resimler ve thumbnail'ler için elementler
const imageContainer = document.getElementById('imageContainer');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');

let currentIndex = 0; // Başlangıçta gösterilecek resim indeksi
let startThumbnailIndex = 0;
let endThumbnailIndex = 3; // İlk başta 3 thumbnail göstereceğiz

// Büyük resimleri dinamik olarak oluştur
function createMainImages() {
    imageContainer.innerHTML = ''; // Eski resimleri temizle

    imageSources.forEach((src) => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('dov');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slayt Resmi`;
        imgDiv.appendChild(img);
        imageContainer.appendChild(imgDiv);

        img.addEventListener('click', () => {
            fullPic.src = img.src; // Full-pic alanındaki resmin src'sini güncelle
            fullPicPage.style.display = 'flex'; // Tam ekran görünür yap
        })
    });
}

// Thumbnail'leri dinamik olarak oluştur
function createThumbnails() {
    thumbnailsContainer.innerHTML = ''; // Eski thumbnail'leri temizle

    for (let i = startThumbnailIndex; i < endThumbnailIndex; i++) {
        const thumbnail = document.createElement('img');
        thumbnail.src = imageSources[i];
        thumbnail.classList.add('thumbnail');

        // Thumbnail'e tıklandığında ilgili resme kaydır
        thumbnail.addEventListener('click', () => {
            currentIndex = i;
            imageContainer.scrollLeft = currentIndex * imageContainer.clientWidth;
            console.log(imageContainer.scrollLeft);
            updateThumbnails(); // Aktif thumbnail güncelle
        });

        thumbnailsContainer.appendChild(thumbnail);
    }
    updateThumbnails(); // Başlangıçta aktif thumbnail'i belirle
}

// Scroll olayını dinle, kaydırma pozisyonuna göre thumbnail'leri güncelle
imageContainer.addEventListener('scroll', function () {
    const scrollPosition = imageContainer.scrollLeft;
    const imageWidth = imageContainer.clientWidth;
    currentIndex = Math.round(scrollPosition / imageWidth); // Şu anki gösterilen resmi bul

    // Eğer currentIndex 3'ün katına ulaştıysa, bir sonraki thumbnail grubunu göster
    if (currentIndex >= endThumbnailIndex) {
        startThumbnailIndex = currentIndex;
        endThumbnailIndex = startThumbnailIndex + 3;
        if (endThumbnailIndex > imageSources.length) {
            endThumbnailIndex = imageSources.length; // Thumbnail'ler bittiğinde sınırlı tut
        }
        createThumbnails(); // Yeni thumbnail'leri oluştur
    }

    // Eğer kaydırma geri gidiyorsa, önceki 3 thumbnail'i göster
    if (currentIndex < startThumbnailIndex) {
        startThumbnailIndex = currentIndex - (currentIndex % 3);
        endThumbnailIndex = startThumbnailIndex + 3;
        createThumbnails();
    }

    updateThumbnails(); // Aktif olan thumbnail'i güncelle
});

function scrollToCurrentImage() {
    const currentImage = imageContainer.children[currentIndex];
    currentImage.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}



function updateSlider() {
    const images = document.querySelectorAll('.dov img');
    images.forEach((img, index) => {
        if (index === currentIndex) {
            img.style.transform = `translateX(${-(currentIndex * 100)}%)`;
        } else {
            img.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        }
    });

    updateThumbnails(); // Thumbnail'leri güncelle
}

// Thumbnail'leri aktif olup olmadığını güncelleyen fonksiyon
function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index + startThumbnailIndex === currentIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// İlk başta resim ve thumbnail'leri oluştur
createMainImages();
createThumbnails();
