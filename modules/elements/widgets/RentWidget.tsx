/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

const RentWidget: React.FC<Props> = ({
  className,
  chartColor,
  chartHeight
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!chartRef.current) {
        return
      }

      const chart = new ApexCharts(
        chartRef.current,
        chartOptions(chartColor, chartHeight)
      )
      if (chart) {
        chart.render()
      }

      return () => {
        if (chart) {
          chart.destroy()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef])

  return (
    <>
      <div className={`card ${className}`}>
        {/* begin::Body */}
        <div className='card-body'>
          {/* begin::Chart */}
          <div ref={chartRef} className='apexchart' id='chart' />
          {/* end::Chart */}
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}

// begin temp solution
function getDate() {
  let now = new Date()

  let arr2 = []

  for (let i = 0; i < 7; i++, now.setDate(now.getDate() - 1)) {
    let month
    switch (now.getMonth() + 1) {
      case 1:
        month = 'Янв'
        break
      case 2:
        month = 'Фев'
        break
      case 3:
        month = 'Мар'
        break
      case 4:
        month = 'Апр'
        break
      case 5:
        month = 'Май'
        break
      case 6:
        month = 'Июня'
        break
      case 7:
        month = 'Июля'
        break
      case 8:
        month = 'Авг'
        break
      case 9:
        month = 'Сен'
        break
      case 10:
        month = 'Окт'
        break
      case 11:
        month = 'Ноя'
        break
      case 12:
        month = 'Дек'
        break

      default:
        break
    }
    arr2.push(now.getDate() + ' ' + month)
  }
  return arr2
}
const dataRent = {
  money: [30, 40, 150, 90, 90, 70, 160],
  days: getDate().slice().reverse()
}

const dataRent2 = {
  money: [140, 60, 120, 140, 190, 170, 90],
  days: getDate().slice().reverse()
}

const dataRent3 = {
  money: [70, 90, 70, 160, 120, 40, 60],
  days: getDate().slice().reverse()
}
// end

const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  return {
    chart: {
      locales: [{ name: 'ru' }],
      defaultLocale: 'ru',
      fontFamily: 'inherit',
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    series: [
      {
        name: 'Всего',
        data: dataRent.money
      },
      {
        name: 'С действующих рефералов',
        data: dataRent2.money
      },
      {
        name: 'С новых рефералов',
        data: dataRent3.money
      }
    ],
    responsive: [
      {
        breakpoint: 767,
        options: {
          chart: {
            height: 300
          }
        }
      }
    ],

    // dropShadow: {
    //   enabled: true,
    //   top: 0,
    //   left: 0,
    //   blur: 3,
    //   opacity: 0.5
    // },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0,
        stops: [0, 80]
      }
    },
    colors: ['#0094FF', '#7239EA', '#00E396'],
    stroke: {
      curve: 'smooth',
      show: true,
      width: 4
    },
    title: {
      text: 'Начисления по партнерской программе',
      align: 'left',
      margin: 12,
      style: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#2E2F31'
      }
    },
    xaxis: {
      categories: getDate().slice().reverse(),
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        minHeight: 1,
        show: true,

        // datetimeFormatter: {
        //   year: 'yyyy',
        //   month: 'Mmm',
        //   day: 'dd'
        // },
        style: {
          colors: '#a1a5b7',
          fontSize: '12px'
        }
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: '#0094FF',
          width: 1,
          dashArray: 3
        },
        fill: {
          type: 'solid'
        }
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#a1a5b7',
          fontSize: '12px'
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0
        }
      }
    },
    tooltip: {
      x: {
        show: true,
        format: 'dd Mmm yyyy',
        formatter: undefined
      },
      style: {
        fontSize: '12px'
      },
      y: {
        formatter: function (val: any) {
          return val
        }
      }
    },
    legend: {
      show: true,
      horizontalAlign: 'left',
      fontSize: '12px',
      labels: {
        colors: '#2E2F31'
      },
      markers: {
        width: 11,
        height: 11,
        offsetX: 0,
        offsetY: 1
      }
    },
    grid: {
      borderColor: '#eff2f5',
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      strokeColors: ['#0094FF'],
      strokeWidth: 3
    }
  }
}

export default RentWidget
