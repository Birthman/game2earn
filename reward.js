// reward.js

function validateXRPLAddress(address) {
  return typeof address === 'string' && address.startsWith('r') && address.length >= 25;
}

function sendRewardToPlayer(address, game = "Unknown Game") {
  if (!validateXRPLAddress(address)) {
    alert("❌ Invalid XRPL address. It should start with 'r' and be at least 25 characters.");
    return;
  }

  // Placeholder logic — Replace this with your XRPL transaction script or API call
  alert(`🎁 Reward from ${game} will be sent to:\n${address}\n\n(Note: This is a placeholder.)`);

  // You can log or store claims like this:
  console.log(`Reward claimed from ${game} for: ${address}`);
}

