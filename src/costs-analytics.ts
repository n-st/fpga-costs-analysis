import { Decimal } from 'decimal.js'

export interface SolutionOptions {
  readonly title: string
  readonly developmentNRE: Decimal.Value
  readonly masksetNRE?: Decimal.Value
  readonly ipNRE?: Decimal.Value
  readonly packageNRE?: Decimal.Value
  readonly testNRE?: Decimal.Value
  readonly unitCost: Decimal.Value
  readonly lifetimeVolume?: Decimal.Value
}

export class Solution implements SolutionOptions {
  readonly title: string
  readonly developmentNRE: Decimal
  readonly masksetNRE: Decimal
  readonly ipNRE: Decimal
  readonly packageNRE: Decimal
  readonly testNRE: Decimal
  readonly unitCost: Decimal
  readonly lifetimeVolume: Decimal

  constructor(options: SolutionOptions) {
    this.title = options.title
    this.developmentNRE = Decimal.max(options.developmentNRE, 0)
    this.masksetNRE = Decimal.max(options.masksetNRE ?? 0, 0)
    this.ipNRE = Decimal.max(options.ipNRE ?? 0, 0)
    this.packageNRE = Decimal.max(options.packageNRE ?? 0, 0)
    this.testNRE = Decimal.max(options.testNRE ?? 0, 0)
    this.unitCost = Decimal.max(options.unitCost, 0)
    this.lifetimeVolume = Decimal.max(options.lifetimeVolume ?? 0, 0)
    Object.freeze(this)
  }

  static from(options: Solution | SolutionOptions): Solution {
    if (options instanceof this) return options
    return new this(options)
  }

  isFPGA() {
    return this.ipNRE.equals(this.getProductionNRE())
  }

  isASIC() {
    return !this.isFPGA()
  }

  getProductionNRE() {
    return this.masksetNRE.add(this.ipNRE).add(this.packageNRE).add(this.testNRE)
  }

  getTotalNRE() {
    return this.developmentNRE.add(this.getProductionNRE())
  }

  getTotalUnitCost(lifetimeVolume: Decimal.Value = this.lifetimeVolume) {
    return this.unitCost.mul(lifetimeVolume)
  }

  getTotalProjectCost(lifetimeVolume?: Decimal.Value) {
    return this.getTotalNRE().add(this.getTotalUnitCost(lifetimeVolume))
  }

  getCriticalLifetimeVolume(target: Solution) {
    const totalNRE = Decimal.max(this.getTotalNRE().div(this.unitCost), target.getTotalNRE().div(this.unitCost))
    // (1.5 * 1000000) / 8
    // const unitCostRate = Math.abs(this.unitCost / target.unitCost)
    // return totalNRE / unitCostRate
  }
}
