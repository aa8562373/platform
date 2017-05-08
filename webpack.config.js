module.exports = {
    entry: ['./src/module/login.js'],
    output: {
        path: __dirname,
        filename: './dist/js/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'es6-loader' },
            { test: /\.js$/, loader: 'jsx-loader' }
        ]
    }
}