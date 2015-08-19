module.exports = function mergeMethods(target, name, fn, reverseOrder) {
    if (target[name] !== undefined) {
        // If we do have a clash
        var one = target[name];
        var two = fn;

        // Quick check to make sure we haven't been passed anything invalid
        if (one && two) {
            target[name] = function() {

                // .call is needed to preserve the context within this closure
                // "this" gets mangled otherwise.
                if (reverseOrder === true) {
                    return two.call(this, arguments) || one.call(this, arguments);
                } else {
                    return one.call(this, arguments) || two.call(this, arguments);
                }

            };

            target[name].__isMergedMethod = true;
        }

    } else {
        // Just use fn as the method, no clash
        target[name] = fn;
    }
};
