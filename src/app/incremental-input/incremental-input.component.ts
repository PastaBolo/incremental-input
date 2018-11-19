import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-incremental-input',
  templateUrl: './incremental-input.component.html',
  styleUrls: ['./incremental-input.component.css']
})

export class IncrementalInputComponent implements OnInit {
  @Input() field: FormControl;
  @Input() fieldId: string;
  @Input() minValue = 0;

  private previousValue: string | number;

  ngOnInit(): void {
    this.previousValue = this.field.value;
  }

  increment() {
    this.field.setValue(Number(this.field.value) + 1);
    this.previousValue = this.field.value;
  }

  decrement() {
    this.field.setValue(Number(this.field.value) - 1);
    this.previousValue = this.field.value;
  }

  onInput(value: string): void {
    if (/[^0-9]/.test(value)) {
      this.field.setValue(this.previousValue);
    } else {
      this.previousValue = value;
    }
  }
}
