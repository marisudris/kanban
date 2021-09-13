import { modal, modalContent } from './elements.js';
import { wait } from './utils.js';

function displayItems(listing, tasks) {
    const html = constructListingHtml(tasks, listing);
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

function constructListingHtml(tasks, listing) {
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
    const html = `<h2 class="form-header">Add task</h2>
         <form class="form js-form">
            <input class="text-input" name="input" placeholder="Task...">
            <button class="button button-submit"
                    name="submit" type="submit">
                    Add
            </button>
            <button class="button button-cancel" name="cancel">Cancel</button>
         </form>
        `;
    return openPrompt(html);
}

function confirmPrompt() {
    const html = `<h2 class="form-header">Delete task?</h2>
         <form class="form js-form">
            <button class="button button-submit"
                    name="submit" type="submit">
                    Confirm
            </button>
            <button class="button button-cancel" name="cancel">Cancel</button>
         </form>
        `;
    return openPrompt(html);
}

function openPrompt(html) {
    return new Promise(async function (resolve) {
        modalContent.innerHTML = html;
        modal.classList.add('modal--open');
        modal.addEventListener(
            'click',
            function (evt) {
                const isOutside = !evt.target.closest('.js-modal-content');
                if (isOutside) {
                    closePrompt();
                }
            },
            { once: true }
        );
        const form = modalContent.querySelector('.js-form');
        form.input ? form.input.focus() : form.cancel.focus();
        form.addEventListener(
            'submit',
            function (evt) {
                evt.preventDefault();
                resolve(evt.currentTarget.input?.value || true);
                closePrompt();
            },
            { once: true }
        );
        form.cancel.addEventListener(
            'click',
            function (evt) {
                evt.preventDefault();
                resolve(false);
                closePrompt();
            },
            { once: true }
        );
    });
}

async function closePrompt() {
    modal.classList.remove('modal--open');
    await wait(200);
    modalContent.innerHTML = '';
}

export { displayItems, addPrompt, confirmPrompt, closePrompt };
