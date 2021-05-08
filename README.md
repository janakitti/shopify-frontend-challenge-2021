# The Shoppies - Shopify Frontend Challenge Submission

[![Netlify Status](https://api.netlify.com/api/v1/badges/31746af5-1cb0-4019-b5ed-13e7d896b6e8/deploy-status)](https://app.netlify.com/sites/the-shoppies-fall-2021/deploys)

This is my submission for Shopify's UX Developer Intern & Web Developer Intern Challenge for Fall 2021! In this challenge, we were tasked to build an app to help manage movie nominations for the upcoming The Shoppies, movie awards for entrepreneurs.

You can learn more about the challenge from the [challenge description](UX Developer Intern & Web Developer Intern Challenge - Fall 2021).

#### [Grab some popcorn and view my submission!](https://the-shoppies-fall-2021.netlify.app/) 🍿  (Login Password: `shoppies`)

## Table of Contents

- [Quick Summary](#Quick-Summary)
- [Tech](#Tech)
- [Design](#Design)
- [Features](#Features)
  - [Search](#Search)
  - [Nominations List](#Nominations-List)
  - [Login](#Login)
  - [Shareable Links](#Shareable-Links)
  - [Animations](#Animations)
- [Challenges](#Challenges)
  - [Responsiveness & Mobile Compatibility](#responsiveness--mobile-compatibility)
  - [Unique Movie IDs](#Unique-Movie-IDs)
- [Next Steps](#Next-Steps)

## Quick Summary

### Features

- [x] Required
  - [x] Search OMDB and display the results (movies only)
  - [x] Add a movie from the search results to our nomination list
  - [x] View the list of films already nominated
  - [x] Remove a nominee from the nomination list
- [x] Extra
  - [x] Login functionality
  - [x] Save nomination lists if the user leaves the page
  - [x] General UI animations
  - [x] Ability to create shareable links

## Tech

* React
* TypeScript
* React Router
* Shopify Polaris
* Framer Motion
* Feather Icons
* UnDraw
* Figma
* Netlify

## Design

My first steps after reading the challenge description and breaking down the tasks in Notion, I went right to Figma to create mockups of my app.

I wanted to create a design that unique and minimal, that also drew some elements from Shopify's Polaris design system. Although in a production app, it isn't ideal to mix components from Polaris with components from other sources, I figured that a hybrid design for this project would give me an opportunity to better express my creative vision and challenge myself to maintain a consistent UX.

In order to maintain a consistent experience as much as possible, I tried my best to incorportate some of the [design guidlines](https://polaris.shopify.com/design/design), including some for color and typography, when introducing components from outside of Polaris.

I went through a couple of design ideas before settling on the one you see in the final product. You can check out my mockups on [Figma](https://www.figma.com/file/OVc9F9vBECAi3jKlr68Gs7/The-Shoppies-Mockups?node-id=0%3A1).

## Features

### Search

![search](C:\Users\JRatana\Documents\GitHub\shopify-fall-2021-challenge\the-shoppies\demo_assets\search.gif)

![view](C:\Users\JRatana\Documents\GitHub\shopify-fall-2021-challenge\the-shoppies\demo_assets\view.gif)

I created `services/movieservice.ts` to handle fetching movie data using the OMDb API with the native Fetch API. 

The OMDb API offers 2 types of calls: a search by movie title, which returns a list of matching entries with just a few properties, and a call for an exact movie, which returns the full metadata. In my initial design of the app (which can be seen right above the final design in the [Figma](https://www.figma.com/file/OVc9F9vBECAi3jKlr68Gs7/The-Shoppies-Mockups?node-id=0%3A1)), I wanted to display the movie genre, ratings, and plot on each card in the results list. This meant I needed to make an extra call for each result that was returned from the initial search call. I thought that presenting more information to the user would improve the overall UX, and since the number of results return at a time is < 10, this would justify the extra calls. After reflecting on this more, I realized that this is not a scalable approach for presenting results. It also demands a higher bandwidth, which can pose issues for mobile users. In the end, I settled with only running the search call to grab a list of results, and then implementing a modal feature that would fetch the extra metadata only for the movies the user wanted to read more about.

In order to allow updates to the search terms to automatically update the results list with a bit of a buffer, I created a `useDebounce` React hook. I learned about this implementation from [useHooks](https://usehooks.com/useDebounce/).

### Nominations List

![nominate](C:\Users\JRatana\Documents\GitHub\shopify-fall-2021-challenge\the-shoppies\demo_assets\nominate.gif)

To manage the state of the nominations, I used a combination of `useReducer` and context, and provided the state from `App.tsx`. The reason why I chose context was because the list of nominations needed to be accessible by multiple components at different levels of the React tree. I decided it would make sense to store nomination data within a global User State because the currently selected nominations should tie in with the currently logged in user (more on the User State in the following section). With a reducer, I was able to extract out the logic for common state updates such as `ADD_NOMINATION`, `REMOVE_NOMINATION`, `CLEAR_NOMINATION`, and `SET_NOMINATION` from my components.

The `useReducer` and context setup I used (which I learned from [here](https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm)) is very similar to a Redux setup. The reason why I chose to use context over Redux however, is because I wasn't handling a large amount of global state and there aren't any high-frequency state updates in the app. The size of the app also didn't justify the addition of another depenency.

### Login

![login](https://github.com/janakitti/shopify-frontend-challenge-2021/blob/main/demo_assets/login.gif)

I added a mock login feature as part of my Shareable Link feature. The login feature doesn't use any authentication technology, it's simply used as a fun way for users to attatch their name to their nominations for their shareable links.

The username from the login is kept in the context store, so that it can be accessible throughout the app.

### Shareable Links

![share](C:\Users\JRatana\Documents\GitHub\shopify-fall-2021-challenge\the-shoppies\demo_assets\share.gif)

Once the user has selected 5 nominations, they are presented with a shareable link. This link takes users to a page that displays the nominator's username along with their 5 nominations in a visually appealing layout. Since I didn't implement a backend for this project, the username and nominated movie `imdbID`s are stored in a `data` query parameter in the shareable link, delimited by hyphens:

```
the-shoppies-fall-2021.netlify.app/nominations?data=janakitti-tt0076759-tt0080684-tt0086190-tt2488496-tt0120915
```

### Animations

This was my first time using the Framer Motion API and I had really great time playing around with the different animation parameters. I decided to keep the animations on the site minimal with a snappy scale animation for when major components render. Since I reused the same animation on multiple components, I decided to extract it animation logic into a wrapper called `PopAnimationWrapper` that takes in an optional parameter for delay.

## Challenges

### Responsiveness & Mobile-compatibility

One of the main challenges I came across was ensuring that my app could look and function nicely on multiple screen widths. I learned how to create SCSS mixins for conveniently writing up conditional styles based on screen width breakpoints from [Łukasz Florczak's article](https://medium.com/codeartisan/breakpoints-and-media-queries-in-scss-46e8f551e2f2). For most of my other projects, I've used the grid system from Bootstrap to handle the rearranging of rows and columns on various screen widths. For this project, I wanted to try creating this myself, and so I learned about [`grid-template-columns`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns).

One design concern that I encountered on mobile was that the fact that the nominations list was below the movie results list. When the user searches for movies and nominates one of them, they aren't immediately able to see their nomination get added to the list without scrolling all the way down. Unlike on desktops, where the nominations list is postions to the right of the search interface, the mobile UI offers no clear feedback on a successful nomination apart from the disabling of the "Nominate" button. I decided that a Polaris Toast that said "Nomination added below!" could be an clean way to inform users that their nomination was added below. I only wanted this Toast to appear on mobile, however. After a bit of trial and error, I found that it wasn't able to develop a solution using CSS breakpoints alone. I ended up learning to create a hook for getting the current screen width from this [useHooks article](https://usehooks.com/useWindowSize/).

### Unique Movie IDs

Another challenge I came across involved the `imdbID` property of return results from the OMDb API. When rending a list of elements in React, a unique key needs to be provided to each element so that React can identify which ones have changed over time. When implementing my results list, I used the `imdbID` property as my unique key. Unfortunately, for some search terms, the OMDb API will return duplicate entries (for example, when you search "Lego" and fetch page 1). In order to resolve this, I needed to filter out any duplicate responses before passing the data to render the movie card components. I ended up running a `reduce` operation on the returned movies, using a Set to keep track of and quickly lookup `imdbID`s that have already been added to the list:

```typescript
  interface IUniqueMoviesAccumulator {
    movies: IMovieSearch[];
    ids: Set<string>;
  }
  const initAcc: IUniqueMoviesAccumulator = { movies: [], ids: new Set() };
  const uniqueMovies = movies?.reduce(
    (acc: IUniqueMoviesAccumulator, curr: IMovieSearch) => {
      if (!acc.ids.has(curr.imdbID)) {
        acc.movies.push(curr);
        acc.ids.add(curr.imdbID);
      }
      return acc;
    },
    initAcc
  );
```



## Next Steps

If I had more time to work on this project, I would add a feature for viewing all the details of a selected movie. For each movie card in the results list, I could add a "View More" button that opens a modal containing all of the movie metadata and the long version of the plot. If I were to add this, I could reduce the amount of information displayed on the movie cards in the results list to just the movie title and year, and reduce the number of API calls made during search.

The OMDb API call for searching for movies by title returns paginated results. Currently, my app only displays the entries from the first page. I would definitely want to implement a feature for users to navigate through more results once they reach the bottom of the results list. On desktop, this could be implemented as an infinite scroll feature, while on mobile paginations buttons could be used instead, since the nominations list is positioned below the results list.

Finally, I would also create a backend and database for managing an storing users and their nominations. I could use this data to determine which movies received the most nominations and create a page for users to view the winners of the Shoppies.






