module.exports = function(Job) {
	
	/************** Return list of matching search jobs **************/
	Job.searchJobs = function(searchQuery, cb)
	{
		Job.find({
			where: {or: [
				{jobTitle: {like: '%' + searchQuery + '%'}},
				{jobDescription: {like: '%' + searchQuery + '%'}},
				{jobCategory: {like: '%' + searchQuery + '%'}}
			]}
		}, cb);
	};
	
	Job.remoteMethod('searchJobs', 
	{
		description: 'Search for jobs by title, category, or description',
		accepts: {arg: 'searchQuery', type: 'string'},
		returns: {arg: 'jobs', type:'array'},
		http: {path: '/searchJobs', verb:'get'}
	});
	
	/***************************** Return list of all jobs **********************/
	Job.listAllJobs = function(cb)
	{
		Job.find({ }, cb);
	};
	
	Job.remoteMethod('listAllJobs', 
	{
		description: 'Return all jobs with an alternative format to GET',
		returns: {arg: 'jobs', type:'array'},
		http: {path: '/listAllJobs', verb:'get'}
	});
	
	/*************** Return job listing information with Requestor Information */
	Job.listingInformation = function (jobId, cb)
	{
		Job.findById(jobId, {
			include: {submittedBids: ['bidProvider']} }
		, cb);
	}
	
	Job.remoteMethod('listingInformation', 
	{
		description: 'Returns a job listing with detailed bid information',
		accepts: {arg: 'jobId', type: 'number'},
		returns: {arg: 'listingInformation', type:'object'},
		http: {path: '/listingInformation', verb:'get'}
	});
	
	
	/****************** Return job managment information */
	Job.managementInformation = function(jobId, acceptedBidId, cb)
	{
		Job.findById(jobId, 
		{
			include: {
				relation: 'submittedBids',
				scope: {
					where: {id: acceptedBidId}, 
					inlcude: {
						relation: 'bidProvider'
					}
				}
			}
		}
		, cb);
		
	}
	
	Job.remoteMethod('managementInformation', {
		description: 'Returns the information needed for managing the listing',
		accepts: [
  			{arg: 'jobId', type: 'number', required: true},
  			{arg: 'bidId', type: 'number', required: true}
		],
		returns: {arg: 'managementInformation', type:'object'},
		http: {path: '/managementInformation', verb:'get'}		
	});
	
	/******************** Remove unnecessary auto methods ********************/
	Job.disableRemoteMethod('createChangeStream', true);
};
