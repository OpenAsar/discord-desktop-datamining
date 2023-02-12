import type NodeModule from 'module';
import type {DiscordNativeType} from '@discordapp/discord-native-types';

declare module 'module' {
  var globalPaths: string[];
  var _resolveLookupPaths: (request: string, parent: NodeModule) => string[];
}

declare global {
  var moduleDataPath: string | undefined;
  var modulePath: string | undefined;
  var DiscordNative: DiscordNativeType;
  var popouts: Map<string, Window>;
}
