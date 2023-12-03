import type { RequestHandler } from './$types';
import {error, json} from "@sveltejs/kit";
import Fuse from "fuse.js";
const datasets = import.meta.glob('$lib/datasets/*.geojson', { as: 'raw' });

export const POST = (async ({ request }) => {
    // extract the message for the TTS request
    const { skola, obor } = await request.json();

    console.log(`Searching for ${skola} ${obor}`);
    
    const datasetEntries = await Promise.all(Object.entries(datasets).map(async ([path, dataset]) => {
        const datasetJson = await dataset();
        const datasetObject = JSON.parse(datasetJson);
        const featureProperties = Object.keys(datasetObject.features[0].properties);
        // fuzzy search for skola and obor
        const fuse = new Fuse(datasetObject.features, {
            threshold: 0.4,
            keys: ['properties.nazev', 'properties.nazev_studijniho_oboru', 'properties.nazev_studijního_programu']
        });

        const searchResult = fuse.search({
            $and: [
                { 'properties.nazev': skola },
                {
                    $or: [
                        { 'properties.nazev_studijniho_oboru': obor },
                        { 'properties.nazev_studijního_programu': obor }
                    ]
                }
            ]
        })
        return searchResult[0]?.item;
    }));
    
    console.log("finished search");
    console.log(datasetEntries);

    if (datasetEntries.length === 0) {
        console.log('No dataset entries found');
        return error(500, 'Žádná ze zvolených škol neexistuje.');
    }

    // get first entry that is not undefined
    const firstEntry = datasetEntries.find((entry) => entry !== undefined);
    console.log(firstEntry);

    return json(firstEntry);
}) satisfies RequestHandler;