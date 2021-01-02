import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// console.log(process.env.SANITY_TOKEN);

export default {
  siteMetadata: {
    title: `Books Slices`,
    siteUrl: 'https://books.slices',
    description: 'The best books slices in this neighbourhood',
    twitter: '@booksSlices',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'i7vfcd89',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Books slices',
        short_name: 'BooksSlices',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#2e2e2e',
        display: 'standalone',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    'gatsby-plugin-offline',
  ],
};
