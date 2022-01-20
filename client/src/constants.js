import simpleStorage from './contracts/SimpleStorage.json';
import fundMe from './contracts/FundMe.json';

export const contracts = {
  simpleStorage: {
    abi: simpleStorage.abi,
    localAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    ropstenAddress: '0xDaEda7c9cC535FF74841f8Cc49782EDE3C2aC407',
  },
  fundMe: {
    abi: fundMe.abi,
    localAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    rinkebyAddress: '0x7eF25FbE9E6E8C8f525d80fe329C48e65891bC64',
  },
};
