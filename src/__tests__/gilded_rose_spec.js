import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", () => {
  function shopUpdateForItem(item) {
    const gildedRose = new Shop([item]);
    const items = gildedRose.updateQuality();
    return items[0];
  }

  describe("General", () => {
    it("should work with empty stock", () => {
      const gildedRose = new Shop();
      const items = gildedRose.updateQuality();
      expect(items.length).toEqual(0);
    });

    it("should never have negative quality", () => {
      const updatedItem = shopUpdateForItem(new Item("some item", 0, 0));
      expect(updatedItem.quality).toEqual(0);
    });
  });

  describe("Standard Items", () => {
    const name = "some item";

    it("should reduce the sellIn value by one", () => {
      const updatedItem = shopUpdateForItem(new Item(name, 10, 10));
      expect(updatedItem.sellIn).toEqual(9);
    });

    it("should reduce the quality value by one", () => {
      const updatedItem = shopUpdateForItem(new Item(name, 10, 10));
      expect(updatedItem.quality).toEqual(9);
    });

    it("should reduce the quality value by two when sellBy is 0", () => {
      const updatedItem = shopUpdateForItem(new Item(name, 0, 10));
      expect(updatedItem.quality).toEqual(8);
    });

    it("should never have negative quality, even with reduction of two", () => {
      const updatedItem = shopUpdateForItem(new Item(name, 0, 1));
      expect(updatedItem.quality).toEqual(0);
    });
  });

  describe("Aged Brie", () => {
    const name = "Aged Brie";

    it("should increase quality with time", () => {
      const updatedItem = shopUpdateForItem(new Item(name, 10, 10));
      expect(updatedItem.quality).toEqual(11);
    });

    it("should not increase quality above 50", () => {
      const updatedItem = shopUpdateForItem(new Item(name, 10, 50));
      expect(updatedItem.quality).toEqual(50);
    });
  });

  describe("Sulfuras", () => {
    const name = "Sulfuras, Hand of Ragnaros";

    it("should never decrease sellIn time", () => {
      const updatedItem = shopUpdateForItem(new Item(name, 10, 10));
      expect(updatedItem.sellIn).toEqual(10);
    });

    it("should never decrease quality", () => {
      const updatedItem = shopUpdateForItem(new Item(name, 10, 80));
      expect(updatedItem.quality).toEqual(80);
    });
  });

  describe("Backstage Pass", () => {
    const name = "Backstage passes to a TAFKAL80ETC concert";

    function backstagePassChecks(days, delta) {
      it("should increase quality with time", () => {
        const updatedItem = shopUpdateForItem(new Item(name, days, 10));
        expect(updatedItem.quality).toEqual(10 + delta);
      });

      it("should incrsease quality, but not above 50", () => {
        const updatedItem = shopUpdateForItem(new Item(name, days, 49));
        expect(updatedItem.quality).toEqual(50);
      });

      it("should not increase quality above 50", () => {
        const updatedItem = shopUpdateForItem(new Item(name, days, 50));
        expect(updatedItem.quality).toEqual(50);
      });
    }

    describe("more than 10 days before event, quality increases by 1", () => {
      backstagePassChecks(20, 1);
    });

    describe("10-5 days before event, quality increases by 2", () => {
      backstagePassChecks(10, 2);
      backstagePassChecks(6, 2);
    });

    describe("5-1 days before event, quality increases by 3", () => {
      backstagePassChecks(5, 3);
      backstagePassChecks(1, 3);
    });

    describe("on the day of the event or after", () => {
      it("should have quality zero", () => {
        const updatedItem = shopUpdateForItem(new Item(name, 0, 10));
        expect(updatedItem.quality).toEqual(0);
      });
    });
  });
});
