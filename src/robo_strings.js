const countryifyRoboStrings = {
    // TOTAL POPULATION
    "population_val_c2011_all": "{place_name} has the {ordinalSuffix} {valueIsNegative?smallest:largest} population in the UK, with {abVal} inhabitants.", 
    // POPULATION CHANGE
    "population_val_change_all": "Since 2010, {place_name} has seen the {ordinalSuffix} largest population  {valueIsNegative?decrease:increase}  in the UK, with a change of {abVal}%.", 
    // PROPORTION OVER 65
    "age_perc_c2011_a65plus": "{place_name} has the {ordinalSuffix} highest proportion of residents ({abVal}%) {valueIsNegative?under:over} the age of 65 in the UK.", 
    // PROPORTION OVER 65 CHANGE
    "age_perc_change_a65plus": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest {valueIsNegative?decrease:increase} in the proportion of residents over the age of 65 ({abVal}%).", 
    // PROPORTION UNDER 16
    "age_perc_c2011_a015": "{place_name} has the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of residents ({abVal}%) under the age of 16 in the UK.", 
    // PROPORTION UNDER 16 CHANGE
    "age_perc_change_a015": "{place_name} has seen the {ordinalSuffix} greatest increase in the proportion of residents ({abVal}%) {valueIsNegative?under:over} the age of 16 in the UK.", 
  // MEDIAN AGE
    "medage_val_c2011_median": "{place_name} has the {ordinalSuffix} {valueIsNegative?lowest:highest} median age ({abVal}) in the UK.", 
    // MEDIAN AGE CHANGE
    "medage_val_change_median": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in residents' median age ({abVal}).", 
    // POPULATION DENSITY
    "density_val_c2011_density": "{place_name} is the {ordinalSuffix} {valueIsNegative?least:most} densely populated part of the UK, with {abVal} inhabitants per hectare.",
    // UNEMPLOYMENT
    "economic_perc_c2011_unemployed": "{place_name} has the {ordinalSuffix} {valueIsNegative?lowest:highest} rate of unemployment in the UK, with {abVal}% out of work.",
    // UNEMPLOYMENT CHANGE
    "economic_perc_change_unemployed": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in rate of unemployment ({abVal}%).",
    // STUDENTS
    "economic_perc_c2011_student": "{place_name} has the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of students in the UK, with {abVal}% currently studying.",
    // STUDENTS CHANGE
    "economic_perc_change_student": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in the propotion of students ({abVal}%).",
    // CARER
    "economic_perc_c2011_carer": "{place_name} has the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of carers in the UK, at {abVal}%.",
    // CARER CHANGE
    "economic_perc_change_carer": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in the proportion of carers ({abVal}%).",
    // RETIRED
    "economic_perc_c2011_retired": "{place_name} has the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of retirees in the UK ({abVal}%).",
    // RETIRED CHANGE 
    "economic_perc_change_retired": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in the proportion of retirees ({abVal}%).",
    // INACTIVE
    "economic_perc_c2011_inactive": "{place_name} has the {ordinalSuffix} {valueIsNegative?lowest:highest} rate of economic inactivity in the UK ({abVal}%).",
    // INACTIVE CHANGE
    "economic_perc_change_inactive": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in rate of economic inactivity ({abVal}%).",
    // ETHNICITY WHITE
    "ethnicity_perc_c2011_white": "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of white residents ({abVal}%).",
    // ETHNICITY WHITE CHANGE
    "ethnicity_perc_change_white": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in proportion of white residents ({abVal}%).",
    // ETHNICITY BLACK
    "ethnicity_perc_c2011_black": "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of black residents ({abVal}%).",
    // ETHNICITY BLACK CHANGE
    "ethnicity_perc_change_black": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in proportion of black residents ({abVal}%).",
    // ETHNICITY ASIAN
    "ethnicity_perc_c2011_asian": "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of asian residents ({abVal}%).",
    // ETHNICITY ASIAN CHANGE
    "ethnicity_perc_change_asian": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in proportion of asian residents ({abVal}%).",
    // ETHNICITY MIXED
    "ethnicity_perc_c2011_mixed": "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of residents with mixed ethnicity ({abVal}%).",
    // ETHNICITY MIXED CHANGE
    "ethnicity_perc_change_mixed": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in proportion of residents with mixed ethnicity ({abVal}%).",
    // SOCIAL UPPER MIDDLE
    "socialgrade_perc_c2011_ab": "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of upper middle class residents ({abVal}%).",
    // SOCIAL UPPER MIDDLE CHANGE
    "socialgrade_perc_change_ab": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in proportion of upper middle class residents ({abVal}%).",
    // SOCIAL LOWER MIDDLE
    "socialgrade_perc_c2011_c1": "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of lower middle class residents ({abVal}%).",
    // SOCIAL LOWER MIDDLE CHANGE
    "socialgrade_perc_change_c1": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in proportion of lower middle class residents ({abVal}%).",
    // SOCIAL SKILLED WORKER
    "socialgrade_perc_c2011_c2": "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of skilled working class residents ({abVal}%).",
    // SOCIAL SKILLED WORKER CHANGE
    "socialgrade_perc_change_c2": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in proportion of skilled working class residents ({abVal}%).",
    // SOCIAL WORKING
    "socialgrade_perc_c2011_de": 
        "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of working class or non-working residents ({abVal}%)."
    ,
    // SOCIAL WORKING CHANGE
    "socialgrade_perc_change_de": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in proportion of working class or non-working residents ({abVal}%).",
    // TENURE OWNERSHIP
    "tenure_perc_c2011_owned": "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} rate of home ownership ({abVal}%).",
    // TENURE OWNERSHIP CHANGE
    "tenure_perc_change_owned": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in rate of home ownership ({abVal}%).",
    // TENURE SOCIAL RENT
    "tenure_perc_c2011_rentsocial": "{place_name} is the UK area with the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of social housing ({abVal}%).",
    // TENURE SOCIAL RENT CHANGE
    "tenure_perc_change_rentsocial": "In the last ten years, {place_name} has seen the UK's {ordinalSuffix} greatest  {valueIsNegative?decrease:increase} in proportion of social housing ({abVal}%)."
};

