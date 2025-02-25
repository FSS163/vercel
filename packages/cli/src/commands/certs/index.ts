import { handleError } from '../../util/error';
import { parseArguments } from '../../util/get-args';
import getSubcommand from '../../util/get-subcommand';
import add from './add';
import issue from './issue';
import ls from './ls';
import rm from './rm';
import {
  addSubcommand,
  certsCommand,
  issueSubcommand,
  listSubcommand,
  removeSubcommand,
} from './command';
import { Command, help } from '../help';
import Client from '../../util/client';
import { getFlagsSpecification } from '../../util/get-flags-specification';
import output from '../../output-manager';
import { CertsTelemetryClient } from '../../util/telemetry/commands/certs';

const COMMAND_CONFIG = {
  add: ['add'],
  issue: ['issue'],
  ls: ['ls', 'list'],
  rm: ['rm', 'remove'],
};

export default async function main(client: Client) {
  const { telemetryEventStore } = client;
  const telemetry = new CertsTelemetryClient({
    opts: {
      store: telemetryEventStore,
    },
  });

  let parsedArgs;

  const flagsSpecification = getFlagsSpecification(certsCommand.options);

  // Parse CLI args
  try {
    parsedArgs = parseArguments(client.argv.slice(2), flagsSpecification, {
      permissive: true,
    });
  } catch (err) {
    handleError(err);
    return 1;
  }

  const { subcommand, subcommandOriginal, args } = getSubcommand(
    parsedArgs.args.slice(1),
    COMMAND_CONFIG
  );

  const needHelp = parsedArgs.flags['--help'];

  if (!subcommand && needHelp) {
    telemetry.trackCliFlagHelp('certs', subcommand);
    output.print(help(certsCommand, { columns: client.stderr.columns }));
    return 2;
  }

  function printHelp(command: Command) {
    output.print(
      help(command, { parent: certsCommand, columns: client.stderr.columns })
    );
  }

  switch (subcommand) {
    case 'issue':
      if (needHelp) {
        telemetry.trackCliFlagHelp('certs', 'issue');
        printHelp(issueSubcommand);
        return 2;
      }
      telemetry.trackCliSubcommandIssue(subcommandOriginal);
      return issue(client, args);
    case 'ls':
      if (needHelp) {
        telemetry.trackCliFlagHelp('certs', 'list');
        printHelp(listSubcommand);
        return 2;
      }
      telemetry.trackCliSubcommandList(subcommandOriginal);
      return ls(client, args);
    case 'rm':
      if (needHelp) {
        telemetry.trackCliFlagHelp('certs', 'remove');
        printHelp(removeSubcommand);
        return 2;
      }
      telemetry.trackCliSubcommandRemove(subcommandOriginal);
      return rm(client, args);
    case 'add':
      if (needHelp) {
        telemetry.trackCliFlagHelp('certs', 'add');
        printHelp(addSubcommand);
        return 2;
      }
      telemetry.trackCliSubcommandAdd(subcommandOriginal);
      return add(client, args);
    default:
      output.error('Please specify a valid subcommand: ls | issue | rm');
      output.print(help(certsCommand, { columns: client.stderr.columns }));
      return 2;
  }
}
