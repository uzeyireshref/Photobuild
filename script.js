let slides = document.querySelectorAll('.slide-container');
let slideIcons = document.querySelectorAll('.slide-icon');
let index = 0;
let next = document.querySelector('#next');
let prev = document.querySelector('#prev');
let navbar=document.querySelector('#navbar')
let navbarTog=document.querySelector('.navbar-toggler-icon')


navbarTog.addEventListener('click',()=>{
setTimeout(()=>{
    navbar.classList.toggle('transparent')
    navbar.classList.toggle('bg-white')
    navbar.classList.toggle('navbar-dark')
})
},1000)
// Function to reset both slide and icon classes
function resetActive() {
    slides[index].classList.remove('active');
    slideIcons[index].classList.remove('slide-active');
}

function setActive() {
    slides[index].classList.add('active');
    slideIcons[index].classList.add('slide-active');
}


next.addEventListener('click', function () {
    resetActive();
    index = (index + 1) % slides.length;
    console.log(slides.length);
    setActive();
});

prev.addEventListener('click', function () {
    resetActive();
    index = (index - 1 + slides.length) % slides.length;
    setActive();
});

slideIcons.forEach((icon, iconIndex) => {
    icon.addEventListener('click', function () {
        resetActive();
        index = iconIndex;  // Set index to the clicked icon's index
        setActive();
    });
});