import { listings, addButton } from './src/elements.js';
import {
    status,
    addItem,
    deleteItem,
    replaceItem,
    changeItemStatus,
    persistToLocalStorage,
    restoreFromLocalStorage,
} from './src/core.js';
import { displayItems, addPrompt, confirmPrompt } from './src/ui.js';

let tasks = restoreFromLocalStorage();

Object.values(listings).forEach((listing) => {
    listing.addEventListener('update', function (evt) {
        displayItems(listing, tasks);
        persistToLocalStorage(tasks);
    });
    listing.addEventListener('click', async function (evt) {
        if (evt.target.matches('.js-delete')) {
            const id = Number.parseInt(evt.target.value);
            const confirm = await confirmPrompt();
            if (!confirm) {
                return;
            }
            tasks = deleteItem(id, tasks);
            listing.dispatchEvent(new CustomEvent('update'));
        }
    });
    const listingContent = listing.querySelector('.js-content');
    listing.addEventListener('dragover', (evt) => {
        evt.preventDefault();
        const taskElem = document.querySelector('.js-moving');
        listingContent.append(taskElem);
    });
    listing.addEventListener('dragend', (evt) => {
        const id = Number(evt.target.id);
        const item = tasks.find((task) => task.id === id);
        tasks = replaceItem(
            item,
            changeItemStatus(item, listing.dataset.type),
            tasks
        );
        listing.dispatchEvent(new CustomEvent('update'));
    });

    displayItems(listing, tasks);
});

addButton.addEventListener('click', async function () {
    const task = await addPrompt();
    if (!task) {
        return;
    }
    const item = {
        id: Date.now(),
        task,
        status: status.PENDING,
    };
    tasks = addItem(item, tasks);
    listings['pending'].dispatchEvent(new CustomEvent('update'));
});
