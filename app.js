var React = require('react');
var data = {
	"number" : +3933745678,
	"credit" : 10.5,
	"traffic" : [
	{
		"title" : "talking",
		"total" : 150,
		"remaining" : 50
	},
	{
		"title": "sms", 
		"total" : 150,
		"remaining" : 75
	},
		{
			"title" : "internet",
			"total" : 1024,
			"remaining" : 250
		}
	]
};


var Content = React.createClass({
	render: function() {
		console.log(this);
		return(
				<section id="content">
				<Number number={this.props.data.number}/>
				<Credit credit={this.props.data.credit}/>
				<Traffic traffic={this.props.data.traffic}/>
				<TimeInterval />
				</section>
				);
	}
});

var Credit = React.createClass({
	render: function() {
		return(
				<div>
					<span>
						Credit
					</span>
					<span>
						{this.props.credit}
					</span>
				</div>
				);
	}
});

var Number = React.createClass({
	render: function() {
		return(
				<div>
					<span>
						Number
					</span>
					<span>
						{this.props.number}
					</span>
				</div>
				);
	}
});

var Traffic = React.createClass({
	render: function() {
		var trafficList = this.props.traffic.map(function(bonus, index){
			return(
					<Bonus data={bonus} />
					);
		});
		return(
				<div>
				{trafficList}
				</div>
				);
	}
});

var Bonus = React.createClass({
	render: function() {
		return(
				<div>
					{this.props.data}
				</div>
				);
	}
});

var TimeInterval = React.createClass({
	render: function() {
		return(
				<div />
				);
	}
});

var BonusInterval = React.createClass({
	render: function() {
		return(
				<div />
				);
	}
});

React.render(
		<Content data={data}/>,
		document.getElementById("container")
		);
