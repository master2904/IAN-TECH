import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.scss']
})
export class VerComponent implements OnInit {
  historial=[]
  total=0
  constructor(
    public dialogRef: MatDialogRef<VerComponent>,@ Inject(MAT_DIALOG_DATA) public form) {
      this.historial=form      
      this.historial.forEach(w=>{
        this.total+=w.total
      })
    }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }
}
