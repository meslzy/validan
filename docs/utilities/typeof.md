# TypeOf

Validate type of any value

[[toc]]

## Constructor

TypeOf is a proxy based object trap for a function call and object properties.

> Calling the function `typeOf(value)` will create new class instance of `TypeOf` which contains types and value passed from the `typeOf proxy`.

## Basic Usage

```js:no-line-numbers
validan.typeOf("value").is("string"); // true
validan.typeOf(["value"]).not("string"); // true

validan.typeOf(null).is("nullOrUndefined"); // true
validan.typeOf(undefined).not("nullOrUndefined"); // false
```

## Types Available

All the available types, and examples of usage.

### String

Validate if the value is a string

> return `boolean`

```js:no-line-numbers
validan.typeOf("value").is("string");
validan.typeOf(["value"]).not("string");
```

### Number

Validate if the value is a number

> return `boolean`

```js:no-line-numbers
validan.typeOf(1).is("number");
validan.typeOf("1").not("number");
```

### Boolean

Validate if the value is a boolean

> return `boolean`

```js:no-line-numbers
validan.typeOf(true).is("boolean");
validan.typeOf(false).is("boolean");
```

### Null

Validate if the value is null

> return `boolean`

```js:no-line-numbers
validan.typeOf(null).is("null");
validan.typeOf(undefined).not("null");
```

### Undefined

Validate if the value is undefined

> return `boolean`

```js:no-line-numbers
validan.typeOf(undefined).is("undefined");
validan.typeOf(null).not("undefined");
```

### NullOrUndefined

Validate if the value is null or undefined

> return `boolean`

```js:no-line-numbers
validan.typeOf(null).is("nullOrUndefined");
validan.typeOf(undefined).is("nullOrUndefined");
```

### Object

Validate if the value is an object

> return `boolean`

```js:no-line-numbers
validan.typeOf(Object.create({})).is("object");
validan.typeOf(Object.create([])).not("object");
```

### Array

Validate if the value is an array

> return `boolean`

```js:no-line-numbers
validan.typeOf(Object.create([])).is("array");
validan.typeOf(Object.create({})).not("array");
```

## Advanced Usage

### Override types

You can override any type within any instance of `typeOf proxy`.

```js:no-line-numbers
validan.typeOf.array = (value: any) => {
	return Array.isArray(value);
};
```

### Clone typeOf instance

You can Clone a typeOf instance by using  `with` | `create`

> `with` will create a new instance of `typeOf proxy` with types defined, and types inherited from parent proxy.

> `create` will create a new instance of `typeOf proxy` with only the types defined.

#### Clone using `With`

:::: code-group
::: code-group-item JavaScript

```js:no-line-numbers
const withTypeOf = validan.typeOf.with({
  arrayOfArray: ( value ) => {
    return Array.isArray(value) && value.every(Array.isArray);
  },
});

console.log(withTypeOf.types);
// [ "string", "number", "boolean", "null", "undefined", ...etc, "arrayOfArray" ]

withTypeOf([ [ "array", "of", "array" ] ]).is("arrayOfArray"); // true
```

:::
::: code-group-item TypeScript

```ts:no-line-numbers
interface WithTypeOf {
	arrayOfArray: (value: any) => boolean;
}

const withTypeOf = validan.typeOf.with<WithTypeOf>({
	arrayOfArray: (value: any) => {
		return Array.isArray(value) && value.every(Array.isArray);
	},
});

console.log(withTypeOf.types);
// [ "string", "number", "boolean", "null", "undefined", ...etc, "arrayOfArray" ]

withTypeOf([["array", "of", "array"]]).is("arrayOfArray"); // true
```

:::
::::

#### Clone using `Create`

:::: code-group
::: code-group-item JavaScript

```js:no-line-numbers
const myCustomTypeOf = validan.typeOf.create({
	string: (value) => typeof value === "string",
	boolean: (value) => typeof value === "number",
});

console.log(myCustomTypeOf.types);
// [ "string", "boolean" ]

myCustomTypeOf("value").is("string");
myCustomTypeOf(true).is("boolean");
```

:::
::: code-group-item TypeScript

```ts:no-line-numbers
interface CustomTypes {
	string: (value: any) => boolean;
	boolean: (value: any) => boolean;
}

const myCustomTypeOf = validan.typeOf.create<CustomTypes>({
	string: (value: unknown) => typeof value === "string",
	boolean: (value: unknown) => typeof value === "number",
});

console.log(myCustomTypeOf.types);
// [ "string", "boolean" ]

myCustomTypeOf("value").is("string");
myCustomTypeOf(true).is("boolean");
```

:::
::::

#### Clone using Both `Create` and `With`

:::: code-group
::: code-group-item JavaScript

```js:no-line-numbers
const myCustomTypeOf = validan.typeOf.create({
  string: ( value ) => typeof value === "string",
  boolean: ( value ) => typeof value === "number",
});

console.log(myCustomTypeOf.types);
// [ "string", "boolean" ]

const myCustomTypeOf2 = myCustomTypeOf.with({
  number: ( value ) => typeof value === "number",
});


console.log(myCustomTypeOf2.types);
// [ "string", "boolean", "number" ]
```

:::
::: code-group-item TypeScript

```ts:no-line-numbers
interface CustomTypes {
	string: (value: any) => boolean;
	boolean: (value: any) => boolean;
}

const myCustomTypeOf = validan.typeOf.create<CustomTypes>({
	string: (value: any) => typeof value === "string",
	boolean: (value: any) => typeof value === "number",
});

console.log(myCustomTypeOf.types);

// [ "string", "boolean" ]

interface CustomTypes2 {
	number: (value: any) => boolean;
}

const myCustomTypeOf2 = myCustomTypeOf.with<CustomTypes2>({
	number: (value: any) => typeof value === "number",
});


console.log(myCustomTypeOf2.types);
// [ "string", "boolean", "number" ]
```

:::
::::
