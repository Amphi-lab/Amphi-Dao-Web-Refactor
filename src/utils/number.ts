import { DefaultPrecision } from "@/contracts/constants";
import BigNumber from "bignumber.js";
BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_DOWN })

type AmountType = 'string' | 'number' | 'format'

export function amountFromToken(token: BigNumber.Value, type: AmountType = 'string', precision: number = DefaultPrecision) {
    // 若直接toString： 0.000000000000000002会显示为2e-18
    if (type === 'string') return new BigNumber(token).shiftedBy(-precision).toFormat().replaceAll(",", "")
    else if (type === 'number') return new BigNumber(token).shiftedBy(-precision).toFormat()
    else if (type === 'format') return new BigNumber(token).shiftedBy(-precision).toNumber()
    else {
        precision = type
        return new BigNumber(token).shiftedBy(-precision).toFormat().replaceAll(",", "")
    }
}
export function amountToToken(amount: BigNumber.Value, type: AmountType = 'string', precision: number = DefaultPrecision) {
    if (type === 'string') return new BigNumber(amount).shiftedBy(precision).toFormat().replaceAll(",", "")
    else if (type === 'number') return new BigNumber(amount).shiftedBy(precision).toNumber()
    else if (type === 'format') return new BigNumber(amount).shiftedBy(precision).toFormat()
    else {
        precision = type
        return new BigNumber(amount).shiftedBy(precision).toFormat().replaceAll(",", "")
    }
}
