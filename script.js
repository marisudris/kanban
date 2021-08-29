import { lists, addButton } from './src/elements.js';
import { displayItems } from './src/core.js';
import tasks from './src/data.js';

lists.forEach(function (list) {
    list.addEventListener('update', function (evt) {
        displayItems(list);
    });
    list.addEventListener('click', function (evt) {
        if (evt.target.matches('.js-delete')) {
            const id = Number.parseInt(evt.target.value);
            deleteItem(id);
        }
    });
    displayItems(list, tasks);
});
