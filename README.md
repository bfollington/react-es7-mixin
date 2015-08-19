# React ES7 Mixins

This allows @annotation style mixins to be applied to React components and regular ES6 classes.

## Installation

`npm install react-es7-mixin --save`

Resulting files must be compiled with `babel` with the following options:

    {
        "optional": [ "es7.decorators" ]
    }

## Usage

    var React = require("react");
    var apply = require("react-es7-mixin/apply");
    var element = require("react-es7-mixin/element");
    var afterRender = require("react-es7-mixin/afterRender");

    var myCustomMixin = require("./customMixin.js");

    // Allow easy access to the DOM Node
    @apply(element)

    // Queue actions for after the next render
    @apply(afterRender)

    @apply(myCustomMixin)
    export class TestComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        someMethod() {
            this.get$El().attr("title", "Methods are automatically added");
        }

        componentDidMount() {
            // Lifecycle method hooks are automatically merged, allowing mixins to do "magic"

            this.setStateAnd({
                "some": "value"
            })
            .then( () => {
                console.log("Run an animation on the freshly rendered DOM");
            });
        }

        render() {
            return (<div></div>);
        }
    }
