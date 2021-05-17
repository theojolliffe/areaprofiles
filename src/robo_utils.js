import { countryify2RoboStrings, regionifyRoboStrings, thirdSenRoboStrings } from './robo_strings.js';
import { formatUnicorn, adjectify, ordinal_suffix_of } from './robo_utils_pure_functions.js';

import countryifyStrings from './robo-strings/countrify-strings.csv';

let countryifyRoboStrings = {};
countryifyStrings.forEach(d => {countryifyRoboStrings[d.varCode] = d.template;});

function countryify(code, pNum, place, _data, countryRank, label) {
    console.log(countryifyStrings);
    function compVariable(a, b, c, d) {
        let vari = place['data'][a][b][c][d];
        let array = [], key;
        for (key in _data) {
            array.push(_data[key]['data'][a][b][c][d]);
        }
        array.sort(function(a, b){return b-a});
        let varRank = array.indexOf(vari) + 1 
        // If rank is in the bottom half assign negative value
        if (varRank > array.length/2) {
            varRank = varRank-array.length-1
        }
        ranks.push({'label': a+"_"+b+"_"+c+"_"+d, 'value': varRank, 'sqr': Math.pow(varRank, 2), 'sqrt': Math.sqrt(Math.pow(varRank, 2)), 'abVal': place['data'][a][b][c][d]}); 
    }	

    let ranks = countryRank; 
    ranks.length = 0;

    for (let key in countryifyRoboStrings) {
        if (countryifyRoboStrings.hasOwnProperty(key)) {
            compVariable(...key.split("_"));
        }
    }

    ranks.sort(function(a, b) {
            return a.sqr - b.sqr;
    }); 

    let rank = ranks[pNum];
    label[0] = rank.label;

    return formatUnicorn(countryifyRoboStrings[rank.label], {
        place_name: place["name"],
        ordinalSuffix: ordinal_suffix_of(rank.sqrt),
        value: rank.value,
        rankIsNegative: rank.value < 0,
        abVal: rank.abVal.toLocaleString()
    });
} 

function countryify2(code, param, pNum, countryRank) {
  var paramRank;
  for (let i in countryRank) {
    if (countryRank[i]['label'] == param) {
      paramRank = countryRank[i]
    }
  }  
  let incDec;
  if (paramRank.value < 0) {
      incDec = paramRank.abVal < 0 ? "greatest decrease": "smallest increase";
  } else {
      incDec = paramRank.abVal > 0 ? "greatest increase": "smallest decrease";
  }
  return formatUnicorn(countryify2RoboStrings[param], {
      ordinalSuffix: ordinal_suffix_of(paramRank.sqrt),
      rankIsNegative: paramRank.value < 0,
      incDec: incDec
  });
}

function regionify(code, pNum, oddNumberedPara, place, _data, _regiondata, regionRank, countryRank, label) {
  // Get data of places with same region
  let placeregion = _regiondata[code];
  let result = {}
  for (let key in _regiondata) {
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
    for (let key in result) {
      array.push(result[key]['data'][a][b][c][d]);
    }
    array.sort(function(a, b){return b-a});
    let varRank = array.indexOf(vari) + 1 
    // If rank is in the bottom half assign negative value
    if (varRank > array.length/2) {
      varRank = varRank-array.length-1
    }
    ranks.push({'label': a+"_"+b+"_"+c+"_"+d, 'value': varRank, 'sqr': Math.pow(varRank, 2), 'sqrt': Math.sqrt(Math.pow(varRank, 2)), 'abVal': place['data'][a][b][c][d]}); 
  }
  
  for (let key in regionifyRoboStrings) {
    if (regionifyRoboStrings.hasOwnProperty(key)) {
        compVariable(...key.split("_"));
    }
  }

  ranks.sort(function(a, b) {
      return a.sqr - b.sqr;
  }); 

	// THIS NEEDS TO BE REVISITED. LOOK AT SLOUGH. DOESN'T TRIGGER REGION RANK WHEN HIGHER THAN NATIONAL BECAUSE OF INDEXING ISSUE
	if (regionRank[pNum]['sqr']<countryRank[pNum]['sqr']){
		label[0] = ranks[pNum].label
	}
  
  return formatUnicorn(regionifyRoboStrings[ranks[pNum].label], {
      ordinalSuffix: ordinal_suffix_of(ranks[pNum].sqrt),
      rankIsNegative: ranks[pNum].value < 0,
      incDec: (ranks[pNum].value < 0) ? ((ranks[pNum].abVal < 0) ? "greatest decrease" : "smallest increase") : (ranks[pNum].abVal > 0) ? "greatest increase" : "smallest decrease",
      abVal: ranks[pNum].abVal.toLocaleString(),
      abValPctChange: ((ranks[pNum].abVal>0)?"+":"") + ranks[pNum].abVal + "%",
      ladName: placeregion["LAD18NM"],
      regionName: placeregion["RGN18NM"],
      firstPara: pNum == 1,
      oddNumberedPara: oddNumberedPara,
      londonOrWales: "{regionName}" == "London" | "{regionName}" == "Wales"
  });
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

function thirdSen(param, pNum, paramArray, place, breaks) {
  let changeSwitch;
  if (paramArray[2]=="change") {
      changeSwitch = "c2011"
  } else if (paramArray[2]=="c2011") {
      changeSwitch = "change"
  }

  let val = place.data[paramArray[0]][paramArray[1]][changeSwitch][paramArray[3]];

  return formatUnicorn(thirdSenRoboStrings[param], {
    val: val,
    absVal: Math.abs(val),
    moreLess: adjectify(place.data[paramArray[0]]['rank'][changeSwitch][paramArray[3]], ['more', 'less'], breaks),
    placeName: place.name,
    valIsNegative: val < 0
  });
}

/////////// PARAGRAPH ////////////
function paragraphify(place, numParagraphs, _data, _regiondata, countryRank, label, breaks) {
    const code = place.code;
    let rankToSkip = 0;
    let paragraphs = [];
    for (let pNum=0; pNum<numParagraphs; pNum++) {
        // TODO: get regionRank in a nicer way
        var regionRank = [];
        let senCountry = countryify(code, pNum+rankToSkip, place, _data, countryRank, label)
        let senRegion = regionify(code, pNum+rankToSkip, pNum % 2 == 1, place, _data, _regiondata, regionRank, countryRank, label)
        let sen3;
        let sen3param;
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
            sen3 = thirdSen(sen3param, pNum, changeTot, place, breaks)
            para = senRegion + countryify2(code, label[0], pNum+rankToSkip, countryRank) + sen3
        }
        // IF NATIONAL RANK IS EQUAL
        else if (regionRank[pNum]['sqr']==countryRank[pNum]['sqr']) {
            if (changeTot[2] == "change") {
                sen3param = changeTot[0] + "_" + changeTot[1] + "_" +  "c2011" + "_" + changeTot[3]
            } else if (changeTot[2] == "c2011") {
                sen3param = changeTot[0] + "_" + changeTot[1] + "_" +  "change" + "_" + changeTot[3]
            }
            sen3 = thirdSen(sen3param, pNum, changeTot, place, breaks)
            para = senCountry + sen3
        }
        if (pNum == 3) {
            console.log("COUNTRY RANK", countryRank)
            console.log("REGION RANK", regionRank)
        }
        paragraphs.push(para);
    }
    
    return paragraphs;
}

export { getHeadline, paragraphify };
