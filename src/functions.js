function add (x,y){
    return x + y
}

function sub (x,y){
    return x - y
}

function mul (x,y){
    return x * y
}

function identity (x){
    return x
}

function identityf (x){
    return function(){
        return x
    }
}

function addf (x){
    return function(y){
        return x + y
    }
}

function liftf (func){
    return function(x){
        return function(y){
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

function curry(func, x){
    return liftf(func)(x)
}

function twice(func){
    return function(x){
        return func(x, x)
    }
}

function reverse (func){
    return function(x,y){
        return func(y, x)    
    }
}

function composeu (func1, func2){
    return function(x){
        let y = func1(x)
        return func2(y)
    }
}

function composeb (func1, func2){
    return function(x, y, z){
        let firstTwo = func1(x, y)
        return func2(firstTwo, z)
    }
}

