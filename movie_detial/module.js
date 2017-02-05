(function(angular){
	'use strict';
	angular.module('moviecat.movie_detial',['ngRoute','moviecat.services.http'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
		.when('/detial/:id',{
			controller:'movie_detialController',
			templateUrl:'movie_detial/view.html'
		})
	}])
	.controller('movie_detialController',['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService){
		$scope.movie = {};
		$scope.title = 'loading...';
		$scope.loading = true;
		HttpService.jsonp('http://api.douban.com/v2/movie/subject/'+ $routeParams.id,{},function(data){
		    $scope.movie = data
			$scope.loading = false;
		    $scope.$apply();
		});
	}]);

})(angular);