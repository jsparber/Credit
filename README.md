# Credit
Core of my Credit-android app.

Until now it supports only postemobile, but feel free to contribute other provider.

Suggests and contributes are welcome :)

##Demo
[http://juliansparber.com/Credit/](http://juliansparber.com/Credit/)

##Backend
Checkout the [backend](https://github.com/jsparber/Credit-backend)



##Build
You have to enable x-orgin request in your browser

		npm install
		sudo npm -g install browserify
		sudo npm -g install live-server
		browserify -t reactify src/views.js -o js/main.js
		live-server

