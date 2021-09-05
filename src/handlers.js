import { displayItems, confirmPrompt, addPrompt } from './ui.js';
import {
    status,
    persistToLocalStorage,
    restoreFromLocalStorage,
    addItem,
    deleteItem,
    replaceItem,
    changeItemStatus,
} from './core.js';

function updateListing(listing, tasks) {
    displayItems(listing, tasks);
    persistToLocalStorage(tasks);
}

async function removeItem(evt, listing) {
    const tasks = restoreFromLocalStorage();
    if (evt.target.matches('.js-delete')) {
        const id = Number.parseInt(evt.target.value);
        const confirm = await confirmPrompt();
        if (!confirm) {
            return;
        }
        const newTasks = deleteItem(id, tasks);
        listing.dispatchEvent(new CustomEvent('update', { detail: newTasks }));
    }
}

async function createItem(listing) {
    const tasks = restoreFromLocalStorage();
    const task = await addPrompt();
    if (!task) {
        return;
    }
    const item = {
        id: Date.now(),
        task,
        status: status.PENDING,
    };
    const newTasks = addItem(item, tasks);
    listing.dispatchEvent(new CustomEvent('update', { detail: newTasks }));
}

function dragOver(evt, listing) {
    const listingContent = listing.querySelector('.js-content');
    evt.preventDefault();
    const taskElem = document.querySelector('.js-moving');
    listingContent.append(taskElem);
}

function dragEnd(evt, listing) {
    const tasks = restoreFromLocalStorage();
    const id = Number(evt.target.id);
    const item = tasks.find((task) => task.id === id);
    const newTasks = replaceItem(
        item,
        changeItemStatus(item, listing.dataset.type),
        tasks
    );
    listing.dispatchEvent(new CustomEvent('update', { detail: newTasks }));
}

export { updateListing, createItem, removeItem, dragOver, dragEnd };
