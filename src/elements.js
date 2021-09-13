const addButton = document.querySelector('.js-add');
const modal = document.querySelector('.js-modal');
const modalContent = document.querySelector('.js-modal-content');
const form = document.querySelector('.js-form-listing');

const listings = {};
document
    .querySelectorAll('.js-list')
    .forEach((elem) => (listings[elem.dataset.type] = elem));

export { listings, addButton, modal, modalContent, form };
