import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Task } from '@prisma/client';
import { Apollo } from 'apollo-angular';
import { User } from 'server/@generated/prisma-graphql/user';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  task?: Task;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly $storageMap: StorageMap,
    private readonly $apollo : Apollo
    ) {}

  taskForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: '',
    date: ['', Validators.required],
    time: ['', Validators.required]
  })

  onSubmit(): void{

    if(this.taskForm.invalid){
      return;
    }


    this.task = {
      id : 0,
      name: this.taskForm.get('name')?.value,
      description:  this.taskForm.get('description')?.value,
      date: this.taskForm.get('date')?.value,
      time: this.taskForm.get('time')?.value,
      authorId: (this.$storageMap.get('user') as unknown as User)?.id
    }

    this.taskForm.get('name')?.setValue('');
    this.taskForm.get('date')?.setValue('');
    this.taskForm.get('time')?.setValue('');

  }

  ngOnInit(): void {
  }

}
