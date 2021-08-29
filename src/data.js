const tasks = [
    {
        id: Date.now(),
        task: 'Some task',
        status: 'pending',
    },
    {
        id: Date.now() + 1,
        task: 'Another task',
        status: 'pending',
    },

    {
        id: Date.now() + 1,
        task: 'Task in progress...',
        status: 'in-progress',
    },
    {
        id: Date.now() + 1,
        task: 'Finished task',
        status: 'done',
    },
];

export default tasks;
