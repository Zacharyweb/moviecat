(function(angular) {
	'use strict';
	angular.module('moviecat.movie_list', ['ngRoute', 'moviecat.services.http'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/:category/:page?', {
					controller: 'movie_listController',
					templateUrl: 'movie_list/view.html'
				})
		}])
		.controller('movie_listController', ['$scope', '$route', '$routeParams', 'HttpService', function($scope, $route, $routeParams, HttpService) {
			$scope.pageSize = 15;
			$scope.title = 'loading...';
			$scope.loading = true;
			$scope.pages = [];
			$scope.page = parseInt($routeParams.page || 1);
			var start = ($scope.page - 1) * 5;
			var url = 'http://api.douban.com/v2/movie/' + $routeParams.category;
			HttpService.jsonp(url, {
				start: start,
				count: $scope.pageSize,
				q: $routeParams.q
			}, function(data) {
				$scope.loading = false;
				$scope.totalCount = data.total;
				$scope.totalPage = Math.ceil($scope.totalCount / $scope.pageSize);
				$scope.title = data.title;
				$scope.movies = data.subjects;
				for (var i = 1; i <= $scope.totalPage; i++) {
					$scope.pages.push(i);
				}
				$scope.$apply();
			});
			$scope.go = function(page) {
				if (page >= 1 && page <= $scope.totalPage) {
					$route.updateParams({
						page: page
					});
				}
			}
		}]);

})(angular);