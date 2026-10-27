import assert from 'node:assert';

// 1. Conversion rule: Rp1.000 = 1 Suara
const RUPIAH_PER_VOTE = 1000;
function calculatePotentialVotes(balanceRupiah) {
  return Math.floor(Math.max(0, balanceRupiah) / RUPIAH_PER_VOTE);
}
function calculateSupportCost(votes) {
  return Math.max(0, votes) * RUPIAH_PER_VOTE;
}
function formatRupiah(amount) {
  const integerAmount = Math.max(0, Math.floor(amount || 0));
  return `Rp${integerAmount.toLocaleString('id-ID')}`;
}

// Asserts
assert.strictEqual(calculatePotentialVotes(0), 0, 'Zero balance yields 0 votes');
assert.strictEqual(calculatePotentialVotes(999), 0, 'Sub-1000 balance yields 0 votes');
assert.strictEqual(calculatePotentialVotes(1000), 1, 'Rp1.000 yields 1 vote');
assert.strictEqual(calculatePotentialVotes(50000), 50, 'Rp50.000 yields 50 votes');
assert.strictEqual(calculatePotentialVotes(75500), 75, 'Rp75.500 yields 75 votes without fractional leakage');

assert.strictEqual(calculateSupportCost(1), 1000, '1 vote costs Rp1.000');
assert.strictEqual(calculateSupportCost(25), 25000, '25 votes cost Rp25.000');
assert.strictEqual(calculateSupportCost(100), 100000, '100 votes cost Rp100.000');

assert.strictEqual(formatRupiah(50000), 'Rp50.000', 'Rupiah formatted correctly');
assert.strictEqual(formatRupiah(1000000), 'Rp1.000.000', 'Million Rupiah formatted correctly');

// Simulate state deduction safety: Opening modal or altering count doesn't deduct balance
let balance = 75000;
let teamVotes = 100;
let selectedVotes = 25;
let cost = calculateSupportCost(selectedVotes);

// Changing input
selectedVotes = 50;
cost = calculateSupportCost(selectedVotes);
assert.strictEqual(balance, 75000, 'Balance unchanged during input modification');
assert.strictEqual(teamVotes, 100, 'Team votes unchanged during input modification');

// Confirm action executed
balance -= cost;
teamVotes += selectedVotes;
assert.strictEqual(balance, 25000, 'Balance deducted only after confirmation');
assert.strictEqual(teamVotes, 150, 'Team votes incremented after confirmation');

console.log('✅ ALL LOGIC SELF-CHECKS PASSED SUCCESSFULLY.');
