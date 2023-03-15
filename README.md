# FPGA and ASIC costs analytics

## Equation

$\text{Total Unit Cost} = \text{Unit Cost} * \text{Lifetime Volume}$

$\text{ASIC NRE} = \text{Maskset NRE} + \text{IP NRE} + \text{Package NRE} + \text{Test NRE}$

$\text{FPGA NRE} = \text{IP NRE}$

$\text{Total NRE} = \text{Development NRE} + \text{ASIC/FPGA NRE} + \text{Total Unit Cost}$

$\text{Total Project Cost} = \text{Total NRE} + \text{Total Unit Cost}$

ASIC NRE cost:

- $Development NRE$ – cost of the ASIC development efforts (engineers and EDA tools)
- $Maskset NRE$ – cost of maskset and MPW required for wafer production
- $IP NRE$ – total cost of all IPs needed for the ASIC (for example: PLL, A/D, SERDES, etc)
- $Package NRE$ – cost of package design and tooling
- $Test NRE$ – the cost of the test solution (wafer sort, final test).
- $Unit Cost$ – cost of the ASIC unit in production
- $Lifetime Volume$ – the number of ASICs you plan to produce over the entire project lifetime

FPGA NRE cost:

- $Development NRE$ – cost of the FPGA development efforts (engineers)
- $IP NRE$ – total cost of all IPs needed for the FPGA (for example: HDLC, Video Compression etc)
- $Unit Cost$ – cost of the FPGA unit in production
- $Lifetime Volume$ – the number of FPGAs you plan to produce over the entire project lifetime

## References

- <https://hardwarebee.com/fpga-vs-asic-calculator/>
- <https://anysilicon.com/fpga-vs-asic-choose/>
- <https://numato.com/blog/differences-between-fpga-and-asics/>
