# Utilities

Quick look at the utilities available

[[toc]]

## TypeOf

validate type of the value to match given type

> passing any value to `typeOf` will return a new instance of `TypeOf` class that has two methods `is` and `not` which take the type name as argument and do the type checking magic.

```js:no-line-numbers 
validan.typeOf("value").is("string"); // true
validan.typeOf(["value"]).not("string"); // true

validan.typeOf(null).is("nullOrUndefined"); // true
validan.typeOf(undefined).not("nullOrUndefined"); // false
```

To see the list of the supported types and more Checkout [TypeOf Utility](/utilities/typeof.md).
