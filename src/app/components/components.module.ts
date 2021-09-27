import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ExploreContainerComponent], // TODO Import components here
    imports: [CommonModule, FormsModule, IonicModule],
    exports: [ExploreContainerComponent], // TODO Import components here
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }