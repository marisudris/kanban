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

export { displayItems };
