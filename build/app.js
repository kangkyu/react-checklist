var LinkBoard = React.createClass({displayName: "LinkBoard",
    render: function() {
        return React.createElement(LinkList, {links: this.props.links});
    }
});

var LinkList = React.createClass({displayName: "LinkList",
    render: function() {
        var links = [];
        this.props.links.forEach(function(link, index) {
            links.push(
                React.createElement(LinkItem, {key: index, title: link.title, url: link.url})
            );
        });
        return (
            React.createElement("div", {className: "link-list"}, 
                links
            )
        );
    }
});

var LinkItem = React.createClass({displayName: "LinkItem",
    render: function() {
        return (
            React.createElement("div", {className: "link-item"}, 
                React.createElement("a", {href: this.props.url, target: "_blank"}, this.props.title)
            )
        );
    }
});

var LINKS = [
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
    {title: 'Something', url: '#'},
]

React.render(
  React.createElement(LinkBoard, {links: LINKS}),
  document.body
);