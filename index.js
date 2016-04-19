function BemBam(name, otherNames) {
  this.name = name;
  this.otherNames = otherNames.filter(function(otherName) {
    return !!otherName;
  });
  this.mods = [];
}

BemBam.prototype.mod = function mod() {
  if(!arguments[0]) return this;
  switch(arguments.length) {
    case 1: 
      this.mods.push(this.name + "--" + arguments[0]);
    break;
    case 2:
      if(arguments[1]) this.mods.push(this.name + "--" + arguments[1]);
    break;
    case 3:
      if(arguments[2]) {
        this.mods.push(this.name + "--" + arguments[0]);
      } else if(arguments[1]) {
        this.mods.push(this.name + "--" + arguments[1]);
      }
    break;
  }
  return this;
};

BemBam.prototype.el = function el(elName) {
  if(!elName) throw new Error("element name is not defined");
  return this.name + "__" + elName;
};

BemBam.prototype.toString = function toString() {
  return [this.name].concat(this.otherNames, this.mods).join(" ");
};

module.exports = function bembam(name) {
  var otherNames = [];
  var length = arguments.length;
  var i;
  for(i = 1; i < length; i++) {
    otherNames.push(arguments[i]);
  }

  return new BemBam(name, otherNames);
};
