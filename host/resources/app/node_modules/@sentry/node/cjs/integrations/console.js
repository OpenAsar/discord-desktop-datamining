Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@sentry/core');
const utils = require('@sentry/utils');
const util = require('util');

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
    utils.addInstrumentationHandler('console', ({ args, level }) => {
      const hub = core.getCurrentHub();

      if (!hub.getIntegration(Console)) {
        return;
      }

      hub.addBreadcrumb(
        {
          category: 'console',
          level: utils.severityLevelFromString(level),
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

exports.Console = Console;
//# sourceMappingURL=console.js.map
