# Credit
Core of my Credit-android app

##Demo
[http://juliansparber.com/Credit/](http://juliansparber.com/Credit/)

##Build
You have to enable x-orgin request in your browser
		npm install
		sudo npm -g install browserify
		sudo npm -g install live-server
		browserify -t reactify src/views.js -o js/main.js
		live-server

