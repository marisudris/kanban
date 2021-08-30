const status = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
};

function displayItems(listing, tasks) {
    const html = tasks
        .filter((task) => task.status === listing.dataset.type)
        .map(
            (task) =>
                `<div class="task">
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
    listing.querySelector('.js-content').innerHTML = html;
}

function addItem(item, tasks) {
    return [...tasks, item];
}

function deleteItem(id, tasks) {
    return tasks.filter((task) => task.id !== id);
}

export { status, displayItems, addItem, deleteItem };
