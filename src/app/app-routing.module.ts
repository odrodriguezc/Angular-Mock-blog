import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesListComponent } from './blog/articles-list.component';
import { ArticleComponent } from './blog/article.component';
import { ArticleFormComponent } from './blog/article-form.component';
import { ReactiveFormComponent } from './blog/reactive-form.component';

const routes: Routes = [
  { path: '', component: ArticlesListComponent, pathMatch: 'full' },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'admin/article/new', component: ArticleFormComponent },
  { path: 'admin/article/:id', component: ArticleFormComponent },
  { path: 'reactive', component: ReactiveFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
