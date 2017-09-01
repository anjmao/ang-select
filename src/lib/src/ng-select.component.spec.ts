import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, ViewChild, Type, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from './ng-select.module';
import { NgSelectComponent } from './ng-select.component';
import { KeyCode, NgOption } from './ng-select.types';

describe('NgSelectComponent', function () {

    describe('Model changes', () => {
        let fixture: ComponentFixture<NgSelectBasicTestCmp>;

        beforeEach(() => {
            fixture = createTestingModule(
                NgSelectModelChangesTestCmp,
                `<ng-select [items]="cities"
                        bindLabel="name"
                        bindValue="this"
                        [clearable]="true"
                        [(ngModel)]="selectedCity">
                </ng-select>`);
        });

        it('update parent selected model on value change', fakeAsync(() => {
            // select second city
            selectOption(fixture, KeyCode.ArrowDown, 2);

            fixture.detectChanges();
            tick();

            expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[1]);
            expect(fixture.componentInstance.selectedCity).toEqual(fixture.componentInstance.cities[1]);

            // clear select
            fixture.componentInstance.select.clear();
            fixture.detectChanges();
            tick();
            expect(fixture.componentInstance.selectedCity).toEqual(null);
        }));

        it('update ng-select value on parent model change', fakeAsync(() => {
            // select first city
            fixture.componentInstance.selectedCity = fixture.componentInstance.cities[0];
            fixture.detectChanges();
            tick();

            expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[0]);

            // clear model
            fixture.componentInstance.selectedCity = null;
            fixture.detectChanges();
            tick();

            expect(fixture.componentInstance.select.value).toEqual(null);
        }));
    });

    describe('Model bindings', () => {

        it('bind to default label value properties', fakeAsync(() => {
            const fixture = createTestingModule(
                NgSelectDefaultBindingsTestCmp,
                `<ng-select [items]="cities" [(ngModel)]="selectedCityId">
                </ng-select>`);

            // from component to model
            selectOption(fixture, KeyCode.ArrowDown, 1);

            fixture.detectChanges();
            tick();

            expect(fixture.componentInstance.selectedCityId).toEqual('1');

            // from model to component
            fixture.componentInstance.selectedCityId = '2';

            fixture.detectChanges();
            tick();

            expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[1]);
        }));

        it('bind to custom object properties', fakeAsync(() => {
            const fixture = createTestingModule(
                NgSelectCustomBindingsTestCmp,
                `<ng-select [items]="cities"
                            bindLabel="name"
                            bindValue="id"
                            [(ngModel)]="selectedCityId">
                </ng-select>`);

            // from component to model
            selectOption(fixture, KeyCode.ArrowDown, 1);

            fixture.detectChanges();
            tick();

            expect(fixture.componentInstance.selectedCityId).toEqual(1);

            // from model to component
            fixture.componentInstance.selectedCityId = 2;

            fixture.detectChanges();
            tick();

            expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[1]);
        }));

        it('bind to object', fakeAsync(() => {
            const fixture = createTestingModule(
                NgSelectBasicTestCmp,
                `<ng-select [items]="cities"
                            bindLabel="name"
                            bindValue="this"
                            [(ngModel)]="selectedCity">
                </ng-select>`);

            // from component to model
            selectOption(fixture, KeyCode.ArrowDown, 1);

            fixture.detectChanges();
            tick();

            expect(fixture.componentInstance.selectedCity).toEqual(fixture.componentInstance.cities[0]);

            // from model to component
            fixture.componentInstance.selectedCity = fixture.componentInstance.cities[1];

            fixture.detectChanges();
            tick();

            expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[1]);
        }));

    });

    describe('Keyboard events', () => {
        let fixture: ComponentFixture<NgSelectBasicTestCmp>;

        beforeEach(() => {
            fixture = createTestingModule(
                NgSelectBasicTestCmp,
                `<ng-select [items]="cities"
                        bindLabel="name"
                        bindValue="this"
                        [(ngModel)]="selectedCity">
                </ng-select>`);
        });

        it('open dropdown on space click', () => {
            triggerKeyDownEvent(getNgSelectElement(fixture), KeyCode.Space);
            expect(fixture.componentInstance.select.isOpen).toBe(true);
        });

        it('select next value on arrow down', () => {
            selectOption(fixture, KeyCode.ArrowDown, 1);
            expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[0]);
        });

        it('select first value on arrow down when current selected value is last', async(() => {
            fixture.componentInstance.selectedCity = fixture.componentInstance.cities[2];
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                selectOption(fixture, KeyCode.ArrowDown, 1);
                expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[0]);
            });
        }));

        it('should skip disabled option and select next one', fakeAsync(() => {
            const city: any = fixture.componentInstance.cities[0];
            city.disabled = true;
            selectOption(fixture, KeyCode.ArrowDown, 1);
            fixture.detectChanges();
            tick();
            expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[1]);
        }));

        it('select previous value on arrow up', async(() => {
            fixture.componentInstance.selectedCity = fixture.componentInstance.cities[1];
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                selectOption(fixture, KeyCode.ArrowUp, 1);
                expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[0]);
            });
        }));

        it('select last value on arrow up when current selected value is first', async(() => {
            fixture.componentInstance.selectedCity = fixture.componentInstance.cities[0];
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                selectOption(fixture, KeyCode.ArrowUp, 1);
                expect(fixture.componentInstance.select.value).toEqual(fixture.componentInstance.cities[2]);
            });
        }));

    });

    describe('Custom templates', () => {

        it('display custom header template', async(() => {
            const fixture = createTestingModule(
                NgSelectBasicTestCmp,
                `<ng-select [items]="cities" [(ngModel)]="selectedCity" bindValue="this">
                    <ng-template ng-display-tmp let-item="item">
                        <div class="custom-header">{{item.name}}</div>
                    </ng-template>
                </ng-select>`);

            fixture.componentInstance.selectedCity = fixture.componentInstance.cities[0];
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                const el = fixture.debugElement.query(By.css('.custom-header'));
                expect(el).not.toBeNull();
                expect(el.nativeElement).not.toBeNull();
            });
        }));

        it('display custom dropdown option template', async(() => {

            const fixture = createTestingModule(
                NgSelectBasicTestCmp,
                `<ng-select [items]="cities" [(ngModel)]="selectedCity">
                    <ng-template ng-option-tmp let-item="item">
                        <div class="custom-option">{{item.name}}</div>
                    </ng-template>
                </ng-select>`);

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                const el = fixture.debugElement.query(By.css('.custom-option')).nativeElement;
                expect(el).not.toBeNull();
            });
        }));
    });

    describe('Multiple', () => {
        let fixture: ComponentFixture<NgSelectBasicTestCmp>;
        beforeEach(() => {
            fixture = createTestingModule(
                NgSelectBasicTestCmp,
                `<ng-select [items]="cities"
                    bindLabel="name"
                    bindValue="this"
                    placeholder="select value"
                    [(ngModel)]="selectedCity"
                    [multiple]="true">
                </ng-select>`);
        });

        it('should select several items', fakeAsync(() => {
            selectOption(fixture, KeyCode.ArrowDown, 1);
            selectOption(fixture, KeyCode.ArrowDown, 2);
            detectChanges();
            expect((<NgOption[]>fixture.componentInstance.select.value).length).toBe(2);
        }));

        it('should toggle selected item', fakeAsync(() => {
            selectOption(fixture, KeyCode.ArrowDown, 1);
            selectOption(fixture, KeyCode.ArrowDown, 2);
            detectChanges();
            expect((<NgOption[]>fixture.componentInstance.select.value).length).toBe(2);
            selectOption(fixture, KeyCode.ArrowDown, 1);
            detectChanges();
            expect((<NgOption[]>fixture.componentInstance.select.value).length).toBe(1);
            expect(fixture.componentInstance.select.value[0].name).toBe('Pabrade');
        }));

        function detectChanges() {
            fixture.detectChanges();
            tick();
        }
    });

    describe('Placeholder', () => {
        let fixture: ComponentFixture<NgSelectBasicTestCmp>;

        beforeEach(() => {
            fixture = createTestingModule(
                NgSelectBasicTestCmp,
                `<ng-select [items]="cities"
                    bindLabel="name"
                    bindValue="this"
                    placeholder="select value"
                    [(ngModel)]="selectedCity">
                </ng-select>`);
        });

        it('display then no selected value', async(() => {
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                const el = fixture.debugElement.query(By.css('.as-placeholder')).nativeElement;
                expect(el.innerText).toBe('select value');
            });
        }));

        it('do not display on selected value', async(() => {
            fixture.componentInstance.selectedCity = fixture.componentInstance.cities[0];
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                const el = fixture.debugElement.query(By.css('.as-placeholder'));
                expect(el).toBeNull();
            });
        }));
    });

    describe('Filter', () => {
        let fixture: ComponentFixture<NgSelectFilterTestCmp>;

        it('filter items with default filter', async(() => {
            fixture = createTestingModule(
                NgSelectFilterTestCmp,
                `<ng-select [items]="cities"
                    bindLabel="name"
                    bindValue="this"
                    [(ngModel)]="selectedCity">
                </ng-select>`);

            fixture.detectChanges();
            fixture.componentInstance.select.onFilter({ target: { value: 'vilnius' } });

            expect(fixture.componentInstance.select.itemsList.filteredItems).toEqual([{ id: 1, name: 'Vilnius' }]);
        }));

        it('filter items with custom filter function', async(() => {
            fixture = createTestingModule(
                NgSelectFilterTestCmp,
                `<ng-select [items]="cities"
                    bindLabel="name"
                    bindValue="this"
                    [filterFunc]="customFilterFunc"
                    [(ngModel)]="selectedCity">
                </ng-select>`);

            fixture.detectChanges();
            fixture.componentInstance.select.onFilter({ target: { value: 'no matter' } });

            expect(fixture.componentInstance.select.itemsList.filteredItems).toEqual([{ id: 3, name: 'Pabrade' }]);
        }));

    });

});

