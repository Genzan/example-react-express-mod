import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';


const customNodeOptions = {
  rpcUrl: 'http://189.197.77.190:8545',
  chainId: 10
}

export const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
  extensions: [new OAuthExtension()],
  network: customNodeOptions,
});
