export interface Item {
  id: number | string;
  parent: number | string | null;
  [key: string]: any;
}

export class TreeStore {
  private flatItems: Map<number | string, Item>;
  private children: Map<number | string | null, Item[]>;
  private allChildrenCache: Map<number | string, Item[]> = new Map();
  private allParentsCache: Map<number | string, Item[]> = new Map();

  constructor(items: Item[]) {
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
      const copyItem = structuredClone(item);
      this.flatItems.set(id, copyItem);

      const children = this.children.get(parent) || [];
      children.push(copyItem);
      this.children.set(parent, children);
    });
  }

  public getAll(): Item[] {
    return [...this.flatItems.values()];
  }

  public getItem(id: number | string): Item | null {
    const item = this.flatItems.get(id);
    if (!item) {
      return null;
    }
    return item;
  }

  public getChildren(id: number | string): Item[] {
    const children = this.children.get(id);
    return children ? [...children] : [];
  }

  public getAllChildren(id: number | string): Item[] {
    const cachedResult = this.allChildrenCache.get(id);
    if (cachedResult) {
      return cachedResult;
    }

    const children = this.getChildren(id);
    const result = [...children];

    for (const child of children) {
      result.push(...this.getAllChildren(child.id));
    }
    this.allChildrenCache.set(id, result);

    return result;
  }

  public getAllParents(id: number | string): Item[] {
    const cachedResult = this.allParentsCache.get(id);
    if (cachedResult) {
      return cachedResult;
    }

    const parents = [];
    let item = this.getItem(id);

    while (item && item.parent !== null) {
      const parent = this.getItem(item.parent);
      if (parent) {
        parents.push(parent);
      }
      item = parent;
    }
    this.allParentsCache.set(id, parents);

    return parents;
  }
}
/* 
const items: Item[] = [
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
 */
