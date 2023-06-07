import { Item, TreeStore } from './testovoe';

describe('TreeStore', () => {
  let tree: TreeStore;

  const items: Item[] = [
    { id: 1, parent: null },
    { id: 2, parent: 1 },
    { id: 3, parent: 2 },
  ];

  beforeEach(() => {
    tree = new TreeStore(items);
  });

  describe('getAll', () => {
    it('returns all items in an array', () => {
      expect(tree.getAll()).toEqual(items);
    });
  });

  describe('getItem', () => {
    it('returns an item by id', () => {
      const item = tree.getItem(1);
      expect(item).toEqual(items[0]);
    });

    it('returns null if item not found', () => {
      const item = tree.getItem(999);
      expect(item).toBeNull();
    });
  });

  describe('getChildren', () => {
    it('returns an array of children for a parent id', () => {
      const children = tree.getChildren(1);
      expect(children).toEqual([items[1]]);
    });

    it('returns an empty array if no children found', () => {
      const children = tree.getChildren(3);
      expect(children).toEqual([]);
    });
  });

  // Other tests for TreeStore can be added here
  describe('getAllChildren', () => {
    it('returns all children for a parent id', () => {
      const children = tree.getAllChildren(1);
      expect(children).toEqual([items[1], items[2]]);
    });

    it('returns an empty array if no children found', () => {
      const children = tree.getAllChildren(999);
      expect(children).toEqual([]);
    });

    it('returns all nested children', () => {
      const children = tree.getAllChildren(2);
      expect(children).toEqual([items[2]]);
    });
  });
});
