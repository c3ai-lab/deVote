import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill.interface';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input("skill") skill: Skill;

  constructor() { }

  ngOnInit(): void {
  }

}
