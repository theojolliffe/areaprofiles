function adjectify(rank, words, breaks) {
    words[2] = words[2] ? words[2] : '';
    if (rank < breaks[2]) {
        return 'significantly ' + words[0] + ' than';
    } else if (rank < breaks[4]) {
        return 'somewhat ' + words[0] + ' than';
    } else if (rank < breaks[6]) {
        return words[2] + 'close to';
        return 'close to';
    } else if (rank < breaks[8]) {
        return 'somewhat ' + words[1] + ' than';
    } else {
        return 'significantly ' + words[1] + ' than';
    }
}

function plusminus(value, unit, singular = '%') {
    unit = Math.abs(value) === 1 ? singular : unit;
    if (value > 0) {
        return 'an increase of ' + value + unit + ' compared to 2001';
    } else if (value < 0) {
        return 'a decrease of ' + Math.abs(value) + unit + ' compared to 2001'
    }  else if (value < 0) {
        return 'the same as in 2001'
    }
}
	
function countryify(code, pNum, place, _data, countryRank, label) {
    // FINDS RANK OF VARIABLE INPUT 
    let ranks = countryRank; 
    ranks.length = 0;
    function compVariable(a, b, c, d) {
        let vari = place['data'][a][b][c][d];
        let array = [], key;
        for (key in _data) {
            array.push(_data[key]['data'][a][b][c][d]);
        }
        array.sort(function(a, b){return b-a});
        function checkIndex(ind) {
            return ind == vari;
        }
        let varRank = array.findIndex(checkIndex) + 1 
        // If rank is in the bottom half assign negative value
        if (varRank > array.length/2) {
            varRank = varRank-array.length-1
        }
        ranks.push({'label': a+"_"+b+"_"+c+"_"+d, 'value': varRank, 'sqr': Math.pow(varRank, 2), 'sqrt': Math.sqrt(Math.pow(varRank, 2)), 'abVal': place['data'][a][b][c][d]}); 
    }	
    
    let roboFunctions = {
        "population_val_c2011_all": function() {
            // TOTAL POPULATION
            return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " smallest " : " largest ") + "population in the UK, with " + ranks[pNum].abVal.toLocaleString() + " inhabitants."
        }, 
        "population_val_change_all": function() {
            // POPULATION CHANGE
            return "Since 2010, " + place["name"] + " has seen the " + ordinal_suffix_of(ranks[pNum].sqrt) + " largest population " + ((ranks[pNum].value < 0) ? "decrease" : "increase") + " in the UK, with a change of " + ranks[pNum].abVal + "%."
        }, 
        "age_perc_c2011_a65plus": function() {
            // PROPORTION OVER 65
            return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + " highest proportion of residents " + "(" + ranks[pNum].abVal + "%)" + ((ranks[pNum].value < 0) ? " under " : " over ") + "the age of 65 in the UK."
        }, 
        "age_perc_change_a65plus": function() {
            // PROPORTION OVER 65 CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") +  "in the proportion of residents over the age of 65 (" + ranks[pNum].abVal + "%)."
        }, 
        "age_perc_c2011_a015": function() {
            // PROPORTION UNDER 16
            return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of residents " + "(" + ranks[pNum].abVal + "%)" + " under the age of 16 in the UK."
        }, 
        "age_perc_change_a015": function() {
            // PROPORTION UNDER 16 CHANGE
            return place["name"] + " has seen the " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest increase in the proportion of residents " + "(" + ranks[pNum].abVal + "%)" + ((ranks[pNum].value < 0) ? " under " : " over ") + "the age of 16 in the UK."
        }, 
        "medage_val_c2011_median": function() {
          // MEDIAN AGE
            return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "median age " + "(" + ranks[pNum].abVal + ")" + " in the UK."
        }, 
        "medage_val_change_median": function() {
            // MEDIAN AGE CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in residents' median age " + "(" + ranks[pNum].abVal + ")."
        }, 
        "density_val_c2011_density": function() {
            // POPULATION DENSITY
            return place["name"] + " is the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " least " : " most ") + "densely populated part of the UK, with " + ranks[pNum].abVal + " inhabitants per hectare."
        },
        "economic_perc_c2011_unemployed": function() {
            // UNEMPLOYMENT
            return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "rate of unemployment in the UK, with " + ranks[pNum].abVal + "% out of work."
        },
        "economic_perc_change_unemployed": function() {
            // UNEMPLOYMENT CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in rate of unemployment (" + ranks[pNum].abVal + "%)."
        },
        "economic_perc_c2011_student": function() {
            // STUDENTS
            return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of students in the UK, with " + ranks[pNum].abVal + "% currently studying."
        },
        "economic_perc_change_student": function() {
            // STUDENTS CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in the propotion of students (" + ranks[pNum].abVal + "%)."
        },
        "economic_perc_c2011_carer": function() {
            // CARER
            return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of carers in the UK, at " + ranks[pNum].abVal + "%."
        },
        "economic_perc_change_carer": function() {
            // CARER CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in the proportion of carers (" + ranks[pNum].abVal + "%)."
        },
        "economic_perc_c2011_retired": function() {
            // RETIRED
            return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of retirees in the UK (" + ranks[pNum].abVal + "%)."
        },
        "economic_perc_change_retired": function() {
            // RETIRED CHANGE 
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in the proportion of retirees (" + ranks[pNum].abVal + "%)."
        },
        "economic_perc_c2011_inactive": function() {
            // INACTIVE
            return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "rate of economic inactivity in the UK (" + ranks[pNum].abVal + "%)."
        },
        "economic_perc_change_inactive": function() {
            // INACTIVE CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in rate of economic inactivity (" + ranks[pNum].abVal + "%)."
        },
        "ethnicity_perc_c2011_white": function() {
            // ETHNICITY WHITE
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of white residents (" + ranks[pNum].abVal + "%)."
        },
        "ethnicity_perc_change_white": function() {
            // ETHNICITY WHITE CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of white residents (" + ranks[pNum].abVal + "%)."
        },
        "ethnicity_perc_c2011_black": function() {
            // ETHNICITY BLACK
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of black residents (" + ranks[pNum].abVal + "%)."
        },
        "ethnicity_perc_change_black": function() {
            // ETHNICITY BLACK CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of black residents (" + ranks[pNum].abVal + "%)."
        },
        "ethnicity_perc_c2011_asian": function() {
            // ETHNICITY ASIAN
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of asian residents (" + ranks[pNum].abVal + "%)."
        },
        "ethnicity_perc_change_asian": function() {
            // ETHNICITY ASIAN CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of asian residents (" + ranks[pNum].abVal + "%)."
        },
        "ethnicity_perc_c2011_mixed": function() {
            // ETHNICITY MIXED
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of residents with mixed ethnicity (" + ranks[pNum].abVal + "%)."
        },
        "ethnicity_perc_change_mixed": function() {
            // ETHNICITY MIXED CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of residents with mixed ethnicity (" + ranks[pNum].abVal + "%)."
        },
        "socialgrade_perc_c2011_ab": function() {
            // SOCIAL UPPER MIDDLE
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of upper middle class residents (" + ranks[pNum].abVal + "%)."
        },
        "socialgrade_perc_change_ab": function() {
            // SOCIAL UPPER MIDDLE CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of upper middle class residents (" + ranks[pNum].abVal + "%)."
        },
        "socialgrade_perc_c2011_c1": function() {
            // SOCIAL LOWER MIDDLE
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of lower middle class residents (" + ranks[pNum].abVal + "%)."
        },
        "socialgrade_perc_change_c1": function() {
            // SOCIAL LOWER MIDDLE CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of lower middle class residents (" + ranks[pNum].abVal + "%)."
        },
        "socialgrade_perc_c2011_c2": function() {
            // SOCIAL SKILLED WORKER
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of skilled working class residents (" + ranks[pNum].abVal + "%)."
        },
        "socialgrade_perc_change_c2": function() {
            // SOCIAL SKILLED WORKER CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of skilled working class residents (" + ranks[pNum].abVal + "%)."
        },
        "socialgrade_perc_c2011_de": function() {
            // SOCIAL WORKING
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of working class or non-working residents (" + ranks[pNum].abVal + "%)."
        },
        "socialgrade_perc_change_de": function() {
            // SOCIAL WORKING CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of working class or non-working residents (" + ranks[pNum].abVal + "%)."
        },
        "tenure_perc_c2011_owned": function() {
            // TENURE OWNERSHIP
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "rate of home ownership (" + ranks[pNum].abVal + "%)."
        },
        "tenure_perc_change_owned": function() {
            // TENURE OWNERSHIP CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in rate of home ownership (" + ranks[pNum].abVal + "%)."
        },
        "tenure_perc_c2011_rentsocial": function() {
            // TENURE SOCIAL RENT
            return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of social housing (" + ranks[pNum].abVal + "%)."
        },
        "tenure_perc_change_rentsocial": function() {
            // TENURE SOCIAL RENT CHANGE
            return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of social housing (" + ranks[pNum].abVal + "%)."
        }
    };
    for (let key in roboFunctions) {
        if (roboFunctions.hasOwnProperty(key)) {
            compVariable(...key.split("_"));
        }
    }

    ranks.sort(function(a, b) {
            return a.sqr - b.sqr;
    }); 

    label[0] = ranks[pNum].label
    
    roboFunctions[ranks[pNum].label]();
} 

