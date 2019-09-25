// rapid api keys
// "x-rapidapi-key": "517cfaf70bmshf561bc8c9eb73e6p19dbb4jsn62aee8ad1606"
// "x-rapidapi-key": "4eb47b353emshb1dde063c97b955p15ac25jsn48408650620d"
//  003d34814cmsh8eb07577db7a1acp13773ejsn7347d271e32b
// 11785c8b2cmsh47e75714bae08e2p11d46djsna87e52066cf6
//dbd8b5bcb4msh23e2de6f3a2a400p15ad0djsna091b41791d9


$(document).ready(function () {
	$(".carousel").hide();
	$(".card").hide();
	$("#preview").hide();
	$("#changecity").hide();
	$('.datepicker').datepicker();

	var cityInput;
	$(".submit-city").on("click", function (event) {
		event.preventDefault();
		cityInput = $("#city").val().trim();

		arrivalInput = $("#arrival").val().trim();
		departureInput = $("#departure").val().trim();
		departureInput = moment(departureInput).format().substring(0,10);
		arrivalInput = moment(arrivalInput).format().substring(0,10);
		console.log(departureInput + "," + arrivalInput)
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
				"x-rapidapi-key": "dbd8b5bcb4msh23e2de6f3a2a400p15ad0djsna091b41791d9"
			}
		}
		$.ajax(settings).done(function (response) {
			bookingcitycode = response[0].dest_id;
			restlat = response[0].latitude;
			restlong = response[0].longitude;


			var settings2 = {
				"async": true,
				"crossDomain": true,
				"url": "https://apidojo-booking-v1.p.rapidapi.com/properties/list?price_filter_currencycode=USD&travel_purpose=leisure&categories_filter=price%3A%3A9-40%2Cfree_cancellation%3A%3A1%2Cclass%3A%3A1%2Cclass%3A%3A0%2Cclass%3A%3A2&search_id=none&order_by=popularity&children_qty=2&languagecode=en-us&children_age=5%2C7&search_type=city&offset=0&dest_ids=" + bookingcitycode + "&guest_qty=1&arrival_date=" + arrivalInput	
				+ "&departure_date=" + departureInput + "&room_qty=1",
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
					"x-rapidapi-key": "dbd8b5bcb4msh23e2de6f3a2a400p15ad0djsna091b41791d9"
				}
			}

			$.ajax(settings2).done(function (response) {
				$(".hotelsbody").empty()

				console.log(response.result[0]);
				// $(".hotel-display").empty();
				// $(".hotel-display").append(response.result[0].hotel_name);
				for (var i = 0; i < 6; i++) {
					if (i == 2) {
						console.log("skip")
					} else {
						var newRow = $("<tr>").append(
							$("<td>").html("<a class='hotel-link' href=" + response.result[i].url + ">" + response.result[i].hotel_name.toLowerCase() + "</a>"),
							$("<td>").text(response.result[i].min_total_price),
							$("<td>").text(response.result[i].review_score),
							$("<td>").text(response.result[i].address),
	
						);
						$(".hotelsbody").append(newRow);
					}
				}
			});
			// searches for restaurant IDs given the lon/lat from city inpu


		});

		var bookingcitycode = 0;
		var restlat = 0;
		var restlong = 0;

		var settingsagain = {
			"async": true,
			"crossDomain": true,
			"url": "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?languagecode=en-us&text=" + cityInput,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
				"x-rapidapi-key": "dbd8b5bcb4msh23e2de6f3a2a400p15ad0djsna091b41791d9"
			}
		}
		$.ajax(settingsagain).done(function (response) {
			bookingcitycode = response[0].dest_id;
			restlat = response[0].latitude;
			restlong = response[0].longitude;


			var ids = {
				"async": true,
				"crossDomain": true,
				"url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/ids?distance=5&page=1&lat=" + restlat + "&lon=" + restlong,
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
					"x-rapidapi-key": "dbd8b5bcb4msh23e2de6f3a2a400p15ad0djsna091b41791d9"
				}
			}

			$.ajax(ids).done(function (response) {
				// restaurant_ids are provided in an object. required to search for restaurants around the location
				$(".resturantsbody").empty();
				for (var i = 0; i < 5; i++) {
					
					var loopId = response.result.data.restaurant_ids[i]

					var restaurants = {
						"async": true,
						"crossDomain": true,
						// replace restaurant ID at end of URL with restaurant ID. for loop to cycle through the array of restaurants?
						"url": "https://us-restaurant-menus.p.rapidapi.com/restaurant/" + loopId,
						// response.result.data.restaurant_ids
						"method": "GET",
						"headers": {
							"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
							"x-rapidapi-key": "dbd8b5bcb4msh23e2de6f3a2a400p15ad0djsna091b41791d9"
						}
					}

					$.ajax(restaurants).done(function (response) {
						console.log(response.result)
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

});
