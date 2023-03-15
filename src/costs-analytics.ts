export interface SolutionOptions {
  readonly title: string
  readonly developmentNRE: number
  readonly masksetNRE?: number
  readonly ipNRE?: number
  readonly packageNRE?: number
  readonly testNRE?: number
  readonly unitCost: number
  readonly lifetimeVolume?: number
}

export class Solution implements SolutionOptions {
  readonly title: string
  readonly developmentNRE: number
  readonly masksetNRE: number
  readonly ipNRE: number
  readonly packageNRE: number
  readonly testNRE: number
  readonly unitCost: number
  readonly lifetimeVolume: number

  constructor(options: SolutionOptions) {
    this.title = options.title
    this.developmentNRE = Math.max(options.developmentNRE, 0)
    this.masksetNRE = Math.max(options.masksetNRE ?? 0, 0)
    this.ipNRE = Math.max(options.ipNRE ?? 0, 0)
    this.packageNRE = Math.max(options.packageNRE ?? 0, 0)
    this.testNRE = Math.max(options.testNRE ?? 0, 0)
    this.unitCost = Math.max(options.unitCost, 0)
    this.lifetimeVolume = Math.max(options.lifetimeVolume ?? 0, 0)
  }

  static from(options: SolutionOptions) {
    return new this(options)
  }

  get isFPGA() {
    return this.developmentNRE + this.ipNRE === this.totalNRE
  }

  get isASIC() {
    return !this.isFPGA
  }

  get totalNRE() {
    return this.developmentNRE + this.masksetNRE + this.ipNRE + this.packageNRE + this.testNRE
  }

  get totalUnitCost() {
    return this.unitCost * this.lifetimeVolume
  }

  get totalProjectCost() {
    return this.totalNRE + this.totalUnitCost
  }
}

export class CostsAnalytics {
  private readonly solutions: readonly Solution[]

  constructor(...solutions: SolutionOptions[]) {
    this.solutions = solutions.map(Solution.from)
  }
}
