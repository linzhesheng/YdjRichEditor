
module.exports = function(config) {

    let configWebpack = config.webpack;

    let rules = [
        {
            test: /\.(tsx?|js)$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/
        }
    ];

    return rules;
};