angular
	.module('authServices', [])

	.factory('Auth', function($http, AuthToken) {
		var authFactory = {};
		authFactory.login = function(loginData) {
			return $http.post('/api/auth', loginData).then(function(res) {
				AuthToken.setToken(res.data.token);
				return res;
			});
		};
		//Auth.isLoggedIn()
		authFactory.isLoggedIn = function() {
			if (AuthToken.getToken()) {
				return true;
			} else {
				return false;
			}
		};

		// Auth.getUser()
		authFactory.getUser = function() {
			if (AuthToken.getToken()) {
				return $http.post('/api/me');
			} else {
				$q.reject({ message: 'User has no token' });
			}
		};

		// Auth.facebook(token);
		authFactory.facebook = function(token) {
			AuthToken.setToken(token);
		};

		// Auth.logout()
		authFactory.logout = function() {
			AuthToken.setToken();
		};
		return authFactory;
	})
	.factory('AuthToken', function($window) {
		var authTokenFactory = {};
		// AuthToken.setToken(token)
		authTokenFactory.setToken = function(token) {
			if (token) {
				$window.localStorage.setItem('token', token);
			} else {
				$window.localStorage.removeItem('token');
			}
		};
		// AuthToken.getToken()
		authTokenFactory.getToken = function() {
			return $window.localStorage.getItem('token');
		};
		return authTokenFactory;
	})

	.factory('AuthInterceptors', function(AuthToken) {
		var AuthInterceptorsFactory = {};

		AuthInterceptorsFactory.request = function(config) {
			var token = AuthToken.getToken();

			if (token) {
				config.headers['x-access-token'] = token;
			}

			return config;
		};
		return AuthInterceptorsFactory;
	});
