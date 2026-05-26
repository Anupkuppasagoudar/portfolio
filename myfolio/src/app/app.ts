import { Component, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { DaysUntilPipe } from './customPipes/days-until-pipe';
import { RemoveExtensionPipe } from './customPipes/remove-extension-pipe';
import { TitleCasePipe,  } from '@angular/common'; 



interface GitHubFile {
  name: string;
  download_url: string;
  html_url: string;
  contentContent?: string; 
}

@Component({
  selector: 'app-root',
  imports: [ MatToolbarModule, MatTabsModule, MatIcon, MatExpansionModule,MatGridListModule,DaysUntilPipe,MatDividerModule,MatChipsModule,MatProgressSpinnerModule,MarkdownComponent,TitleCasePipe,RemoveExtensionPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {

  protected readonly title = signal('MyFolio');
  readonly panelOpenState = signal(false);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchArticles();
  }

  lwd = '2026-07-27'; 

  tiles = [
  { label: 'Experience', value: '4.5+ Years', cols: 2, rows: 1 },
  { label: 'Primary Stack', value: '.NET & Angular', cols: 2, rows: 1 },
  { label: 'Database', value: 'PostgreSQL, SQL, and MongoDb', cols: 1, rows: 1 },
  { label: 'Status', value: 'Serving Notice LWD July 27, 2026', cols: 3, rows: 1 }
];

 techStack = [
  { 
    name: '.NET Core', 
    description: 'High-performance backend development with C# and Web API.', 
    usage: 'Architecting scalable business logic, robust RESTful APIs, and enterprise-grade data layers.' 
  },
  { 
    name: 'Angular 15+', 
    description: 'Modern frontend framework for building enterprise SPAs.', 
    usage: 'Developing state-driven user interfaces, complex dashboards, and clean, reusable component architectures.' 
  },
  { 
    name: 'Python', 
    description: 'Dynamic scripting, automation, and AI/ML orchestration.', 
    usage: 'Building next-generation Model Context Protocol (MCP) servers and exploring advanced AI/ML models.' 
  },
  { 
    name: 'SQL Server / PostgreSQL', 
    description: 'Advanced relational database design and query optimization.', 
    usage: 'Managing high-integrity relational data, writing optimized queries, and handling session validations.' 
  },
  { 
    name: 'MongoDB', 
    description: 'NoSQL database for flexible, document-based data storage.', 
    usage: 'Managing unstructured datasets and rapid prototyping for highly dynamic application features.' 
  },
  { 
    name: 'GitHub', 
    description: 'Version control and source code management platform.', 
    usage: 'Collaborating securely across teams, managing isolated feature branches, and tracking release code.' 
  }
];

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

  interests = ['Web Development', 'Hiking', 'Tech Blogging', 'Traveling',]
  loadingArticles = signal<boolean>(true);
  articles = signal<GitHubFile[]>([]);


fetchArticles() {
  // Correct API Endpoint
  const repoUrl = 'https://api.github.com/repos/Anupkuppasagoudar/Anupkuppasagoudar/contents/contents';
  
  this.http.get<GitHubFile[]>(repoUrl).subscribe({
    next: (files) => {
      // 1. Filter for markdown files
      const mdFiles = files.filter(f => f.name.endsWith('.md'));
      
      // 2. Update the signal
      this.articles.set(mdFiles);
      
      // 3. Set loading to false
      this.loadingArticles.set(false);
    },
    error: (err) => {
      console.error('GitHub API Error:', err);
      this.loadingArticles.set(false);
    }
  });
}


  loadArticleContent(article: GitHubFile) {
  if (!article.contentContent) {
    this.http.get(article.download_url, { responseType: 'text' }).subscribe(content => {
      article.contentContent = content;
      this.articles.update(current => [...current]);
    });
  }
}
}
