# Using Multiple Matching Strategies for classifying inputs

## Status

Accepted/Implemented 04 Feb 2022

## Context

We wanted to improve our input classification by incorporating the open source [Regular Expressions](https://searchfox.org/mozilla-central/source/toolkit/components/formautofill/content/heuristicsRegexp.js) that Firefox uses. We already had 2 separate checks for matching elements (CSS selectors + custom Regular Expressions),
so this work would involve adding a 3rd strategy.

The idea being that for each field we supported, we'd be able to run all 3 strategies (in order) whilst trying to match.

Please see [matching-configuration.md](../matcher-configuration.md) for details on the actual implementation.

## Considered Options

* [option 1] add a third inline check
* [option 2] create a system for mapping field types to available matching strategies

## Decision Outcome

Chosen option: "[option 2]", because remote configuration could be a possibility for this
feature, it made sense to introduce this layer of indirection now.

### Positive Consequences

* For a given field type, you can just look at the configuration object and know exactly which strategies will be tried
* The format of configuration is deliberately JSON-compatible, meaning patches could be delivered via remote configuration easily.

### Negative Consequences

* Adding a 3rd strategy increases the amount of time it takes to scan a page
* The declarative format makes debugging more difficult (can/should be mitigated with an upcoming logging/tracing implementation though)

## Future

It's complicated now, because adding this 3rd strategy without affecting the previous 2 was 
difficult to accomplish without introducing the declarative system mentioned above. Therefor I predict that over time we'll work to simplify. First by adding some debug/tracing instrumentation to make development
easier - and then followed up with either shorter/fewer strategies or rules.
