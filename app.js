var React = require('react');
var moment = require('moment');
var data = {
	"number" : "+3933745678",
	"credit" : "10,50€" ,
	"traffic" : [
	{
		"title" : "Minuti",
		"total" : 150,
		"remaining" : 50
	},
	{
		"title": "Messaggi", 
		"total" : 150,
		"remaining" : 75
	},
		{
			"title" : "Megabyte",
			"total" : 1024,
			"remaining" : 250
		}
	],
  "interval" : {
		"title" : "Giorni",
		"deadline" : "Mon Mar 04 2015 17:25:45 GMT+0100 (CET)",
		"startdate" : "Mon Feb 02 2015 17:25:45 GMT+0100 (CET)",
	}
};


var Content = React.createClass({
	render: function() {
		console.log(this);
		return(
				<section id="content">
				<Number number={this.props.data.number}/>
				<Credit credit={this.props.data.credit}/>
				<div className="space" />
				<Traffic traffic={this.props.data.traffic}/>
				<div className="space" />
				<TimeInterval intervall={this.props.data.interval}/>
				</section>
				);
	}
});

var Value = React.createClass({
  render: function() {
    return(
        <div className="values">
        <h1 className="remainingValues">
			 	{this.props.value.remaining}
        </h1>
        <span className="usedValues">
			 	 / {this.props.value.total}
        </span>
        </div>
        )

  }
});

var Number = React.createClass({
	render: function() {
		return(
				<div>
					<h3>
						Numero
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
						Credito
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
        <Value value={this.props.data} />
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
		var today = new Date();
		today = moment(today);
		var deadline = moment(this.props.intervall.deadline);
		var startdate = moment(this.props.intervall.startdate);
		var total = (deadline.diff(startdate, "days"));
		var passed = (today.diff(startdate, "days"));
		var remaining = deadline.diff(today, "days");
		var months = {};
		months.start = startdate.format("D MMMM");
		months.end = deadline.format("D MMMM");
		var dayList = [];
				for(var i = 0; i < passed; i++)
					dayList.push(<Days class="days passedDays" />);
				dayList.push(<Days class="days toDay" />);
				for(var i = passed; i < total-1; i++)
					dayList.push(<Days class="days remainingDays" />);

     var values = {"remaining" : remaining, "total" : total};
		return(
				<div>
				<h3>
				{this.props.intervall.title}
				</h3>
				<h1>
        <Value value={values} />
				</h1>
				<div className="beamInterval">
				{dayList}
				</div>
				<Description months={months}/>
				</div>
				);
	}
});


var Days = React.createClass({
	render: function() {
		return(
				<div className={this.props.class} />
				);
	}
});

var Description = React.createClass({
	render: function() {
		return(
			<div className="discription">	
			<div>
				{this.props.months.start}
			</div>
			<div>
				{this.props.months.end}
			</div>
			</div>
			)
	}
});

React.render(
		<Content data={data}/>,
		document.getElementById("container")
		);
