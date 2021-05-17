const countryify2RoboStrings = {
    // TOTAL POPULATION
    "population_val_c2011_all": " This makes it the {ordinalSuffix} {rankIsNegative?least:most} populous area in the UK.",
    // POPULATION CHANGE
    "population_val_change_all": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // PROPORTION OVER 65
    "age_perc_c2011_a65plus": " This gives the area the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of over 65s in the UK.",
    // PROPORTION OVER 65 CHANGE
    "age_perc_change_a65plus": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // PROPORTION UNDER 16
    "age_perc_c2011_a015": " This gives the area the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of under 16s in the UK.",
    // PROPORTION UNDER 16 CHANGE
    "age_perc_change_a015": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // MEDIAN AGE
    "medage_val_c2011_median": " and the {ordinalSuffix} {rankIsNegative?youngest:oldest} population in the UK.",
    // MEDIAN AGE CHANGE
    "medage_val_change_median": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // POPULATION DENSITY
    "density_val_c2011_density": " This is the {ordinalSuffix} {rankIsNegative?least:most} densely populated area in the UK.",
    // UNEMPLOYMENT
    "economic_perc_c2011_unemployed": " This is the {ordinalSuffix} {rankIsNegative?lowest:highest} rate of unemployment in the UK.",
    // UNEMPLOYMENT CHANGE
    "economic_perc_change_unemployed": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // STUDENTS
    "economic_perc_c2011_student": " This is the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of students in the UK.",
    // STUDENTS CHANGE
    "economic_perc_change_student": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // CARER
    "economic_perc_c2011_carer": " This is the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of carers in the UK.",
    // CARER CHANGE
    "economic_perc_change_carer": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // RETIRED
    "economic_perc_c2011_retired": " This is the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of retirees in the UK.",
    // RETIRED CHANGE
    "economic_perc_change_retired": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // INACTIVE
    "economic_perc_c2011_inactive": " This is the {ordinalSuffix} {rankIsNegative?lowest:highest} rate of economic inactivity in the UK.",
    // INACTIVE CHANGE
    "economic_perc_change_inactive": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // ETHNICITY WHITE
    "ethnicity_perc_c2011_white": " This is the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of white residents in the UK.",
    // ETHNICITY WHITE CHANGE
    "ethnicity_perc_change_white": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // ETHNICITY BLACK
    "ethnicity_perc_c2011_black": " This is the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of black residents in the UK.",
    // ETHNICITY BLACK CHANGE
    "ethnicity_perc_change_black": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // ETHNICITY ASIAN
    "ethnicity_perc_c2011_asian": " This is the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of Asian residents in the UK.",
    // ETHNICITY ASIAN CHANGE
    "ethnicity_perc_change_asian": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // ETHNICITY MIXED
    "ethnicity_perc_c2011_mixed": " This is the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of residents with mixed ethnicity in the UK.",
    // ETHNICITY MIXED CHANGE
    "ethnicity_perc_change_mixed": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // SOCIAL UPPER MIDDLE
    "socialgrade_perc_c2011_ab": " This area has the UK's {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of such residents.",
    // SOCIAL UPPER MIDDLE CHANGE
    "socialgrade_perc_change_ab": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // SOCIAL LOWER MIDDLE
    "socialgrade_perc_c2011_c1": " This area has the UK's {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of such residents.",
    // SOCIAL LOWER MIDDLE CHANGE
    "socialgrade_perc_change_c1": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // SOCIAL SKILLED WORKER
    "socialgrade_perc_c2011_c2": " This area has the UK's {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of such residents.",
    // SOCIAL SKILLED WORKER CHANGE
    "socialgrade_perc_change_c2": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // SOCIAL WORKING
    "socialgrade_perc_c2011_de": " This area has the UK's {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of such residents.",
    // SOCIAL WORKING CHANGE
    "socialgrade_perc_change_de": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // TENURE OWNERSHIP
    "tenure_perc_c2011_owned": " This is the UK's {ordinalSuffix} {rankIsNegative?lowest:highest} rate of home ownership.",
    // TENURE OWNERSHIP CHANGE
    "tenure_perc_change_owned": " This equates to the {ordinalSuffix} {incDec} across the UK.",
    // TENURE SOCIAL RENT
    "tenure_perc_c2011_rentsocial": " This is the UK's {ordinalSuffix} {rankIsNegative?lowest:highest} rate of social housing.",
    // TENURE SOCIAL RENT CHANGE
    "tenure_perc_change_rentsocial": " This equates to the {ordinalSuffix} {incDec} across the UK."
}

