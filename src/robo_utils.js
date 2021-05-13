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

    countryRank = ranks
    label[0] = ranks[pNum].label
    
    roboFunctions[ranks[pNum].label]();
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
export { adjectify, plusminus, countryify, ordinal_suffix_of, getHeadline };
