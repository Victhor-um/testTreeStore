'use strict';
class TreeStore {
  flatItems;
  children;
  constructor(items) {
    this.flatItems = new Map();
    this.children = new Map();
    items.forEach((item) => {
      const { id, parent } = item;
      // Check the data types of `id` and `parent`
      if (typeof id !== 'number' && typeof id !== 'string') {
        throw new TypeError(
          `Item id must be a number or a string, got ${typeof id}`
        );
      }
      if (
        typeof parent !== 'number' &&
        typeof parent !== 'string' &&
        parent !== null
      ) {
        throw new TypeError(
          `Item parent must be a number, a string or null, got ${typeof parent}`
        );
      }
      this.flatItems.set(id, item);
      const children = this.children.get(parent) || [];
      children.push(item);
      this.children.set(parent, children);
    });
  }
  getAll() {
    return [...this.flatItems.values()];
  }
  getItem(id) {
    const item = this.flatItems.get(id);
    if (!item) {
      return null;
    }
    return item;
  }
  getChildren(id) {
    const children = this.children.get(id);
    return children ? [...children] : [];
  }
  getAllChildren(id) {
    const children = this.getChildren(id);
    const result = [...children];
    for (const child of children) {
      result.push(...this.getAllChildren(child.id));
    }
    return result;
  }
  getAllParents(id) {
    const parents = [];
    let item = this.getItem(id);
    while (item && item.parent !== null) {
      const parent = this.getItem(item.parent);
      if (parent) {
        parents.push(parent);
      }
      item = parent;
    }
    return parents;
  }
}
const items = [
  { id: 1, parent: 'root', type: null },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];
const ts = new TreeStore(items);
const allItems = ts.getAll();
console.log(allItems); // should output the same array as items
const item3 = ts.getItem(3);
console.log(item3); // should output { id: 3, parent: 1, type: ‘test’ }
const children2 = ts.getChildren(2);
console.log(children2); // should output [{ id: 4, parent: 2, type: ‘test’ }, { id: 5, parent: 2, type: ‘test’ }]
const allChildren2 = ts.getAllChildren(2);
console.log(allChildren2); // should output [{ id: 4, parent: 2, type: ‘test’ }, { id: 5, parent: 2, type: ‘test’ }]
const allParents4 = ts.getAllParents(4);
console.log(allParents4); // should output [{ id: 4, parent: 2, type: ‘test’ }, { id: 2, parent: 1, type: ‘test’ }, { id: 1, parent: ‘root’ }]

const allParents7 = ts.getAllParents(7);
console.log(allParents7);