function selectOption(fixture, key: KeyCode, steps: number) {
    triggerKeyDownEvent(getNgSelectElement(fixture), KeyCode.Space); // open
    for (let i = 0; i < steps; i++) {
        triggerKeyDownEvent(getNgSelectElement(fixture), key);
    }
    triggerKeyDownEvent(getNgSelectElement(fixture), KeyCode.Enter); // select
}

function getNgSelectElement(fixture: ComponentFixture<any>): DebugElement {
    return fixture.debugElement.query(By.css('ng-select'));
}

function triggerKeyDownEvent(element: DebugElement, key: number): void {
    element.triggerEventHandler('keydown', {
        which: key,
        preventDefault: () => {
        }
    });
}

function createTestingModule<T>(cmp: Type<T>, template: string): ComponentFixture<T> {
    TestBed.configureTestingModule({
        imports: [FormsModule, NgSelectModule],
        declarations: [
            NgSelectBasicTestCmp,
            NgSelectFilterTestCmp,
            NgSelectModelChangesTestCmp,
            NgSelectDefaultBindingsTestCmp,
            NgSelectCustomBindingsTestCmp
        ]
    })
        .overrideComponent(cmp, {
            set: {
                template: template
            }
        })
        .compileComponents();

    const fixture = TestBed.createComponent(cmp);
    fixture.detectChanges();
    return fixture;
}

