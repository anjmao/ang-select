import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SelectWithTemplatesComponent } from './examples/custom-templates.component';
import { SelectBindingsComponent } from './examples/bindings.component';
import { SelectSearchComponent } from './examples/search.component';
import { ReactiveFormsComponent } from './examples/reactive-forms.component';
import { SelectEventsComponent } from './examples/events.component';
import { SelectMultiComponent } from './examples/multi.component';
import { SelectTagsComponent } from './examples/tags.component';

import { LayoutHeaderComponent } from './layout/header.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/forms',
        pathMatch: 'full'
    },
    { path: 'forms', component: ReactiveFormsComponent, data: { title: 'Reactive forms' } },
    { path: 'bindings', component: SelectBindingsComponent, data: { title: 'Custom bindings' } },
    { path: 'filter', component: SelectSearchComponent },
    { path: 'tags', component: SelectTagsComponent },
    { path: 'templates', component: SelectWithTemplatesComponent },
    { path: 'multiselect', component: SelectMultiComponent },
    { path: 'events', component: SelectEventsComponent },
];

@NgModule({
    imports: [
        BrowserModule,
        NgSelectModule.forRoot({ notFoundText: 'No items found', typeToSearchText: 'Type to search', addTagText: 'Add item' }),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(
            appRoutes,
            {
                useHash: true
            }
        )
    ],
    declarations: [
        AppComponent,
        SelectWithTemplatesComponent,
        SelectBindingsComponent,
        SelectSearchComponent,
        ReactiveFormsComponent,
        SelectEventsComponent,
        SelectMultiComponent,
        SelectTagsComponent,
        LayoutHeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

