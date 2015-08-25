/**
 * This mixin provides two important methods for React components:
 *
 * do(fn) -> do will take a function and return it wrapped in a promise
 *           this promise will be resolved when the component next renders
 *           this allows animations to be triggered correctly.
 *
 * setStateAnd(state) -> a helper method that uses do, wraps setState in a
 *                       promise that is resolved when state is actually
 *                       updated.
 */
module.exports = {
    __queueForRender: function(cb) {
        this.__afterRender = this.__afterRender || [];
        this.__afterRender.push(cb);
    },

    __doAfterRenderQueue: function() {
        if (this.__afterRender) {
            this.__afterRender.forEach( function(cb) { cb(); } );
            this.__afterRender = [];
        }
    },

    componentDidUpdate: function() {
        this.__doAfterRenderQueue();
    },

    "perform": function(todo) {
        var _this = this;
        var p = new Promise(function(resolve, reject) {
            _this.__queueForRender(resolve);

            todo();
        });

        return p;
    },

    setStateAnd: function(state) {
        return this["perform"](this.setState.bind(this, state));
    }
};
