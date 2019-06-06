import $ from 'jquery'
import _ from 'lodash'
import cats from './cat'

let str = ''

cats.forEach((cat) => {
  str += cat
})

$('body').html(str)

console.log(_.join(['a', 'b', 'c'], '~'))
