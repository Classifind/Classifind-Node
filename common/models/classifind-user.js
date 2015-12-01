module.exports = function(ClassifindUser) {
	
	/*********** Returns a custom formatted list of users ************/
	ClassifindUser.listUsers = function(cb)
	{
		ClassifindUser.find({
			fields: {
				emailVerified: false
			}	
		}, cb);
	};
	
	ClassifindUser.remoteMethod('listUsers', {
		description: 'Return a list of all Classifind users',
		returns: {arg: 'classifindUsers', type:'array'},
		http: {path: '/list-users', verb:'get'}
	});
	
	/************ Returns a user's requested jobs which need reviews *********/ 
	ClassifindUser.incompleteRequestedJobs = function(userId, cb)
	{
		ClassifindUser.findById(userId, {
			include: {
				relation: 'requestedJobs',
				scope: {
					where: {and: [
						{jobStatus: {neq: 'Awaiting Review'}},
						{jobStatus: {neq: 'Completed'}}
					]}
				}
			}
		}, cb);
	};
	
	ClassifindUser.remoteMethod('incompleteRequestedJobs', {
		description: 'Returns a list of requested jobs that have not yet been reviewed',
		accepts: {arg: 'userId', type: 'number', required: true},
		returns: {arg: 'requestedJobInfo', type:'array'},
		http: {path: '/incompleteRequestedJobs', verb:'get'}
	});
	
	/************ Returns a user's provided jobs which are not completed *********/ 
	ClassifindUser.incompleteProvidedJobs = function(userId, cb)
	{
		ClassifindUser.findById(userId, {
			include: {
				relation: 'providedJobs',
				scope: {
					where: {or: [
						{jobStatus: 'Awaiting Review'},
						{jobStatus: 'In Progress'}
					]}
				}
			}
		}, cb);
	};
	
	ClassifindUser.remoteMethod('incompleteProvidedJobs', {
		description: 'Returns a list of provided jobs that have not yet been reviewed',
		accepts: {arg: 'userId', type: 'number', required: true},
		returns: {arg: 'userJobsToReview', type:'array'},
		http: {path: '/incompleteProvidedJobs', verb:'get'}
	});
	
	/******************** Remove unnecessary auto methods ********************/
	ClassifindUser.disableRemoteMethod('createChangeStream', true);
};
