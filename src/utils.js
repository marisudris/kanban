function wait(ms = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export { wait };