const regionifyRoboStrings = {
    // TOTAL POPULATION
    "population_val_c2011_all": "{firstPara?This area:{ladName}} has the {ordinalSuffix} {rankIsNegative?smallest:largest} population in {londonOrWales?: the }{regionName}, with {abVal} inhabitants.",
    // POPULATION CHANGE
    "population_val_change_all": "Since 2010, {oddNumberedPara?this area:{ladName}} has seen the {ordinalSuffix} largest population {rankIsNegative?decrease:increase} in {londonOrWales?: the }{regionName}, with a change of {abVal}%.",
    // PROPORTION OVER 65
    "age_perc_c2011_a65plus": "{oddNumberedPara?this area:{ladName}} has the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of residents ({abVal}%) over the age of 65 in {londonOrWales?: the }{regionName}.",
    // POPULATION DENSITY
    "density_val_c2011_density": "{oddNumberedPara?this area:{ladName}} is the {ordinalSuffix} {rankIsNegative?least:most} densely populated part of {londonOrWales?: the }{regionName}, with {abVal} inhabitants per hectare.",
    // PROPORTION OVER 65 CHANGE
    "age_perc_change_a65plus": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen the {ordinalSuffix} greatest increase in the proportion of residents ({abValPctChange}) {rankIsNegative?under:over} the age of 65 in{londonOrWales?: the }{regionName}.",
    // PROPORTION UNDER 16
    "age_perc_c2011_a015": "{oddNumberedPara?This area:{ladName}} has the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of residents ({abVal}%) under the age of 16 in {londonOrWales?:the }{regionName}.",
    // PROPORTION UNDER 16 CHANGE
    "age_perc_change_a015": "{oddNumberedPara?This area:{ladName}} has seen the {ordinalSuffix} greatest increase in the proportion of residents ({abValPctChange}) {rankIsNegative?under:over} the age of 16 in {londonOrWales?: the }{regionName}.",
    // MEDIAN AGE
    "medage_val_c2011_median": "{oddNumberedPara?This area:{ladName}} has the {ordinalSuffix} {rankIsNegative?lowest:highest} median age ({abVal}) in {londonOrWales?:the }{regionName}",
    // MEDIAN AGE CHANGE
    "medage_val_change_median": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in residents' median age ({abVal}).",
    // UNEMPLOYMENT
    "economic_perc_c2011_unemployed": "{oddNumberedPara?This area:{ladName}} has the {ordinalSuffix} {rankIsNegative?lowest:highest} rate of unemployment in {londonOrWales?:the }{regionName}, with {abVal}% out of work.",
    // UNEMPLOYMENT CHANGE
    "economic_perc_change_unemployed": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in rate of unemployment ({abValPctChange}).",
    // STUDENTS
    "economic_perc_c2011_student": "{oddNumberedPara?This area:{ladName}} has the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of students in {londonOrWales?:the }{regionName}, with {abVal}% currently studying.",
    // STUDENTS CHANGE
    "economic_perc_change_student": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in the propotion of students ({abValPctChange}).",
    // CARER
    "economic_perc_c2011_carer": "{oddNumberedPara?This area:{ladName}} has the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of carers in {londonOrWales?:the }{regionName}, at {abVal}%.",
    // CARER CHANGE
    "economic_perc_change_carer": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in the proportion of carers ({abValPctChange}).",
    // RETIRED
    "economic_perc_c2011_retired": "{oddNumberedPara?This area:{ladName}} has the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of retirees in {londonOrWales?:the }{regionName} ({abVal}%).",
    // RETIRED CHANGE 
    "economic_perc_change_retired": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in the proportion of retirees ({abValPctChange}).",
    // INACTIVE
    "economic_perc_c2011_inactive": "{oddNumberedPara?This area:{ladName}} has the {ordinalSuffix} {rankIsNegative?lowest:highest} rate of economic inactivity in {londonOrWales?:the }{regionName} ({abVal}%).",
    // INACTIVE CHANGE
    "economic_perc_change_inactive": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in rate of economic inactivity ({abValPctChange}).",
    // ETHNICITY WHITE
    "ethnicity_perc_c2011_white": "{oddNumberedPara?This area:{ladName}} is the  is {londonOrWales?:the }{regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of white residents ({abVal}%).",
    // ETHNICITY WHITE CHANGE
    "ethnicity_perc_change_white": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in proportion of white residents ({abValPctChange}).",
    // ETHNICITY BLACK
    "ethnicity_perc_c2011_black": "{oddNumberedPara?This:{ladName}} is the {regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of black residents ({abVal}%).",
    // ETHNICITY BLACK CHANGE
    "ethnicity_perc_change_black": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in proportion of black residents ({abValPctChange}).",
    // ETHNICITY ASIAN
    "ethnicity_perc_c2011_asian": "{oddNumberedPara?This:{ladName}} is the {regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of asian residents ({abVal}%).",
    // ETHNICITY ASIAN CHANGE
    "ethnicity_perc_change_asian": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in proportion of asian residents ({abValPctChange}).",
    // ETHNICITY MIXED
    "ethnicity_perc_c2011_mixed": "{oddNumberedPara?This:{ladName}} is the {regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of residents with mixed ethnicity ({abVal}%).",
    // ETHNICITY MIXED CHANGE
    "ethnicity_perc_change_mixed": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in proportion of residents with mixed ethnicity ({abValPctChange}).",
    // SOCIAL UPPER MIDDLE
    "socialgrade_perc_c2011_ab": "{oddNumberedPara?This:{ladName}} is the {regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of upper middle class residents ({abVal}%).",
    // SOCIAL UPPER MIDDLE CHANGE
    "socialgrade_perc_change_ab": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in proportion of upper middle class residents ({abValPctChange}).",
    // SOCIAL LOWER MIDDLE
    "socialgrade_perc_c2011_c1": "{oddNumberedPara?This:{ladName}} is the {regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of lower middle class residents ({abVal}%).",
    // SOCIAL LOWER MIDDLE CHANGE
    "socialgrade_perc_change_c1": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in proportion of lower middle class residents ({abValPctChange}).",
    // SOCIAL SKILLED WORKER
    "socialgrade_perc_c2011_c2": "{oddNumberedPara?This:{ladName}} is the {regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of skilled working class residents ({abVal}%).",
    // SOCIAL SKILLED WORKER CHANGE
    "socialgrade_perc_change_c2": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in proportion of skilled working class residents ({abValPctChange}).",
    // SOCIAL WORKING
    "socialgrade_perc_c2011_de": "{oddNumberedPara?This:{ladName}} is the {regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of working class or non-working residents ({abVal}%).",
    // SOCIAL WORKING CHANGE
    "socialgrade_perc_change_de": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in proportion of working class or non-working residents ({abValPctChange}).",
    // TENURE OWNERSHIP
    "tenure_perc_c2011_owned": "{oddNumberedPara?This:{ladName}} is the {regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} rate of home ownership ({abVal}%).",
    // TENURE OWNERSHIP CHANGE
    "tenure_perc_change_owned": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in rate of home ownership ({abValPctChange}).",
    // TENURE SOCIAL RENT
    "tenure_perc_c2011_rentsocial": "{oddNumberedPara?This:{ladName}} is the {regionName} area with the {ordinalSuffix} {rankIsNegative?lowest:highest} proportion of social housing ({abVal}%).",
    // TENURE SOCIAL RENT CHANGE
    "tenure_perc_change_rentsocial": "In the last ten years, {oddNumberedPara?this area:{ladName}} has seen {londonOrWales?:the }{regionName}'s {ordinalSuffix} {incDec} in proportion of social housing ({abValPctChange})."
};

