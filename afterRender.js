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
            this.__afterRender.forEach( cb => cb() );
            this.__afterRender = [];
        }
    },

    componentDidUpdate: function() {
        this.__doAfterRenderQueue();
    },

    do: function(todo) {
        var p = new Promise((resolve, reject) => {
            this.__queueForRender(resolve);

            todo();
        });

        return p;
    },

    setStateAnd: function(state) {
        return this.do(this.setState.bind(this, state));
    }
};
