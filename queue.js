var Queue = function(){
	this.Ar = [];
	
	this.enqueue = function(item){
		this.Ar.push(item);
	}
	
	this.dequeue = function(){
		if (this.Ar.length > 0){
			var result = this.Ar[0];
			this.Ar.slice(0, 1);
			return result;
		}
		return null;
	}
	
	this.empty = function(){
		return this.Ar.length == 0;
	}
}