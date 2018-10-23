//https://css-tricks.com/serviceworker-for-offline/

let cacheVersion = 'restaurant-review-v1';

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheVersion).then(function(cache){
		return cache.addAll([
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js'
]);
		})
		.then(function(){
			console.log('Cache opened, install complete');

		})
	);
});
//https://is.gd/tcwIup
self.addEventListener('fetch', function(e) {
	console.log(e.request.url);
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	)
});

