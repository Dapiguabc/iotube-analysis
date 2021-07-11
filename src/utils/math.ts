import BigNumber from "bignumber.js";
export function getTokenAmountBN(
    value: BigNumber,
    decimals: string | number
  ): BigNumber {
    BigNumber.config({ DECIMAL_PLACES: 6, ROUNDING_MODE: BigNumber.ROUND_DOWN });
    let amount = value.dividedBy(new BigNumber(`1e${decimals}`));
    if (value.gt(0) && amount.eq(0)) {
      BigNumber.config({ DECIMAL_PLACES: 4 });
      amount = value.dividedBy(new BigNumber(`1e${decimals}`));
      if (amount.eq(0)) {
        BigNumber.config({ DECIMAL_PLACES: 6 });
        amount = value.dividedBy(new BigNumber(`1e${decimals}`));
      }
      if (amount.eq(0)) {
        BigNumber.config({ DECIMAL_PLACES: 8 });
        amount = value.dividedBy(new BigNumber(`1e${decimals}`));
      }
    }
    return amount;
  }