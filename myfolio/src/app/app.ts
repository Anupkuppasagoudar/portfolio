import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';

import { DaysUntilPipe } from './customPipes/days-until-pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatTabsModule, MatIcon, MatExpansionModule,MatGridListModule,DaysUntilPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('MyFolio');
  readonly panelOpenState = signal(false);

  lwd = '2026-07-27'; 

  tiles = [
  { label: 'Experience', value: '4.5+ Years', cols: 2, rows: 1 },
  { label: 'Primary Stack', value: '.NET & Angular', cols: 2, rows: 1 },
  { label: 'Database', value: 'PostgreSQL, SQL, and MongoDb', cols: 1, rows: 1 },
  { label: 'Status', value: 'Serving Notice LWD July 27, 2026', cols: 3, rows: 1 }
];

  techStack = [
    { name: '.NET', description: 'Backend development with C# and Web API.' },
    { name: 'Angular 15', description: 'Frontend framework for building SPAs.' },
    { name: 'PostgreSQL', description: 'Relational database management.' },
    { name: 'MongoDB', description: 'NoSQL database for flexible data storage.' },
    { name: 'GitHub', description: 'Version control and collaboration platform.' }
  ]

  experience = [
    { company: 'Mphasis', period: 'Oct 2022 - Present', role: 'DotNet FullStack Engineer',
      responsibilities: [
      'End-to-end ownership of the Invoice Management module.',
      'Migration of legacy services to .NET Core and Angular 15.',
      'Optimizing PostgreSQL queries to reduce report generation time by 30%.',
      'Implementing voice-to-text features for hands-free data entry.'
    ]
     },
    { company: 'Baygrape Technologies Solutions ', period: 'Jan 2022 - Oct 2024', role: 'Software Developer', 
      responsibilities: [
      'Assisted in developing and maintaining web applications.',
      'Worked with team members to identify and resolve issues.',
      'Contributed to code reviews and documentation.'
    ] }
  ]

  softSkills = ['Agile Methodology', 'Team Leadership', 'Problem Solving', 'Public Speaking']

}
