<script>
    export let ageData;

    import { LayerCake, Svg, Html } from 'layercake';
    import { scaleOrdinal } from 'd3-scale';
  
    import Key from './svelte-components/beeswarm-components/Key.svelte';
    import AxisX from './svelte-components/beeswarm-components/AxisX.svelte';
    import Beeswarm from './svelte-components/beeswarm-components/BeeswarmForce.svelte';
  
    // This example loads csv data as json using @rollup/plugin-dsv
    import data from './data/us-senate.csv';
  
    const xKey = 'age';
    const zKey = 'place';
    const titleKey = 'name';
  
    const r = 6;
  
    const seriesNames = new Set();
    const seriesColors = ['#BFBFBF', '#000', '#2AA0CC'];
  
    const dataTransformed = ageData.map(d => {
      seriesNames.add(d[zKey]);
  
      return {
        [titleKey]: d[titleKey],
        [zKey]: d[zKey],
        [xKey]: d[xKey]
      }
    })

    console.log("BS, data", data)
    console.log("BS, dataTrans", dataTransformed)
    console.log("BS, age data", ageData)

  
  </script>
  
  <style>
    /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
    .chart-container {
      width: 100%;
      height: 100%;
    }
  </style>
  
  <div class='chart-container'>
    <LayerCake
      padding={{bottom: 15}}
      x={xKey}
      z={zKey}
      zScale={scaleOrdinal()}
      zDomain={Array.from(seriesNames)}
      zRange={seriesColors}
      data={ageData}
      custom={{
        getTitle: d => d[titleKey]
      }}
      let:width
    >
  
      <Svg>
        <AxisX/>
        <Beeswarm
          r={width < 400 ? r / 1.25 : r}
          strokeWidth={1}
          xStrength={0.95}
          yStrength={0.075}
        />
      </Svg>
  
      <Html pointerEvents={false}>
        <Key shape='circle' />
      </Html>
  
    </LayerCake>
  </div>