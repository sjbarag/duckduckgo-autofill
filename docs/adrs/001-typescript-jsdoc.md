# Using Typescript via JSDoc annotations

## Status

Accepted/Implemented **26th Jan, 2022**

## Context

The codebase started as plain JavaScript, with some JSDoc annotations added in various places - this 
was mostly done to improve the IDE workflow at the time - those with IDEs like Webstorm would get a 
Typescript-like experience when developing. The problem was that nothing was actually statically analysed as
part of our CI pipeline.

Once more engineers began to contribute, we wanted to improve the confidence we had in accepting changes - 
it was clear Typescript was the only relevant choice here, but the question remained around whether to switch
to `.ts` files, or keep the existing codebase as it is, and enable type-checking via existing + new JSDoc 
annotations.

## Considered Options

1. Convert the entire codebase to Typescript
2. Enable type-checking of JavaScript files + JSDoc annotations. 

## Decision Outcome

We decided on **option 2** because it required the least amount of changes to the codebase - 
the initial work was just around configuring Typescript as a dependency and choosing the
appropriate 'strictness' settings within `tsconfig.json`.

### Positive Consequences
- All code remains 100% valid JavaScript
- Immediate benefit from Typescript statically analysing every file
  - Even when JSDoc annotations are absent, the type-inference often still helps
- Bugs/errors can be caught as part of our Github Actions workflows
- We can better describe the expected types throughout the project, which then act as inline documentation

### Negative Consequences
- Some features of Typescript are awkward to implement as comments (`const assertions` etc)
- Tendency to lean on `.d.ts` files to describe more complicated types - these are not 100% type safe due to the way they operate in a 'global' context.
- Some additional time/effort may be required when adding features, due to the stricter checks

## Future 

Going forward the goal is to constantly increase the amount of type annotations to give us greater strictness
and confidence over changes. I don't envision this codebase ever needing to switch over to.

## Links 

- [Type Checking JavaScript Files](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
- [JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
