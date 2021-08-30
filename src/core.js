const status = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
};

function displayItems(list, tasks) {
    const html = tasks
        .filter((task) => task.status === list.dataset.type)
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
    list.querySelector('.js-content').innerHTML = html;
}

function deleteItem(id, tasks) {
    return tasks.filter((task) => task.id !== id);
}

export { status, displayItems, deleteItem };
