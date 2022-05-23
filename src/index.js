'use strict';

/**
 * Export rules definitions.
 */

module.exports = {
  parserPreset: { parserOpts: { headerPattern: /^(?:(\w*)(?:\((.*)\))?: )?([a-zA-Z].*)$/ } },
  plugins: [require('./verb-plugin')],
  rules: {
    'body-max-line-length': [2, 'always', 72],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never'],
    'subject-max-length': [2, 'always', 72],
    'subject-min-length': [2, 'always', 1],
    'subject-verb-simple-present-tense': [2, 'always'],
    'type-empty': [2, 'always']
  }
};
