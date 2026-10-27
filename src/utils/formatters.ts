/**
 * Utility functions for Rupiah and number formatting.
 * Conversion rule: Rp1.000 = 1 Suara
 */

export const RUPIAH_PER_VOTE = 1000;

export function formatRupiah(amount: number): string {
  const integerAmount = Math.max(0, Math.floor(amount || 0));
  return `Rp${integerAmount.toLocaleString('id-ID')}`;
}

export function formatNumber(count: number): string {
  return (count || 0).toLocaleString('id-ID');
}

export function calculatePotentialVotes(balanceRupiah: number): number {
  return Math.floor(Math.max(0, balanceRupiah) / RUPIAH_PER_VOTE);
}

export function calculateSupportCost(votes: number): number {
  return Math.max(0, votes) * RUPIAH_PER_VOTE;
}
