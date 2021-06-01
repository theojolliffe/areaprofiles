import { paragraphify } from './robo_utils.js';


/////////// SECTION ////////////
function sectionify(place, numParagraphs, _data, _regiondata, countryRank, label, breaks) {

    let parag = paragraphify(place, numParagraphs, _data, _regiondata, countryRank, label, breaks)["paragraphs"]
    let topic = paragraphify(place, numParagraphs, _data, _regiondata, countryRank, label, breaks)["topic"]

    return [
        {"parag": parag[0], "section": topic[0]}, 
        {"parag": parag[1], "section": topic[1]},
        {"parag": parag[2], "section": topic[2]},
        {"parag": parag[3], "section": topic[3]},
        {"parag": parag[4], "section": topic[4]},
        {"parag": parag[5], "section": topic[5]},
        {"parag": parag[6], "section": topic[6]},
        {"parag": parag[7], "section": topic[7]},
    ]
    
}

export { sectionify };
