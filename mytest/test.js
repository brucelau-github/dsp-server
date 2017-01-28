function* anotherGenerator(i) {
	yield i + 1;
	yield i + 2;
	yield i + 3;
}

exports function* generator(i) {
	yield i + 1;
	yield* anotherGenerator(i);
	yield i + 2;
}
