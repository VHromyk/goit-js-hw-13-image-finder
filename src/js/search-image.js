
import getRefs from './refs';
import imageApiService from './apiService';
import loadMoreBtn from './loadMoreBtn';
import createMarkupCards from './markup';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


getRefs.searchForm.addEventListener('submit', searchImageHandler);
getRefs.btnLoadMore.addEventListener('click', onLoadMoreBtn);
getRefs.galleryImages.addEventListener('click', largeImageHandler);


function searchImageHandler(event) {
    event.preventDefault();
    console.log(event);

    const form = event.currentTarget;
    imageApiService.searchQuery = form.elements.query.value;
 
    clearImageList();

    imageApiService.resetPage();
    form.reset(); 
    loadMoreBtn.show();
    fetchImage();
};


function onLoadMoreBtn(event) {
 event.preventDefault();
    fetchImage();
};


function largeImageHandler(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const largeImageURL = event.target.dataset.largeImage;
    const largeImageAlt = event.target.alt;

    const modalWindow = `<img src="${largeImageURL}" alt="${largeImageAlt}"/>`;


    const options = {
        onShow() {
            window.addEventListener('keydown', onEscHandler);
        },
        onClose() {
            window.removeEventListener('keydown', onEscHandler);
        },
    }

    function onEscHandler(event) {
    if (event.code === 'Escape') {
        instance.close();
}
}

    const instance = basicLightbox.create(modalWindow, options);

    instance.show();
    
};


function fetchImage() {
    loadMoreBtn.disable();
    imageApiService.fetchImage().then(data => {
        createMarkupCards(data);
        loadMoreBtn.enable();
    });
};


function clearImageList() {
    getRefs.galleryImages.innerHTML = '';
};

const options = {
    rootMargin: '200px',
    treshhold: 1,
}
const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            fetchImage();
        }
    });
}, options);

io.observe(getRefs.btnLoadMore);