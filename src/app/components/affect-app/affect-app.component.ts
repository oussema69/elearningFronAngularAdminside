import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { Apprenant } from 'src/app/models/apprenant';


@Component({
  selector: 'app-affect-app',
  templateUrl: './affect-app.component.html',
  styleUrls: ['./affect-app.component.css']
})
export class AffectAppComponent implements OnInit {
  @Input()
app!:Apprenant;
fileUrl="http://localhost:3000/files/get/";
@Output()
affect:EventEmitter<Apprenant>=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
affecter()
{this.affect.emit(this.app)}
}
