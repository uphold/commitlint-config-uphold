'use strict';

/**
 * Module dependencies.
 */

const extraVerbs = require('./extra-verbs.json');
const wordnetVerbs = require('./wordnet-verbs.json');

/**
 * Constants.
 */

const normalizeVerbPrefixesRegExp = /^(?:re|un|de)-?(.+?)$/;

/**
 * Checks if a word is a verb according to our dictionaries.
 */

const isVerb = word => !!extraVerbs[word] || !!wordnetVerbs[word];

/**
 * Checks if a phrase starts with a verb in the simple-present.
 */

const startsWithVerbInSimplePresent = phrase => {
  const words = phrase.split(/\s/);
  const firstWord = words[0].toLowerCase();

  // Lookup the verb in the dictionary.
  let valid = isVerb(firstWord);

  if (valid) {
    return true;
  }

  // Check if the word starts with `re`, `de` or `un` and lookup without the prefix.
  const [, firstWordNormalized] = firstWord.match(normalizeVerbPrefixesRegExp) ?? [];

  if (firstWordNormalized) {
    valid = isVerb(firstWordNormalized);
  }

  return valid;
};

/**
 * Export rules this plugin offers.
 */

module.exports = {
  rules: {
    'subject-verb-simple-present-tense': ({ subject }) => {
      // If no subject was detected, do not error out.
      if (!subject) {
        return [true];
      }

      const valid = startsWithVerbInSimplePresent(subject);

      return [valid, 'subject must start with a verb in the simple-present tense'];
    }
  }
};
