import { TelemetryClient } from '../..';
import type { TelemetryMethods } from '../../types';
import type { removeSubcommand } from '../../../../commands/integration-resource/command';

export class IntegrationResourceRemoveTelemetryClient
  extends TelemetryClient
  implements TelemetryMethods<typeof removeSubcommand>
{
  trackCliArgumentResource(v: string | undefined, known?: boolean) {
    if (v) {
      this.trackCliArgument({
        arg: 'resource',
        value: known ? v : this.redactedValue,
      });
    }
  }

  trackCliFlagDisconnectAll(v: boolean | undefined) {
    if (v) {
      this.trackCliFlag('disconnect-all');
    }
  }

  trackCliFlagYes(v: boolean | undefined) {
    if (v) {
      this.trackCliFlag('yes');
    }
  }
}
