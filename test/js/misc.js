test('bind', function () {
	var F = function (x) {
		this.x = x;
	};

	F.prototype.f = function () {
		return this.x;
	}

	var a1 = new F(2357);
	var a2 = new F(1113);

	equal(2357, a1.f());
	equal(1113, a2.f());

	equal(2357, bind(a1, 'f')());
	equal(1113, bind(a2, 'f')());
});

test('extend_class', function () {
	var A = function (x) {
		this.x = x;
	};

	A.prototype = {
		f: function () {
			return this.x;
		},
		h: function () {
			return 2 * this.x;
		}
	};

	var B = function (x, y) {
		A.call(this, x);

		this.y = y;
	};

	extend_class(A, B, {
		// New method.
		g: function () {
			return this.y;
		},
		// Override.
		h: function () {
			return 3 * this.x;
		}
	});

	var a = new A(1719);
	var b = new B(2329, 3137);

	ok(a instanceof A);
	ok(!(a instanceof B));
	ok(b instanceof A);
	ok(b instanceof B);

	equal(1719, a.f());
	equal(undefined, a.g);
	equal(3438, a.h());
	equal(2329, b.f());
	equal(3137, b.g());
	equal(6987, b.h());
});
