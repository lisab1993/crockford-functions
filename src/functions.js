function add(x, y) {
    return x + y
}

function sub(x, y) {
    return x - y
}

function mul(x, y) {
    return x * y
}

function identity(x) {
    return x
}

function identityf(x) {
    return function () {
        return x
    }
}

function addf(x) {
    return function (y) {
        return x + y
    }
}

function liftf(func) {
    return function (x) {
        return function (y) {
            return func(x, y)
        }
    }
}

// function curry(func, x){
//     return function(y){
//         return func(x, y)
//     }
// }

// const curry = (func, x) => y => func(x,y)

function curry(func, x) {
    return liftf(func)(x)
}

function twice(func) {
    return function (x) {
        return func(x, x)
    }
}

function reverse(func) {
    return function (x, y) {
        return func(y, x)
    }
}

function composeu(func1, func2) {
    return function (x) {
        let y = func1(x)
        return func2(y)
    }
}

function composeb(func1, func2) {
    return function (x, y, z) {
        let firstTwo = func1(x, y)
        return func2(firstTwo, z)
    }
}

//introduce a counter
function limit(func, limit) {
    let counter = 0
    return function (x, y) {
        if (counter < limit) {
            counter += 1
            return func(x, y)
        }
    }
}

function from(n) {
    let counter = n

    return function () {
        return counter++
    }
}

function to(fn, n) {
    return function () {
        const val = fn(n)

        if (val < n) {
            return val
        }
    }
}

function fromTo(lower, upper) {
    return to(from(lower), upper)
}

//if you have an optional argument, you can say
//fn = fn || something else
//this says to either use the function normally, or a value
function element(array, fn) {
    fn = fn || from(0)

    return function () {
        return array[fn()]
    }
}

//push to the array argument
function collect(fn, arr) {
    return function () {
        let val = fn()
        if (val !== undefined) {
            arr.push(val)
            return val
        }
    }
}


function filter(gen, pred) {
    //call gen
    //check if the result passes the predicate function
    //if it does, return the result
    //otherwise, try again (call gen again in a loop until you get something that passes pred)
    return function () {
        while (true) {
            const g = gen()
            if (pred(g)) {
                return g
            } else if (g === undefined) {
                return undefined
            }
        }
    }
}

function concat(gen1, gen2) {
    return function () {
        //call gen1
        //if the result is defined 
        //return it
        //else if result is undefined,
        //call gen2

        const g1 = gen1()
        if (g1 !== undefined) {
            return g1
        } else {
            return gen2()
        }
    }
}

function repeat(gen) {
    let a = gen()
    while (a !== undefined) {
        a = gen()
    }
}

function gensymf(str) {
    const gen = from(1)
    return function () {
        return str + gen()
    }
}

function counter(n) {
    return {
        'up': function () {
            return ++n
        },
        'down': function () {
            return --n
        }
    }
}

function revocable(fn) {
    let revoked = false
    return {
        'invoke': function(x,y){
            if (!revoked) {
                return fn(x,y)
            } else {
                return undefined
            }
        },
        'revoke': function (){
            revoked = true
        }
    
    }
}

//the ? and : are turnary operators for if statements
function m(val, source) {
    return {
        'value': val,
        'source': (typeof source === 'string') ? source : String(val)
    }
}

function addm(m1, m2) {
    return {
        value: m1.value + m2.value,
        source: `(${m1.source}+${m2.source})`
    }
}