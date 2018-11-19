import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { IncrementalInputComponent } from './incremental-input.component';

describe('IncrementalInputComponent', () => {
  const defaultValue = 5;
  let fixture: ComponentFixture<IncrementalInputComponent>;
  let component: IncrementalInputComponent;
  let decrementButton: HTMLButtonElement;
  let incrementButton: HTMLButtonElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ IncrementalInputComponent ]
    });

    fixture = TestBed.createComponent(IncrementalInputComponent);
    component = fixture.componentInstance;

    component.field = new FormControl(defaultValue);
    fixture.detectChanges();

    [decrementButton, incrementButton] =
    fixture.debugElement
    .queryAll(By.css('button'))
    .map(el => el.nativeElement);

    input = fixture.debugElement.query(By.css('input')).nativeElement;

  });

  describe('clicking on decrement and increment buttons', () => {
    it('should decrement the field value', () => {
      decrementButton.click();
      expect(component.field.value).toEqual(defaultValue - 1);
    });

    it('should increment the field value', () => {
      incrementButton.click();
      expect(component.field.value).toEqual(defaultValue + 1);
    });
  });

  describe('filling the input', () => {
    it('should set the field value for a valid value', () => {
      const newValue = '10';

      input.value = newValue;
      input.dispatchEvent(new Event('input'));
      expect(component.field.value).toEqual(newValue);
    });

    it('should do nothing for an invalid value', () => {
      const newValue = 'invalid value 123';

      input.value = newValue;
      input.dispatchEvent(new Event('input'));
      expect(component.field.value).toEqual(defaultValue)
    });

    it('should not change last value for an new invalid value', () => {
      const firstValue = '10';
      const secondValue = 'invalid value 123';

      input.value = firstValue;
      input.dispatchEvent(new Event('input'));
      expect(component.field.value).toEqual(firstValue);

      input.value = secondValue;
      input.dispatchEvent(new Event('input'));
      expect(component.field.value).toEqual(firstValue);
    });
  });

  describe('disabling the decrement button', () => {
    const minValue = defaultValue - 1;

    beforeEach(() => {
      component.minValue = minValue;
      fixture.detectChanges();
    });

    it('decrementing the value to the min value disable the button', () => {
      decrementButton.click();
      fixture.detectChanges();
      expect(component.field.value).toEqual(minValue);
      expect(decrementButton.disabled).toBeTruthy();
      decrementButton.click();
      expect(component.field.value).toEqual(minValue);
    });

    it('entering a value lower than the min value disable the button', () => {
      input.value = String(minValue - 1);
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(decrementButton.disabled).toBeTruthy();
    });

    it('entering the min value disable the button', () => {
      input.value = String(minValue);
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(decrementButton.disabled).toBeTruthy();
    });

    it('having a value higher than the min value enable the button', () => {
      expect(decrementButton.disabled).toBeFalsy();
    });
  })
});
