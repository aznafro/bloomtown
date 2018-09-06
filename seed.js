var Flower = require("./models/flower");

var flowers = [
	{name: "Lily", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Lilium_candidum_1.jpg/220px-Lilium_candidum_1.jpg", desc: "Lilies are a group of flowering plants which are important in culture and literature in much of the world.", price: 5.99},
	{name: "Rose", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rosa_rubiginosa_1.jpg/220px-Rosa_rubiginosa_1.jpg", desc: "There are over three hundred species and thousands of cultivars. The name rose comes from French, itself from Latin rosa.", price: 7.99},
	{name: "Azalea", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Azalea.750pix.jpg/220px-Azalea.750pix.jpg", desc: "Azaleas bloom in spring, their flowers often lasting several weeks. Shade tolerant, they prefer living near or under trees.", price: 3.99},
	{name: "Carnation", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Moondust-carnation.JPG/220px-Moondust-carnation.JPG", desc: "It is probably native to the Mediterranean region but its exact range is unknown due to extensive cultivation for the last 2,000 years.", price: 4.45},
	{name: "Jasmine", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Common_Jasmine.jpg/220px-Common_Jasmine.jpg", desc: "It contains around 200 species native to tropical and warm temperate regions of Eurasia, Australasia and Oceania.", price: 5.10},
	{name: "Sunflower", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/220px-Sunflower_sky_backdrop.jpg", desc: "The common name, \"sunflower\", typically refers to the popular annual species Helianthus annuus, or the common sunflower, whose round flower heads in combination with the ligules look like the sun.", price: 3.15},
	{name: "Tulip", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/%D7%A6%D7%91%D7%A2%D7%95%D7%A0%D7%99%D7%9D.JPG/220px-%D7%A6%D7%91%D7%A2%D7%95%D7%A0%D7%99%D7%9D.JPG", desc: "The flowers are usually large, showy and brightly coloured, generally red, yellow, or white. ", price: 12.75},
	{name: "Orchid", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Haeckel_Orchidae.jpg/220px-Haeckel_Orchidae.jpg", desc: "Regardless, the number of orchid species nearly equals the number of bony fishes and is more than twice the number of bird species.", price: 10.99},
	{name: "Lavender", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Single_lavendar_flower02.jpg/220px-Single_lavendar_flower02.jpg", desc: "The most widely cultivated species, Lavandula angustifolia, is often referred to as lavender, and there is a color named for the shade of the flowers of this species.", price: 7.99},
	{name: "Daisy", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/2018-06-11_Daisies_%28cropped%29.jpg/220px-2018-06-11_Daisies_%28cropped%29.jpg", desc: "The family has a worldwide distribution, from the polar regions to the tropics, colonizing a wide variety of habitats.", price: 7.99},
	{name: "Geranium", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Geranium_February_2008-1.jpg/220px-Geranium_February_2008-1.jpg", desc: "The flowers have five petals and are coloured white, pink, purple or blue, often with distinctive veining.", price: 6.99},
	{name: "Chrysanthemum", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Chrysanthemum_November_2007_Osaka_Japan.jpg/220px-Chrysanthemum_November_2007_Osaka_Japan.jpg", desc: "They are native to Asia and northeastern Europe. Most species originate from East Asia and the center of diversity is in China.", price: 2.99},
	{name: "Daffodil", imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Narcissus.poeticus.1658.jpg/220px-Narcissus.poeticus.1658.jpg", desc: "Various common names including daffodil, daffadowndilly, narcissus, and jonquil are used to describe all or some members of the genus.", price: 3.99},
];

function seed() {
	Flower.remove({}, function(error) {
		if(error) {
			console.log(error.message);
		} else {
			console.log("Successfully removed flowers from the DB");
			flowers.forEach(function(flower) {
				Flower.create(flower, function(error, flower) {
					if(error) {
						console.log(error.message);
					}
					if(flower) {
						console.log("Successfully added flower: " + flower.name);
					}
				});
			});
		}
	});
}

module.exports = seed;