import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('TestGas', function () {
  it('should TestGas', async function () {
    // 1. Setup environment
    // 2. Deploy Contract
    // 3. Call our function to test

    // Doing point 2
    const Gas = await ethers.getContractFactory('TestGas');
    const gas = await Gas.deploy();
    await gas.deployed();

    for (let i = 0; i < 10; i++) {
      await gas.test1();
      await gas.test2();
      await gas.test3();
      await gas.test4();
      await gas.test5();
    }
  });
});
