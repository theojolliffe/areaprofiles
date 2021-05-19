<script>
  import "../assets/app.bundle.css";
  import "./sixteens_main.css";
  import "./roboto_slab.css";
  import Profile from './Profile.svelte';
  import ONSHeader from './ONSHeader.svelte';
  import ONSFooter from './ONSFooter.svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';
  import TodoSections from './TodoSections.svelte';
  import AreasWithinSelector from './AreasWithinSelector.svelte';
  import KeyStats from './KeyStats.svelte';
  import PrototypeWarning from './PrototypeWarning.svelte';
  import { data, metadata } from './stores.js';
  import Select from './Select.svelte';

  let place, place_name;

  let keyStats = {
      population: 0,
      popIncrease: 0,
      sizeHectares: 0,
      popDensity: 0 
  };
  $: {
      place = $data[selected];
      if (place) {
          console.log(place);
          keyStats = {
              population: place.data.population.val.c2011.all.toLocaleString(),
              popIncrease: Math.floor(place.data.population.val.change.all * place.data.population.val.c2001.all / 100).toLocaleString(),
              sizeHectares: Math.floor(place.data.population.val.c2011.all / place.data.density.val.c2011.density).toLocaleString(),
              popDensity: place.data.density.val.c2011.density.toLocaleString()
          };
      }
      place_name = place?.name || "Place Name";
  };

  let options = [];
  for (const i in $data) {
  	let option = {};
  	option.value = i;
  	option.label = $data[i].name;
  	options.push(option);
  }
  options.sort((a, b) => a.label.localeCompare(b.label, 'en', {ignorePunctuation: true}));
  let selected = "E09000002";

  console.log(selected);
</script>

<style>
:global(body) {
  margin: 0;
  font-family:
		system-ui,
		-apple-system, /* Firefox supports this but not yet `system-ui` */
		'Segoe UI',
		Roboto,
		Helvetica,
		Arial,
		sans-serif,
		'Apple Color Emoji',
		'Segoe UI Emoji';
}
</style>

<ONSHeader></ONSHeader>

    <div class="wrapper" id="top">

    <Breadcrumbs {place_name}></Breadcrumbs>

    <header class="mb-8" >
        <Select {options} bind:selected message='Select a place' />
        <h1 class="mb-1 p-0 text-3xl font-bold">{place_name}</h1>
        <h2 class="mt-0 text-lg">Local Authority
             (LA code...) 
        </h2>
    </header>

    <div class="md:grid gap-4 grid-cols-3 mb-4">
        <div class="col-span-1 mb-6">
            <h2 class="text-base font-bold mb-2">Contents</h2>
            <ul class="m-0 mb-4 p-0 leading-tight">
                
                    <li class="m-0 mb-2 p-0 relative">
                        <span class="absolute">—</span>
                        <a class="pl-8 inline-block" href="#summary">Summary</a>
                    </li>
                
                    <li class="m-0 mb-2 p-0 relative">
                        <span class="absolute">—</span>
                        <a class="pl-8 inline-block" href="#areas-within-yorkshire-and-the-humber">Areas within {place_name}</a>
                    </li>
                
                    <li class="m-0 mb-2 p-0 relative">
                        <span class="absolute">—</span>
                        <a class="pl-8 inline-block" href="#population">Population</a>
                    </li>
                
                    <li class="m-0 mb-2 p-0 relative">
                        <span class="absolute">—</span>
                        <a class="pl-8 inline-block" href="#households">Households</a>
                    </li>
                
                    <li class="m-0 mb-2 p-0 relative">
                        <span class="absolute">—</span>
                        <a class="pl-8 inline-block" href="#housing">Housing</a>
                    </li>
                
                    <li class="m-0 mb-2 p-0 relative">
                        <span class="absolute">—</span>
                        <a class="pl-8 inline-block" href="#economic-activity">Economic Activity</a>
                    </li>
                
                    <li class="m-0 mb-2 p-0 relative">
                        <span class="absolute">—</span>
                        <a class="pl-8 inline-block" href="#education">Education</a>
                    </li>
                
                    <li class="m-0 mb-2 p-0 relative">
                        <span class="absolute">—</span>
                        <a class="pl-8 inline-block" href="#health">Health</a>
                    </li>
                
            </ul>
        </div>
        <div class="col-span-2 mb-6" id="summary">
            <h2 class="text-md font-bold mb-2">Summary</h2>
            <Profile {options} {selected} {place}></Profile>
            <!-- <p>This area profile covers the ... of {place_name} is compiled of data from the 2021 Census.</p>
            <p>The area profile covers areas within Yorkshire and The Humber and topics such as the population, households, housing, economy, education and health. </p>
            <p>The profile also contains all area related datasets.</p> -->
        </div>
    </div>
</div>

<section class="mb-8">
    <div class="wrapper">
<!--        <div data-hello></div>
        <div data-robojournalism></div>
        <div data-chart style="height: 100px; width: 250px"></div>
-->
    </div>
</section>

<KeyStats {keyStats}></KeyStats>

<section class="mb-8">
    <header class="sr-only">
        <h2>Map of {place_name}</h2>
    </header>
    <div class="relative" style="height:650px">
        <div class="absolute bottom-0 md:top-0 left-0 w-full sm:p-4 z-50 md:sticky md:w-1/2 lg:w-1/3">
            <div id="map-overlay" class="hidden relative border-b-1 bg-white p-4 shadow-sm md:shadow-md">
                <button id="map-overlay-close" class="absolute top-3 right-3 icon-close rounded-full bg-white hover:bg-grey4 w-4 h-4 p-4">
                    <span class="sr-only">Close</span>
                </button>
                <div class="mb-4 md:mb-8">
                    <h2 id="map-overlay-title" class="text-lg font-bold pr-8 mb-1 md:mb-2">Area name</h2>
                    <p id="map-overlay-subtitle" class="text-base md:text-md font-normal">Area type</p>
                </div>
                <div class="mb-4 md:mb-8">
                    <ul class="list-none">
                        
                            <li class="p-0 m-0 mb-1 md:mb-2">
                                <h3 class="text-sm font-normal">Resident population as of 2021</h3>
                                <div class="text-md font-bold">162,393</div>
                            </li>
                        
                            <li class="p-0 m-0 mb-1 md:mb-2">
                                <h3 class="text-sm font-normal">Population increase since 2011</h3>
                                <div class="text-md font-bold">2%</div>
                            </li>
                        
                            <li class="p-0 m-0 mb-1 md:mb-2">
                                <h3 class="text-sm font-normal">Total area size (Hectares)</h3>
                                <div class="text-md font-bold">39,234.01</div>
                            </li>
                        
                            <li class="p-0 m-0 mb-1 md:mb-2">
                                <h3 class="text-sm font-normal">Population density (People per hectare)</h3>
                                <div class="text-md font-bold">23.0</div>
                            </li>
                        
                    </ul>
                </div>
                <a id="map-overlay-link" href="/" class="text-base">Explore this area</a>
            </div>
        </div>
        <div class="absolute top-0 bg-grey4 w-full h-full" id="map" data-areaid="E12000003">
            <img src="map-screenshot.png">
        </div>
    </div>
</section>

<AreasWithinSelector></AreasWithinSelector>

<section class="wrapper">
    <div>

    <TodoSections {place}></TodoSections>

</div>
</section>

<ONSFooter></ONSFooter>            
