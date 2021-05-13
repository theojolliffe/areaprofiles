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

    countryRank = ranks
    label[0] = ranks[pNum].label
    
    if (ranks[pNum].label == "population_val_c2011_all") {
        // TOTAL POPULATION
        return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " smallest " : " largest ") + "population in the UK, with " + ranks[pNum].abVal.toLocaleString() + " inhabitants."
    } 
    else if (ranks[pNum].label == "population_val_change_all") {
        // POPULATION CHANGE
        return "Since 2010, " + place["name"] + " has seen the " + ordinal_suffix_of(ranks[pNum].sqrt) + " largest population " + ((ranks[pNum].value < 0) ? "decrease" : "increase") + " in the UK, with a change of " + ranks[pNum].abVal + "%."
    } 
    else if (ranks[pNum].label == "age_perc_c2011_a65plus") {
        // PROPORTION OVER 65
        return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + " highest proportion of residents " + "(" + ranks[pNum].abVal + "%)" + ((ranks[pNum].value < 0) ? " under " : " over ") + "the age of 65 in the UK."
    } 
    else if (ranks[pNum].label == "age_perc_change_a65plus") {
        // PROPORTION OVER 65 CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") +  "in the proportion of residents over the age of 65 (" + ranks[pNum].abVal + "%)."
    } 
    else if (ranks[pNum].label == "age_perc_c2011_a015") {
        // PROPORTION UNDER 16
        return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of residents " + "(" + ranks[pNum].abVal + "%)" + " under the age of 16 in the UK."
    } 
    else if (ranks[pNum].label == "age_perc_change_a015") {
        // PROPORTION UNDER 16 CHANGE
        return place["name"] + " has seen the " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest increase in the proportion of residents " + "(" + ranks[pNum].abVal + "%)" + ((ranks[pNum].value < 0) ? " under " : " over ") + "the age of 16 in the UK."
    } 
    else if (ranks[pNum].label == "medage_val_c2011_median") {
      // MEDIAN AGE
        return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "median age " + "(" + ranks[pNum].abVal + ")" + " in the UK."
    } 
    else if (ranks[pNum].label == "medage_val_change_median") {
        // MEDIAN AGE CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in residents' median age " + "(" + ranks[pNum].abVal + ")."
    } 
    else if (ranks[pNum].label == "density_val_c2011_density") {
        // POPULATION DENSITY
        return place["name"] + " is the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " least " : " most ") + "densely populated part of the UK, with " + ranks[pNum].abVal + " inhabitants per hectare."
    }
    else if (ranks[pNum].label == "economic_perc_c2011_unemployed") {
        // UNEMPLOYMENT
        return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "rate of unemployment in the UK, with " + ranks[pNum].abVal + "% out of work."
    }
    else if (ranks[pNum].label == "economic_perc_change_unemployed") {
        // UNEMPLOYMENT CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in rate of unemployment (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "economic_perc_c2011_student") {
        // STUDENTS
        return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of students in the UK, with " + ranks[pNum].abVal + "% currently studying."
    }
    else if (ranks[pNum].label == "economic_perc_change_student") {
        // STUDENTS CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in the propotion of students (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "economic_perc_c2011_carer") {
        // CARER
        return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of carers in the UK, at " + ranks[pNum].abVal + "%."
    }
    else if (ranks[pNum].label == "economic_perc_change_carer") {
        // CARER CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in the proportion of carers (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "economic_perc_c2011_retired") {
        // RETIRED
        return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of retirees in the UK (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "economic_perc_change_retired") {
        // RETIRED CHANGE 
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in the proportion of retirees (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "economic_perc_c2011_inactive") {
        // INACTIVE
        return place["name"] + " has the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "rate of economic inactivity in the UK (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "economic_perc_change_inactive") {
        // INACTIVE CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in rate of economic inactivity (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "ethnicity_perc_c2011_white") {
        // ETHNICITY WHITE
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of white residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "ethnicity_perc_change_white") {
        // ETHNICITY WHITE CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of white residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "ethnicity_perc_c2011_black") {
        // ETHNICITY BLACK
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of black residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "ethnicity_perc_change_black") {
        // ETHNICITY BLACK CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of black residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "ethnicity_perc_c2011_asian") {
        // ETHNICITY ASIAN
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of asian residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "ethnicity_perc_change_asian") {
        // ETHNICITY ASIAN CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of asian residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "ethnicity_perc_c2011_mixed") {
        // ETHNICITY MIXED
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of residents with mixed ethnicity (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "ethnicity_perc_change_mixed") {
        // ETHNICITY MIXED CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of residents with mixed ethnicity (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "socialgrade_perc_c2011_ab") {
        // SOCIAL UPPER MIDDLE
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of upper middle class residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "socialgrade_perc_change_ab") {
        // SOCIAL UPPER MIDDLE CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of upper middle class residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "socialgrade_perc_c2011_c1") {
        // SOCIAL LOWER MIDDLE
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of lower middle class residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "socialgrade_perc_change_c1") {
        // SOCIAL LOWER MIDDLE CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of lower middle class residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "socialgrade_perc_c2011_c2") {
        // SOCIAL SKILLED WORKER
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of skilled working class residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "socialgrade_perc_change_c2") {
        // SOCIAL SKILLED WORKER CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of skilled working class residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "socialgrade_perc_c2011_de") {
        // SOCIAL WORKING
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of working class or non-working residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "socialgrade_perc_change_de") {
        // SOCIAL WORKING CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of working class or non-working residents (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "tenure_perc_c2011_owned") {
        // TENURE OWNERSHIP
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "rate of home ownership (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "tenure_perc_change_owned") {
        // TENURE OWNERSHIP CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in rate of home ownership (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "tenure_perc_c2011_rentsocial") {
        // TENURE SOCIAL RENT
        return place["name"] + " is the UK area with the " + ordinal_suffix_of(ranks[pNum].sqrt) + ((ranks[pNum].value < 0) ? " lowest " : " highest ") + "proportion of social housing (" + ranks[pNum].abVal + "%)."
    }
    else if (ranks[pNum].label == "tenure_perc_change_rentsocial") {
        // TENURE SOCIAL RENT CHANGE
        return "In the last ten years, " + place["name"] + " has seen the UK's " + ordinal_suffix_of(ranks[pNum].sqrt) + " greatest " + ((ranks[pNum].value < 0) ? " decrease " : " increase ") + "in proportion of social housing (" + ranks[pNum].abVal + "%)."
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
	
export { adjectify, plusminus, countryify, ordinal_suffix_of };
