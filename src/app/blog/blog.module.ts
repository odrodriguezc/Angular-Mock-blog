import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { ArticleFormComponent } from './article-form.component';
import { ArticlesListComponent } from './articles-list.component';
import { ReactiveFormComponent } from './reactive-form.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from './article.service';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleFormComponent,
    ArticlesListComponent,
    ReactiveFormComponent,
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    ArticleComponent,
    ArticleFormComponent,
    ArticlesListComponent,
    ReactiveFormComponent,
  ],
  providers: [ArticleService],
})
export class BlogModule {}
