exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith('develop')) {
    // better to use actions.setWebpackConfig because it automatically merges with the default config
    actions.setWebpackConfig({
      resolve: {
        alias: {
          // 'react-dom': '@hot-loader/react-dom',
        },
      },
    });
  }
};
