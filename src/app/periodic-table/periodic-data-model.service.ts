import { Injectable } from '@angular/core';

//custom
import { PeriodicTableModel } from './periodic-table-model';

@Injectable({
  providedIn: 'root'
})
export class PeriodicDataModelService {

  constructor() { }

  //returns a new instance of periodTableModel
  public getPeriodTableDataModel(): PeriodicTableModel {
    return new PeriodicTableModel();
  }
}
