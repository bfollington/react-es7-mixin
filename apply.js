var mergeMethods = require("./util/mergeMethods");

module.exports = function apply(mixin) {
    return function decorator(target) {

        // Apply can accept both hash and function based mixins
        // hash is the preferred format, since merging React lifecycle methods
        // can be performed automatically.
        if (typeof mixin === "object") {
            for (var key in mixin) {
                mergeMethods(target.prototype, key, mixin[key]);
                target.prototype[key].__addedBy = mixin;
            }
        } else if (typeof mixin === "function") {
            console.warn("Warning: Mixins run as functions are responsible for merging their own lifecycle methods");
            mixin(target);
        } else {
            throw new Error("Unsupported value passed as mixin");
        }
    };
};
