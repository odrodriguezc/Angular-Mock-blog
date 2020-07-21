import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from './article.service';
import { Articles, Article } from './article';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  template: `
    <div style="background: violet" *ngIf="errorMessage">
      {{ errorMessage }}
    </div>
    <div *ngIf="article">
      <h1>{{ article.title }}</h1>
      <small>Publié le {{ article.createdAt | date: 'dd/MM/yyyy' }}</small>
      <img [src]="article.image" [alt]="article.title" />
      <p>{{ article.content }}</p>
      <a routerLink="/admin/article/{{ article.id }}">Modifier</a>
      <button (click)="handleDelete()">Supprimer</button>
    </div>
  `,
  styles: [],
})
export class ArticleComponent implements OnInit {
  article: Article;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => this.articleService.find(id))
      )
      .subscribe(
        (article) => {
          this.article = article;
        },
        (error) => {
          this.errorMessage = "l'article demandé n'existe pas";
        }
      );
  }

  handleDelete() {
    this.articleService.delete(this.article.id).subscribe((article) => {
      this.router.navigateByUrl('/');
    });
  }
}
