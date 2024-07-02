import { applyAggregateErrorsToEvent } from '@sentry/utils';
import { exceptionFromError } from '../eventbuilder.js';

const DEFAULT_KEY = 'cause';
const DEFAULT_LIMIT = 5;

/** Adds SDK info to an event. */
class LinkedErrors  {
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'LinkedErrors';}

  /**
   * @inheritDoc
   */

  /**
   * @inheritDoc
   */

  /**
   * @inheritDoc
   */

  /**
   * @inheritDoc
   */
   constructor(options = {}) {
    this.name = LinkedErrors.id;
    this._key = options.key || DEFAULT_KEY;
    this._limit = options.limit || DEFAULT_LIMIT;
  }

  /** @inheritdoc */
   setupOnce() {
    // noop
  }

  /**
   * @inheritDoc
   */
   preprocessEvent(event, hint, client) {
    const options = client.getOptions();

    applyAggregateErrorsToEvent(
      exceptionFromError,
      options.stackParser,
      options.maxValueLength,
      this._key,
      this._limit,
      event,
      hint,
    );
  }
} LinkedErrors.__initStatic();

export { LinkedErrors };
//# sourceMappingURL=linkederrors.js.map
