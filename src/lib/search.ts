import data from "./data";

export default async function Search(pokename: string) {
    let charurl = "";
    for (let i of data) {
        if (i.name == pokename) {
            charurl = i.url;
            break;
        }
    }
    if (charurl.length == 0)
        return { status: 400 };

    try {
        let response = await fetch(charurl);
        let data = await response.json();
        let abilitiesArray = data.abilities;
        // console.log(data);
        let ability = [];

        // console.log(data.moves);
        let movesArray = [];
        let height = data.height;

        for (let move of data.moves) {
            movesArray.push(move.move.name);
        }

        for (let entry of abilitiesArray) {
            let obj = {};
            Object.assign(obj, { name: entry.ability.name });
            let abiliUrl = entry.ability.url;
            let res = await fetch(abiliUrl);
            let data = await res.json();
            let describe = data.effect_entries[1].effect;
            Object.assign(obj, { describe: describe });
            ability.push(obj);
        }
        // console.log(height);
        // console.log(movesArray);
        // console.log(ability);

        return new Response(JSON.stringify({ height: height,  movesArray: movesArray, abilities: ability}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}
