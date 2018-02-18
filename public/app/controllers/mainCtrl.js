angular
	.module('mainControllers', ['authServices'])

	.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope) {
		var self = this;
		self.loadMe = false;

		$rootScope.$on('$routeChangeStart', function() {
			if (Auth.isLoggedIn()) {
				self.isLoggedIn = true;
				Auth.getUser().then(function(res) {
					self.username = res.data.username;
					self.email = res.data.email;
					self.loadMe = true;
				});
			} else {
				self.username = null;
				self.isLoggedIn = false;
				self.loadMe = true;
			}
		});

		self.doLogin = function(loginData) {
			self.loading = true;
			self.errorMsg = false;
			// console.log('Registration form submitted');

			Auth.login(self.loginData).then(function(res) {
				self.loading = false;
				if (res.data.success) {
					// Create Success Message
					self.successMsg = res.data.message + ' & redirecting...';
					// Redirect to Home Page
					$timeout(function() {
						$location.path('/about');
						self.loginData = null;
						self.successMsg = null;
					}, 1500);
				} else {
					// Create error message
					self.errorMsg = res.data.message;
				}
			});
		};

		self.logout = function() {
			Auth.logout();
			$location.path('/logout');
			$timeout(function() {
				$location.path('/');
			}, 1500);
		};
	});
