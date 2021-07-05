const axios = require('axios');
const { Permissions } = require('@shareandcharge/ocn-registry');
const ethers = require('ethers');


const SPENDER = '0x8931B0e6980973c26b77100A9A3afaAf137d5c5E';


// const registry = new Registry('local', SPENDER);
// const permissions = new Permissions('volta', SPENDER);


function createWallet() {
  const privateKey = 'ca02800b5787322a05af7bfc94445ef67d6249071786ac0deacc508e2b55271e';
  const wallet = new ethers.Wallet(privateKey);
  console.log(wallet);
  return wallet;

  // Connect a wallet to mainnet
  //   const provider = ethers.getDefaultProvider();
  //   const walletWithProvider = new ethers.Wallet(privateKey, provider);
}


// exports.healthCheck = async () => {
//   try {
//     const healthCheck = await axios.get('https://test-ocn.emobilify.com/health');
//     if (healthCheck.status !== 200) {
//       throw Error('Node NODE_URL not yet healthy');
//     }
//     const wallet = createWallet();
//     await permissions.setServiceRaw('PlateformeBEV', 'plateforme.bev.com', [4], wallet.privateKey);
//     console.log(healthCheck);
//     return healthCheck;
//   } catch (error) {
//     console.error(error);
//   }
// };

// exports.getCredential = async() => {
//    // Register to OCN Node using OCPI credentials module
//    const regRes = await axios.get(`${partyInfo.node}/ocpi/2.2/credentials`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Token ${adminBody.token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       token: tokenB,
//       url: `http://172.16.238.30:${partyInfo.backendPort}/ocpi/versions`,
//       roles: [{
//         party_id: partyInfo.partyID,
//         country_code: partyInfo.countryCode,
//         role: 'CPO',
//         business_details: {
//           name: 'Test CPO',
//         },
//       }],
//     }),
//   });
// };

