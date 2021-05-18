<script>
export let keyStats;

let keyStatsText;

$: keyStatsText = [
    {title: "Resident population as of 2021", val: keyStats.population},
    {title: "Population increase since 2011", val: keyStats.popIncrease},
    {title: "Total area size (Hectares)", val: keyStats.sizeHectares},
    {title: "Population density (People per hectare)", val: keyStats.popDensity}
];
 
</script>
<section id="key-stats">
    <div class="wrapper">
        <header>
            <h2 class="text-md font-bold mb-4">Key statistics</h2>
        </header>
        <div class="mb-8">
            <ul class="list-none divide-y divide-grey3 md:flex md:divide-y-0 md:divide-x md:-ml-4">
                    {#each keyStatsText as item}
                        <li class="p-0 pt-2 mb-2 md:m-0 md:mb-2 md:px-4">
                            <h3 class="text-base font-normal md:mb-2">{item.title}</h3>
                            <div class="text-lg font-bold">{item.val}</div>
                        </li>
                    {/each}
            </ul>
        </div>
    </div>
</section>
