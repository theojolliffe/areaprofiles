<script>
	import { adjectify, plusminus, countryify, regionify, ordinal_suffix_of, getHeadline } from './robo_utils.js';
	import Select from './Select.svelte';
	import { data, metadata } from './stores.js';
	import { regiondata } from './regions.js';
	
	console.log($data) 
	
	var countryRank = [];
	
	export let options;
	export let selected;
	export let place;
	
	let total = options.length; 

	let breaks = [];
	for (let i=0; i<10; i++)
		breaks.push(Math.round((i * total) / 10));
	
	
	let rankToSkip = 0;
	
	/////////// PARAGRAPH ////////////
	function paragraphify(code, pNum) {
		
        // TODO: get regionRank in a nicer way
        var regionRank = [];
		let senCountry = countryify(code, pNum+rankToSkip, place, $data, countryRank, label)
		let senRegion = regionify(code, pNum+rankToSkip, place, $data, $regiondata, regionRank, countryRank, label)
		let sen3;
		let sen3param
		let para;
		
		// IS SENTENCE CURRENT TOTAL OR 10 YEAR CHANGE
		// var senTopic = regionRank[pNum+rankToSkip]['label']
	  var changeTot = label[0].split("_")
		// IS NEXT SENTENCE SAME TOPIC AS FIRST
		var senTopicNext = regionRank[pNum+rankToSkip+1]['label']
		var senTopicNextCountry = countryRank[pNum+rankToSkip+1]['label']
	  var changeTotNext = senTopicNext.split("_")
	  var changeTotNextCountry = senTopicNextCountry.split("_")
		// SKIP NEXT SENTENCE IF SAME TOPIC AS FIRST
		if (changeTot[0]+changeTot[1]+changeTot[3] == changeTotNext[0]+changeTotNext[1]+changeTotNext[3]) {
			rankToSkip = rankToSkip+1
		}
		// SKIP NEXT SENTENCE IF SAME TOPIC AS FIRST COUNTRIFIED
		if (changeTot[0]+changeTot[1]+changeTot[3] == changeTotNextCountry[0]+changeTotNextCountry[1]+changeTotNextCountry[3]) {
			rankToSkip = rankToSkip+1
		}
		
		// REGIONAL RANK IS HIGHER THAN NATIONAL:
		if (regionRank[pNum]['sqr']<countryRank[pNum]['sqr']){
			if (changeTot[2] == "change") {
				sen3param = changeTot[0] + "_" + changeTot[1] + "_" +  "c2011" + "_" + changeTot[3]
			} else if (changeTot[2] == "c2011") {
				sen3param = changeTot[0] + "_" + changeTot[1] + "_" +  "change" + "_" + changeTot[3]
			}
			sen3 = thirdSen(sen3param, pNum, changeTot)
			para = senRegion + countryify2(code, label[0], pNum+rankToSkip) + sen3
		}
		// IF NATIONAL RANK IS EQUAL
		else if (regionRank[pNum]['sqr']==countryRank[pNum]['sqr']) {
			if (changeTot[2] == "change") {
				sen3param = changeTot[0] + "_" + changeTot[1] + "_" +  "c2011" + "_" + changeTot[3]
			} else if (changeTot[2] == "c2011") {
				sen3param = changeTot[0] + "_" + changeTot[1] + "_" +  "change" + "_" + changeTot[3]
			}
			sen3 = thirdSen(sen3param, pNum, changeTot)
			para = senCountry + sen3
		}
		if (pNum == 3) {
			console.log("COUNTRY RANK", countryRank)
			console.log("REGION RANK", regionRank)
			rankToSkip = 0;
		}
		
		return para
	}
		
	///////////// THIRD SENTENCE /////////////
	function thirdSen(param, pNum, paramArray) {
		let changeSwitch;
		if (paramArray[2]=="change") {
			changeSwitch = "c2011"
		} else if (paramArray[2]=="c2011") {
			changeSwitch = "change"
		}
		let val = place.data[paramArray[0]][paramArray[1]][changeSwitch][paramArray[3]];
		
		if (param == "population_val_c2011_all") {
				// TOTAL POPULATION
				return " The current population of " + place.name + " is " + val + "; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "population_val_change_all") {
				// POPULATION CHANGE
				return " Since the 2001 Census, the population of "+ place.name + " has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across all local authorities."
		}
		else if (param == "age_perc_c2011_a65plus") {
				// PROPORTION OVER 65
				return " Currently, " + val + "% of residents here are over the age of 65; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "density_val_c2011_density") {
				// POPULATION DENSITY
				return " The current population density here is " + val + " people per hectare; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "density_val_change_density") {
				return ""
		}
		else if (param == "age_perc_change_a65plus") {
				// PROPORTION OVER 65 CHANGE
				return " In the last ten years, the proportion of over 65s here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across all local authorities."
		}
		else if (param == "age_perc_c2011_a015") {
				// PROPORTION UNDER 16
				return " Currently, " + val + "% of residents here are under the age of 16; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "age_perc_change_a015") {
				// PROPORTION UNDER 16 CHANGE
				return " In the last ten years, the proportion of under 16s here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "medage_val_c2011_median") {
				// MEDIAN AGE
				return " The current median age of residents here is " + val + " years old; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "medage_val_change_median") {
				// MEDIAN AGE CHANGE
				return " Since the last Census, the median age here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + " years; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across all local authorities."
		}
		else if (param == "economic_perc_c2011_unemployed") {
				// UNEMPLOYMENT
				return " The current rate of unemployment here is " + val + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "economic_perc_change_unemployed") {
				// UNEMPLOYMENT CHANGE
				return " Since the last Census, the rate of unemployment here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "economic_perc_c2011_student") {
				// STUDENTS
				return " Currently, " + val + "% of residents here are students; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "economic_perc_change_student") {
				// STUDENTS CHANGE
				return " In the last ten years, the proportion of students here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "economic_perc_c2011_carer") {
				// CARER
				return " Currently, " + val + "% of residents here are carers; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "economic_perc_change_carer") {
				// CARER CHANGE
				return " In the last ten years, the proportion of carers here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "economic_perc_c2011_retired") {
				// RETIRED
				return " Currently, " + val + "% of residents here are retired; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "economic_perc_change_retired") {
				// RETIRED CHANGE
				return " In the last ten years, the proportion of retirees here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "economic_perc_c2011_inactive") {
				// INACTIVE
				return " The current rate of economic inactivity here is " + val + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "economic_perc_change_inactive") {
				// INACTIVE CHANGE
				return " In the last ten years, the rate of economic inactivity here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "ethnicity_perc_c2011_white") {
				// ETHNICITY WHITE
				return " Currently, " + val + "% of residents here are white; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "ethnicity_perc_change_white") {
				// ETHNICITY WHITE CHANGE
				return " Since the last Census, the proportion of white residents here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the UK average."
		}
		else if (param == "ethnicity_perc_c2011_black") {
				// ETHNICITY BLACK
				return " Currently, " + val + "% of residents here are black; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "ethnicity_perc_change_black") {
				// ETHNICITY BLACK CHANGE
				return " In the last ten years, the proportion of black residents here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "ethnicity_perc_c2011_asian") {
				// ETHNICITY ASIAN
				return " Currently, " + val + "% of residents here are Asian; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "ethnicity_perc_change_asian") {
				// ETHNICITY ASIAN CHANGE
				return " Since the 2001 Census, the proportion of Asian residents here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across all local authorities."
		}
		else if (param == "ethnicity_perc_c2011_mixed") {
				// ETHNICITY MIXED
				return " Currently, " + val + "% of residents here are of mixed ethnicity; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "ethnicity_perc_change_mixed") {
				// ETHNICITY MIXED CHANGE
				return " In the last ten years, the proportion of residents of mixed ethnicity here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "socialgrade_perc_c2011_ab") {
				// SOCIAL UPPER MIDDLE
				return " The current proportion of upper middle class residents here is " + val + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "socialgrade_perc_change_ab") {
				// SOCIAL UPPER MIDDLE CHANGE
				return " In the last ten years, the proportion of upper middle class residents here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "socialgrade_perc_c2011_c1") {
				// SOCIAL LOWER MIDDLE
				return " The current proportion of lower middle class residents here is " + val + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across all local authorities."
		}
		else if (param == "socialgrade_perc_change_c1") {
				// SOCIAL LOWER MIDDLE CHANGE
				return " In the last ten years, the proportion of lower middle class residents here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "socialgrade_perc_c2011_c2") {
				// SOCIAL SKILLED WORKER
				return " The current proportion of skilled working class residents here is " + val + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "socialgrade_perc_change_c2") {
				// SOCIAL SKILLED WORKER CHANGE
				return " In the last ten years, the amount of skilled working class residents here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across all local authorities"
		}	
		else if (param == "socialgrade_perc_c2011_de") {
				// SOCIAL WORKING
				return " The current proportion of working class or non-working residents here is " + val + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "socialgrade_perc_change_de") {
				// SOCIAL WORKING CHANGE
				return " Since the 2001 Census, the proportion of working class or non-working residents here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across all local authorities."
		}
		else if (param == "tenure_perc_c2011_owned") {
				// TENURE OWNERSHIP
				return " The current rate of home ownership here is " + val + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across the UK."
		}
		else if (param == "tenure_perc_change_owned") {
				// TENURE OWNERSHIP CHANGE
				return " In the last ten years, the rate of home ownership here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "tenure_perc_c2011_rentsocial") {
				// TENURE SOCIAL RENT
				return "Currently, " + val + "% of residents here live in social housing; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the national average."
		}
		else if (param == "tenure_perc_change_rentsocial") {
				// TENURE SOCIAL RENT CHANGE
				return " In the last ten years, the amount of social housing here has" + ((val < 0) ? " decreased by " : " increased by ") + Math.abs(val) + "%; " + adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks) + " the average across all local authorities."
		}
		
	}
	
	// TODO label is just a string in an array.  Do something nicer.
	let label = [""];
	/////////// COUNTRY DATA ////////////
	
