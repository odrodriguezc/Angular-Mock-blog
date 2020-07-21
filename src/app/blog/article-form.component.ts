import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticleService } from './article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Articles, Article } from './article';

@Component({
  selector: 'app-article-form',
  template: `
    <h1>Creer un article</h1>
    <form #form="ngForm" (ngSubmit)="handleSubmit(form)">
      <input
        #title="ngModel"
        ngModel
        type="text"
        name="title"
        placeholder="Titre de l'article"
        required
        minlength="10"
      /><br />
      <p
        *ngIf="title.hasError('required') && (form.submitted || title.touched)"
      >
        Le titre est obligatoire
      </p>
      <p
        *ngIf="title.hasError('minlength') && (form.submitted || title.touched)"
      >
        Le titre doit faire au moins 10 caractères
      </p>
      <input
        #image="ngModel"
        ngModel
        type="url"
        name="image"
        placeholder="URL de l'image"
        required
      /><br />
      <p
        *ngIf="image.hasError('required') && (form.submitted || image.touched)"
      >
        L'URL de l'image est obligatoire
      </p>
      <textarea
        #content="ngModel"
        ngModel
        name="content"
        placeholder="Contenu de l'article"
        required
        minlength="10"
      ></textarea
      ><br />
      <p
        *ngIf="
          content.hasError('required') && (form.submitted || content.touched)
        "
      >
        Le contenu est obligatoire
      </p>
      <p
        *ngIf="
          content.hasError('minlength') && (form.submitted || content.touched)
        "
      >
        Le contenu doit faire au moins 10 caractères
      </p>
      <button type="submit">Enregistrer</button>
    </form>
  `,
  styles: [],
})
export class ArticleFormComponent implements OnInit, AfterViewInit {
  article: Article;

  @ViewChild('form')
  form: NgForm;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => {
          if (!id) {
            return of(null);
          }
          return this.articleService.find(id);
        })
      )
      .subscribe(
        (data) => {
          if (!data) {
            return;
          }
          this.article = data;
          this.form.setValue({
            title: this.article.title,
            content: this.article.content,
            image: this.article.image,
          });
          console.log(this.article);
        },
        (error) => console.log('error dans la requete')
      );
  }

  handleSubmit(form: NgForm) {
    if (form.invalid) {
      console.error('form invalidad');
      return;
    }

    if (!this.article) {
      //creer la data
      const createdAt = new Date().toISOString();
      // creer l'objec json
      const newArticle = { ...form.value, createdAt };
      // send to api
      this.articleService.create(newArticle).subscribe((article) => {
        console.table(article);
        this.router.navigateByUrl('/article/' + article.id);
      });
      return;
    }

    this.articleService
      .update({ ...this.article, ...form.value })
      .subscribe((resultat) => {
        this.router.navigateByUrl('/article/' + this.article.id);
      });
  }
}
