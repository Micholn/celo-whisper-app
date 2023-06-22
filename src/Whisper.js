import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';

let web3 = new Web3('https://alfajores-forno.celo-testnet.org');
let kit = newKitFromWeb3(web3);

export const createIdentity = async () => {
    return await web3.shh.newIdentity();
}

export const createChannel = async (identity) => {
    return await web3.shh.subscribe('messages', {
        ttl: 20,
        minPow: 2.77,
        topics: ['0x776869737065722d6368616e6e656c'],
        allowP2P: true
    }, identity);
}

export const sendMessage = async (identity, message) => {
    await web3.shh.postMessage({
        from: identity,
        payload: web3.fromAscii(message),
        ttl: 10,
        topic: '0x776869737065722d6368616e6e656c',
        powTarget: 2.01,
        powTime: 100
    });
}

export const onMessage = async (channel, callback) => {
    channel.on('data', (message) => {
        callback(web3.toAscii(message.payload));
    });
}