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

export { displayItems };
