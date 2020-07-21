import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../environments/environment';
import { Article, Articles } from './article';
import { BlogModule } from './blog.module';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  findAll(page: number = 1) {
    return this.http.get<Articles>(env.apiUrl + `?page=${page}&limit=10`);
  }

  find(id: string) {
    return this.http.get<Article>(env.apiUrl + '/' + id);
  }

  delete(id: string) {
    return this.http.delete<Article>(env.apiUrl + '/' + id);
  }

  create(article: Article) {
    return this.http.post<Article>(env.apiUrl, article);
  }

  update(article: Article) {
    return this.http.put<Article>(env.apiUrl + '/' + article.id, article);
  }
}
