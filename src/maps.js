const map1 = {
    cords: [],
    completed: 2
};
const map2 = {
    cords: [],
    completed: 596
};
const map3 = {
    cords: [],
    completed: 596
};
const map4 = {
    cords: [],
    completed: 158
};

const generateMap = (map, axis, from, to, numRestAxis) => {
    const countIterations = to - from;
    const getRestAxis = (axis === "x") ? "y" : "x";
    let cords;

    for(let i = 0; i < countIterations; i += 1) {
        cords = { [axis]: from + i, [getRestAxis]: numRestAxis }
        map.cords.push(cords);
    }

    map.completed = map.completed - countIterations;
};

generateMap(map2, "x", 5, 14, 4);
generateMap(map2, "x", 3, 16, 9);
generateMap(map2, "x", 3, 16, 10);
generateMap(map2, "x", 5, 14, 15);

generateMap(map3, "x", 0, 20, 0);
generateMap(map3, "y", 1, 20, 19);
generateMap(map3, "x", 0, 20, 19);
generateMap(map3, "y", 1, 20, 0);
generateMap(map3, "x", 2, 5, 2);
generateMap(map3, "x", 2, 5, 3);
generateMap(map3, "x", 2, 5, 4);
generateMap(map3, "x", 2, 5, 15);
generateMap(map3, "x", 2, 5, 16);
generateMap(map3, "x", 2, 5, 17);
generateMap(map3, "x", 15, 18, 15);
generateMap(map3, "x", 15, 18, 16);
generateMap(map3, "x", 15, 18, 17);
generateMap(map3, "x", 15, 18, 2);
generateMap(map3, "x", 15, 18, 3);
generateMap(map3, "x", 15, 18, 4);

generateMap(map4, "x", 0, 20, 0);
generateMap(map4, "y", 2, 18, 19);
generateMap(map4, "x", 0, 20, 19);
generateMap(map4, "y", 2, 18, 0);
generateMap(map4, "x", 7, 13, 3);
generateMap(map4, "x", 7, 13, 4);
generateMap(map4, "x", 7, 13, 15);
generateMap(map4, "x", 7, 13, 16);
generateMap(map4, "y", 7, 13, 15);
generateMap(map4, "y", 7, 13, 16);
generateMap(map4, "y", 7, 13, 4);
generateMap(map4, "y", 7, 13, 3);
generateMap(map4, "x", 7, 13, 7);
generateMap(map4, "x", 7, 13, 8);
generateMap(map4, "x", 7, 13, 9);
generateMap(map4, "x", 7, 13, 10);
generateMap(map4, "x", 7, 13, 11);
generateMap(map4, "x", 7, 13, 12);

export { map1, map2, map3, map4 };