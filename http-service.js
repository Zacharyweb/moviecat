(function(angular){
	'use strict';
	angular.module('moviecat.services.http',[])
	.service('HttpService',['$window',function($window){
		this.jsonp = function(url, params, fn){
			var fnName = 'jsonp_'+ (new Date()).getTime();
			$window[fnName] = fn;
			var queryString =  '?';
			for(var k in params){
				queryString += (k + '=' + params[k] + '&');
			};
			queryString += 'callback=' + fnName;
			var newScript = $window.document.createElement('script');
			newScript.src =  url + queryString;
			$window.document.body.appendChild(newScript);
		}
	}]);
})(angular);