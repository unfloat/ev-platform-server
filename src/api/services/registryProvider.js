const axios = require('axios');
const { Permissions } = require('@shareandcharge/ocn-registry');
const { Registry } = require('@shareandcharge/ocn-registry');
const ethers = require('ethers');

const partyInfo = {
  countryCode: 'FR',
  partyID: 'EVC',
  roles: 'EMSP',
  operator: '0x4174161e7B8f137De780C024D0e988f4039F8C70',
  address: '0x8931B0e6980973c26b77100A9A3afaAf137d5c5E',
  privateKey: 'ca02800b5787322a05af7bfc94445ef67d6249071786ac0deacc508e2b55271e',
  node: 'https://test-ocn.emobilify.com',
  tokenC: '08382f42-3b13-4e49-9d80-0181fda5ebd7',
  backendPort: '3000',
  permission: 'FORWARD_MODULE_LOCATIONS_RECEIVER',
};

const registry = new Registry('volta', partyInfo.privateKey);
const permissions = new Permissions('volta', partyInfo.privateKey);

function createWallet() {
  const wallet = new ethers.Wallet(partyInfo.address);
  console.log(wallet);
  return wallet;

  // Connect a wallet to mainnet
  //   const provider = ethers.getDefaultProvider();
  //   const walletWithProvider = new ethers.Wallet(privateKey, provider);
}


exports.setParty = async () => {
  try {
    // Register to OCN Registry (if not already)
    const party = await registry.getPartyByOcpi(partyInfo.countryCode, partyInfo.partyID);
    console.log('PARTY', party);
    if (!party || party.node.url === '') {
      console.log(party);

      // add party to registry
      // const result = await registry.setPartyRaw(partyInfo.countryCode, partyInfo.partyID, partyInfo.roles, partyInfo.operator, partyInfo.privateKey, partyInfo.operator);
      // console.log(`[${partyInfo.countryCode} ${partyInfo.partyID}] written into OCN Registry with OCN node ${partyInfo.node}`);
    } else {
      console.log(`[${partyInfo.countryCode} ${partyInfo.partyID}] has already registered to OCN Registry. Skipping...`);
    }
  } catch (error) {
    console.error(error);
  }
};

exports.healthCheck = async () => {
  try {
    const healthCheck = await axios.get('https://test-ocn.emobilify.com/health');
    if (healthCheck.status !== 200) {
      throw Error('Node NODE_URL not yet healthy');
    }
    const wallet = createWallet();
    await permissions.setServiceRaw('PlateformeBEV', 'plateforme.bev.com', [4], wallet.privateKey);
    console.log(healthCheck);
    return healthCheck;
  } catch (error) {
    console.error(error);
  }
};

exports.handshake = async () => {
  // Register to OCN Node using OCPI credentials module
  const regRes = await axios.post(`${partyInfo.node}/ocpi/2.2/credentials`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${partyInfo.tokenA}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: partyInfo.tokenA,
      url: `${partyInfo.node}/ocpi/versions`,
      roles: [{
        party_id: partyInfo.partyID,
        country_code: partyInfo.countryCode,
        role: partyInfo.roles,
        business_details: {
          name: 'Plateforme Recharge de Vehicules Electriques',
        },
      }],
    }),
  });

  const tokenC = await regRes.json().data.token;
  console.log(tokenC);
};

