//https://css-tricks.com/serviceworker-for-offline/
var staticCacheName = 'restaurant-reviews-v1';

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache){
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
	);
});

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
			.then(function(cachesNames){
				return Promise.all(
					cachesNames.filter(function(cacheName){
					return cacheName.startsWith('restaurant-') && cacheName != staticCacheName;
					})
					.map(function(cacheName){
						return caches.delete(cacheName);
					})
				);
			})
	);
});

//https://is.gd/LSMciS
//https://is.gd/RA0ZEx example of clone method in walkthrough
//https://is.gd/m7hcaX Fetch aPI request.clone() documentation
self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request)
			.then(function(response){
				if(response){
					return response;
				}
				//first request was for the cache one time use
				var fetchRequest = event.request.clone();
				//valid response? 200 means ok
				return fetch(fetchRequest)
					.then(function(response){
						if (!response || response.status !== 200 || response.type !=='basic'){
							return response;
						}
						var cacheResponse = response.clone();
						//first response goes to browser and is done, this response is for the cache
						caches.open(staticCacheName)
							.then(function(cache){
								cache.put(event.request, cacheResponse);
							});
					
					return response;
					
					});
			})
	);
});


