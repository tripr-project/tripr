var cityinput = "Chicago";

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?languagecode=en-us&text=" + cityinput,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
		"x-rapidapi-key": "08656075a8mshf285d559bde3ee6p166a56jsndcf3cac73506"
	}
}


var bookingcitycode = 0;
var bookingcitycodestring = "0";

$.ajax(settings).done(function (response) {
	console.log(response[0]);
	bookingcitycode = response[0].dest_id;

	var settings2 = {
		"async": true,
		"crossDomain": true,
		"url": "https://apidojo-booking-v1.p.rapidapi.com/properties/list?price_filter_currencycode=USD&travel_purpose=leisure&categories_filter=price%3A%3A9-40%2Cfree_cancellation%3A%3A1%2Cclass%3A%3A1%2Cclass%3A%3A0%2Cclass%3A%3A2&search_id=none&order_by=popularity&children_qty=2&languagecode=en-us&children_age=5%2C7&search_type=city&offset=0&dest_ids=" + bookingcitycode + "&guest_qty=1&arrival_date=2020-01-01&departure_date=2020-01-03&room_qty=1",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
			"x-rapidapi-key": "08656075a8mshf285d559bde3ee6p166a56jsndcf3cac73506"
		}
	}


	$.ajax(settings2).done(function (response) {
		console.log(response.result[0]);
		$(".hotel-display").append(response.result[0].hotel_name)
	});


});

// NEW IMGUR 
var settings3 = {
	"async": true,
	"crossDomain": true,
	"url": "https:imgur-apiv3.p.rapidapi.com/3/image/Chicago",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
		"x-rapidapi-key": "08656075a8mshf285d559bde3ee6p166a56jsndcf3cac73506",
		"authorization": "kempatkinson"
	}
}

$.ajax(settings3).done(function (response) {
	console.log(response);
});


