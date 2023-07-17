(function () {
    "use strict"; // run code in ES5 strict mode

     /**
     * @typedef {{ getConstructor: Function, isSet: Function, isNotSet: Function, exists: Function, doesNotExist: Function, instanceOf: Function, notInstanceOf: Function, isA: Function, isNotA: Function, isAn: Function, isNotAn: Function, isTypeOf: Function, isNotTypeOf: Function, implements: Function, doesNotImplement: Function, provides: Function, doesNotProvide: Function }}
     */
    var Subject = {},

    /**
     * Reusing a context object is faster instead of creating a new one
     * @see http://jsperf.com/new-vs-reuse-obj
     *
     * @private
     * @type {Object}
     */
    context = {},

    /**
     * Contains all primitives that can't be checked via instanceof
     *
     * @private
     * @type {Object}
     */
    primitives = {
        String: String,
        Boolean: Boolean,
        Number: Number
    },

    types = {
        boolean: Boolean,
        number: Number,
        string: String,
        array: Array,
        object: Object
    },

    typeStrings = Object.keys(types);

    /**
     * Returns an object, that provides some methods to test the type of the subject.
     * There is for every test a negated test to improve the readability of your code.
     * So if you want to test for instanceOf() === false just call notInstanceOf().
     *
     * The subject of your test can be every possible value in JavaScript. You don't
     * have to check if it's null or undefined before calling this method.
     *
     * @param {*} subject the subject of the test
     * @return {Subject}
     */
    function value(subject) {
        // Shortcut if value is used several times on the same subject
        if (context.subject !== subject) {
            setup(subject);

            subject = context.subject;

            if (subject !== undefined && subject !== null) {
                // @see http://bonsaiden.github.com/JavaScript-Garden/#types.typeof
                context.subjectType = Object.prototype.toString.call(subject).slice(8, -1);
                context.subjectConstructor = subject.constructor;
                context.isSet = true;
            }
        }

        return Subject;
    }

    /**
     * Returns subject.constructor. If the subject is null or undefined this function returns null.
     *
     * @return {Function|null}
     */
    function getConstructor() {
        return context.subjectConstructor;
    }
    Subject.getConstructor = getConstructor;
    /**
     * @deprecated
     */
    Subject.getClass = getConstructor;

    /**
     * Returns true if the given subject is neither undefined nor null
     *
     * @return {Boolean}
     */
    function isSet() {
        return context.isSet;
    }
    Subject.isSet = isSet;

    /**
     * @see Subject#isSet
     * @type {Function}
     */
    var isNotSet = getNegation(isSet);
    Subject.isNotSet = isNotSet;

    /**
     * Tests if the given object is a constructor of the subject. For native
     * types, just pass the corresponding constructor (e.g. String)
     *
     * If the subject.constructor exposes an Extends-property, this will be checked first.
     *
     * @param {Function|String} Class
     * @throws {TypeError}
     * @return {Boolean}
     */
    function instanceOf(Class) {
        var primitive;
        var typeString;

        if (typeof Class === "string") {
            typeString = Class.toLowerCase();
            if (typeStrings.indexOf(typeString) !== -1) {
                Class = types[typeString];
            }
        }
        if (context.isSet === false) {
            return context.subject === Class;
        }
        // Check if the given Class is a valid type.
        // Unfortunately there are host objects in some browsers which behave like
        // Functions but return typeof object.
        if (!Class || (typeof Class !== "function" && typeof Class !== "object")) {
            throw new TypeError("The given type must be typeof function or string");
        }
        if (Class === Object) {
            return context.subjectType === "Object";
        }
        if (context.subject instanceof Class) {
            return true;
        }

        primitive = primitives[context.subjectType];
        if (typeof primitive === "function") {
            if (primitive === Class) {
                if (Class === Number) {
                    // Returns false for NaN and Infinity
                    return isFinite(context.subject);
                } else {
                    return true;
                }
            }
        }

        return false;
    }
    Subject.instanceOf = instanceOf;
    Subject.typeOf = instanceOf;

    /**
     * @see Subject#instanceOf
     * @type {Function}
     */
    var notInstanceOf = getNegation(instanceOf);
    Subject.notInstanceOf = notInstanceOf;
    Subject.notTypeOf = notInstanceOf;

    Subject.each = {

        /**
         * Invokes isSet on every item in the collection and returns true
         * if every item returned true
         *
         * @see Subject#isSet
         * @type {Function}
         */
        isSet: each(isSet),

        /**
         * Invokes instanceOf on every item in the collection and returns true
         * if every item returned true
         *
         * @see Subject#instanceOf
         * @type {Function}
         */
        instanceOf: each(instanceOf)
    };
    Subject.each.typeOf = Subject.each.instanceOf;

    Subject.any = {

        /**
         * Invokes isNotSet on every item in the collection and returns true
         * if any item returned true
         *
         * @see Subject#isNotSet
         * @type {Function}
         */
        isNotSet: getNegation(Subject.each.isSet),

        /**
         * Invokes notInstanceOf on every item in the collection and returns true
         * if any item returned true
         *
         * @see Subject#notInstanceOf
         * @type {Function}
         */
        notInstanceOf: getNegation(Subject.each.instanceOf)
    };
    Subject.any.notTypeOf = Subject.any.notInstanceOf;

    /**
     * Resets all values of the context object.
     *
     * @private
     * @param subject
     */
    function setup(subject) {
        context.subject = subject;
        context.subjectType = null;
        context.subjectConstructor = null;
        context.isSet = false;
    }

    /**
     * Returns a function that calls the given function an negates the returned value
     *
     * @private
     * @return {Function}
     */
    function getNegation(func) {
        return function negate() {
            return !func.apply(this, arguments);
        };
    }

    /**
     * Returns a function that invokes the test function on every item in the collection and returns false
     * if any test(item) returned false.
     *
     * @private
     * @param {Function} test
     * @return {Function}
     */
    function each(test) {
        return function (Class) {
            var key,
                subject = context.subject,
                len;

            if (context.subjectConstructor === Array) {
                len = subject.length;
                for (key = 0; key < len; key++) {
                    value(subject[key]);
                    if (test(Class) === false) {
                        return false;
                    }
                }
            } else {
                for (key in subject) {
                    if (subject.hasOwnProperty(key)) {
                        value(subject[key]);
                        if (test(Class) === false) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
    }

    if (typeof module === "undefined") {
        window.jhnns = window.jhnns || {};
        window.jhnns.value = value;
    } else {
        module.exports = value;
    }

})();
