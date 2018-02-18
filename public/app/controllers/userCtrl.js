angular
	.module('userControllers', ['userServices'])

	.controller('regCtrl', function($http, $location, $timeout, User) {
		var self = this;

		self.regUser = function(regData) {
			self.loading = true;
			self.errorMsg = false;
			// console.log('Registration form submitted');

			User.create(self.regData).then(function(res) {
				self.loading = false;
				if (res.data.success) {
					// Create Success Message
					self.successMsg = res.data.message;
					// Redirect to Home Page
					$timeout(function() {
						$location.path('/home');
					}, 1500);
				} else {
					// Create error message
					self.errorMsg = res.data.message;
				}
			});
		};
	})

	.controller('facebookCtrl', function($routeParams, Auth, $location, $window) {
		if ($window.location.pathname == '/facebookerror') {
			var self = this;
			// error variable
			self.errorMsg =
				"Facebook account (email) doesn't match with any registered user";
		} else {
			Auth.facebook($routeParams.token);
			$location.path('/profile');
		}
	});
