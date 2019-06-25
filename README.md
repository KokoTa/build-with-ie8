# How to write es6 in ie8

> Yes，we can use webpack transform all code to the ie8

## How to setting up

See program

## How to learn

See [this](https://juejin.im/post/5cabf7b0e51d456e8b07dd04) and [this](https://juejin.im/post/5c09d6d35188256d9832df9d)

Remember, IE8 no support Object.defineProperty and babel can't pollyfill all functions for this api, so we can't use Vue or React in IE8

If use jquery, please use under or equal 1.9 version. As we know, CDN is a good way to make us code smaller, so util library like jquery we can use CDN to link program. Also, we need to set webpack config file.

Lodash can't support IE8.

## Notice

If program isn't large, layui maybe a good part.

If you want use React in IE8, look [anu](https://github.com/RubyLouvre/anu-ie8-example)!
