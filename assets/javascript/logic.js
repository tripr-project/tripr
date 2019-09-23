//003d34814cmsh8eb07577db7a1acp13773ejsn7347d271e32b


$(document).ready(function () {
	$('.carousel').carousel();

	// rapid api keys
	// "x-rapidapi-key": "517cfaf70bmshf561bc8c9eb73e6p19dbb4jsn62aee8ad1606"
	// "x-rapidapi-key": "4eb47b353emshb1dde063c97b955p15ac25jsn48408650620d"

	var cityinput = "Chicago";
	// $(".submit-city").on("click", function (event) {
	//     event.preventDefault();
	//     var cityInput = $("#city").val().trim();
	//     console.log(cityInput)
	//     $("#city").val("");
	// });
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?languagecode=en-us&text=" + cityinput,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
			"x-rapidapi-key": "003d34814cmsh8eb07577db7a1acp13773ejsn7347d271e32b"
		}
	}


	var bookingcitycode = 0;

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
				"x-rapidapi-key": "003d34814cmsh8eb07577db7a1acp13773ejsn7347d271e32b"
			}
		}


		$.ajax(settings2).done(function (response) {
			console.log(response.result[0]);
			$(".hotel-display").append(response.result[0].hotel_name);

			// searches for restaurant IDs given the lon/lat from city input
			var ids = {
				"async": true,
				"crossDomain": true,
				"url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/ids?distance=5&page=1&lat=" + response.result[0].latitude + "&lon=" + response.result[0].longitude,
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
					"x-rapidapi-key": "003d34814cmsh8eb07577db7a1acp13773ejsn7347d271e32b"
				}
			}

			$.ajax(ids).done(function (response) {
				// restaurant_ids are provided in an object. required to search for restaurants around the location
				console.log(response.result.data.restaurant_ids);

				// for (var i = 0; i < response.result.data.restaurant_ids.length; i++){
				for (var i = 0; i < 5; i++) {
					var loopId = response.result.data.restaurant_ids[i]
					console.log(loopId)

					var restaurants = {
						"async": true,
						"crossDomain": true,
						// replace restaurant ID at end of URL with restaurant ID. for loop to cycle through the array of restaurants?
						"url": "https://us-restaurant-menus.p.rapidapi.com/restaurant/" + loopId,
						// response.result.data.restaurant_ids
						"method": "GET",
						"headers": {
							"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
							"x-rapidapi-key": "003d34814cmsh8eb07577db7a1acp13773ejsn7347d271e32b"
						}
					}

					$.ajax(restaurants).done(function (response) {
						// console.log(response.result)
						console.log("restaurant name: " + response.result.restaurant_name);
						console.log("restaurant name: " + response.result.address.formatted);
						console.log("restaurant name: " + response.result.cuisines);
						console.log("restaurant name: " + response.result.restaurant_phone);


						$(".restaurant-display").append(response.result.restaurant_name);
						// grab more info - phone number, address, cuisines, etc...
					});
				}
				// push responses into a table 
				var restaurants = {
					"async": true,
					"crossDomain": true,
					// replace restaurant ID at end of URL with restaurant ID. for loop to cycle through the array of restaurants?
					"url": "https://us-restaurant-menus.p.rapidapi.com/restaurant/134949",
					// response.result.data.restaurant_ids
					"method": "GET",
					"headers": {
						"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
						"x-rapidapi-key": "003d34814cmsh8eb07577db7a1acp13773ejsn7347d271e32b"
					}
				}

				$.ajax(restaurants).done(function (response) {
					console.log("restaurant name: " + response.result.restaurant_name);
					$(".restaurant-display").append(response.result.restaurant_name);

				});
			}
			);
		});
	});

	// NEW IMGUR 
	var settings3 = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.imgur.com/3/gallery/search/?q_all=" + cityinput,
		"method": "GET",
		"headers": {
			"authorization": "Client-ID 53b448fc2ff06e6"
		}
	}

	$.ajax(settings3).done(function (response) {
		console.log(response);
	});

	// end document ready
});