import { promisify } from 'util';
import Ganache from 'ganache-core';
import { defaultAccounts, getWallets } from 'ethereum-waffle';
import { providers } from 'ethers';
import { spawn }  from 'child_process';

export function spawnProcess(name, command, args, options) {
  const child = spawn(command, args, options);
  child.stdout.on('data', (data) => {
    console.log(`${name}: ${data}`);
  });
  child.stderr.on('data', (data) => {
    console.log(`ERROR ${name}:  ${data}`);
  });
  child.on('close', (code) => {
    console.log(`${name} exited with code ${code}`);
  });
  return child;
}

export function printWallets(wallets) {
  console.log('  Wallets:')
  for (const wallet of wallets) {
    console.log(`    ${wallet.address} - ${wallet.privateKey}`);
  }
  console.log('');
}

export async function startGanache(port, override_options = {}) {
  const options = {
    accounts: defaultAccounts,
    gasLimit: 800000000, 
    ...override_options
  };
  const server = Ganache.server(options);
  const listenPromise = promisify(server.listen);
  await listenPromise(port);

  const jsonRpcUrl = `http://localhost:${port}`;

  const provider = new providers.JsonRpcProvider(jsonRpcUrl);
  const wallets = await getWallets(provider);
  printWallets(wallets);

  console.log(`  Node url (ganache): ${jsonRpcUrl}...`);
  return jsonRpcUrl;
}

export default {
	startGanache, 
	spawnProcess
};
