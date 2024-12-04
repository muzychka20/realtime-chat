function log() {
    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i]
        // Stringify and indent object
        if (typeof arg === 'object') {
            arg = JSON.stringify(arg, null, 2)
        }
        console.log(arg)
    }
}

export default { log }