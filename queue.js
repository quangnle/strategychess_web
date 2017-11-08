var Queue = function(){
	this.Ar = [];
	
	this.enqueue = function(item){
		this.Ar.push(item);
	}
	
	this.dequeue = function(){
		if (this.Ar.length > 0){
			var result = this.Ar[0];
			this.Ar = this.Ar.slice(1, this.Ar.length);
			return result;
		}
		return null;
	}
	
	this.empty = function(){
		return this.Ar.length == 0;
	}
}