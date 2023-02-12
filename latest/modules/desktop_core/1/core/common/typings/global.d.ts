import NodeModule from 'module';

declare module 'module' {
  var globalPaths: string[];
  var _resolveLookupPaths: (request: string, parent: NodeModule) => string[];
}