const countryify2RoboStrings = {
    // TOTAL POPULATION
    "population_val_c2011_all": " This makes it the {ordinalSuffix} {valueIsNegative?least:most} populous area in the UK.",
    // POPULATION CHANGE
    "population_val_change_all": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // PROPORTION OVER 65
    "age_perc_c2011_a65plus": " This gives the area the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of over 65s in the UK.",
    // PROPORTION OVER 65 CHANGE
    "age_perc_change_a65plus": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // PROPORTION UNDER 16
    "age_perc_c2011_a015": " This gives the area the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of under 16s in the UK.",
    // PROPORTION UNDER 16 CHANGE
    "age_perc_change_a015": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // MEDIAN AGE
    "medage_val_c2011_median": " and the {ordinalSuffix} {valueIsNegative?youngest:oldest} population in the UK.",
    // MEDIAN AGE CHANGE
    "medage_val_change_median": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // POPULATION DENSITY
    "density_val_c2011_density": " This is the {ordinalSuffix} {valueIsNegative?least:most} densely populated area in the UK.",
    // UNEMPLOYMENT
    "economic_perc_c2011_unemployed": " This is the {ordinalSuffix} {valueIsNegative?lowest:highest} rate of unemployment in the UK.",
    // UNEMPLOYMENT CHANGE
    "economic_perc_change_unemployed": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // STUDENTS
    "economic_perc_c2011_student": " This is the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of students in the UK.",
    // STUDENTS CHANGE
    "economic_perc_change_student": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // CARER
    "economic_perc_c2011_carer": " This is the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of carers in the UK.",
    // CARER CHANGE
    "economic_perc_change_carer": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // RETIRED
    "economic_perc_c2011_retired": " This is the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of retirees in the UK.",
    // RETIRED CHANGE
    "economic_perc_change_retired": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // INACTIVE
    "economic_perc_c2011_inactive": " This is the {ordinalSuffix} {valueIsNegative?lowest:highest} rate of economic inactivity in the UK.",
    // INACTIVE CHANGE
    "economic_perc_change_inactive": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // ETHNICITY WHITE
    "ethnicity_perc_c2011_white": " This is the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of white residents in the UK.",
    // ETHNICITY WHITE CHANGE
    "ethnicity_perc_change_white": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // ETHNICITY BLACK
    "ethnicity_perc_c2011_black": " This is the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of black residents in the UK.",
    // ETHNICITY BLACK CHANGE
    "ethnicity_perc_change_black": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // ETHNICITY ASIAN
    "ethnicity_perc_c2011_asian": " This is the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of Asian residents in the UK.",
    // ETHNICITY ASIAN CHANGE
    "ethnicity_perc_change_asian": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // ETHNICITY MIXED
    "ethnicity_perc_c2011_mixed": " This is the {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of residents with mixed ethnicity in the UK.",
    // ETHNICITY MIXED CHANGE
    "ethnicity_perc_change_mixed": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // SOCIAL UPPER MIDDLE
    "socialgrade_perc_c2011_ab": " This area has the UK's {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of such residents.",
    // SOCIAL UPPER MIDDLE CHANGE
    "socialgrade_perc_change_ab": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // SOCIAL LOWER MIDDLE
    "socialgrade_perc_c2011_c1": " This area has the UK's {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of such residents.",
    // SOCIAL LOWER MIDDLE CHANGE
    "socialgrade_perc_change_c1": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // SOCIAL SKILLED WORKER
    "socialgrade_perc_c2011_c2": " This area has the UK's {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of such residents.",
    // SOCIAL SKILLED WORKER CHANGE
    "socialgrade_perc_change_c2": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // SOCIAL WORKING
    "socialgrade_perc_c2011_de": " This area has the UK's {ordinalSuffix} {valueIsNegative?lowest:highest} proportion of such residents.",
    // SOCIAL WORKING CHANGE
    "socialgrade_perc_change_de": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // TENURE OWNERSHIP
    "tenure_perc_c2011_owned": " This is the UK's {ordinalSuffix} {valueIsNegative?lowest:highest} rate of home ownership.",
    // TENURE OWNERSHIP CHANGE
    "tenure_perc_change_owned": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // TENURE SOCIAL RENT
    "tenure_perc_c2011_rentsocial": " This is the UK's {ordinalSuffix} {valueIsNegative?lowest:highest} rate of social housing.",
    // TENURE SOCIAL RENT CHANGE
    "tenure_perc_change_rentsocial": " This equates to the {ordinalSuffix} {incDec} across the UK."
}

export { countryifyRoboStrings, countryify2RoboStrings };