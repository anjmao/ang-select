import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgOptionHighlightDirective } from './ng-option-highlight.directive';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <span id="test1" [ngOptionHighlight]="term">My text is highlighted</span>
        <span id="test2" [ngOptionHighlight]="term">My text is not highlighted</span>
        <span id="test3" [ngOptionHighlight]="term">My text is highlighted</span>
        <span id="test4" [ngOptionHighlight]="term">My text is highlighted text</span>
        <span id="test5" [ngOptionHighlight]="term">My ťëxť is highlighted text</span>
        <span id="test6" *ngIf="showNew" [ngOptionHighlight]="term">New label</span>
    `
})
class TestComponent {
    term: string;
    showNew = false;
}

describe('NgOptionHighlightDirective', () => {

    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgOptionHighlightDirective, TestComponent]
        }).createComponent(TestComponent);

        fixture.detectChanges();
    });

    it('should have five elements with highlight directive', () => {
        const highlightDirectives = fixture.debugElement.queryAll(By.directive(NgOptionHighlightDirective));
        expect(highlightDirectives.length).toBe(5);
    });

    it('should have one element with highlighted text when term matching', () => {
        const span = fixture.debugElement.query(By.css('#test1'));
        fixture.componentInstance.term = 'is high';
        fixture.detectChanges();
        expect(span.nativeElement.querySelectorAll('.highlighted')[0].innerHTML).toBe('is');
        expect(span.nativeElement.querySelectorAll('.highlighted')[1].innerHTML).toBe('high');
        expect(span.nativeElement.textContent).toBe('My text is highlighted');
    });

    it('should have one element with no highlighted text when term not matching', () => {
        const span = fixture.debugElement.query(By.css('#test2'));
        fixture.componentInstance.term = 'non matching';
        fixture.detectChanges();
        expect(span.nativeElement.querySelector('.highlighted')).toBeNull();
        expect(span.nativeElement.innerHTML).toBe('My text is not highlighted');
    });

    it('should have multiple elements with highlighted text when term matching', () => {
        const span = fixture.debugElement.query(By.css('#test3'));
        fixture.componentInstance.term = 'text highlighted';
        fixture.detectChanges();
        expect(span.nativeElement.querySelectorAll('.highlighted')[0].innerHTML).toBe('text');
        expect(span.nativeElement.querySelectorAll('.highlighted')[1].innerHTML).toBe('highlighted');
        expect(span.nativeElement.textContent).toBe('My text is highlighted');
    });

    it('Highlights special characters', () => {
        const span = fixture.debugElement.query(By.css('#test5'));
        fixture.componentInstance.term = 'ťëxť';
        fixture.detectChanges();
        expect(span.nativeElement.querySelector('.highlighted').innerHTML).toBe('ťëxť');
        expect(span.nativeElement.textContent).toBe('My ťëxť is highlighted text');
    });

    it('should highlight text when label changed',  () => {
        fixture.componentInstance.term = 'new';
        fixture.detectChanges();
        fixture.componentInstance.showNew = true;
        fixture.detectChanges();
        const span = fixture.debugElement.query(By.css('#test6'));
        expect(span.nativeElement.querySelector('.highlighted').innerHTML).toBe('New');
        expect(span.nativeElement.textContent).toBe('New label');
    });
});
