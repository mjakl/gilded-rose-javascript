import { Shop, Item } from "../gilded_rose";

describe("Basics", () => {
  it("should work with empty stock", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items.length).toEqual(0);
  });

  it("should reduce the sellIn value by one", () => {
    const gildedRose = new Shop([new Item("some item", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(9);
  });

  it("should reduce the quality value by one", () => {
    const gildedRose = new Shop([new Item("some item", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
  });

  it("should reduce the quality value by two when sellBy is 0", () => {
    const gildedRose = new Shop([new Item("some item", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

  it("should never have negative quality", () => {
    const gildedRose = new Shop([new Item("some item", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("should never have negative quality, even with reduction of two", () => {
    const gildedRose = new Shop([new Item("some item", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
});

describe("Aged Brie", () => {
  it("should increase quality with time", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(11);
  });

  it("should not increase quality above 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });
});

describe("Sulfuras", () => {
  it("should never decrease sellIn time", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(10);
  });

  it("should never decrease quality", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });
});

describe("Backstage Pass", () => {
  it("should increase quality with time", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(11);
  });

  it("should increase quality by two when <=10 days before sellIn", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(12);
  });

  it("should increase quality by two when >5 days before sellIn", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(12);
  });

  it("should increase quality by three when <=5 days before sellIn", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(13);
  });

  it("should increase quality by three when >0 days before sellIn", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(13);
  });

  it("should have quality zero, 0 days before sellIn", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
});
