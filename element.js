var $ = require("jquery");
var React = require("react");

module.exports = {
    getEl: function() {
        return React.findDOMNode(this);
    },

    get$El: function() {
        return $(React.findDOMNode(this));
    }
};
