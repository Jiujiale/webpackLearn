// import $ from 'jquery'
// // import $ from "expose-loader?exposes=$!jquery";

// console.log($)
// console.log(window.$)

// let a = require('./a')
// console.log('hello')
// console.log(a.a)
// require('./index.css')
// require('./index.less')

// let fn = () => {
//   console.log('fn test')
// }
// fn()

// const log = (target) => {
//   target.a = 2
//   console.log('ada')
// }
// @log
// class Test {
//   a = 1
// }

// let test = new Test()
// console.log('11', test.a)

// let test1 = new log(Test)
// console.log('22', Test.a)

// function * gen () {
//   yield 1;
// }
// console.log(gen().next())

// let newA = '111'.includes('1')
// console.log(newA)

// console.log('flat', [11,[1,2]].flat())

// 处理图片 
// import test_png from './1.png'
// require('./index.css')
// require('./index.less')
// let img = new Image()
// img.src = test_png
// console.log(img)
// console.log(test_png)
// document.body.appendChild(img)

// 环境变量
// if (DEV === 'dev') {
//   console.log('dev now')
// } else {
//   console.log('prod now')
// }
// console.log(DEV)

// 抽离公共代码
import './a1'
import './b1'
console.log($)
console.log('index.js ------')