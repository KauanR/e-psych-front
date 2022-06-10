import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(
        private snackbar: MatSnackBar
    ) {}

    open(message: string, type: 'success' | 'alert' | 'error' | 'info', duration = 5000): void {
        this.snackbar.open(
            message,
            'OK',
            {
                panelClass: type,
                duration,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
            }
        )
    }

}