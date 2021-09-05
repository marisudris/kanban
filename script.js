import { listings, addButton } from './src/elements.js';
import { restoreFromLocalStorage } from './src/core.js';
import { displayItems, closePrompt } from './src/ui.js';
import {
    updateListing,
    createItem,
    removeItem,
    dragOver,
    dragEnd,
} from './src/handlers.js';

Object.values(listings).forEach((listing) => {
    listing.addEventListener('update', (evt) => {
        updateListing(listing, evt.detail);
    });

    listing.addEventListener('click', (evt) => {
        removeItem(evt, listing);
    });

    listing.addEventListener('dragover', (evt) => dragOver(evt, listing));

    listing.addEventListener('dragend', (evt) => {
        dragEnd(evt, listing);
    });

    displayItems(listing, restoreFromLocalStorage());
});

addButton.addEventListener('click', () => {
    createItem(listings['pending']);
});

window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closePrompt();
    }
});
