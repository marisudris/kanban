import { listings, addButton, modal, modalContent } from './src/elements.js';
import { status, displayItems, addItem, deleteItem } from './src/core.js';
import data from './src/data.js';

let tasks = [...data];

for (const listing of Object.values(listings)) {
    listing.addEventListener('update', function (evt) {
        displayItems(list, tasks);
    });
    listing.addEventListener('click', function (evt) {
        if (evt.target.matches('.js-delete')) {
            const id = Number.parseInt(evt.target.value);
            tasks = deleteItem(id, tasks);
        }
        listing.dispatchEvent(new CustomEvent('update'));
    });
    displayItems(list, tasks);
});
