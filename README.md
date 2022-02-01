# Music Catalogue!

This is a project I worked on for a technical assessment as part of a job interview. It uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to display your most recent tracks and artists.

Uses the following technologies:

- [React](https://github.com/facebook/react)
- [Typescript](https://github.com/microsoft/TypeScript)
- [Emotion](https://github.com/emotion-js/emotion)
- [axios](https://github.com/axios/axios)

## Scripts

To run the project:

```sh
yarn start
```

To run the tests:

```sh
yarn test
```

## Potential improvements

- Don't store tokens in `localStorage`
- Replace hardcoded `client_id` and endpoints with environment-specific variables via `.env`.
- Tidy up CSS, use `@emotion` theme providider.
