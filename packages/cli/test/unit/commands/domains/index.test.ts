import { describe, it, expect, afterEach, vi } from 'vitest';
import domains from '../../../../src/commands/domains';
import * as ls from '../../../../src/commands/domains/ls';
import { client } from '../../../mocks/client';

describe('domains', () => {
  const lsSpy = vi.spyOn(ls, 'default').mockResolvedValue(0);

  afterEach(() => {
    lsSpy.mockClear();
  });

  describe('--help', () => {
    it('tracks telemetry', async () => {
      const command = 'domains';

      client.setArgv(command, '--help');
      const exitCodePromise = domains(client);
      await expect(exitCodePromise).resolves.toEqual(2);

      expect(client.telemetryEventStore).toHaveTelemetryEvents([
        {
          key: 'flag:help',
          value: command,
        },
      ]);
    });
  });

  it('routes to ls subcommand', async () => {
    const args: string[] = [];
    const opts = {};

    client.setArgv('domains', ...args);
    await domains(client);
    expect(lsSpy).toHaveBeenCalledWith(client, opts, args);
  });

  describe('unrecognized subcommand', () => {
    it('routes to ls', async () => {
      const args: string[] = ['not-a-command'];
      const opts = {};

      client.setArgv('domains', ...args);
      await domains(client);
      expect(lsSpy).toHaveBeenCalledWith(client, opts, args);
    });
  });
});
