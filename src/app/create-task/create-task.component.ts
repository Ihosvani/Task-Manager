import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '@prisma/client';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  taskAdded: boolean = false;
  nameIsInvalid: boolean = false;
  dateIsInvalid: boolean = false;
  timeIsInvalid: boolean = false;

  task: Task = {
    name: 'Default',
    date: 'Default',
    time: 'Default',
    id: 0,
    authorId: 0,
    description: null
  };

  constructor(private formBuilder: FormBuilder) { }

  taskForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: '',
    date: ['', Validators.required],
    time: ['', Validators.required]
  })

  onSubmit(): void{

    // this.nameIsInvalid = !Boolean(this.taskForm.get('name')?.valid);
    // this.dateIsInvalid = !Boolean(this.taskForm.get('date')?.valid);
    // this.timeIsInvalid = !Boolean(this.taskForm.get('time')?.valid);

    // if(this.taskForm.valid){
    //   this.task = {
    //     name: this.taskForm.get('name')?.value,
    //     description:  this.taskForm.get('description')?.value,
    //     date: this.taskForm.get('date')?.value,
    //     time: this.taskForm.get('time')?.value
    //   }

    //   this.taskForm.get('name')?.setValue('');
    //   this.taskForm.get('date')?.setValue('');
    //   this.taskForm.get('time')?.setValue('');
    // }


  }

  ngOnInit(): void {
  }

}
