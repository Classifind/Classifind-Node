module.exports = function(Review) {
	
	/********************* Returns a user's received reviews where he/she is the job requestor */
	Review.receivedRequestorReviews = function(userId, cb)
	{
		Review.find({
			where: {and: [
				{reviewType: 'Requestor'},
				{receivingUserId: userId}
			]},
			include: {
				relation: 'submittedReviews'
			}
		}, cb);
	};
	
	Review.remoteMethod('receivedRequestorReviews', {
		description: 'Returns a list of reviews where the user is the job requestor',
		accepts: {arg: 'userId', type: 'number', required: true},
		returns: {arg: 'reviewInfo', type:'array'},
		http: {path: '/receivedRequestorReviews', verb:'get'}
	});
	
	/********************* Returns a user's received reviews where he/she is the job requestor */
	Review.receivedProviderReviews = function(userId, cb)
	{
		Review.find({
			where: {and: [
				{reviewType: 'Provider'},
				{receivingUserId: userId}
			]},
			include: {
				relation: 'submittedReviews'
			}
		}, cb);
	};
	
	Review.remoteMethod('receivedProviderReviews', {
		description: 'Returns a list of reviews where the user is the job provider',
		accepts: {arg: 'userId', type: 'number', required: true},
		returns: {arg: 'reviewInfo', type:'array'},
		http: {path: '/receivedProviderReviews', verb:'get'}
	});
	
	/******************** Remove unnecessary auto methods ********************/
	Review.disableRemoteMethod('createChangeStream', true);
};
