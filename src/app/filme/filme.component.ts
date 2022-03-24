import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.scss'],
})
export class FilmeComponent implements OnInit {
  type = '';
  id = '';
  url = '';
  filmes: any;
  filme: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type === 'trending') {
      this.url = 'http://localhost:4200/assets/data/trending-filmes.json';
    }
    if (this.type === 'theatre') {
      this.url = 'http://localhost:4200/assets/data/theatre-filmes.json';
    }
    if (this.type === 'popular') {
      this.url = 'http://localhost:4200/assets/data/popular-filmes.json';
    }
    this.getFilme();
  }

  getFilme() {
    this.http.get(this.url).subscribe((filmes) => {
      this.filmes = filmes;
      let index = this.filmes.findIndex(
        (filme: { id: string }) => filme.id == this.id
      );
      if (index > -1) {
        this.filme = this.filmes[index];
      }
    });
  }
}