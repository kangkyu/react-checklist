var Checklist = React.createClass({
    getInitialState: function() {
        return {
            data: [
                {text: 'Checklist component hierarchy', complete: false},
                {text: 'State vs. Props (examples)', complete: false},
                {text: 'Note that "key" is not a prop', complete: false},
                {text: 'Explain inverse data flow (ReactLink add-on worth exploring...)', complete: false},
                {text: 'Adjacent XJS elements required wrapper gotcha', complete: false},
            ]
        };
    },
    addNewItem: function(item_text) {
        var new_data = this.state.data.slice();
        new_data.push({text: item_text, complete: false});
        this.setState({data: new_data});
    },
    updateItem: function(item_index, item_complete) {
        var new_data = this.state.data.slice();
        new_data[item_index].complete = item_complete;
        this.setState({data: new_data});
    },
    removeItem: function(item_index) {
        var new_data = this.state.data.slice();
        new_data.splice(item_index, 1);
        this.setState({data: new_data});
    },
    render: function() {
        return (
            <div className='checklist'>
                <NewItemForm onItemSubmit={this.addNewItem} />
                <List data={this.state.data} onItemChange={this.updateItem} onItemRemove={this.removeItem} />
            </div>
        );
    }
});

var NewItemForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var input_node = this.refs.item_text;
        console.log(input_node.value);
        if (input_node.value) {
            this.props.onItemSubmit(input_node.value);
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
    itemHasChanged: function(item_index, item_complete) {
        this.props.onItemChange(item_index, item_complete);
    },
    itemRemoved: function(item_index, item_complete) {
        this.props.onItemRemove(item_index);
    },
    render: function() {
        var list_items = [],
            self = this;
        this.props.data.forEach(function(item, index) {
            list_items.push(
                <Item
                    complete={item.complete}
                    text={item.text}
                    key={index}
                    index={index}
                    onItemClick={self.itemHasChanged}
                    onRemoveClick={self.itemRemoved} />
            );
        });
        return (
            <ul>
                {list_items}
            </ul>
        );
    }
});

var Item = React.createClass({
    handleCompleteClick: function() {
        this.props.onItemClick(this.props.index, !this.props.complete);
    },
    handleRemoveClick: function() {
        this.props.onRemoveClick(this.props.index);
    },
    render: function() {
        var status = (this.props.complete) ? 'complete' : 'pending';
        return (
            <li>
                <span className={status} onClick={this.handleCompleteClick}>{this.props.text}</span>
                <i className='fa fa-times' onClick={this.handleRemoveClick}></i>
            </li>
        );
    }
});

React.render(
    <Checklist />,
    document.querySelector('#app')
);