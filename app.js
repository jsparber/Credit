var React = require('react');

var Content = React.createClass({
	render: function() {
		console.log(this);
		return(
				<section id="content">
				Hello World
				</section>
				);
	}
});

React.render(
		<Content/>,
		document.getElementById("container")
		);
