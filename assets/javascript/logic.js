// rapid api keys
// "x-rapidapi-key": "517cfaf70bmshf561bc8c9eb73e6p19dbb4jsn62aee8ad1606"
// "x-rapidapi-key": "4eb47b353emshb1dde063c97b955p15ac25jsn48408650620d"
//  003d34814cmsh8eb07577db7a1acp13773ejsn7347d271e32b
// 11785c8b2cmsh47e75714bae08e2p11d46djsna87e52066cf6



$(document).ready(function () {
	$(".carousel").hide();

	// $(".card").hide();
	// $("#preview").hide();
	// $("#changecity").hide();



	$(".restaurant-display").hide();

	$(".card").hide();
	$("#preview").hide();
	$("#changecity").hide();
	$(".sidenav").sidenav();



	var cityInput;
	$(".submit-city").on("click", function (event) {
		event.preventDefault();
		cityInput = $("#city").val().trim();

		arrivalInput = $("#arrival").val().trim();
		departureInput = $("#departure").val().trim();

		// guestsCount = $("#guests").val().trim();
		// roomsCount = $("#rooms").val().trim();

		console.log(cityInput)
		$("#city").val("");
		$("#arrival").val("");
		$("#departure").val("");
		$(".carousel").show();
		$(".card").show();
		$("#preview").show();
		$("#destination").text(cityInput);
		$("#changecity").show();

		var slider = $('.carousel');
		slider.carousel();

		var settings3 = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.imgur.com/3/gallery/search/?q_all=" + cityInput,
			"method": "GET",
			"headers": {
				"authorization": "Client-ID 53b448fc2ff06e6"
			}
		}

		$.ajax(settings3).done(function (response) {
			$("#pictures").empty();
			for (var i = 0; i < 5; i++) {
				slider.append("<a class='carousel-item'> <img src=" + response.data[i].images[0].link + "></a>");
				if (slider.hasClass('initialized')) {
					slider.removeClass('initialized')
				}
				slider.carousel();
				console.log(response.data[i].images[0].link);
			}
			slider.carousel
		});

		var bookingcitycode = 0;
		var restlat = 0;
		var restlong = 0;

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?languagecode=en-us&text=" + cityInput,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
				"x-rapidapi-key": "11785c8b2cmsh47e75714bae08e2p11d46djsna87e52066cf6"
			}
		}
		$.ajax(settings).done(function (response) {
			console.log(response[0]);
			bookingcitycode = response[0].dest_id;

			restlat = response[0].latitude;
			restlong = response[0].longitude;
			console.log(restlat + "," + restlong)

			var settings2 = {
				"async": true,
				"crossDomain": true,
				"url": "https://apidojo-booking-v1.p.rapidapi.com/properties/list?price_filter_currencycode=USD&travel_purpose=leisure&categories_filter=price%3A%3A9-40%2Cfree_cancellation%3A%3A1%2Cclass%3A%3A1%2Cclass%3A%3A0%2Cclass%3A%3A2&search_id=none&order_by=popularity&children_qty=2&languagecode=en-us&children_age=5%2C7&search_type=city&offset=0&dest_ids=" + bookingcitycode + "&guest_qty=1&arrival_date=" + arrivalInput + "&departure_date=" + departureInput + "&room_qty=1",
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
					"x-rapidapi-key": "11785c8b2cmsh47e75714bae08e2p11d46djsna87e52066cf6"
				}
			}
			$.ajax(settings2).done(function (response) {

				// $(".hotelsbody").empty()

				// console.log(response.result[0]);
				// $(".hotel-display").empty();
				// $(".hotel-display").append(response.result[0].hotel_name);
				// 	console.log(response);
				// 	for (var i = 0; i < 6; i++) {
				// 		if (i == 2) {
				// 			console.log("skip")
				// 		} else {
				// 			var newRow = $("<tr>").append(
				// 				$("<td>").text(response.result[i].hotel_name),
				// 				console.log(response.result[i].hotel_name),
				// 				$("<td>").text(response.result[i].min_total_price),
				// 				console.log(response.result[i].min_total_price),
				// 				$("<td>").text(response.result[i].address),
				// 				console.log(response.result[i].address),
				// 				$("<td>").text(response.result[i].review_score),
				// 				console.log(response.result[i].review_score),
				// 			);
				// 			$(".hotelsbody").append(newRow);
				// 		}
				// 	}
				// });
				// searches for restaurant IDs given the lon/lat from city inpu



				console.log(response.result[0]);
				$(".hotel-display").empty();
				$(".hotel-display").append(response.result[0].hotel_name);

				var dates = {
					"async": true,
					"crossDomain": true,
					"url": "https://apidojo-booking-v1.p.rapidapi.com/filters/list?children_qty=4&languagecode=en-us&children_age=5%2C7%2C9%2C10&price_filter_currencycode=USD&categories_filter=price%3A%3A9-40%2Cfree_cancellation%3A%3A1%2Cclass%3A%3A1%2Cclass%3A%3A0%2Cclass%3A%3A2&arrival_date=2019-10-13&dest_ids=-3712125&departure_date=2019-10-15&guest_qty=1&room_qty=2&search_type=city",
					// "url": "https://apidojo-booking-v1.p.rapidapi.com/filters/list?children_qty=0&languagecode=en-us&children_age=5%2C7&price_filter_currencycode=USD&categories_filter=price%3A%3A9-40%2Cfree_cancellation%3A%3A1%2Cclass%3A%3A1%2Cclass%3A%3A0%2Cclass%3A%3A2&arrival_date=" + arrivalInput + "&dest_ids" + bookingcitycode + "&departure_date=" + departureInput + "&guest_qty=" + guestsCount + "&room_qty=" + roomsCount + "&search_type=city",
					"method": "GET",
					"headers": {
						"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
						"x-rapidapi-key": "517cfaf70bmshf561bc8c9eb73e6p19dbb4jsn62aee8ad1606"
					}
				}

				$.ajax(dates).done(function (response) {
					console.log(response);
				});

				// searches for restaurant IDs given the lon/lat from city input
				var ids = {
					"async": true,
					"crossDomain": true,
					"url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/ids?distance=5&page=1&lat=" + response.result[0].latitude + "&lon=" + response.result[0].longitude,
					"method": "GET",
					"headers": {
						"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
						"x-rapidapi-key": "11785c8b2cmsh47e75714bae08e2p11d46djsna87e52066cf6"
					}
				$(".hotelsbody").empty()
				console.log(response);
					for(var i = 0; i< 6; i++) {
				if (i == 2) {
					console.log("skip")
				} else {
					var newRow = $("<tr>").append(
						$("<td>").text(response.result[i].hotel_name),
						console.log(response.result[i].hotel_name),
						$("<td>").text(response.result[i].min_total_price),
						console.log(response.result[i].min_total_price),
						$("<td>").text(response.result[i].review_score),
						console.log(response.result[i].review_score),
						$("<td>").text(response.result[i].address),
						console.log(response.result[i].address),
					);
					$(".hotelsbody").append(newRow);
				}
			}
		});
	});

	var bookingcitycode = 0;
	var restlat = 0;
	var restlong = 0;

	var settingsAgain = {
		"async": true,
		"crossDomain": true,
		"url": "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?languagecode=en-us&text=" + cityInput,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
			"x-rapidapi-key": "11785c8b2cmsh47e75714bae08e2p11d46djsna87e52066cf6"
		}
	}
	// repeat ajax call - previously getting error from too many child functions
	$.ajax(settingsAgain).done(function (response) {
		console.log(response[0]);
		bookingcitycode = response[0].dest_id;
		restlat = response[0].latitude;
		restlong = response[0].longitude;
		console.log(restlat + "," + restlong)


		var ids = {
			"async": true,
			"crossDomain": true,
			"url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/ids?distance=5&page=1&lat=" + restlat + "&lon=" + restlong,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
				"x-rapidapi-key": "4eb47b353emshb1dde063c97b955p15ac25jsn48408650620d"

			}
		}


		// $.ajax(ids).done(function (response) {
		// 	// restaurant_ids are provided in an object. required to search for restaurants around the location
		// 	console.log(response);
		// 	$(".resturantsbody").empty();
		// 	for (var i = 0; i < 5; i++) {
		// 		var loopId = response.result.data.restaurant_ids[i]
		// 		console.log(loopId)

		// 		var restaurants = {
		// 			"async": true,
		// 			"crossDomain": true,
		// 			// replace restaurant ID at end of URL with restaurant ID. for loop to cycle through the array of restaurants?
		// 			"url": "https://us-restaurant-menus.p.rapidapi.com/restaurant/" + loopId,
		// 			// response.result.data.restaurant_ids
		// 			"method": "GET",
		// 			"headers": {
		// 				"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
		// 				"x-rapidapi-key": "4eb47b353emshb1dde063c97b955p15ac25jsn48408650620d"

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
						"x-rapidapi-key": "11785c8b2cmsh47e75714bae08e2p11d46djsna87e52066cf6"
					}

				}
			}

			$.ajax(restaurants).done(function (response) {

				// console.log(response.result)
				console.log("restaurant name: " + response.result.restaurant_name);
				console.log("restaurant name: " + response.result.address.formatted);
				console.log("restaurant name: " + response.result.cuisines);
				console.log("restaurant name: " + response.result.restaurant_phone);

				var newRow = $("<tr>").append(
					$("<td>").text(response.result.restaurant_name),
					$("<td>").text(response.result.restaurant_phone),
					$("<td>").text(response.result.cuisines),
					$("<td>").text(response.result.address.formatted),
				);
				$(".resturantsbody").append(newRow);

				// grab more info - phone number, address, cuisines, etc...
			});
			// }
			// // push responses into a table 
			// var restaurants = {
			// 	"async": true,
			// 	"crossDomain": true,
			// 	// replace restaurant ID at end of URL with restaurant ID. for loop to cycle through the array of restaurants?
			// 	"url": "https://us-restaurant-menus.p.rapidapi.com/restaurant/134949",
			// 	// response.result.data.restaurant_ids
			// 	"method": "GET",
			// 	"headers": {
			// 		"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			// 		"x-rapidapi-key": "11785c8b2cmsh47e75714bae08e2p11d46djsna87e52066cf6"
			// 	}
			// }

			// $.ajax(restaurants).done(function (response) {
			// 	console.log("restaurant name: " + response.result.restaurant_name);
			// 	$(".restaurant-display").append(response.result.restaurant_name);
			// 	// where is optimal place to put this? 
			// 	$(".restaurant-display").show();

		};
	});



	// end document ready
});

	});


			// $.ajax(ids).done(function (response) {
			// 	console.log(response);
			// 	$(".resturantsbody").empty();
			// 	for (var i = 0; i < 5; i++) {
			// 		var loopId = response.result.data.restaurant_ids[i]
			// 		console.log(loopId)

			// 		var restaurants = {
			// 			"async": true,
			// 			"crossDomain": true,
			// 			"url": "https://us-restaurant-menus.p.rapidapi.com/restaurant/" + loopId,
			// 			"method": "GET",
			// 			"headers": {
			// 				"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			// 				"x-rapidapi-key": "4eb47b353emshb1dde063c97b955p15ac25jsn48408650620d"
			// 			}
			// 		}

			// 		$.ajax(restaurants).done(function (response) {
			// 			console.log("restaurant name: " + response.result.restaurant_name);
			// 			console.log("restaurant name: " + response.result.address.formatted);
			// 			console.log("restaurant name: " + response.result.cuisines);
			// 			console.log("restaurant name: " + response.result.restaurant_phone);

			// 			var newRow = $("<tr>").append(
			// 				$("<td>").text(response.result.restaurant_name),
			// 				$("<td>").text(response.result.restaurant_phone),
			// 				$("<td>").text(response.result.cuisines),
			// 				$("<td>").text(response.result.address.formatted),
			// 			);
			// 			$(".resturantsbody").append(newRow);
			// 		});
			// 	};
			// });
		});
	});
			// end document ready
});
function() {
	console.log(s);
}

