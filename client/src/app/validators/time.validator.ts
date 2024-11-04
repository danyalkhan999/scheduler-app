import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const timeMismatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const startTime = control.get('start_time')?.value;
    const endTime = control.get('end_time')?.value;

    // Only validate if both start and end times are valid numbers
    if (typeof startTime === 'number' && typeof endTime === 'number') {
        return startTime < endTime ? null : { timeMismatch: true };
    }

    return null;
};
