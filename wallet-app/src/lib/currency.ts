/**
 * Currency formatting utilities for Vietnamese Dong (VND)
 */

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatVNDCompact(amount: number): string {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B ₫`;
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M ₫`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K ₫`;
  }
  return `${amount.toLocaleString('vi-VN')} ₫`;
}

export function parseVNDInput(input: string): number {
  // Remove all non-digit characters except decimal point
  const cleaned = input.replace(/[^\d.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

// Convert USD to VND (approximate rate: 1 USD = 24,000 VND)
export function convertUSDToVND(usdAmount: number): number {
  return Math.round(usdAmount * 24000);
}

// Convert VND to USD
export function convertVNDToUSD(vndAmount: number): number {
  return vndAmount / 24000;
}