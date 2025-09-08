import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {}
