import {$, getElement} from './../utilita/utilita';

export function Slider() {
    let offset = 0;
    let slideIndex = 1;
    const imgArr = new Array (8),
        textArr = [
            {brand: "Ferrari", model: 'Enzo'},
            {brand: "Lamborgini", model: 'Huracan'},
            {brand: "Ferrari", model: 'F458'},
            {brand: "Porshe", model: '911 Turbo S'},
            {brand: "BMW", model: 'E92'},
            {brand: "Aston Martin", model: 'DB6'},
            {brand: "Ferrari", model: 'F458'},
            {brand: "Lamborgini", model: 'Aventador'}
        ],
        slidesField = $('.offer_slider-inner'),
        slidesWrapper = $('.offer_slider-wrapper'),
        sliderInner = getElement('sliderInner'),
        slider = $('.offer_slider'),
        prev = $('.prev'),
        next = $('.next'),
        width = window.getComputedStyle(slidesWrapper).width;
    
    imgArr.fill('');
    imgArr.map((item, index) => {
        const divSlide = document.createElement('div'),
            h1 = document.createElement('h1'),
            h3 = document.createElement('h3'),
            newImg = new Image();

        divSlide.classList.add('offer_slide');
        h1.innerHTML = `${textArr[index].brand}`;
        h3.innerHTML = `${textArr[index].model}`;
        newImg.src = `https://raw.githubusercontent.com/Egorkostuck/img_examJS/main/img${index+1}.jpg`; 

        sliderInner.appendChild(divSlide);
        divSlide.appendChild(h1);
        divSlide.appendChild(h3);
        divSlide.appendChild(newImg);
    });
    
    const slides = document.querySelectorAll('.offer_slide'),
        indicators = document.createElement('ol'),
        dots = [];

    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    indicators.classList.add('carousel-indicators');
    slider.appendChild(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.appendChild(dot);
        dots.push(dot);        
    }

    const changeOpacity = () => {
        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[slideIndex-1].style.opacity = 1;
    };

    next.addEventListener('click', () => {
        if(offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        location.hash = `${textArr[slideIndex-1].brand}-${textArr[slideIndex-1].model}`;
        changeOpacity();        
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        location.hash = `${textArr[slideIndex-1].brand}-${textArr[slideIndex-1].model}`;
        changeOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            location.hash = `${textArr[slideIndex-1].brand}-${textArr[slideIndex-1].model}`;
            changeOpacity();
        });
    });
}