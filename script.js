import { listings, addButton, modal, modalContent } from './src/elements.js';
import {
    status,
    displayItems,
    addItem,
    deleteItem,
    replaceItem,
    changeItemStatus,
} from './src/core.js';
import data from './src/data.js';

let tasks = [...data];

for (const listing of Object.values(listings)) {
    listing.addEventListener('update', function (evt) {
        displayItems(listing, tasks);
    });
    listing.addEventListener('click', function (evt) {
        if (evt.target.matches('.js-delete')) {
            const id = Number.parseInt(evt.target.value);
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
            tasks,
            item,
            changeItemStatus(item, listing.dataset.type)
        );
        listing.dispatchEvent(new CustomEvent('update'));
    });

    displayItems(listing, tasks);
}

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

function addPrompt() {
    return new Promise(async function (resolve) {
        modalContent.innerHTML = `<form class="js-form">
            <input class="text-input" name="input">
            <button class="button button-submit"
                    name="submit" type="submit">
                    Add Item
            </button>
            <button class="button button-cancel" name="cancel">Cancel</button>
         </form>
        `;
        modal.classList.add('modal--open');
        const form = modalContent.querySelector('.js-form');
        form.input.focus();
        form.addEventListener(
            'submit',
            function (evt) {
                evt.preventDefault();
                resolve(evt.currentTarget.input.value || null);
                killPrompt();
            },
            { once: true }
        );
        form.cancel.addEventListener(
            'click',
            function (evt) {
                evt.preventDefault();
                resolve(null);
                killPrompt();
            },
            { once: true }
        );
    });
}

function killPrompt() {
    modalContent.innerHTML = '';
    modal.classList.remove('modal--open');
}
