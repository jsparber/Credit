var React = require('react');
var data = {
	"number" : "+3933745678",
	"credit" : "10,50€" ,
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
	],
  "interval" : {
		"title" : "Days",
		"deadline" : "Mon Mar 01 2015 17:25:45 GMT+0100 (CET)",
		"days" : "30"
	}
};


var Content = React.createClass({
	render: function() {
		console.log(this);
		return(
				<section id="content">
				<Number number={this.props.data.number}/>
				<Credit credit={this.props.data.credit}/>
				<Traffic traffic={this.props.data.traffic}/>
				<TimeInterval intervall={this.props.data.interval}/>
				</section>
				);
	}
});

var Number = React.createClass({
	render: function() {
		return(
				<div>
					<h3>
						Number
					</h3>
					<h2>
						{this.props.number}
					</h2>
				</div>
				);
	}
});

var Credit = React.createClass({
	render: function() {
		return(
				<div>
					<h3>
						Credit
					</h3>
					<h1>
						{this.props.credit}
					</h1>
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
		var divStyle = {
			width: this.props.data.remaining/this.props.data.total*100 + "%"
		};
		return(
				<div>
				<h3>
				{this.props.data.title}
				</h3>
				<h1>
			 	{this.props.data.remaining} / {this.props.data.total}
				</h1>
				<div className="beam">
				<div className="remaining" style={divStyle} />
				<div className="used" />
				</div>
				</div>
				);
	}
});

var TimeInterval = React.createClass({
	render: function() {
		var deadline = new Date(this.props.intervall.deadline);
		console.log(deadline);
		var total = this.props.intervall.days;
		var remaining = 0;
		var dayList = [];
				for(var i = 0; i < this.props.intervall.days; i++)
					dayList.push(<Days />);

		return(
				<div>
				<h3>
				{this.props.intervall.title}:
				</h3>
				<h1>
			 	{remaining} / {total}
				</h1>
				<div className="beam">
				{dayList}
				</div>
				</div>
				);
	}
});

var Days = React.createClass({
	render: function() {
		return(
				<div className="days" />
				);
	}
});

React.render(
		<Content data={data}/>,
		document.getElementById("container")
		);
