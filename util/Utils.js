let Utils = {
	random: function(prefix){
		if(prefix){
			return "" + prefix + (Date.now() + Math.floor(Math.random() * 9999999).toString()).padEnd(20, '0');
		}
		return (Date.now() + Math.floor(Math.random() * 9999999).toString()).padEnd(20, '0');
	}
}

module.exports = Utils;