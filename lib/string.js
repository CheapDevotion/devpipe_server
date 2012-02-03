String.prototype.capitalize = function () {
	return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};

String.prototype.addSpaces = function () {
	return this.replace(/([a-z])([A-Z])/g, '$1 $2');
};