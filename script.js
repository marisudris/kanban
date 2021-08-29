import { lists, addButton } from './src/elements.js';
import { displayItems, deleteItem } from './src/core.js';
import data from './src/data.js';

let tasks = [...data];

lists.forEach(function (list) {
    list.addEventListener('update', function (evt) {
        displayItems(list, tasks);
    });
    list.addEventListener('click', function (evt) {
        if (evt.target.matches('.js-delete')) {
            const id = Number.parseInt(evt.target.value);
            tasks = deleteItem(id, tasks);
        }
        list.dispatchEvent(new CustomEvent('update'))
    });
    displayItems(list, tasks);
});
