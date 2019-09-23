var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://googlemapsdistancematrixstefan-skliarovv1.p.rapidapi.com/getWalkingDistanceMatrix",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "GoogleMapsDistanceMatrixstefan-skliarovV1.p.rapidapi.com",
		"x-rapidapi-key": "517cfaf70bmshf561bc8c9eb73e6p19dbb4jsn62aee8ad1606",
		"content-type": "application/x-www-form-urlencoded"
	},
	"data": {
		"origins": "ChIJ4Zq9gHLTD4gR2nsgOZj2p_w",
		"destinations": "ChIJB5o6CWvTD4gR25QC-QbMQAk",
		"apiKey": "AIzaSyBAkwDU0rJ5hbsSRO8Fx_aIFjiSMewv1oA"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});	