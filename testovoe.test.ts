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
// describe('TreeStore', () => {
//   let store: TreeStore;

//   beforeEach(() => {
//     const exampleData: Item[] = [
//       { id: 1, parent: null, name: 'Item 1' },
//       { id: 2, parent: 1, name: 'Item 2' },
//       { id: 3, parent: 1, name: 'Item 3' },
//       { id: 4, parent: 2, name: 'Item 4' },
//     ];

//     store = new TreeStore(exampleData);
//   });

//   describe('constructor', () => {
//     it('should throw a TypeError if an item has an invalid "id" value', () => {
//       const invalidId = { id: 'invalid', parent: null, name: 'Invalid Item' };
//       expect(() => new TreeStore([...store.getAll(), invalidId])).toThrow(
//         `Invalid item: {id: invalid, parent: null, name: Invalid Item}`
//       );
//     });
//   });
// });