/////////// SENTENCE 2 COUNTRY ////////////
function countryify2(code, param, pNum) {
  var paramRank;
  for (let i in countryRank) {
    if (countryRank[i]['label'] == param) {
      paramRank = countryRank[i]
    }
  }  
	if (param == "population_val_c2011_all") {
			// TOTAL POPULATION
			return " This makes it the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " least " : " most ") + "populous area in the UK."
		}
		else if (param == "population_val_change_all") {
			// POPULATION CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "age_perc_c2011_a65plus") {
			// PROPORTION OVER 65
			return " This gives the area the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of over 65s in the UK."
		}
		else if (param == "age_perc_change_a65plus") {
			// PROPORTION OVER 65 CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "age_perc_c2011_a015") {
			// PROPORTION UNDER 16
			return" This gives the area the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of under 16s in the UK."
		}
		else if (param == "age_perc_change_a015") {
			// PROPORTION UNDER 16 CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "medage_val_c2011_median") {
			// MEDIAN AGE
			return " and the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " youngest " : " oldest ") + "population in the UK."
		}
		else if (param == "medage_val_change_median") {
			// MEDIAN AGE CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "density_val_c2011_density") {
			// POPULATION DENSITY
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " least " : " most ") + "densely populated area in the UK."
		}
		else if (param == "economic_perc_c2011_unemployed") {
			// UNEMPLOYMENT
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "rate of unemployment in the UK."
		}
		else if (param == "economic_perc_change_unemployed") {
			// UNEMPLOYMENT CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "economic_perc_c2011_student") {
			// STUDENTS
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of students in the UK."
		}
		else if (param == "economic_perc_change_student") {
			// STUDENTS CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "economic_perc_c2011_carer") {
			// CARER
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of carers in the UK."
		}
		else if (param == "economic_perc_change_carer") {
			// CARER CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "economic_perc_c2011_retired") {
			// RETIRED
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of retirees in the UK."
		}
		else if (param == "economic_perc_change_retired") {
			// RETIRED CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "economic_perc_c2011_inactive") {
			// INACTIVE
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "rate of economic inactivity in the UK."
		}
		else if (param == "economic_perc_change_inactive") {
			// INACTIVE CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "ethnicity_perc_c2011_white") {
			// ETHNICITY WHITE
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of white residents in the UK."
		}
		else if (param == "ethnicity_perc_change_white") {
			// ETHNICITY WHITE CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "ethnicity_perc_c2011_black") {
			// ETHNICITY BLACK
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of black residents in the UK."
		}
		else if (param == "ethnicity_perc_change_black") {
			// ETHNICITY BLACK CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "ethnicity_perc_c2011_asian") {
			// ETHNICITY ASIAN
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of Asian residents in the UK."
		}
		else if (param == "ethnicity_perc_change_asian") {
			// ETHNICITY ASIAN CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "ethnicity_perc_c2011_mixed") {
			// ETHNICITY MIXED
			return " This is the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of residents with mixed ethnicity in the UK."
		}
		else if (param == "ethnicity_perc_change_mixed") {
			// ETHNICITY MIXED CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "socialgrade_perc_c2011_ab") {
			// SOCIAL UPPER MIDDLE
			return " This area has the UK's " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of such residents."
		}
		else if (param == "socialgrade_perc_change_ab") {
			// SOCIAL UPPER MIDDLE CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "socialgrade_perc_c2011_c1") {
			// SOCIAL LOWER MIDDLE
			return " This area has the UK's " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of such residents."
		}
		else if (param == "socialgrade_perc_change_c1") {
			// SOCIAL LOWER MIDDLE CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "socialgrade_perc_c2011_c2") {
			// SOCIAL SKILLED WORKER
			return " This area has the UK's " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of such residents."
		}
		else if (param == "socialgrade_perc_change_c2") {
			// SOCIAL SKILLED WORKER CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "socialgrade_perc_c2011_de") {
			// SOCIAL WORKING
			return " This area has the UK's " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "proportion of such residents."
		}
		else if (param == "socialgrade_perc_change_de") {
			// SOCIAL WORKING CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "tenure_perc_c2011_owned") {
			// TENURE OWNERSHIP
			return " This is the UK's " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "rate of home ownership."
		}
		else if (param == "tenure_perc_change_owned") {
			// TENURE OWNERSHIP CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
		else if (param == "tenure_perc_c2011_rentsocial") {
			// TENURE SOCIAL RENT
			return " This is the UK's " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? " lowest " : " highest ") + "rate of social housing."
		}
		else if (param == "tenure_perc_change_rentsocial") {
			// TENURE SOCIAL RENT CHANGE
			return " This equates to the " + ordinal_suffix_of(paramRank.sqrt) + ((paramRank.value < 0) ? ((paramRank.abVal < 0) ? " greatest decrease " : " smallest increase ") : (paramRank.abVal > 0) ? " greatest increase " : " smallest decrease ") + "across the UK."
		}
}	

/////////// REGION DATA ////////////
</script>

<style>
</style>

{#if selected != null}
<h1 style="color:red">This is a prototype using old data, and might not be accurate</h1>
<h2>{getHeadline(place, total, breaks).headline}</h2>
<p>
	<strong>{getHeadline(place, total, breaks).subhead}</strong>
</p>
<p>
	{paragraphify(place.code, 0)}
</p>
<p>
	{paragraphify(place.code, 1)}
</p>
<p>
	{paragraphify(place.code, 2)}
</p>
<p>
	{paragraphify(place.code, 3)}
</p>
{:else}
<p>
	This demo illustrates different ways of presenting local authority level data from the 2011 Census and how it changed from 2001, making use of robo-journalism and automation techniques.
</p>
<p>
	<strong>Select a place from the dropdown above to get started, and click on the tabs to explore different kinds of outputs.</strong>
</p>
{/if}
