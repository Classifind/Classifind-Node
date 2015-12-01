module.exports = function(Bid) {
	
	/******************** Remove unnecessary auto methods ********************/
	Bid.disableRemoteMethod('createChangeStream', true);
};
