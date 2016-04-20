// Underlying data structure for managing class names
function BemBam(name, otherNames) {
  this.name = name;
  this.otherNames = otherNames.filter(function(otherName) {
    return !!otherName;
  });
  this.mods = [];
}

/*
 Possible arguments:
 modName - Adds modName to modifiers
 modName, condition - Adds modName if condition is true
 modName, elseModName, condition - Adds modName if condition is true otherwise adds elseModName
*/
BemBam.prototype.mod = function mod() {
  if(!arguments[0]) return this;
  switch(arguments.length) {
    case 1: // just mod name
      this.mods.push(this.name + "--" + arguments[0]);
    break;
    case 2: // mod name and conditional
      if(arguments[1]) this.mods.push(this.name + "--" + arguments[0]);
    break;
    case 3: // mod name, false mod name, conditional
      if(arguments[2]) {
        this.mods.push(this.name + "--" + arguments[0]);
      } else if(arguments[1]) { // make sure falsy mod name is defined
        this.mods.push(this.name + "--" + arguments[1]);
      }
    break;
  }
  return this;
};

BemBam.prototype.el = function el(elName) {
  return this.name + "__" + elName;
};

BemBam.prototype.toString = function toString() {
  return [this.name].concat(this.otherNames, this.mods).join(" ");
};

module.exports = function bembam(name /*, ...otherNames*/) {
  var otherNames = [];
  var length = arguments.length;
  var i;
  for(i = 1; i < length; i++) {
    otherNames.push(arguments[i]);
  }
  return new BemBam(name, otherNames);
};

