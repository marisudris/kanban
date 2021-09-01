const status = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
};

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
    addItem,
    deleteItem,
    changeItemStatus,
    replaceItem,
};
