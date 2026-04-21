import type NodeModule from 'module';
import type {DiscordNativeType} from '@discordapp/discord-native-types';

declare module 'module' {
  var globalPaths: string[];
  var _resolveLookupPaths: (request: string, parent: NodeModule) => string[];
}

declare global {
  var DiscordNative: DiscordNativeType;
  var logPath: string | undefined;
  var moduleDataPath: string | undefined;
  var modulePath: string | undefined;
  var assetCachePath: string | undefined;
  var popouts: Map<string, Window>;
  var releaseChannel: string | undefined;
}
