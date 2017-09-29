import { Item, Shop } from './gilded_rose';

const items = [];

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));
// this conjured item does not work properly yet
items.push(new Item('Conjured Mana Cake', 3, 6));

items.push(new Item('new item 1', 1, 49));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20));
items.push(new Item('Aged Brie', -2, 20));





const gildedRose = new Shop(items);

export const dayzero = gildedRose.items.map(x=> ({name:x.name, sellIn:x.sellIn, quality:x.quality}));

gildedRose.updateQuality();

export const dayone = gildedRose.items.map(x=> ({name:x.name, sellIn:x.sellIn, quality:x.quality}));

gildedRose.updateQuality();

export const daytwo = gildedRose.items.map(x=> ({name:x.name, sellIn:x.sellIn, quality:x.quality}));

//export default ({daytwo:gildedRose.items, dayone:dayone });
