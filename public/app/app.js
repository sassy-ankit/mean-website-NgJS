angular
	.module('userApp', [
		'appRoutes',
		'userControllers',
		'mainControllers',
		'userServices',
		'authServices',
		'ngAnimate'
	])

	.config(function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptors');
	});
