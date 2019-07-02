import Web3 from 'web3';
import config from '../config';

export function printEnv(envs) {
  console.log('  Env:')
  for (const env of Object.keys(envs)) {
    console.log(`    ${env} - ${envs[env]}`);
  }
  console.log('');
}

async function runApp(){
	printEnv(config);
	var abi = config.abi;
	var contractAddress = config.contractAddress;
	var eventName = config.eventName;

	const web3 = new Web3(new Web3.providers.WebsocketProvider(config.providerUrl));

	var TokenContract = new web3.eth.Contract(JSON.parse(abi),contractAddress);
	TokenContract.events.allEvents({ fromBlock: 'latest' }, console.log)
	
	var event = TokenContract.events.Transfer();

	TokenContract.once('Transfer', { }, function(error, event){ console.log(event); });

	event.watch(function(error, result){
	    if (!error) {
	        alert("wait for a while, check for block Synchronization or block creation");
	        console.log(result);
	        console.log('pas d erreur');
	    }else {
	        console.log(error);
	        console.log('erreur')
	    }
	});
}

runApp().catch(console.log)
