import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { QuizListComponent } from './quiz-list/quiz-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { AuthGuard } from './auth.guard';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'quiz-list', component: QuizListComponent, canActivate: [AuthGuard] },
  { path: 'answers', component: AnswerListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard] },
  { path: 'take-quiz', component: TakeQuizComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
