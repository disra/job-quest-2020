const heros = require('../data/hero.json');

const average = heros.map(hero => hero.networth).reduce((x, y) => x + y) / heros.length;
console.log(average);

const averageLevel = heros.map(hero => hero.primary_attribute === "intelligent" ? hero.level : 0).reduce((x, y) => x + y) / heros.length;
console.log(averageLevel);

const mostAssist = Math.max.apply(null, heros.map(hero => hero.assist));
const heroMostAssist = heros.filter(hero => hero.assist === mostAssist);
console.log(heroMostAssist[0].name);

const ratio = heros.map(hero => hero.kill/hero.death);
const heroWithWorstRatio = heros[ratio.indexOf(Math.min(...ratio))].name;
console.log(heroWithWorstRatio);
