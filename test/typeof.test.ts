import validan from "../dist/index";

describe("typeOf", () => {
	it("should return the default types", () => {
		expect(validan.typeOf.types).toEqual([
			"string",
			"number",
			"boolean",

			"null",
			"undefined",
			"nullOrUndefined",

			"object",
			"array",
		]);
	});

	it("should check if the value match the type", () => {
		expect(validan.typeOf("meslzy").is("string")).toBe(true);
		expect(validan.typeOf(["meslzy"]).not("string")).toBe(true);

		expect(validan.typeOf(1).is("number")).toBe(true);
		expect(validan.typeOf([1]).not("number")).toBe(true);

		expect(validan.typeOf(true).is("boolean")).toBe(true);
		expect(validan.typeOf(false).is("boolean")).toBe(true);

		expect(validan.typeOf(null).is("null")).toBe(true);
		expect(validan.typeOf(undefined).is("undefined")).toBe(true);

		expect(validan.typeOf().is("nullOrUndefined")).toBe(true);
		expect(validan.typeOf(undefined).is("nullOrUndefined")).toBe(true);
		expect(validan.typeOf(undefined).is("nullOrUndefined")).toBe(true);

		expect(validan.typeOf(null).not("object")).toBe(true);
		expect(validan.typeOf(undefined).not("object")).toBe(true);
		expect(validan.typeOf(Object.create({})).is("object")).toBe(true);
		expect(validan.typeOf(Object.create([])).not("object")).toBe(true);
		expect(validan.typeOf("object").not("object")).toBe(true);

		expect(validan.typeOf(null).not("array")).toBe(true);
		expect(validan.typeOf(undefined).not("array")).toBe(true);
		expect(validan.typeOf(Object.create([])).is("array")).toBe(true);
		expect(validan.typeOf(Object.create({})).not("array")).toBe(true);
		expect(validan.typeOf("array").not("array")).toBe(true);
	});

	it("should throw error if type is not defined", () => {
		expect(() => validan.typeOf("meslzy").is("not-defined")).toThrowError();
	});

	it("should return the type function", () => {
		const typeOfString = validan.typeOf.string;
		expect(typeOfString("sss")).toBe(true);
	});
});

describe("override typeOf", () => {
	it("should override the default types", () => {
		validan.typeOf.string = (value: any) => {
			return typeof value === "boolean";
		};

		expect(validan.typeOf(true).is("string")).toBe(true);
	});
});

describe("create custom types with default types", () => {
	const withTypeOf = validan.typeOf.with({
		arrayOfArray: (value: string) => {
			return Array.isArray(value) && value.every(item => Array.isArray(item));
		},
	});

	it("should return the custom types with default types", () => {
		expect(withTypeOf.types).toEqual([
			"string",
			"number",
			"boolean",

			"null",
			"undefined",
			"nullOrUndefined",

			"object",
			"array",

			"arrayOfArray",
		]);
	});

	it("should check if the value match the type", () => {
		expect(withTypeOf([["meslzy"]]).is("arrayOfArray")).toBe(true);
		expect(withTypeOf(["meslzy"]).not("arrayOfArray")).toBe(true);
	});
});

describe("create custom types without default types", () => {
	const withoutTypeOf = validan.typeOf.create({
		arrayOfArray: (value: string) => {
			return Array.isArray(value) && value.every(item => Array.isArray(item));
		},
	});

	it("should return the custom types without default types", () => {
		expect(withoutTypeOf.types).toEqual([
			"arrayOfArray",
		]);
	});

	it("should check if the value match the type", () => {
		expect(withoutTypeOf([["meslzy"]]).is("arrayOfArray")).toBe(true);
		expect(withoutTypeOf(["meslzy"]).not("arrayOfArray")).toBe(true);
	});
});
