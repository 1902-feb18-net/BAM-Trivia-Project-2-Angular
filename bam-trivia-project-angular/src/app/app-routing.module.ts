import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { QuizListComponent } from './quiz-list/quiz-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnswerListComponent } from './answer-list/answer-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'answers', component: AnswerListComponent },
  { path: 'dashboard', component: DashboardComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
