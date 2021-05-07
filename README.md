# The Shoppies - Shopify Frontend Challenge Submission

[![Netlify Status](https://api.netlify.com/api/v1/badges/31746af5-1cb0-4019-b5ed-13e7d896b6e8/deploy-status)](https://app.netlify.com/sites/the-shoppies-fall-2021/deploys)

This is my submission for Shopify's UX Developer Intern & Web Developer Intern Challenge for Fall 2021! In this challenge, we were tasked to build an app to help manage movie nominations for the upcoming The Shoppies, movie awards for entrepreneurs.

You can learn more about the challenge from the [challenge description](UX Developer Intern & Web Developer Intern Challenge - Fall 2021) and the [job posting](https://www.shopify.ca/careers/fall-2021-frontend-developer-internship-1549282c).

 **[Grab some popcorn and view my submission!](https://the-shoppies-fall-2021.netlify.app/) 🍿**

## Table of Contents

[TOC]

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
* Framer Motion
* Shopify Polaris
* Feather Icons
* UnDraw
* Figma
* Netlify

## Design

I wanted to create a unique design that drew some elements from Shopify's Polaris design system.

Although in a production scenario, it is ideal to either use Polaris throughout the entire app or not at all, I figured that a hybrid design would give me an opportunity to better express some of my ideas.

I went through a couple of design ideas before settling on the one you see in the final product. You can check out my mockups on [FIGMA].

In order to maintain a consistent experience as much as possible, I tried my best to incorportate [design guidlines](https://polaris.shopify.com/design/design), including some for color and typography, when introducing components from outside of Polaris.

## Features

### Search

I created a `movieservice` to handle fetching movie data from the OMDb API using the native Fetch API.

I utilized a `useDebounce` React hook to allow updates to the search terms to automatically update the results list with a bit of a buffer. I learned about this implementation from [useHooks](https://usehooks.com/useDebounce/).

The OMDb API offers 2 types of calls:

A decision I had to make when designing the results list UI was whether or not I wanted to display 

### Nominations List

### Login

I added a very basic login feature that ties in with the Shareable Link feature. The login feature doesn't use any authentication technology, it's simply used as a fun way for users to associate their name with their nominations for their shareable links.

The username from the login is kept in the context store, so that it can be accessible throughout the app.

### Shareable Links

Once the user has selected 5 nominations, they are presented with a shareable link. This link can be shared with anyone and when visited, will display the user's username along with their 5 nominations in a visually appealing layout. Since I didn't implement a backend for this project, the username and nominated movie `imdbID`s are stored in a `data` query parameter in the shareable link, delimited by hyphens:

```
the-shoppies-fall-2021.netlify.app/nominations?data=janakitti-tt0076759-tt0080684-tt0086190-tt2488496-tt0120915
```

### Animations

This was my first time using the Framer Motion API. I had really great time playing around with the different animation parameters. I decided to keep the animations on the site minimal with a snappy scale animation for when major components render. Since I reused the same animation on multiple components, I decided to extract it animation logic into a wrapper called `PopAnimationWrapper` that takes in an optional parameter for delay.

## Challenges



## Next Steps

If I had more time to work on this project, I would add a feature for viewing all the details of a selected movie. For each movie card in the results list, I could add a "View More" button that opens a modal containing all of the movie metadata and the long version of the plot. If I were to add this, I could reduce the amount of information displayed on the movie cards in the results list to just the movie title and year, and reduce the number of API calls made during search.

I would also create a backend and database for managing an storing users and their nominations. I could use this data to determine which movies received the most nominations and create a page for users to view the winners of the Shoppies.






