import { NgOption } from './ng-select.types';

export type SelectionModelFactory = () => SelectionModel;

export function DefaultSelectionModelFactory() {
    return new DefaultSelectionModel();
}

export interface SelectionModel {
    value: NgOption[];
    select(item: NgOption, multiple: boolean, selectableGroupAsModel: boolean);
    unselect(item: NgOption, multiple: boolean);
    clear();
}

export class DefaultSelectionModel implements SelectionModel {
    private _selected: NgOption[] = [];

    get value(): NgOption[] {
        return this._selected;
    }

    select(item: NgOption, multiple: boolean, groupAsModel: boolean) {
        item.selected = true;
        if (groupAsModel || !item.children) {
            this._selected.push(item);
        }
        if (multiple) {
            if (item.parent) {
                const childrenCount = item.parent.children.length;
                const selectedCount = item.parent.children.filter(x => x.selected).length;
                item.parent.selected = childrenCount === selectedCount;
                item.parent.indeterminate = !item.parent.selected && selectedCount > 0;
            } else if (item.children) {
                this._setChildrenSelectedState(item.children, true);
                this._removeChildren(item);
                if (!groupAsModel) {
                    this._selected = [...this._selected, ...item.children];
                    item.indeterminate = (this._selected.length !== item.children.length) && this._selected.length > 0;
                }
            }
        }
    }

    unselect(item: NgOption, multiple: boolean) {
        this._selected = this._selected.filter(x => x !== item);
        item.selected = false;
        item.indeterminate = false;
        if (multiple) {
            if (item.parent) {
                if (item.parent.selected) {
                    const children = item.parent.children;
                    this._removeParent(item.parent);
                    this._removeChildren(item.parent);
                    this._selected.push(...children.filter(x => x !== item));
                    item.parent.selected = false;
                }
                item.parent.indeterminate  = this._selected.length && !item.parent.selected ? true : false;
            } else if (item.children) {
                this._setChildrenSelectedState(item.children, false);
                this._removeChildren(item);
            }
        }
    }

    clear() {
        this._selected = [];
    }

    private _setChildrenSelectedState(children: NgOption[], selected: boolean) {
        children.forEach(x => x.selected = selected);
    }

    private _removeChildren(parent: NgOption) {
        this._selected = this._selected.filter(x => x.parent !== parent);
    }

    private _removeParent(parent: NgOption) {
        this._selected = this._selected.filter(x => x !== parent)
    }
}
