"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCompoundedRate = void 0;
const bignumber_1 = require("../../bignumber");
const constants_1 = require("../../constants");
const ray_math_1 = require("../../ray.math");
function calculateCompoundedRate({ rate, duration, }) {
    return (0, ray_math_1.rayPow)((0, bignumber_1.valueToZDBigNumber)(rate).dividedBy(constants_1.SECONDS_PER_YEAR).plus(ray_math_1.RAY), duration).minus(ray_math_1.RAY);
}
exports.calculateCompoundedRate = calculateCompoundedRate;
//# sourceMappingURL=calculate-compounded-interest.js.map