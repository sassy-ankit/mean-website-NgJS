angular
	.module('mainControllers', ['authServices'])

	.controller('mainCtrl', function(Auth, $timeout, $location) {
		var self = this;

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
					}, 1500);
				} else {
					// Create error message
					self.errorMsg = res.data.message;
				}
			});
		};
	});
