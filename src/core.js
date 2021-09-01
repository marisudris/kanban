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

function replaceItem(oldItem, newItem, tasks) {
    const newTasks = deleteItem(oldItem.id, tasks);
    return addItem(newItem, newTasks);
}

export { status, addItem, deleteItem, changeItemStatus, replaceItem };
