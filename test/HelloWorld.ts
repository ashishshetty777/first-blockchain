import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Hello World', function () {
  it('should display Hello World', async function () {
    // 1. Setup environment
    // 2. Deploy Contract
    // 3. Call our function to test

    // Doing point 2
    const HelloWorld = await ethers.getContractFactory('HelloWorld');
    const hello = await HelloWorld.deploy();
    await hello.deployed();

    expect(await hello.hello()).to.equal('Hello, world');
  });
});
