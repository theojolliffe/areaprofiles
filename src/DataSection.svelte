<script>
    import { formatUnicorn } from './robo_utils_pure_functions.js';
    import BarChart from './BarChart.svelte';
    import Multiline from './svelte-components/Multiline.svelte';
    import dataSectionConfig from './data-section-config.json';

	import { data } from './stores.js';
	import { regiondata } from './regions.js';

    let colours = ['#27A0CC', '#F66068'];
    let lineChartColours = ['#206095', '#27A0CC', '#871A5B', '#A8BD3A', '#F66068'];

    export let section;
    export let place;
    let sectionConfig;
    let rows;
    let chartData;
    let regionName;

    $: {
        regionName = $regiondata[place.code].RGN18NM;
        console.log('place');
        console.log(place);
        console.log($regiondata);
        console.log(dataSectionConfig[section]);
        sectionConfig = dataSectionConfig[section];
        rows = [...sectionConfig.rows];
        let regionSumAll = {"2001": -1, "2011": -1};
        rows.forEach(row => {
            let regionCode = $regiondata[place.code].RGN18CD;
            console.log(regionCode);
            row.val = place.data[row.var[0]].val.c2011[row.var[1]];
            row.regionSum = {"2001": 0, "2011": 0};
            Object.values($data).forEach(d => {
                if ($regiondata[d.code].RGN18CD === regionCode) {
                    for (let year of ["2001", "2011"]) {
                        row.regionSum[year] += d.data[row.var[0]].val["c"+year][row.var[1]];
                    }
                }
            });
            if (row.var[1] === "all") {
                regionSumAll = row.regionSum;
            }
        });
        rows.forEach(row => {
            row.regionPct = {"2001": row.regionSum["2001"] / regionSumAll["2001"] * 100, "2011": row.regionSum["2011"] / regionSumAll["2011"] * 100};
        });
        console.log(rows);
        chartData = [];
        for (let row of rows) {
            if (!row.inChart) continue;
            chartData.push({variable: row.name, year: 2001, place: place.name, value: place.data[row.var[0]].perc.c2001[row.var[1]]});
            chartData.push({variable: row.name, year: 2011, place: place.name, value: place.data[row.var[0]].perc.c2011[row.var[1]]});
            chartData.push({variable: row.name, year: 2001, place: regionName, value: row.regionPct["2001"]});
            chartData.push({variable: row.name, year: 2011, place: regionName, value: row.regionPct["2011"]});
        }
        let roboData = {name: place.name};
        rows.filter(row => row.hasOwnProperty("roboName"))
            .forEach(row => {
                roboData[row.roboName + 2001] = place.data[row.var[0]].val.c2001[row.var[1]].toLocaleString();
                roboData[row.roboName + 2011] = place.data[row.var[0]].val.c2011[row.var[1]].toLocaleString();
            });
        chartData = {
            data: chartData,
            groups: rows.filter(d => d.inChart).map(d => d.name),
            items: [place.name, regionName],
            years: [2001, 2011],
            colours: colours,
            lineChartColours: lineChartColours,
            roboData
        };
        console.log(chartData);
        console.log({chartData});
    }
</script>

<div class="mb-8">
    <p>
        {formatUnicorn(sectionConfig.roboString, chartData.roboData)}
    </p>
    <table class="mb-4 border-b-2 table-auto text-base leading-loose">
        <thead class="border-grey1 border-b-2">
            <tr>
                <th scope="col" class="h-12 text-left font-bold">{sectionConfig.title}</th>
                <th scope="col" class="h-12 text-right font-normal">Count</th>
                <th scope="col" class="h-12 text-right font-normal" style="width: 10%">%</th>
            </tr>
        </thead>
        <tbody class="border-t-2">
            {#if place}
                {#each rows as row}
                    {#if row.bold}
                        <tr class="h-9 p-0 border-grey1 font-bold border-b">
                            <th scope="row" class="h-9 p-0 text-left font-bold">{row.name}</th>
                            <td class="p-0 td-number">{row.val.toLocaleString()}</td>
                            <td class="p-0 td-object"/>
                        </tr>
                    {:else}
                        <tr class="h-9 p-0 border-grey3 border-b">
                            <td class="p-0 td-string">{row.name}</td>
                            <td class="p-0 td-number">{place.data[row.var[0]].val.c2011[row.var[1]].toLocaleString()}</td>
                            <td class="p-0 td-number">{place.data[row.var[0]].perc.c2011[row.var[1]]}</td>
                        </tr>
                    {/if}
                {/each}
            {/if}
        </tbody>
    </table>

    <BarChart {chartData}></BarChart>
    <div style="width:600px; height:300px">
        <Multiline {chartData}></Multiline>
    </div>
    <a href="#" class="text-base">Download this dataset</a>
</div>
