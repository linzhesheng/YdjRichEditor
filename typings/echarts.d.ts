

// export as namespace echarts 

// export interface EChartOption {
//     title?: echarts.EChartOption | echarts.EChartOption[]
// }

/// <refrence module="echarts">
type Diff<T extends string, U extends string> = 
  ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

declare namespace echarts {

    interface TitleExtension {
        title?: echarts.EChartTitleOption | echarts.EChartTitleOption[]
      }

    interface EChartOptionNew extends Overwrite<echarts.EChartOption, TitleExtension> {
        axisPointer?: object
    }

    interface ECharts {
        setOption(option: EChartOption | EChartOptionNew, notMerge?: boolean, notRefreshImmediately?: boolean): void
    }
}
