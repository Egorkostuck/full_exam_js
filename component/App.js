import './utilita/utilita';
import {Slider} from './slider/slider';
import {Popup} from './popup/popup';

const container = document.createElement('div'),
    divPhoto = document.createElement('div');

container.addClass('container');
divPhoto.addClass('portfolio');

location.hash = 'home';
container.innerHTML = `
<div class="offer_slider">
    <div class="prev">
        <div class="arrow-left icon"></div>
    </div>
    <div id="sliderWrapper" class="offer_slider-wrapper">
        <div id="sliderInner" class="offer_slider-inner">
        </div>
    </div>
    <div class="next">
        <div class="arrow-right icon"></div>
    </div>
</div>
`;
divPhoto.innerHTML = `
<div class="portfolio-container">
</div>
`;

container.addTo('body');
divPhoto.addTo('body');

setTimeout(Slider, 1000);
setTimeout(Popup, 1000);