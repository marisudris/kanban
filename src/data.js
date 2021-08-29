const tasks = [
    {
        id: Date.now(),
        task: 'Some task',
        status: 'pending',
    },
    {
        id: Date.now() + 2,
        task: 'Another task',
        status: 'pending',
    },

    {
        id: Date.now() + 3,
        task: 'Task in progress...',
        status: 'in-progress',
    },
    {
        id: Date.now() + 4,
        task: 'Finished task',
        status: 'done',
    },
];

export default tasks;