@Component({
    template: ``
})
class NgSelectBasicTestCmp {
    @ViewChild(NgSelectComponent) select: NgSelectComponent;
    selectedCity: { id: number; name: string };
    cities = [
        { id: 1, name: 'Vilnius' },
        { id: 2, name: 'Kaunas' },
        { id: 3, name: 'Pabrade' },
    ];
}

@Component({
    template: ``
})
class NgSelectDefaultBindingsTestCmp {
    @ViewChild(NgSelectComponent) select: NgSelectComponent;
    selectedCityId: string;
    cities = [
        { value: '1', label: 'Vilnius' },
        { value: '2', label: 'Kaunas' },
        { value: '3', label: 'Pabrade' },
    ];
}

@Component({
    template: ``
})
class NgSelectCustomBindingsTestCmp {
    @ViewChild(NgSelectComponent) select: NgSelectComponent;
    selectedCityId: number;
    cities = [
        { id: 1, name: 'Vilnius' },
        { id: 2, name: 'Kaunas' },
        { id: 3, name: 'Pabrade' },
        { id: 4, name: 'Klaipėda' },
    ];
}

@Component({
    template: ``,
    changeDetection: ChangeDetectionStrategy.Default
})
class NgSelectModelChangesTestCmp {
    @ViewChild(NgSelectComponent) select: NgSelectComponent;
    selectedCity: { id: number; name: string };
    cities = [
        { id: 1, name: 'Vilnius' },
        { id: 2, name: 'Kaunas' },
        { id: 3, name: 'Pabrade' },
        { id: 4, name: 'Klaipėda' },
    ];
}

@Component({
    template: `
    `
})
class NgSelectFilterTestCmp {
    @ViewChild(NgSelectComponent) select: NgSelectComponent;
    selectedCity: { id: number; name: string };
    cities = [
        { id: 1, name: 'Vilnius' },
        { id: 2, name: 'Kaunas' },
        { id: 3, name: 'Pabrade' },
    ];

    customFilterFunc(term: string) {
        return (item: NgOption) => {
            return item.id === 3;
        };
    }
}
