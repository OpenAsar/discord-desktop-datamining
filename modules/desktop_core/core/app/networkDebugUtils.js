"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupNetworkLogging = setupNetworkLogging;
function sanitizeHeaders(payload) {
  if (!payload.headers) {
    return payload;
  }
  const strippedHeaders = Object.keys(payload.headers).reduce((acc, key) => {
    if (key.toLowerCase() === 'authorization' || key.toLowerCase() === 'cookie') {
      return acc;
    }
    acc[key] = payload.headers[key];
    return acc;
  }, {});
  return {
    ...payload,
    headers: strippedHeaders
  };
}
function setupNetworkLogging(mainWindow, logger) {
  if ((mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents) == null) {
    return;
  }
  try {
    mainWindow.webContents.debugger.attach('1.1');
  } catch (err) {
    logger.error('debugger attach failed: ' + err, 3);
    return;
  }
  mainWindow.webContents.debugger.on('message', (event, method, params) => {
    let entry = null;
    if (method === 'Network.requestWillBeSent') {
      const {
        requestId,
        request,
        initiator,
        type
      } = params;
      entry = {
        timestamp: new Date().toISOString(),
        method,
        requestId,
        resource: sanitizeHeaders(request || {}),
        resourceType: type,
        initiator: initiator === null || initiator === void 0 ? void 0 : initiator.type
      };
    } else if (method === 'Network.responseReceived') {
      const {
        requestId,
        response,
        type
      } = params;
      entry = {
        timestamp: new Date().toISOString(),
        method,
        requestId,
        resource: sanitizeHeaders(response || {}),
        resourceType: type === null || type === void 0 ? void 0 : type.type
      };
    }
    if (entry != null) {
      logger.info(JSON.stringify(entry));
    }
  });
  mainWindow.webContents.debugger.sendCommand('Network.enable');
}