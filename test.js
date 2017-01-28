function* anotherGenerator(i) {
	yield i + 1;
	yield i + 2;
	yield i + 3;
}

function* generator(i) {
	yield i + 1;
	yield* anotherGenerator(i);
	yield i + 2;
}

var gen=generator(10);

module.exports = {
	gen,
};