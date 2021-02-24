import {$} from './../utilita/utilita';

export function Popup() {    
    let photoArr = new Array(8);
    let arrName = ['Johnny Depp', 'Morgan Freeman', 'Kira Nattily', 'Jennifer Lopez', 'Jennifer Aniston', 'Bruce Willis', 'Brad Pit', 'Will Smith'];

    photoArr.fill('');
    photoArr.map((item, index) => {
        const containerPortf = $('.portfolio-container');
        let block = document.createElement('div');       
        let photo = new Image ();        

        photo.src = `https://raw.githubusercontent.com/Egorkostuck/examJS_photo/main/photo${index+1}.png`;
        block.classList.add('content-block');        
        photo.classList.add(`photo-img`);
        block.innerHTML = `<i class="icon-zoom-in"></i>`;
        photo.setAttribute('alt', `${arrName[index]}`);
        photo.setAttribute('title', `${arrName[index]}`);
        containerPortf.appendChild(block);
        block.appendChild(photo);

        photo.addEventListener('mouseenter', () => {
            const  icon = document.querySelectorAll('.icon-zoom-in');
            icon[index].classList.add('icon-show');
        });
        photo.addEventListener('mouseleave', () => {
            const  icon = document.querySelectorAll('.icon-zoom-in');
            icon[index].classList.remove('icon-show');
        });

        const modalWindow = document.createElement('div'),
            modalContainer =  document.createElement('div'),
            body = $('body'),
            modalPhoto = new Image(500);
        
        modalWindow.classList.add('modal-window');
        modalContainer.classList.add('modal-container');
        modalContainer.innerHTML = `<i class="icon-zoom-out"></i>`;
        modalPhoto.src = `https://raw.githubusercontent.com/Egorkostuck/examJS_photo/main/photo${index+1}.png`;
        modalPhoto.classList.add('modal-photo');            
        body.appendChild(modalWindow);
        modalWindow.appendChild(modalContainer);
        modalContainer.appendChild(modalPhoto);

        const iconOut = document.querySelectorAll('.icon-zoom-out');
        
        photo.addEventListener('click', () => {
            location.hash = photo.alt;
            modalWindow.classList.add('modal-show');          
            modalWindow.classList.remove('modal-none');

            modalPhoto.addEventListener('mouseenter', () => {
                iconOut[index].classList.add('icon-show-out');
            });
            modalPhoto.addEventListener('mouseleave', () => {
                iconOut[index].classList.remove('icon-show-out');
            });        
        });    
         
        modalWindow.addEventListener('click', (event) => {
            const nodal = event.currentTarget;
            location.hash = 'portfolio';             
            nodal.classList.add('modal-none');
            nodal.classList.remove('modal-show');
        });        
    });    
}