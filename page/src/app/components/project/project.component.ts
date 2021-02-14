import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input("project") project: Project;

  constructor() { }

  ngOnInit(): void {}

  public openLink(): void {
    window.open(this.project.url, '_blank');
  }

}
