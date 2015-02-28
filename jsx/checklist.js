var React = require('react');
var Alt = require('alt');

var alt = new Alt();

class ChecklistActions {
    constructor() {
        this.generateActions(
            'addItem',
            'toggleItem',
            'removeItem'
        )
    }
}
var checklistActions = alt.createActions(ChecklistActions);

class ChecklistStore {
    constructor() {
        this.bindActions(checklistActions)
        this.items = {
            starter_item_a: {
                text: 'Click an item to mark it as complete',
                complete: false
            },
            starter_item_b: {
                text: 'Use the "x" to remove it completely',
                complete: false
            }
        }
        if (localStorage.items) {
            this.items = JSON.parse(localStorage.items);
        }
    }
    addItem(text) {
        // create random id...copypasta from the alt todo example
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        this.items[id] = {text: text, complete: false};
        localStorage.items = JSON.stringify(this.items);
    }
    toggleItem(id) {
        this.items[id].complete = !this.items[id].complete;
        localStorage.items = JSON.stringify(this.items);
    }
    removeItem(id) {
        delete this.items[id];
        localStorage.items = JSON.stringify(this.items);
    }
}
var checklistStore = alt.createStore(ChecklistStore);

var Checklist = React.createClass({
    getInitialState: function() {
        return {
            data: checklistStore.getState().items
        };
    },
    componentDidMount: function() {
        checklistStore.listen(this.onChange);
    },
    componentWillUnmount: function() {
        checklistStore.unlisten(this.onChange);
    },
    onChange() {
        this.setState(this.getInitialState())
    },
    render: function() {
        return (
            <div className='checklist'>
                <NewItemForm />
                <List data={this.state.data} />
            </div>
        );
    }
});

var NewItemForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var input_node = this.refs.item_text.getDOMNode();
        if (input_node.value) {
            checklistActions.addItem(input_node.value);
            input_node.value = '';
        }
        input_node.focus();
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' ref='item_text' />
                <button ref='add_button'>Add</button>
            </form>
        );
    }
});

var List = React.createClass({
    render: function() {
        var list_items = [],
            self = this;
        for (var item_id in this.props.data) {
            var item = this.props.data[item_id];
            list_items.push(
                <Item
                    complete={item.complete}
                    text={item.text}
                    key={item_id}
                    item_id={item_id} />
            );
        }
        return (
            <ul>
                {list_items}
            </ul>
        );
    }
});

var Item = React.createClass({
    handleToggleClick: function() {
        checklistActions.toggleItem(this.props.item_id);
    },
    handleRemoveClick: function() {
        checklistActions.removeItem(this.props.item_id);
    },
    render: function() {
        var status = (this.props.complete) ? 'complete' : 'pending';
        return (
            <li>
                <span className={status} onClick={this.handleToggleClick}>{this.props.text}</span>
                <i className='fa fa-times' onClick={this.handleRemoveClick}></i>
            </li>
        );
    }
});

module.exports = Checklist;