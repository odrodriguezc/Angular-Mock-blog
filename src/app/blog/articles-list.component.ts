import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Articles } from './article';
import { ArticleService } from './article.service';
import { fromEvent } from 'rxjs';
import { filter, debounceTime, distinct, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-articles-list',
  template: `
    <h1>Bievenue dans le blog</h1>
    <div class="article" *ngFor="let article of articles">
      <h2>{{ article.title }}</h2>
      <img [src]="article.image" [alt]="article.title" />
      <p>{{ article.content }}</p>
      <p>
        <small>{{ article.createdAt | date: 'dd/MM/yyyy' }}</small>
      </p>
      <a routerLink="/article/{{ article.id }}">Lire la suite</a>
      <hr />
    </div>
  `,
  styles: [],
})
export class ArticlesListComponent implements OnInit {
  articles: Articles = [];
  page = 1;
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    const scroll$ = fromEvent(window, 'scroll');

    scroll$
      .pipe(
        filter((event) => {
          const ratio = (window.pageYOffset / document.body.clientHeight) * 100;
          return ratio > 65;
        }),
        debounceTime(300),
        distinct(),
        switchMap((_) => {
          this.page++;
          return this.articleService.findAll(this.page);
        })
      )
      .subscribe((article) => this.articles.push(...article));

    this.articleService
      .findAll(this.page)
      .subscribe((articles) => (this.articles = articles));
  }
}
