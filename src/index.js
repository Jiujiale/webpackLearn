let a = require('./a')
console.log('hello')
console.log(a.a)
require('./index.css')
require('./index.less')

let fn = () => {
  console.log('fn test')
}
fn()

const log = (target) => {
  target.a = 2
  console.log('ada')
}
@log
class Test {
  a = 1
}

let test = new Test()
console.log('11', test.a)

let test1 = new log(Test)
console.log('22', Test.a)

function * gen () {
  yield 1;
}
console.log(gen().next())

let newA = '111'.includes('1')
console.log(newA)

console.log('flat', [11,[1,2]].flat())
