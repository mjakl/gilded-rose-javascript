export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class TicketStrategy{
  check(item){
    if (isBelowMaxQuality(item)) {
      item.quality = item.quality + 1;
      if (isTicket(item)) {
        if (isLessThan11day(item)) {
          if (isBelowMaxQuality(item)) {
            item.quality = item.quality + 1;
          }
        }
        if (isLessThan6day(item)) {
          if (isBelowMaxQuality(item)) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    item.sellIn = item.sellIn - 1;
    if (isLessThan0day(item)) {
      item.quality = item.quality - item.quality;
    }
    return item;
  }
}

class FallbackStrategy{
  check(item){

      item.sellIn = item.sellIn - 1;

      if (isLessThan0day(item)) {
        if (isAboveMinQuality(item)) {
          item.quality =item.quality - 1;
        }
      }
    return item;
}
}

class LegendaryStrategy
{
  check(item){
    return item;
  }
}


class CheeseStrategy
{
  check(item){

    if (isBelowMaxQuality(item)) {
      item.quality = item.quality + 1;
    }

    item.sellIn =item.sellIn - 1;

    if (isLessThan0day(item)) {
      if (isBelowMaxQuality(item)) {
        item.quality = item.quality + 1;
      }
    }
    return item;
  }
}

const isEqualToName  = (item, cond) => item.name == cond;

const isLegendary = (item)=> isEqualToName(item, 'Sulfuras, Hand of Ragnaros');
const isNotLegendary = (item)=> !isEqualToName(item, 'Sulfuras, Hand of Ragnaros');

const isTicket = (item)=> isEqualToName(item, 'Backstage passes to a TAFKAL80ETC concert');
const isNotTicket = (item)=> !isEqualToName(item, 'Backstage passes to a TAFKAL80ETC concert');

const isCheese = (item)=> isEqualToName(item, 'Aged Brie');
const isNotCheese = (item)=> !isEqualToName(item, 'Aged Brie');

const isBelowMaxQuality = (item) => item.quality < 50 ;
const isAboveMinQuality = (item) => item.quality > 0 ;

const isLessThan11day = (item) => item.sellIn <11;
const isLessThan6day = (item) => item.sellIn <6;
const isLessThan0day = (item) => item.sellIn <0;

const isAboveMinQualityAndIsNotLegendary = (item) => isAboveMinQuality(item) && isNotLegendary(item)
const isNotCheeseAndIsNotTicket = (item)=> isNotCheese(item) && isNotTicket(item);

const getItem = (items,i)=> items[i];

export class Shop {
  constructor(items=[]){
    this.items = items;
    this.ticketStrategy = new TicketStrategy();
    this.legendaryStrategy = new LegendaryStrategy();
    this.cheesStrategy = new CheeseStrategy();
    this.fallbackStrategy = new FallbackStrategy();

  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item = getItem(this.items,i);
      if(isTicket(item))
      {
        this.ticketStrategy.check(item);
        continue;
      }
      if(isLegendary(item))
      {
        this.legendaryStrategy.check(item);
        continue;
      }

      if(isCheese(item))
      {
        this.cheesStrategy.check(item);
        continue;
      }

      if (isAboveMinQuality(item)) {
        this.items[i].quality = this.items[i].quality - 1;
      }

      this.fallbackStrategy.check(item);
    }

    return this.items;
  }
}
