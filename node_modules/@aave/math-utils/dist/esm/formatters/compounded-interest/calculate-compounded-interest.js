import { valueToZDBigNumber } from '../../bignumber';
import { SECONDS_PER_YEAR } from '../../constants';
import { RAY, rayPow } from '../../ray.math';
export function calculateCompoundedRate({ rate, duration, }) {
    return rayPow(valueToZDBigNumber(rate).dividedBy(SECONDS_PER_YEAR).plus(RAY), duration).minus(RAY);
}
//# sourceMappingURL=calculate-compounded-interest.js.map