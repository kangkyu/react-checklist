var LinkBoard = React.createClass({
    render: function() {
        return <LinkList links={this.props.links} />;
    }
});

var LinkList = React.createClass({
    render: function() {
        var links = [];
        this.props.links.forEach(function(link, index) {
            links.push(
                <LinkItem key={index} title={link.title} url={link.url} />
            );
        });
        return (
            <div className='link-list'>
                {links}
            </div>
        );
    }
});

var LinkItem = React.createClass({
    render: function() {
        return (
            <div className='link-item'>
                <a href={this.props.url} target='_blank'>{this.props.title}</a>
            </div>
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
  <LinkBoard links={LINKS} />,
  document.body
);