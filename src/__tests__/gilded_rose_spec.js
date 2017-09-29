import { Shop, Item } from '../gilded_rose';
import {dayzero,dayone,daytwo} from '../fixture1';

describe("Gilded Rose", function () {

    xit("should foo", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("fixme");
    });

    it("should works correctly", function () {
      expect(dayzero).toMatchSnapshot();
      expect(dayone).toMatchSnapshot();
      expect(daytwo).toMatchSnapshot();
    });
});