const thirdSenRoboStrings = {
    // TOTAL POPULATION
    "population_val_c2011_all": " The current population of {placeName} is {val}; {moreLess} the national average.",
    // POPULATION CHANGE
    "population_val_change_all": " Since the 2001 Census, the population of {placeName} has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across all local authorities.",
    // PROPORTION OVER 65
    "age_perc_c2011_a65plus": " Currently, {val}% of residents here are over the age of 65; {moreLess} the national average.",
    // POPULATION DENSITY
    "density_val_c2011_density": " The current population density here is {val} people per hectare; {moreLess} the national average.",
    "density_val_change_density": "",
    // PROPORTION OVER 65 CHANGE
    "age_perc_change_a65plus": " In the last ten years, the proportion of over 65s here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across all local authorities.",
    // PROPORTION UNDER 16
    "age_perc_c2011_a015": " Currently, {val}% of residents here are under the age of 16; {moreLess} the average across the UK.",
    // PROPORTION UNDER 16 CHANGE
    "age_perc_change_a015": " In the last ten years, the proportion of under 16s here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across the UK.",
    // MEDIAN AGE
    "medage_val_c2011_median": " The current median age of residents here is {val} years old; {moreLess} the national average.",
    // MEDIAN AGE CHANGE
    "medage_val_change_median": " Since the last Census, the median age here has {valIsNegative?decreased:increased} by {absVal} years; {moreLess} the average across all local authorities.",
    // UNEMPLOYMENT
    "economic_perc_c2011_unemployed": " The current rate of unemployment here is {val}%; {moreLess} the national average.",
    // UNEMPLOYMENT CHANGE
    "economic_perc_change_unemployed": " Since the last Census, the rate of unemployment here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the national average.",
    // STUDENTS
    "economic_perc_c2011_student": " Currently, {val}% of residents here are students; {moreLess} the average across the UK.",
    // STUDENTS CHANGE
    "economic_perc_change_student": " In the last ten years, the proportion of students here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across the UK.",
    // CARER
    "economic_perc_c2011_carer": " Currently, {val}% of residents here are carers; {moreLess} the national average.",
    // CARER CHANGE
    "economic_perc_change_carer": " In the last ten years, the proportion of carers here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across the UK.",
    // RETIRED
    "economic_perc_c2011_retired": " Currently, {val}% of residents here are retired; {moreLess} the national average.",
    // RETIRED CHANGE
    "economic_perc_change_retired": " In the last ten years, the proportion of retirees here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across the UK.",
    // INACTIVE
    "economic_perc_c2011_inactive": " The current rate of economic inactivity here is {val}%; {moreLess} the average across the UK.",
    // INACTIVE CHANGE
    "economic_perc_change_inactive": " In the last ten years, the rate of economic inactivity here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across the UK.",
    // ETHNICITY WHITE
    "ethnicity_perc_c2011_white": " Currently, {val}% of residents here are white; {moreLess} the national average.",
    // ETHNICITY WHITE CHANGE
    "ethnicity_perc_change_white": " Since the last Census, the proportion of white residents here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the UK average.",
    // ETHNICITY BLACK
    "ethnicity_perc_c2011_black": " Currently, {val}% of residents here are black; {moreLess} the average across the UK.",
    // ETHNICITY BLACK CHANGE
    "ethnicity_perc_change_black": " In the last ten years, the proportion of black residents here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across the UK.",
    // ETHNICITY ASIAN
    "ethnicity_perc_c2011_asian": " Currently, {val}% of residents here are Asian; {moreLess} the national average.",
    // ETHNICITY ASIAN CHANGE
    "ethnicity_perc_change_asian": " Since the 2001 Census, the proportion of Asian residents here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across all local authorities.",
    // ETHNICITY MIXED
    "ethnicity_perc_c2011_mixed": " Currently, {val}% of residents here are of mixed ethnicity; {moreLess} the national average.",
    // ETHNICITY MIXED CHANGE
    "ethnicity_perc_change_mixed": " In the last ten years, the proportion of residents of mixed ethnicity here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the national average.",
    // SOCIAL UPPER MIDDLE
    "socialgrade_perc_c2011_ab": " The current proportion of upper middle class residents here is {val}%; {moreLess} the average across the UK.",
    // SOCIAL UPPER MIDDLE CHANGE
    "socialgrade_perc_change_ab": " In the last ten years, the proportion of upper middle class residents here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the national average.",
    // SOCIAL LOWER MIDDLE
    "socialgrade_perc_c2011_c1": " The current proportion of lower middle class residents here is {val}%; {moreLess} the average across all local authorities.",
    // SOCIAL LOWER MIDDLE CHANGE
    "socialgrade_perc_change_c1": " In the last ten years, the proportion of lower middle class residents here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the national average.",
    // SOCIAL SKILLED WORKER
    "socialgrade_perc_c2011_c2": " The current proportion of skilled working class residents here is {val}%; {moreLess} the national average.",
    // SOCIAL SKILLED WORKER CHANGE
    "socialgrade_perc_change_c2": " In the last ten years, the amount of skilled working class residents here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across all local authorities",
    // SOCIAL WORKING
    "socialgrade_perc_c2011_de": " The current proportion of working class or non-working residents here is {val}%; {moreLess} the national average.",
    // SOCIAL WORKING CHANGE
    "socialgrade_perc_change_de": " Since the 2001 Census, the proportion of working class or non-working residents here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across all local authorities.",
    // TENURE OWNERSHIP
    "tenure_perc_c2011_owned": " The current rate of home ownership here is {val}%; {moreLess} the average across the UK.",
    // TENURE OWNERSHIP CHANGE
    "tenure_perc_change_owned": " In the last ten years, the rate of home ownership here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the national average.",
    // TENURE SOCIAL RENT
    "tenure_perc_c2011_rentsocial": "Currently, {val}% of residents here live in social housing; {moreLess} the national average.",
    // TENURE SOCIAL RENT CHANGE
    "tenure_perc_change_rentsocial": " In the last ten years, the amount of social housing here has {valIsNegative?decreased:increased} by {absVal}%; {moreLess} the average across all local authorities."
}
    
export { countryify2RoboStrings, regionifyRoboStrings, thirdSenRoboStrings };
