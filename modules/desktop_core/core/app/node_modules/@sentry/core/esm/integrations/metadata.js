import { forEachEnvelopeItem } from '@sentry/utils';
import { stripMetadataFromStackFrames, addMetadataToStackFrames } from '../metadata.js';

/**
 * Adds module metadata to stack frames.
 *
 * Metadata can be injected by the Sentry bundler plugins using the `_experiments.moduleMetadata` config option.
 *
 * When this integration is added, the metadata passed to the bundler plugin is added to the stack frames of all events
 * under the `module_metadata` property. This can be used to help in tagging or routing of events from different teams
 * our sources
 */
class ModuleMetadata  {
  /*
   * @inheritDoc
   */
   static __initStatic() {this.id = 'ModuleMetadata';}

  /**
   * @inheritDoc
   */

   constructor() {
    this.name = ModuleMetadata.id;
  }

  /**
   * @inheritDoc
   */
   setupOnce(addGlobalEventProcessor, getCurrentHub) {
    const client = getCurrentHub().getClient();

    if (!client || typeof client.on !== 'function') {
      return;
    }

    // We need to strip metadata from stack frames before sending them to Sentry since these are client side only.
    client.on('beforeEnvelope', envelope => {
      forEachEnvelopeItem(envelope, (item, type) => {
        if (type === 'event') {
          const event = Array.isArray(item) ? (item )[1] : undefined;

          if (event) {
            stripMetadataFromStackFrames(event);
            item[1] = event;
          }
        }
      });
    });

    const stackParser = client.getOptions().stackParser;

    addGlobalEventProcessor(event => {
      addMetadataToStackFrames(stackParser, event);
      return event;
    });
  }
} ModuleMetadata.__initStatic();

export { ModuleMetadata };
//# sourceMappingURL=metadata.js.map
