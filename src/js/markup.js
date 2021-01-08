import getRefs from './refs';

import imageCardTemplates from '../templates/image-templates.hbs';

function createMarkupCards(imageListItem) {
    const markup = imageCardTemplates(imageListItem);
    
    getRefs.galleryImages.insertAdjacentHTML('beforeend', markup);
    
}

export default createMarkupCards;