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

function addItem(item, tasks) {
    return [...tasks, item];
}

function deleteItem(id, tasks) {
    return tasks.filter((task) => task.id !== id);
}

function changeItemStatus(item, newStatus) {
    return {
        ...item,
        status: newStatus,
    };
}

function replaceItem(tasks, oldItem, newItem) {
    const index = tasks.findIndex((task) => task.id === oldItem.id);
    if (index === -1) {
        return tasks;
    }
    return [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)];
}

export {
    status,
    displayItems,
    addItem,
    deleteItem,
    changeItemStatus,
    replaceItem,
};
