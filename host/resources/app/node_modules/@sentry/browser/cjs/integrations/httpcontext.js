Object.defineProperty(exports, '__esModule', { value: true });

const helpers = require('../helpers.js');

/** HttpContext integration collects information about HTTP request headers */
class HttpContext  {
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'HttpContext';}

  /**
   * @inheritDoc
   */

   constructor() {
    this.name = HttpContext.id;
  }

  /**
   * @inheritDoc
   */
   setupOnce() {
    // noop
  }

  /** @inheritDoc */
   preprocessEvent(event) {
    // if none of the information we want exists, don't bother
    if (!helpers.WINDOW.navigator && !helpers.WINDOW.location && !helpers.WINDOW.document) {
      return;
    }

    // grab as much info as exists and add it to the event
    const url = (event.request && event.request.url) || (helpers.WINDOW.location && helpers.WINDOW.location.href);
    const { referrer } = helpers.WINDOW.document || {};
    const { userAgent } = helpers.WINDOW.navigator || {};

    const headers = {
      ...(event.request && event.request.headers),
      ...(referrer && { Referer: referrer }),
      ...(userAgent && { 'User-Agent': userAgent }),
    };
    const request = { ...event.request, ...(url && { url }), headers };

    event.request = request;
  }
} HttpContext.__initStatic();

exports.HttpContext = HttpContext;
//# sourceMappingURL=httpcontext.js.map
