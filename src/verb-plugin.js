'use strict';

/**
 * Module dependencies.
 */

const wordnet = require('wordnet');

/**
 * Instances & constants.
 */

let wordnetInitPromise;
const normalizePrefixesRegExp = /^(?:re|un|de)-?(.+?)$/;
const whitelistedVerbs = [
  'anonymise',
  'anonymize',
  'backfill',
  'blacklist',
  'decrement',
  'dry-run',
  'increment',
  'lint',
  'promisify',
  'refactor',
  'setup',
  'whitelist'
];

/**
 * Checks if a word is a verb in the simple-present tense.
 */

const isVerb = async word => {
  // If it's whitelisted, simply return true.
  if (whitelistedVerbs.includes(word)) {
    return true;
  }

  let definitions;

  try {
    definitions = await wordnet.lookup(word);
  } catch (err) {
    return null;
  }

  const verb = definitions.find(({ meta }) => meta.synsetType === 'verb');

  return !!verb;
};

/**
 * Checks if a phrase starts with a verb in the simple-present.
 */

const startsWithVerbInSimplePresent = async phrase => {
  const words = phrase.split(/\s/);
  const firstWord = words[0].toLowerCase();

  // Load dictionary just once.
  await (wordnetInitPromise = wordnetInitPromise ?? wordnet.init());

  // Lookup the verb in the dictionary.
  let valid = await isVerb(firstWord);

  if (valid) {
    return true;
  }

  // Check if the word starts with `re`, `de` or `un` and lookup without the prefix.
  const [, firstWordNormalized] = firstWord.match(normalizePrefixesRegExp) ?? [];

  if (firstWordNormalized) {
    valid = await isVerb(firstWordNormalized);
  }

  return valid;
};

/**
 * Export rules this plugin offers.
 */

module.exports = {
  rules: {
    'subject-verb-simple-present-tense': async ({ subject }) => {
      // If no subject was detected, do not error out.
      if (!subject) {
        return [true];
      }

      const valid = await startsWithVerbInSimplePresent(subject);

      return [valid, 'subject must start with a verb in the simple-present tense'];
    }
  }
};
