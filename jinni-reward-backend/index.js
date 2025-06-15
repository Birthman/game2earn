// index.js
const express = require('express');
const xrpl = require('xrpl');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/claim-reward', async (req, res) => {
  const { wallet, game } = req.body;

  if (!wallet || !wallet.startsWith('r') || wallet.length < 25) {
    return res.status(400).json({ error: 'Invalid XRPL wallet address' });
  }

  try {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233"); // Testnet
    await client.connect();

    const walletSender = xrpl.Wallet.fromSeed(process.env.ISSUER_SECRET);

    const tx = {
      TransactionType: "Payment",
      Account: walletSender.classicAddress,
      Destination: wallet,
      Amount: {
        currency: "JINNI",
        value: "100",
        issuer: walletSender.classicAddress
      }
    };

    const prepared = await client.autofill(tx);
    const signed = walletSender.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    await client.disconnect();

    if (result.result.meta.TransactionResult === "tesSUCCESS") {
      return res.json({ success: true, txHash: result.result.hash });
    } else {
      return res.status(500).json({ error: 'Transaction failed', details: result.result.meta });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🪙 Jinni Reward API running on http://localhost:${PORT}`);
});
