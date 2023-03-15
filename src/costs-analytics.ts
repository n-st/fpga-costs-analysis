import { Decimal } from 'decimal.js'

export interface SolutionOptions {
  readonly title: string
  readonly developmentNRE: Decimal.Value
  readonly masksetNRE?: Decimal.Value
  readonly ipNRE?: Decimal.Value
  readonly packageNRE?: Decimal.Value
  readonly testNRE?: Decimal.Value
  readonly unitCost: Decimal.Value
  readonly price?: Decimal.Value
}

export class Solution implements SolutionOptions {
  readonly title: string
  readonly developmentNRE: Decimal
  readonly masksetNRE: Decimal
  readonly ipNRE: Decimal
  readonly packageNRE: Decimal
  readonly testNRE: Decimal
  readonly unitCost: Decimal
  readonly price: Decimal

  constructor(options: SolutionOptions) {
    this.title = options.title
    this.developmentNRE = Decimal.max(options.developmentNRE, 0)
    this.masksetNRE = Decimal.max(options.masksetNRE ?? 0, 0)
    this.ipNRE = Decimal.max(options.ipNRE ?? 0, 0)
    this.packageNRE = Decimal.max(options.packageNRE ?? 0, 0)
    this.testNRE = Decimal.max(options.testNRE ?? 0, 0)
    this.unitCost = Decimal.max(options.unitCost, 0)
    this.price = Decimal.max(options.price ?? 0, this.unitCost)
    Object.freeze(this)
  }

  static from(options: Solution | SolutionOptions): Solution {
    if (options instanceof this) return options
    return new this(options)
  }

  isFPGA() {
    return this.ipNRE.equals(this.productionNRE)
  }

  isASIC() {
    return !this.isFPGA()
  }

  get productionNRE() {
    return this.masksetNRE.add(this.ipNRE).add(this.packageNRE).add(this.testNRE)
  }

  get profit() {
    return this.price.minus(this.unitCost)
  }

  get totalNRE() {
    return this.developmentNRE.add(this.productionNRE)
  }

  getTotalUnitCost(lifetimeVolume: Decimal.Value) {
    return this.unitCost.mul(lifetimeVolume)
  }

  getTotalNetProfit(lifetimeVolume: Decimal.Value) {
    return this.profit.mul(lifetimeVolume)
  }

  getTotalProjectCost(lifetimeVolume: Decimal.Value) {
    return this.totalNRE.add(this.getTotalUnitCost(lifetimeVolume))
  }

  getCostEffectiveVolume(target: Solution) {
    // Equation: Total^{NRE}_a + (UnitCost_a * n) = Total^{NRE}_b + (UnitCost_b * n)
    const totalNRE = this.totalNRE.add(target.totalNRE)
    const unitCost = this.unitCost.add(target.unitCost)
    return totalNRE.div(unitCost)
  }
}

Object.freeze(Solution)
Object.freeze(Solution.prototype)
