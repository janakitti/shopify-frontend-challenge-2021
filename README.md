# The Shoppies - Shopify Frontend Challenge Submission

[![Netlify Status](https://api.netlify.com/api/v1/badges/31746af5-1cb0-4019-b5ed-13e7d896b6e8/deploy-status)](https://app.netlify.com/sites/the-shoppies-fall-2021/deploys)

This is my submission for **Shopify's UX Developer Intern & Web Developer Intern Challenge** for Fall 2021! In this challenge, we were tasked with building an app to help manage movie nominations for the upcoming Shoppies, the movie awards for entrepreneurs.

You can learn more about the challenge from the [challenge description](https://docs.google.com/document/d/1SdR9rQpocsH5rPTOcxr9noqHRld5NJlylKO9Hf94U8U/edit#heading=h.31w9woubunro).

### [Now, grab some popcorn and check out my submission!](https://the-shoppies-fall-2021.netlify.app/) 🍿  (Username: any name, Password: `shoppies`)

![search](https://github.com/janakitti/shopify-frontend-challenge-2021/blob/main/demo_assets/home.png)

## Table of Contents

- [Quick Summary](#Quick-Summary)
- [Tech](#Tech)
- [Design](#Design)
- [Features](#Features)
  - [Search](#Search)
  - [Nominations List](#Nominations-List)
  - [Login](#Login)
  - [Persistency](#Persistency)
  - [Shareable Links](#Shareable-Links)
  - [Animations](#Animations)
- [Styling](#Styling)
- [Challenges](#Challenges)
  - [Responsiveness & Mobile Compatibility](#responsiveness--mobile-compatibility)
  - [Unique Movie IDs](#Unique-Movie-IDs)
- [Next Steps](#Next-Steps)

## Quick Summary

I created a mobile-friendly React web app where users can log in and search for movies from the [Open Movie Database](http://www.omdbapi.com/). Users can choose to view more details about a given movie from the search results and nominate 5 movies for the awards. After nominating 5 movies, users will be presented with a link that they can share with friends to showcase their picks.

**Required Features**

- [x] Search OMDb and display the results (movies only)
- [x] Add a movie from the search results to the nomination list
- [x] View the list of films already nominated
- [x] Remove a nominee from the nomination list

**Extra Features**

- [x] Mock login functionality
- [x] Save nomination lists if the user leaves the page
- [x] General UI animations
- [x] Ability to create shareable links
- [x] Animations

## Tech

* React
* TypeScript
* React Router
* Shopify Polaris
* Framer Motion (for component animations)
* Feather Icons
* UnDraw (for SVG graphics)
* Figma (for designing mockups)
* Netlify (for deployment)

## Design

After reading the challenge description and breaking down the tasks in Notion, I went right to Figma to create mockups of my app. I wanted to create a design that unique and minimal, that also drew some elements from Shopify's [Polaris design system](https://polaris.shopify.com/). Although in a production app, it isn't ideal to mix components from Polaris with components from other sources, I figured that a hybrid design for this project would give me an opportunity to better express my creative vision and challenge myself to maintain a consistent UX.

In order to maintain a consistent experience as much as possible, I tried my best to incorportate some of the [design guidlines](https://polaris.shopify.com/design/design), including some for color and typography, when introducing components from outside of Polaris. I utilized some of the components from the [Polaris Figma UI Kits](https://www.figma.com/@shopify) to help me with my mockups.

I went through a couple of design ideas before settling on the one you see in the final product. You can check out my mockups on [Figma](https://www.figma.com/file/OVc9F9vBECAi3jKlr68Gs7/The-Shoppies-Mockups?node-id=0%3A1).

One of the most unique/experimental aspects of my design is the nomination list cards. I wanted to make the user's nominations feel colourful and cinematic, so I opted for cards that used a tinted version of the movie's poster as a background with light text. See [Next Steps](#Next-Steps) for my comments on future improvements that can be made to this design.

## Features

### Search

![search](https://github.com/janakitti/shopify-frontend-challenge-2021/blob/main/demo_assets/search.gif)

![view](https://github.com/janakitti/shopify-frontend-challenge-2021/blob/main/demo_assets/view.gif)

I created `services/movie.service.ts` to handle fetching movie data using the OMDb API with the native Fetch API. In order to allow updates to the search terms to automatically update the results list with a bit of a buffer, I created a `useDebounce` React hook. I learned about this implementation from [useHooks](https://usehooks.com/useDebounce/).

The OMDb API offers 2 types of calls: a search by movie title, which returns a list of matching entries with just a few properties; and a call for an exact movie, which returns the full metadata for a single movie. In my initial design of the app (which can be seen right above the final design in the [Figma](https://www.figma.com/file/OVc9F9vBECAi3jKlr68Gs7/The-Shoppies-Mockups?node-id=0%3A1)), I wanted to display the movie genre, ratings, and plot on each card in the results list. This meant I needed to make an extra call for each result that was returned from the initial search. I thought that presenting more information to the user would improve the overall UX, and since the number of results returned at a time is < 10, that this would justify the extra calls. After reflecting on this idea a bit more, I realized that it was not a scalable approach for presenting results. It also demands a higher bandwidth, which can pose issues for mobile users. In the end, I settled with only running the search to grab a list of results, and then implemented a modal feature that would fetch the full metadata only for the movies the user wanted to read more about.

### Nominations List

![nominate](https://github.com/janakitti/shopify-frontend-challenge-2021/blob/main/demo_assets/nominate.gif)

To manage the state of the nominations, I used a combination of `useReducer` and context, and provided the state from `App.tsx`. The reason why I chose context was because the list of nominations needed to be accessible by multiple components at various levels of the React tree. I decided it would make sense to store nomination data within a global User State (more on the User State in the following section). There were also multiple updates that needed to be made to the list of nominations throughout the app (add, remove, set, clear), some of which depended on the previous state. I found that was more readable and scalable to keep all this logic in `UserContext.tsx`.

The `useReducer` and context setup I used (which I learned from [here](https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm)) is very similar to a Redux setup. The reason why I chose to use context over Redux however, is because I wasn't handling a large amount of global state and there aren't any high-frequency state updates in the app. The size of the app also didn't justify the addition of another depenency.

### Login

![login](https://github.com/janakitti/shopify-frontend-challenge-2021/blob/main/demo_assets/login.gif)

I added a mock login feature that goes together with the Shareable Links feature. The login feature doesn't use any authentication technology, it's simply used as a fun way for users to attatch their name to their nominations for their shareable links. The username from the login is kept in the context store so that it can be accessible throughout the app.

### Persistency

I used `localStorage` to store the username and list of nominations for the currently logged-in user. This allows the user to leave their browser and have their nominations persist when the revisit the app.

### Shareable Links

![share](https://github.com/janakitti/shopify-frontend-challenge-2021/blob/main/demo_assets/share.gif)

Once the user has selected 5 nominations, they are presented with a shareable link. This link takes users to a page that displays the nominator's username along with their 5 nominations in a visually appealing layout. Since I didn't implement a backend for this project, the username and nominated movie `imdbID`s are stored in `user` and `ids` query parameters in the shareable link (IDs are delimited by hyphens):

```
the-shoppies-fall-2021.netlify.app/nominations?user=janakitti&ids=tt0076759-tt0080684-tt0086190-tt2488496-tt0120915
```

### Animations

This was my first time using the Framer Motion API and I had really great time experimenting with the different animation parameters. I decided to keep the animations in the app minimal with a snappy scale animation for when major components render. Since I reused the same animation on multiple components, I decided to extract the animation logic into a wrapper called `PopAnimationWrapper` that takes in an optional parameter for delay.

## Styling

I chose to keep all the stylesheets with their respective component/feature folders. I found that a feature-based structure is easier for other people grasp, in the case that other developers begin to work on the project. In the future, testing files can also be included in this grouping.

For my SCSS class names, I chose to try out the [BEM](http://getbem.com/) (Block Element Modifier) methodology. Using BEM, each selector is made up of a Block (standalone entity), Element (element of/semantically tied to its Block), and a Modifier (a flag on the Block or Element to modify its appearance), all put together like this: `block__element--modifier`. For example: `movie-card__poster--selected`. I found that this naming strategy allowed me to write more meaningful class names, and can make it much easier for future developers to quickly understand their purpose.

## Challenges

### Responsiveness & Mobile-compatibility

One of the main challenges I came across was ensuring that my app could look and function nicely on multiple screen widths. I read [Łukasz Florczak's article](https://medium.com/codeartisan/breakpoints-and-media-queries-in-scss-46e8f551e2f2) to learn how to create SCSS mixins that make it easy to write up conditional styles based on screen width breakpoints.

For most of my previous projects, I've used the grid system from Bootstrap to handle the rearranging of rows and columns on various screen widths. For this project, I wanted to try creating this myself, and so I learned about [`grid-template-columns`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns).

One design concern that I encountered on mobile was that the fact that the nominations list was positioned below the movie results list. When the user searches for movies and nominates one of them, they aren't immediately able to see their nomination get added to the list without scrolling all the way down. Unlike on desktop, where the nominations list is postioned to the right of the search UI, the mobile UI offers no clear feedback on a successful nomination apart from the disabling of the "Nominate" button. I decided that a Toast that said "Nomination added below!" could be an clean way to inform users that their nomination was added below. I only wanted this Toast to appear on mobile, however. After a bit of trial and error, I found that it wasn't able to develop a solution using CSS breakpoints. I ended up learning to create a hook for getting the current screen width from this [useHooks article](https://usehooks.com/useWindowSize/). Moving forward, I think it would be much more optimal to have the nominations list on mobile be some kind of expandable overlay or tray. This would prevent the need for the user to scroll all the way down the list of results to see their nominations.

![share](https://github.com/janakitti/shopify-frontend-challenge-2021/blob/main/demo_assets/responsive.gif)

### Unique Movie IDs

Another challenge I came across involved the `imdbID` property of the results from the OMDb API. When rending a list of elements in React, a unique key needs to be provided to each element so that React can identify which ones have changed over time. When implementing my results list, I used the `imdbID` property as my unique key. Unfortunately, for some search terms, the OMDb API will return duplicate entries (for example, when you search "Lego" and fetch page 1). In order to resolve this, I needed to filter out any duplicate responses before passing the data to render the MovieCard components. I ended up running a `reduce` operation on the returned movies, using a Set to keep track of and quickly lookup `imdbID`s that have already been added to the list:

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

The OMDb API call for movie searches returns paginated results. Currently, my app only displays the entries from the first page. If I had more time to work on this project, I would definitely want to implement a feature for users to navigate through more results once they reach the bottom of the results list. On desktop, this could be implemented using the Polaris Pagination component, while on mobile, infinite scrolling could be used instead. Since the nominations list on mobile is currently positioned below the results list, I would need to come up with a new design to keep that accessible as the user scrolls through the results.

I would also want to reconsider the design of the cards on the nomination list. Currently, the use of light text on the tinted image background might not be the most accessible for users, especially on visually busier posters. I might want to experiment with different approaches to ensure the text is always on a consistently-coloured background for readability.

Finally, I would also create a backend and database for managing and storing users and their nominations. I could use this data to determine which movies received the most nominations and create a page for users to view the winners of the Shoppies.






