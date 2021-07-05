const Notary = require('@shareandcharge/ocn-notary').default;

const valuesToSign = {
    headers: {
        "x-correlation-id": "123",

    }
}


async signMessage(headers, params, body) {
    const privkey = ethers.Wallet.createRandom().privateKey;
    const notary = new Notary();
    await notary.sign({
        headers,
        params,
        body,
    }, privkey);
    return notary.serialize();
}

