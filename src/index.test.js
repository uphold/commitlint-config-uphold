'use strict';

const config = require('.');
const lint = require('@commitlint/lint').default;

const { rules } = config;
const options = { parserOpts: config.parserPreset.parserOpts, plugins: config.plugins };

it('should validate correctly against a simple commit', async () => {
  const message = 'Add new environment Mars';

  const { errors, warnings, valid } = await lint(message, rules, options);

  expect(valid).toBe(true);
  expect(errors).toHaveLength(0);
  expect(warnings).toHaveLength(0);
});

it('should validate correctly against a commit with body', async () => {
  const message = `Add new environment Mars

This new environment was added because others were congested.

Teams that will be using it:

- Team 1
- Team 2
`;

  const { errors, warnings, valid } = await lint(message, rules, options);

  expect(valid).toBe(true);
  expect(errors).toHaveLength(0);
  expect(warnings).toHaveLength(0);
});

it('should fail if header has type', async () => {
  const message = 'feat: Add new environment Mars';

  const { errors, warnings, valid } = await lint(message, rules, options);

  expect(valid).toBe(false);
  expect(errors).toEqual([expect.objectContaining({ name: 'type-empty' })]);
  expect(warnings).toHaveLength(0);
});

it('should fail if subject is not sentence case', async () => {
  const message = 'add new environment Mars';

  const { errors, warnings, valid } = await lint(message, rules, options);

  expect(valid).toBe(false);
  expect(errors).toEqual([expect.objectContaining({ name: 'subject-case' })]);
  expect(warnings).toHaveLength(0);
});

it('should fail if subject has a full-stop', async () => {
  const message = 'Add new environment Mars.';

  const { errors, warnings, valid } = await lint(message, rules, options);

  expect(valid).toBe(false);
  expect(errors).toEqual([expect.objectContaining({ name: 'subject-full-stop' })]);
  expect(warnings).toHaveLength(0);
});

it('should fail if subject exceeds 72 chars', async () => {
  const message = 'Add new environment Mars to facilitate new deployments for the wallet team';

  const { errors, warnings, valid } = await lint(message, rules, options);

  expect(valid).toBe(false);
  expect(errors).toEqual([expect.objectContaining({ name: 'subject-max-length' })]);
  expect(warnings).toHaveLength(0);
});

it('should fail if subject does not start with verb in the simple present tense', async () => {
  const message = 'Added new environment Mars';

  const { errors, warnings, valid } = await lint(message, rules, options);

  expect(valid).toBe(false);
  expect(errors).toEqual([expect.objectContaining({ name: 'subject-verb-simple-present-tense' })]);
  expect(warnings).toHaveLength(0);
});

it('should fail if subject is empty', async () => {
  const message = '- Add new environment Mars';

  const { errors, warnings, valid } = await lint(message, rules, options);

  expect(valid).toBe(false);
  expect(errors).toEqual([expect.objectContaining({ name: 'subject-empty' })]);
  expect(warnings).toHaveLength(0);
});

describe('verb tense test cases', () => {
  [
    'Add `proofOfAddress` to `User` model',
    'Backfill non-default `User.settings.currency`',
    'Blacklist `globaliD` nonces',
    'Bump foobar@2.5.1',
    'Clean up old transactions normalized handling',
    'De-anonymise user id in mali lifecycle logs',
    'De-anonymize user id in mali lifecycle logs',
    'De-duplicate v1 and v2 reserve ledgers',
    'Deanonymise user id in mali lifecycle logs',
    'Deanonymize user id in mali lifecycle logs',
    'Decrement the vcc available on available settlement',
    'Deduplicate v1 and v2 reserve ledgers',
    'Dry-run simulated screening',
    'Grant execute on uuid_nil to move_money_command',
    'Grant privileges to `rpc_server_transaction_service`',
    'Include masked bank account number for plaid',
    'Increment the vcc available on available settlement',
    'Lint code',
    'Open viban feature to all ESA countries',
    'Parse request body when using Basic Authentication',
    'Re-block users from OFAC countries',
    'Re-enable some crypto test suites due to roles migration',
    'Re-organise database folders',
    'Re-organize database folders',
    'Re-scrub database for tier 1 matches',
    'Re-send invite if requesting password reset',
    'Re-throw errors when sweeping multiple ethereum addresses',
    'Reblock users from OFAC countries',
    'Refactor ethereum client config to use a single host url',
    'Reorganise database folders',
    'Reorganize database folders',
    'Rescrub database for tier 1 matches',
    'Resend invite if requesting password reset',
    'Rethrow errors when sweeping multiple ethereum addresses',
    'Set `fireblocks` production `vaultId`',
    'Setup temporary Vault to store TOTP keys',
    'Un-redact simulation warn/error logs',
    'Unredact simulation warn/error logs',
    'Update list to fix security issue',
    'Whitelist `globaliD` nonces'
  ].forEach(message => {
    it(`should validate correctly for "${message}"`, async () => {
      const { errors, warnings, valid } = await lint(message, rules, options);

      expect(valid).toBe(true);
      expect(errors).toHaveLength(0);
      expect(warnings).toHaveLength(0);
    });
  });
});
