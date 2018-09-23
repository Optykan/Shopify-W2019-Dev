let Utils = {
	// generates a pseudo-random string based on the date, and exactly 20 characters long
	random: function(prefix){
		if(prefix){
			return "" + prefix + (Date.now() + Math.floor(Math.random() * 9999999).toString()).padEnd(20, '0');
		}
		return (Date.now() + Math.floor(Math.random() * 9999999).toString()).padEnd(20, '0');
	},

	// recursively remove all custom constructors from an object
	toPlainObject: function(object){
		if(typeof object === 'undefined' || typeof object === 'null') return null;
		if(Array.isArray(object)){
			object = object.map(elem=>{
				return Utils.toPlainObject(elem);
			})
		} else if(typeof object === 'object'){
			Object.keys(object).map(key=>{
				object[key] = Utils.toPlainObject(object[key]);
			})
			object = Object.assign({}, object);
		}
		return object;
	}
}

module.exports = Utils;