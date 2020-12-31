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
  ],
};
