module.exports = function(SkillReference) {
	
	/************** Return list of matching search jobs **************/
	SkillReference.skillnames = function(cb)
	{
		SkillReference.find({
			fields: {
				id: false
			}	
		}, cb);
	};
	
	SkillReference.remoteMethod('skillNames', 
	{
		description: 'Only return skill names for auto-complete purposes',
		returns: {arg: 'skillList', type:'array'},
		http: {path: '/skillNames', verb:'get'}
	});
	
	/******************** Remove unnecessary auto methods ********************/
	SkillReference.disableRemoteMethod('createChangeStream', true);
};
