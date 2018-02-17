angular
	.module('userControllers', ['userServices'])

	.controller('regCtrl', function($location, $timeout, User) {
		var self = this;

		self.regUser = function(regData) {
			self.loading = true;
			self.errorMsg = false;
			// console.log('Registration form submitted');

			User.create(self.regData).then(function(res) {
				self.loading = false;
				if (res.data.success) {
					// Create Success Message
					self.successMsg = res.data.message + ' & redirecting...';
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
	});
