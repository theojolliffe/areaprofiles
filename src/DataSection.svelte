<script>
    import dataSectionConfig from './data-section-config.json';

	import { data } from './stores.js';
	import { regiondata } from './regions.js';

    export let section;
    export let place;
    let sectionConfig;
    let rows;

    $: {
        console.log('place');
        console.log(place);
        console.log($regiondata);
        console.log(dataSectionConfig[section]);
        sectionConfig = dataSectionConfig[section];
        rows = [...sectionConfig.rows];
        rows.forEach(row => {
            let regionCode = $regiondata[place.code].RGN18CD;
            console.log(regionCode);
            row.val = place.data[row.var[0]].val.c2011[row.var[1]];
            row.regionSum = 0;
            Object.values($data).forEach(d => {
                if ($regiondata[d.code].RGN18CD === regionCode) {
                    row.regionSum += d.data[row.var[0]].val.c2011[row.var[1]];
                }
            });
        });
        console.log(rows);
    }
</script>

<div class="mb-8">
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
    <a href="#" class="text-base">Download this dataset</a>
</div>
