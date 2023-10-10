import { getCurrentHub } from '@sentry/core';
import { addInstrumentationHandler, severityLevelFromString } from '@sentry/utils';
import * as util from 'util';

/** Console module integration */
class Console  {constructor() { Console.prototype.__init.call(this); }
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'Console';}

  /**
   * @inheritDoc
   */
   __init() {this.name = Console.id;}

  /**
   * @inheritDoc
   */
   setupOnce() {
    addInstrumentationHandler('console', ({ args, level }) => {
      const hub = getCurrentHub();

      if (!hub.getIntegration(Console)) {
        return;
      }

      hub.addBreadcrumb(
        {
          category: 'console',
          level: severityLevelFromString(level),
          message: util.format.apply(undefined, args),
        },
        {
          input: [...args],
          level,
        },
      );
    });
  }
} Console.__initStatic();

export { Console };
//# sourceMappingURL=console.js.map
