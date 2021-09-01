import { modal, modalContent } from './elements.js';

function displayItems(listing, tasks) {
    const html = constructHtml(tasks, listing);
    listing.querySelector('.js-content').innerHTML = html;
    listing.querySelectorAll('.task').forEach((task) => {
        task.addEventListener('dragstart', () => {
            task.classList.add('task--moving');
            task.classList.add('js-moving');
        });
        task.addEventListener('dragend', () => {
            task.classList.remove('task--moving');
            task.classList.remove('js-moving');
        });
    });
}

function constructHtml(tasks, listing) {
    return tasks
        .filter((task) => task.status === listing.dataset.type)
        .map(
            (task) =>
                `<div class="task" draggable="true" id="${task.id}">
                    <div class="task__text">${task.task}</div>
                    <div class="task__controls">
                        <button value="${task.id}"
                            class="task__delete js-delete"
                            title="delete">
                            🗑
                        </button>
                    </div>
                </div>`
        )
        .join('');
}

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
                closePrompt();
            },
            { once: true }
        );
        form.cancel.addEventListener(
            'click',
            function (evt) {
                evt.preventDefault();
                resolve(null);
                closePrompt();
            },
            { once: true }
        );
    });
}

function closePrompt() {
    modalContent.innerHTML = '';
    modal.classList.remove('modal--open');
}

export { displayItems, addPrompt };
