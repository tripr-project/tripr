var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://apidojo-booking-v1.p.rapidapi.com/properties/list?price_filter_currencycode=USD&travel_purpose=leisure&categories_filter=price%3A%3A9-40%2Cfree_cancellation%3A%3A1%2Cclass%3A%3A1%2Cclass%3A%3A0%2Cclass%3A%3A2&search_id=none&order_by=popularity&children_qty=2&languagecode=en-us&children_age=5%2C7&search_type=city&offset=0&dest_ids=-3712125&guest_qty=1&arrival_date=2020-01-01&departure_date=2020-01-03&room_qty=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
		"x-rapidapi-key": "4eb47b353emshb1dde063c97b955p15ac25jsn48408650620d"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});

var settings2 = {
	"async": true,
	"crossDomain": true,
	"url": "https://apidojo-kayak-v1.p.rapidapi.com/cars/create-session?origincitycode=6126&originairportcode=SGN&pickupdate=2020-01-01&pickuphour=16&dropoffdate=2020-01-03&dropoffhour=6&currency=USD",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
		"x-rapidapi-key": "4eb47b353emshb1dde063c97b955p15ac25jsn48408650620d"
	}
}

$.ajax(settings2).done(function (response) {
	console.log(response);
});