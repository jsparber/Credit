var React = require("react");
var moment = require("moment");
var loadData = require('Credit-backend');

var loginViewData = {
	"providers" : [{
		"name": "Postemobile",
	}, {
		"name": "Tre",
	}, {
		"name": "TIM",
	}, {
		"name": "Vodafone",
	}],

		"fields" : [
		{
			"title" : "Username",
			"type"	: "text"
		},
		{
			"title" : "Password",
			"type"	: "password"
		}
		],
		"warnings" : ["Please register first on your provider's website to obtain login credentials", "The login credentials are only sent to the selected provider"]
}


var Content = React.createClass({
	clickHandler: function() {
		document.getElementById("reloadBtn").className = "spinner";
		var userData = JSON.parse(localStorage.data);
		loadData(userData, render);
	},
	render: function() {
		return(
				<section id="content">
				<div onClick={this.clickHandler} id="reloadBtn">&#8634;</div>
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
			width: this.props.data.remaining/this.props.data.total*100+ "%"
		};
		return(
				<div>
				<h3>
				{this.props.data.title}
				</h3>
        <Value value={this.props.data} />
				<div className="beam used">
				<div className="remaining" style={divStyle} />
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

//Login view

var Login = React.createClass({
	render: function() {
		return(
				<div>
					<div className="error">{this.props.error}</div>
					<Fields fields={this.props.data.fields} providers={this.props.data.providers} />
					<Warnings warnings={this.props.data.warnings} />
				</div>

				)
	}
});

var Fields = React.createClass({
	getInitialState: function() {
	return {provider: this.props.providers[0]};
	},
	clickHandler: function(e) {
		var loginData = {};
		loginData.user = document.getElementById("Username").value;
		loginData.password = document.getElementById("Password").value;
		loginData.provider = this.state.provider.name;
		console.log(loginData);
		loadData(loginData, render);
	},
	selectHandler: function(el) {
		this.setState(el);
	},
	render: function() {
		var field = this.props.fields.map(function(el) {
			return(
				<div>
					<h3>
						{el.title}
					</h3>
					<input id={el.title} className="beam" type={el.type} value={el.value} />
				</div>
					);
		});
		return(
				<div>
					{field}
					<h3>
						Provider
					</h3>
				<Dropdown list={this.props.providers} selectHandler={this.selectHandler} />
				<h3 />
				<input onClick={this.clickHandler} className="beam" type="submit" value="Login" />
				</div>
				);
	}
});

var Warnings = React.createClass({
	render: function() {
		return(
				<div>
					<div className="warning">
						{this.props.warnings[0]}
					</div>
					<div className="warning">
						{this.props.warnings[1]}
					</div>
				</div>
				);
	}
});

var Dropdown = React.createClass({
	getInitialState: function() {
		//this.props.selectHandler({provider: this.props.list[0]});
		return {
			listVisible: false,
			provider: this.props.list[0]
		};
	},
	select: function(item) {
		this.setState({listVisible: false, provider : item});
		this.props.selectHandler({provider: item});
	},
	clickHandler: function(e) {
		this.setState({ listVisible: !this.state.listVisible });
	},
	render: function() {
		return(
			<div className="dropdown-container">
				<div className="dropdown-display" onClick={this.clickHandler}>
					{this.state.provider.name}
					<span className="angle-down" />
				</div>
				<div className={"dropdown-list" + (this.state.listVisible ? " show" : "")}>
				{this.renderListItems()}
				</div>
			</div>
			);
	},
	renderListItems: function() {
		var items = [];
		for (var i = 0; i < this.props.list.length; i++) {
			var item = this.props.list[i];
			if (item !== this.state.provider){
			items.push(<div onClick={this.select.bind(null, item)}>
					{item.name}
					</div>);
			}
		}
		return items;
	}
});


if (!localStorage.data)
	renderLoginView();
else{
	var userData = JSON.parse(localStorage.data);
	loadData(userData, render);
}

function render(error, data){
	if(!error) {
		localStorage.data = JSON.stringify(data);
		console.log("Data resived", data);
		React.render(
				<Content data={data}/>,
				document.getElementById("container")
				);
		document.getElementById("reloadBtn").className = "";
	}
	else
		renderLoginView(error);
}

function renderLoginView(error){
	React.render(
			<Login data={loginViewData} error={error} />,
			document.getElementById("container")
			);
}
