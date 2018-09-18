class Model {
	constructor (id, name){
		this.id = id;
		this.name = name;
	}

	toPlainObject(){
		// remove constructor for use with firebase
		let plain = Object.assign({}, this);
		Object.keys(plain).forEach(key=>{
			if(typeof plain[key] === 'undefined') plain[key] = null;
			if(plain[key] instanceof Model) plain[key] = plain[key].toPlainObject();
			if(Array.isArray(plain[key])) {
				plain[key] = plain[key].map(elem=>{
					if(elem instanceof Model) return elem.toPlainObject();
					return elem;
				})
			}
		})
		return plain;
	}
}

module.exports = Model;