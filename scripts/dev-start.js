import { deployContract, getWallets } from 'ethereum-waffle';
import {providers, utils } from 'ethers';

import GovToken from '../build/GovToken';

import { startGanache, spawnProcess } from './startGanache';

const ganachePort = 18545;

import {
  ERC1820_REGISTRY_ABI,
  ERC1820_REGISTRY_ADDRESS,
  ERC1820_REGISTRY_BYTECODE,
  ERC1820_REGISTRY_DEPLOY_TX 
} from '../govtoken-contracts/test/utils/data';

async function deployGovTokenContract(deployWallet, provider) {
  let transaction = {
    to: "0xa990077c3205cbDf861e17Fa532eeB069cE9fF96",
    value: utils.parseEther("1.0"),
  };

  // Send the ether to transaction
  await deployWallet.sendTransaction(transaction);

  await provider.sendTransaction(ERC1820_REGISTRY_DEPLOY_TX);

  const govTokenContract = await deployContract(deployWallet, GovToken, [], { gasLimit: 10000000 });
  console.log(`    GovToken address: ${govTokenContract.address}`);
  return govTokenContract.address;
}


function runOracle(vars) {
  const env = {...process.env, ...vars};
  spawnProcess('oracle', 'yarn', ['start'], {env});
}

async function start() {
  	const jsonRpcUrl = await startGanache(ganachePort, {});
    const provider = new providers.JsonRpcProvider(jsonRpcUrl);
  	const [deployWallet] = await getWallets(provider);
  	const govTokenAddress = await deployGovTokenContract(deployWallet, provider);
  
  	runOracle({
      CONTRACT_ABI: JSON.stringify(GovToken.abi),
  		CONTRACT_ADDRESS: govTokenAddress,
  		CONTRACT_EVENT: "",
  		PROVIDER_URL: jsonRpcUrl
  	});
}

start().catch(console.error);
