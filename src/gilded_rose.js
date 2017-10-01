export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ManagedItem {
  constructor(item) {
    this.item = item;
  };

  static toManagedItem(item) {
    const brie = "Aged Brie";
    const backstagePass = "Backstage passes to a TAFKAL80ETC concert";
    const sulfuras = "Sulfuras, Hand of Ragnaros";
    const conjured = "Conjured";

    switch (item.name) {
      case brie:
        return new BrieItem(item);
      case backstagePass:
        return new BackstageItem(item);
      case sulfuras:
        return new SulfurasItem(item);
      case conjured:
        return new ConjuredItem(item);
      default:
        return new DegradingItem(item);
    }
  }

  getItem() {
    return this.item;
  }

  reduceSellIn() {
    this.item.sellIn = Math.max(this.item.sellIn - 1, 0);
  }
  
  getRemainingDays() {
    return this.item.sellIn;
  }

  setQuality(quality) {
    this.item.quality = quality;
  }

  reduceQuality(delta) {
    this.item.quality = Math.max(this.item.quality - delta, 0);
  }

  increaseQuality(delta) {
    this.item.quality = Math.min(this.item.quality + delta, 50);
  }
}

class DegradingItem extends ManagedItem {
  updateQuality(factor = 1) {
    if (this.getRemainingDays() === 0) {
      this.reduceQuality(2 * factor);
    } else {
      this.reduceQuality(factor);
    }
    this.reduceSellIn();
  }
}

class ConjuredItem extends DegradingItem {
  updateQuality() {
    super.updateQuality(2);
  }
}

class BrieItem extends ManagedItem {
  updateQuality() {
    this.increaseQuality(1);
    this.reduceSellIn();
  }
}

class BackstageItem extends ManagedItem {
  updateQuality() {
    if (this.getRemainingDays() === 0) {
      this.setQuality(0);
    } else if (this.getRemainingDays() <= 5) {
      this.increaseQuality(3);
    } else if (this.getRemainingDays() <= 10) {
      this.increaseQuality(2);
    } else {
      this.increaseQuality(1);
    }
    this.reduceSellIn();
  }
}

class SulfurasItem extends ManagedItem {
  updateQuality() {
    // stays as is
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items.map(ManagedItem.toManagedItem);
  }

  updateQuality() {
    this.items.map(item => item.updateQuality());
    return this.items.map(item => item.getItem());
  }
}
