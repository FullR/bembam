# Bembam

A tiny tool for easily building [BEM](https://en.bem.info/) class names in JavaScript.


## Usage

```javascript
const disabled = true;
const isOn = false;
const className = bembam("block", "other-name") // block name and any additional class names
  .mod("green") // unconditional modifier
  .mod("disabled", disabled) // conditional modifier
  .mod("on", "off", isOn); // conditional modifier with disabled class name

const elName = className.el("element"); // block__element

className.toString(); // returns "block other-name block--green block--off"
```

With React:

```javascript
class Zoo extends React.Component {
  render() {
    const {disabled, open, className} = this.props;
    const cn = bembam("zoo", className)
      .mod("disabled", disabled)
      .mod("open", open)
      .mod("awesome");

    return (
      <div className={cn.toString()}>
        <button className={cn.el("dog")}>Woof!</button>
        <button className={cn.el("cat")}>Meow</button>
      </div>
    );
  }
}

```

## Methods

#### `bembam(blockName:String [, ...otherNames:String]) -> BemBam`

Creates a `bembam` instance. Takes the blockname and any number of additional classnames. Falsy classnames will be ignored.

#### `#mod(modifierName:String [, disabledModifierName:String], conditional:Bool) -> BemBam`

Adds the modifier name to the `bembam` instance if `conditional` is either not defined or truthy. The modifier will be rendered as `blockName--modifierName` in the result string. If three arguments are passed, the final argument is the conditional and the second argument is used as the modifier name if the condition is falsy. Falsy modifier names will be ignored. Returns the original `BemBam` instance for chaining.

#### `#el(elementName:String) -> String`

Returns an element string based on the block name and passed element name. The return value will have the format: `blockName__elementName`. Falsy element names will throw errors.

#### `#toString() -> String`

Renders the class names and modifiers into a single class string with classnames seperated by spaces.
