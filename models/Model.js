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
		})
		return plain;
	}
}

module.exports = Model;