import { status } from './core.js';

const tasks = [
    {
        id: Date.now(),
        task: 'Some task',
        status: status.PENDING,
    },
    {
        id: Date.now() + 2,
        task: 'Another task',
        status: status.PENDING,
    },

    {
        id: Date.now() + 3,
        task: 'Task in progress...',
        status: status.IN_PROGRESS,
    },
    {
        id: Date.now() + 4,
        task: 'Finished task',
        status: status.DONE,
    },
];

export default tasks;
