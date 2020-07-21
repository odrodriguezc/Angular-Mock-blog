import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  template: `
    <h1>Créer un article -reactive-</h1>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <input
        formControlName="title"
        type="text"
        name="title"
        placeholder="title"
      /><br />
      <p *ngIf="hasError('title', 'required')">
        Le titre est obligatoire
      </p>
      <p *ngIf="hasError('title', 'minlength')">
        min 10 caracteres
      </p>
      <input
        formControlName="image"
        type="url"
        name="image"
        placeholder="image"
      /><br />
      <textarea
        formControlName="content"
        name="content"
        placeholder="contenu"
      ></textarea
      ><br />
      <ng-container formGroupName="details">
        <input
          formControlName="createdAt"
          type="text"
          name="createdAt"
          placeholder="date de creation"
        />
        <br />
        <input
          formControlName="author"
          type="text"
          name="author"
          placeholder="author"
        /> </ng-container
      ><br />

      <h3>Les co-auteurs / relecteurs</h3>

      <ng-container formArrayName="authors">
        <div
          *ngFor="let group of authors.controls; let i = index"
          [formGroupName]="i"
        >
          <input
            formControlName="name"
            type="text"
            placeholder="nom du co-author"
          />
          <input formControlName="role" type="text" placeholder="role" />
          <button type="button" (click)="removeAuthor(i)">X</button>
        </div>
        <button type="button" (click)="addAuthor()">Rajouter</button>
      </ng-container>

      <button>Enregistrer</button>
    </form>
  `,
  styles: [],
})
export class ReactiveFormComponent implements OnInit {
  submitted = false;
  example = {
    id: 12,
    title: 'Title de test',
    image: 'http://placehol.it/200x200',
    content: 'ccntenu de test api',
    details: {
      createdAt: '2020-01-01',
      author: 'Nikola Tupulev',
    },
    authors: [
      { name: 'Formil', role: 'reviewer' },
      { name: 'Rootar', role: 'co-author' },
    ],
  };

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl('', [Validators.required]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    details: new FormGroup({
      createdAt: new FormControl(''),
      author: new FormControl(''),
    }),
    authors: new FormArray([]),
  });

  ngOnInit(): void {
    this.form.patchValue(this.example);

    this.example.authors.forEach((author) => {
      this.authors.push(
        new FormGroup({
          name: new FormControl(author.name),
          role: new FormControl(author.role),
        })
      );
    });
  }

  hasError(inputName: string, errorName: string) {
    return this.form.controls[inputName].hasError(errorName) && this.submitted;
  }

  handleSubmit() {
    this.submitted = true;

    console.log(this.form.value);

    if (this.form.invalid) {
      console.error('non validad');
      return;
    }
    console.log(this.form);
  }

  get authors() {
    return this.form.controls['authors'] as FormArray;
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  addAuthor() {
    this.authors.push(
      new FormGroup({
        name: new FormControl(),
        role: new FormControl(),
      })
    );
  }
}
