import { ethers } from 'ethers';
import { useState } from 'react';
import { contracts } from './constants';

const App = () => {
  const [storeNumberInput, setStoreNumberInput] = useState('');
  const [storedNumber, setStoredNumber] = useState(null);
  const [people, setPeople] = useState([]);

  const simpleStorageData = contracts.simpleStorage;
  const fundMeData = contracts.fundMe;

  // const provider = new ethers.providers.JsonRpcProvider();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const accounts = provider
    .listAccounts()
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  console.log('accounts: ', accounts);

  const simpleStorage = new ethers.Contract(
    simpleStorageData.ropstenAddress,
    simpleStorageData.abi,
    signer,
  );
  const fundMe = new ethers.Contract(fundMeData.localAddress, fundMeData.abi, signer);

  // console.log('provider: ', provider);
  // console.log('simpleStorage: ', simpleStorage);
  // console.log('simpleStorage address: ', simpleStorage.address);
  // console.log('retrieve: ', simpleStorage.retrieve());
  // console.log('people: ', simpleStorage.people(0));

  const sendTransaction = async () => {
    const newTransaction = await signer.sendTransaction({
      from: '0x8DD52B13217d39bd2661bBB87622Bc946A7294D1',
      to: '0x3D926436b967EBC692836C5C2b3a06243fB287C6',
      value: ethers.utils.parseEther('0.1'),
    });

    // const newEtherProvTransaction = await window.ethereum.request({
    //   method: 'eth_sendTransaction', params: [
    //     {
    //       from: 0x8DD52B13217d39bd2661bBB87622Bc946A7294D1,
    //       to: 0x3D926436b967EBC692836C5C2b3a06243fB287C6,
    //       value: ethers.utils.parseEther('0.1'),
    //     }
    //   ]
    // });

    // const tx_hash = newTransaction.hash;

    // const tx_receipt = await provider.getTransactionReceipt(tx_hash);
    // const tx_wait = await provider.waitForTransaction(tx_hash);
    const balance = await provider.getBalance('0x8DD52B13217d39bd2661bBB87622Bc946A7294D1');

    console.log('newTransaction: ', newTransaction);
    console.log('tx_receipt: ', tx_receipt);
    console.log('tx_wait: ', tx_wait);
    console.log('balance: ', ethers.utils.formatEther(balance));
  };

  const handleNumberInputChange = (e) => {
    setStoreNumberInput(e.target.value);
  };

  const handleStoreNumber = async () => {
    try {
      const transaction = await simpleStorage.store(storeNumberInput);
      console.log('loading... ');
      await transaction.wait(1);

      console.log('transaction success: ', transaction);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRetrieve = async () => {
    try {
      const myNumber = await simpleStorage.retrieve();

      console.log('myNumber: ', myNumber);

      await setStoredNumber(parseInt(myNumber._hex));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPerson = async () => {
    try {
      const result = await simpleStorage.addPerson('Pavel', 23);
      const lastPeople = await simpleStorage.people(0);

      await setPeople([...people, lastPeople]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFundMe = async () => {
    try {
      const fund = await fundMe.fund();

      console.log('fund', fund);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithDraw = async () => {
    try {
      const withDraw = await fundMe.withDraw();

      console.log('withDraw: ', withDraw);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#141e30] to-[#243b55]">
      <div>
        <h1 className="text-sky-600 text-[36px] mb-5">SimpleStorage contract</h1>

        <button className="text-sky-600 p-2 border mb-4" onClick={sendTransaction}>
          send transaction
        </button>

        <div className="flex">
          <div className="w-[400px] h-[400px] flex flex-col items-center justify-center border-[10px] border-sky-500 text-[24px] text-sky-600 font-bold p-[10px]">
            <div className="flex flex-col mb-[40px]">
              <input
                className="mb-4"
                type="number"
                onChange={handleNumberInputChange}
                value={storeNumberInput}
                placeholder="Мой номер"
              />

              <button className="border" type="button" onClick={handleStoreNumber}>
                Store
              </button>
            </div>

            <button className="border mb-3" type="button" onClick={handleRetrieve}>
              handleRetrieve - myNumber
            </button>

            <div>Сохраненный номер: {storedNumber}</div>

            <button className="border mb-3" type="button" onClick={handleRetrieve}>
              get my number
            </button>
          </div>

          <div className="w-[400px] h-[400px] flex flex-col items-center border-[10px] border-sky-500 text-[24px] text-sky-600 font-bold p-[10px]">
            <h2>Список пользователей</h2>

            {people.map((item, index) => (
              <div key={index}>{`${index + 1}: ${item.name}`}</div>
            ))}

            <button className="border mt-auto mb-2" onClick={handleAddPerson}>
              Add user
            </button>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-sky-600 text-[36px] mb-5">FundMe contract</h1>

        <button className="text-sky-600 p-2 border mb-4" onClick={handleFundMe}>
          fundMe
        </button>

        <button className="text-sky-600 p-2 border mb-4" onClick={handleWithDraw}>
          withDraw
        </button>
      </div>
    </div>
  );
};

export default App;
