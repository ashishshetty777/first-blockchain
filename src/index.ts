import { ethers } from 'ethers';

async function hasSigners(): Promise<boolean> {
  //@ts-ignore
  const metamask = window.ethereum;
  const signers = await (metamask.request({
    method: 'eth_accounts',
  }) as Promise<string[]>);
  return signers.length > 0;
}

async function requestAccess(): Promise<boolean> {
  //@ts-ignore
  const result = (await window.ethereum.request({
    method: 'eth_requestAccounts',
  })) as string[];
  return result && result.length > 0;
}

async function getContract() {
  const address = process.env.CONTRACT_ADDRESS;

  if (!(await hasSigners()) && !(await requestAccess())) {
    console.log('You are in trouble, no one wants to play');
  }

  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(
    // @ts-ignore
    window.ethereum,
  ).getSigner();

  const contract = new ethers.Contract(
    address,
    [
      'function count() public',
      'function getCounter() public view returns (uint32)',
    ], // abi
    provider,
  );

  const el = document.createElement('div');
  async function setCounter() {
    el.innerHTML = await contract.getCounter();
  }

  setCounter();

  const button = document.createElement('button');
  button.innerText = 'increment';

  button.onclick = async function () {
    const tx = await contract.count();
    await tx.wait();
    setCounter();
  };

  document.body.appendChild(el);
  document.body.appendChild(button);
}

getContract();