function regionify(code, pNum, place, _data, _regiondata, regionRank, countryRank, label) {
  let altParaStart = 0 
  
  // Get data of places with same region
  let placeregion = _regiondata[code];
  let result = {}, key;
  for (key in _regiondata) {
      if (_regiondata[key]['RGN18CD'] == placeregion["RGN18CD"]) {
         result[key] = _data[key];
      }
  }
  
  // FINDS RANK OF VARIABLE INPUT 
  regionRank.length = 0;
  let ranks = regionRank; 
  function compVariable(a, b, c, d) {
    let vari = place['data'][a][b][c][d];
    let array = []
    for (key in result) {
      array.push(result[key]['data'][a][b][c][d]);
    }
    array.sort(function(a, b){return b-a});
    function checkIndex(ind) {
      return ind == vari;
    }
    let varRank = array.findIndex(checkIndex) + 1 
    // If rank is in the bottom half assign negative value
    if (varRank > array.length/2) {
      varRank = varRank-array.length-1
    }
    ranks.push({'label': a+"_"+b+"_"+c+"_"+d, 'value': varRank, 'sqr': Math.pow(varRank, 2), 'sqrt': Math.sqrt(Math.pow(varRank, 2)), 'abVal': place['data'][a][b][c][d]}); 
  }
  
  // POPULATION
  compVariable('population','val','c2011','all')		
  // POPULATION CHANGE
  compVariable('population','val','change','all')
  // POPULATION 65+
  compVariable('age','perc','c2011','a65plus')
  // POPULATION 65+ CHANGE
  compVariable('age','perc','change','a65plus')
  // POPULATION UNDER 16
  compVariable('age','perc','c2011','a015')
  // POPULATION UNDER 16 CHANGE
  compVariable('age','perc','change','a015')
  // MEDIAN AGE
  compVariable('medage','val','c2011','median')		
  // MEDIAN AGE CHANGE
  compVariable('medage','val','change','median')
  // POPULATION DENSITY
  compVariable('density','val','c2011','density')
  // UNEMPLOYMENT
 compVariable('economic','perc','c2011','unemployed')
  // STUDENTS
  compVariable('economic','perc','c2011','student')
  // CARER
  compVariable('economic','perc','c2011','carer')
  // RETIRED
  compVariable('economic','perc','c2011','retired')
  // ECONOMICALLY INACTIVE
  compVariable('economic','perc','c2011','inactive')
  // UNEMPLOYMENT CHANGE
	compVariable('economic','perc','change','unemployed')
  // STUDENTS CHANGE
  compVariable('economic','perc','change','student')
  // CARER CHANGE
  compVariable('economic','perc','change','carer')
  // RETIRED CHANGE
  compVariable('economic','perc','change','retired')
  // ECONOMICALLY INACTIVE CHANGE
  compVariable('economic','perc','change','inactive')
  // WHITE ETHNICITY 
  compVariable('ethnicity','perc','c2011','white')
  // WHITE ETHNICITY CHANGE
  compVariable('ethnicity','perc','change','white')		
  // BLACK ETHNICITY
  compVariable('ethnicity','perc','c2011','black')
  // BLACK ETHNICITY CHANGE
  compVariable('ethnicity','perc','change','black')
  // ASIAN ETHNICITY 
  compVariable('ethnicity','perc','c2011','asian')
  // ASIAN ETHNICITY CHANGE
  compVariable('ethnicity','perc','change','asian')			
  // MIXED ETHNICITY 
  compVariable('ethnicity','perc','c2011','mixed')
  // MIXED ETHNICITY CHANGE
  compVariable('ethnicity','perc','change','mixed')		
  // SOCIAL CLASS UPPPER MIDDLE *** DATA LOOKS WRONG %s NOT ADDING UP
  compVariable('socialgrade','perc','c2011','ab')
  // SOCIAL CLASS UPPPER MIDDLE CHANGE
  compVariable('socialgrade','perc','change','ab')		
  // SOCIAL CLASS LOWER MIDDLE 
  compVariable('socialgrade','perc','c2011','c1')
  // SOCIAL CLASS LOWER MIDDLE CHANGE
  compVariable('socialgrade','perc','change','c1')		
  // SOCIAL CLASS SKILLED WORKING 
  compVariable('socialgrade','perc','c2011','c2')
  // SOCIAL CLASS SKILLED WORKING CHANGE
  compVariable('socialgrade','perc','change','c2')		
  // SOCIAL CLASS WORKING/NON-WORKING 
  compVariable('socialgrade','perc','c2011','de')
  // SOCIAL CLASS WORKING/NON-WORKING CHANGE
  compVariable('socialgrade','perc','change','de')
  // TENURE OWNERSHIP 
  compVariable('tenure','perc','c2011','owned')
  // TENURE OWNERSHIP CHANGE
  compVariable('tenure','perc','change','owned')	
  // TENURE SOCIAL RENT 
  compVariable('tenure','perc','c2011','rentsocial')
  // TENURE SOCIAL RENT CHANGE
  compVariable('tenure','perc','change','rentsocial')	


  ranks.sort(function(a, b) {
      return a.sqr - b.sqr;
  }); 

	altParaStart = altParaStart + 1
	
	// THIS NEEDS TO BE REVISITED. LOOK AT SLOUGH. DOESN'T TRIGGER REGION RANK WHEN HIGHER THAN NATIONAL BECAUSE OF INDEXING ISSUE
	if (regionRank[pNum]['sqr']<countryRank[pNum]['sqr']){
		label[0] = ranks[pNum].label
	}
  
	if (ranks[pNum].label == "population_val_c2011_all") {
			// TOTAL POPULATION
			return ((pNum==1)? "This area": placeregion["LAD18NM"]) + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " smallest " : " largest ") + "population in " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : " the ") + placeregion["RGN18NM"] + ", with " + ranks[pNum].abVal.toLocaleString() + " inhabitants."
	} 
	else if (ranks[pNum].label == "population_val_change_all") {
			// POPULATION CHANGE
			return "Since 2010, " + ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) + " has seen the " + ordinal_suffix_of(ranks[pNum].sqrt) + " largest population " + ((ranks[pNum].value < 0) ? "decrease" : "increase") + " in " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : " the ") + placeregion["RGN18NM"] + ", with a change of " + ranks[pNum].abVal + "%."
	} 
	else if (ranks[pNum].label == "age_perc_c2011_a65plus") {
			// PROPORTION OVER 65
			return ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of residents " + "(" + ranks[pNum].abVal + "%)" + " over the age of 65 in " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : " the ") + placeregion["RGN18NM"] + "."
	} 
	else if (ranks[pNum].label == "density_val_c2011_density") {
			// POPULATION DENSITY
			return ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) + " is the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " least " : " most ") + "densely populated part of " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : " the ") + placeregion["RGN18NM"] +", with " + ranks[pNum].abVal + " inhabitants per hectare."
	}
	else if (ranks[pNum].label == "age_perc_change_a65plus") {
			// PROPORTION OVER 65 CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen the " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest increase in the proportion of residents " + "(" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)" + ((ranks[pNum].value < 0) ? " under " : " over ") + "the age of 65 in" + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : " the ") + placeregion["RGN18NM"] + "."
	} 
	else if (ranks[pNum].label == "age_perc_c2011_a015") {
			// PROPORTION UNDER 16
			return ((altParaStart%2 == 0)? "This area": placeregion["LAD18NM"]) + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of residents " + "(" + ranks[pNum].abVal + "%)" + " under the age of 16 in" + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : " the ") + placeregion["RGN18NM"] + "."
	} 
	else if (ranks[pNum].label == "age_perc_change_a015") {
			// PROPORTION UNDER 16 CHANGE
			return ((altParaStart%2 == 0)? "This area": placeregion["LAD18NM"]) + " has seen the " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest increase in the proportion of residents " + "(" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)" + ((ranks[pNum].value < 0) ? " under " : " over ") + "the age of 16 in " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : " the ") + placeregion["RGN18NM"] + "."
	} 
	else if (ranks[pNum].label == "medage_val_c2011_median") {
			// MEDIAN AGE
			return ((altParaStart%2 == 0)? "This area": placeregion["LAD18NM"]) + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "median age " + "(" + ranks[pNum].abVal + ")" + " in" + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : " the ") + placeregion["RGN18NM"]
	} 
	else if (ranks[pNum].label == "medage_val_change_median") {
			// MEDIAN AGE CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in residents' median age " + "(" + ranks[pNum].abVal + ")."
	} 
	else if (ranks[pNum].label == "economic_perc_c2011_unemployed") {
			// UNEMPLOYMENT
			return ((altParaStart%2 == 0)? "This area": placeregion["LAD18NM"]) + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "rate of unemployment in " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +", with " + ranks[pNum].abVal + "% out of work."
	}
	else if (ranks[pNum].label == "economic_perc_change_unemployed") {
			// UNEMPLOYMENT CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in rate of unemployment (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "economic_perc_c2011_student") {
			// STUDENTS
			return ((altParaStart%2 == 0)? "This area": placeregion["LAD18NM"]) + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of students in " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +", with " + ranks[pNum].abVal + "% currently studying."
	}
	else if (ranks[pNum].label == "economic_perc_change_student") {
			// STUDENTS CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in the propotion of students (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "economic_perc_c2011_carer") {
			// CARER
			return ((altParaStart%2 == 0)? "This area": placeregion["LAD18NM"]) + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of carers in " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +", at " + ranks[pNum].abVal + "%."
	}
	else if (ranks[pNum].label == "economic_perc_change_carer") {
			// CARER CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in the proportion of carers (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "economic_perc_c2011_retired") {
			// RETIRED
			return ((altParaStart%2 == 0)? "This area": placeregion["LAD18NM"]) + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of retirees in " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +" (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "economic_perc_change_retired") {
			// RETIRED CHANGE 
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in the proportion of retirees (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "economic_perc_c2011_inactive") {
			// INACTIVE
			return ((altParaStart%2 == 0)? "This area": placeregion["LAD18NM"]) + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "rate of economic inactivity in " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +" (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "economic_perc_change_inactive") {
			// INACTIVE CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in rate of economic inactivity (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "ethnicity_perc_c2011_white") {
			// ETHNICITY WHITE
			return ((altParaStart%2 == 0)? "This area": placeregion["LAD18NM"]) + " is the " + " is " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of white residents (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "ethnicity_perc_change_white") {
			// ETHNICITY WHITE CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in proportion of white residents (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "ethnicity_perc_c2011_black") {
			// ETHNICITY BLACK
			return ((altParaStart%2 == 0)? "This": placeregion["LAD18NM"]) + " is the " + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of black residents (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "ethnicity_perc_change_black") {
			// ETHNICITY BLACK CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in proportion of black residents (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "ethnicity_perc_c2011_asian") {
			// ETHNICITY ASIAN
			return ((altParaStart%2 == 0)? "This": placeregion["LAD18NM"]) + " is the " + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of asian residents (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "ethnicity_perc_change_asian") {
			// ETHNICITY ASIAN CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in proportion of asian residents (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "ethnicity_perc_c2011_mixed") {
			// ETHNICITY MIXED
			return ((altParaStart%2 == 0)? "This": placeregion["LAD18NM"]) + " is the " + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of residents with mixed ethnicity (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "ethnicity_perc_change_mixed") {
			// ETHNICITY MIXED CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in proportion of residents with mixed ethnicity (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "socialgrade_perc_c2011_ab") {
			// SOCIAL UPPER MIDDLE
			return ((altParaStart%2 == 0)? "This": placeregion["LAD18NM"]) + " is the " + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of upper middle class residents (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "socialgrade_perc_change_ab") {
			// SOCIAL UPPER MIDDLE CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in proportion of upper middle class residents (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "socialgrade_perc_c2011_c1") {
			// SOCIAL LOWER MIDDLE
			return ((altParaStart%2 == 0)? "This": placeregion["LAD18NM"]) + " is the " + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of lower middle class residents (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "socialgrade_perc_change_c1") {
			// SOCIAL LOWER MIDDLE CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in proportion of lower middle class residents (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "socialgrade_perc_c2011_c2") {
			// SOCIAL SKILLED WORKER
			return ((altParaStart%2 == 0)? "This": placeregion["LAD18NM"]) + " is the " + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of skilled working class residents (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "socialgrade_perc_change_c2") {
			// SOCIAL SKILLED WORKER CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in proportion of skilled working class residents (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "socialgrade_perc_c2011_de") {
			// SOCIAL WORKING
			return ((altParaStart%2 == 0)? "This": placeregion["LAD18NM"]) + " is the " + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of working class or non-working residents (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "socialgrade_perc_change_de") {
			// SOCIAL WORKING CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in proportion of working class or non-working residents (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "tenure_perc_c2011_owned") {
			// TENURE OWNERSHIP
			return ((altParaStart%2 == 0)? "This": placeregion["LAD18NM"]) + " is the " + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "rate of home ownership (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "tenure_perc_change_owned") {
			// TENURE OWNERSHIP CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in rate of home ownership (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "tenure_perc_c2011_rentsocial") {
			// TENURE SOCIAL RENT
			return ((altParaStart%2 == 0)? "This": placeregion["LAD18NM"]) + " is the " + placeregion["RGN18NM"] +" area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of social housing (" + ranks[pNum].abVal + "%)."
	}
	else if (ranks[pNum].label == "tenure_perc_change_rentsocial") {
			// TENURE SOCIAL RENT CHANGE
			return "In the last ten years, "+ ((altParaStart%2 == 0)? "this area": placeregion["LAD18NM"]) +" has seen " + ((placeregion["RGN18NM"] == "London" | placeregion["RGN18NM"] == "Wales") ? "" : "the ") + placeregion["RGN18NM"] +"'s " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? " greatest decrease " : " smallest increase ") : (ranks[pNum].abVal > 0) ? " greatest increase " : " smallest decrease ") + "in proportion of social housing (" + ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%)."
	}	
}
	
function ordinal_suffix_of(i) {
    if (i < 10) {
        return [
            "",
            "",
            "second",
            "third",
            "fourth",
            "fifth",
            "sixth",
            "seventh",
            "eighth",
            "ninth"
        ][i];
    }
    // TODO: check if the remainder of this function is correct
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
	
function getHeadline(place, total, breaks) {
    let content = [
        {
            'rank': place.data.population.rank.change.all,
            'headline': 'Big population rise in ' + place.name,
            'subhead': place.name + ' has seen one of the largest population rises in England and Wales according to Census data.'
        },
        {
            'rank': total - place.data.population.rank.change.all,
            'headline': place.name + '\'s population is shrinking',
            'subhead': place.name + ' is one of the few places in England and Wales where the population is getting smaller according to Census data.'
        },
        {
            'rank': place.data.tenure.rankp.change.owned,
            'headline': 'Home ownership rise in ' + place.name,
            'subhead': place.name + ' is among the few areas in England and Wales to that has seen a rise in home ownership according to Census data.'
        },
        {
            'rank': total - place.data.tenure.rankp.change.owned,
            'headline': 'Big home ownership decline in ' + place.name,
            'subhead': place.name + ' has seen one of the largest declines in home ownership in England and Wales according to Census data.'
        },
        {
            'rank': place.data.medage.rank.change.median,
            'headline': place.name + ' is getting older',
            'subhead': place.name + ' has seen one of the largest rises in avarage age in England and Wales according to Census data.'
        },
        {
            'rank': total - place.data.medage.rank.change.median,
            'headline': place.name + ' is getting younger',
            'subhead': place.name + ' is among the few areas in England and Wales where the average age is declining according to Census data.'
        },
        {
            'rank': total - place.data.ethnicity.rankp.change.white,
            'headline': 'Ethnic diversity rises in ' + place.name,
            'subhead': place.name + ' saw one of the largest BAME population rises in England and Wales according to Census data.'
        }
    ]
    let ranks = content.map(item => item.rank);
    let min = Math.min(...ranks);
    if (min < breaks[0]) {
      let index = ranks.indexOf(min);
        return {
            'headline': content[index].headline,
            'subhead': content[index].subhead
        };
    } else {
        return {
            'headline': 'Latest Census data for ' + place.name,
            'subhead': 'The Office for National Statistics has released Census data for ' + place.name + '.'
        };
    }
}
export { adjectify, plusminus, countryify, regionify, ordinal_suffix_of, getHeadline };
