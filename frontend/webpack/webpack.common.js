const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.main.js",
    path: path.resolve(__dirname, "../../public/javascripts"),
    clean: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
