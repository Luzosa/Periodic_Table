import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Custom
import { PeriodicTableModel } from './periodic-table-model';
import { ElementModel } from './element-model';
//Services
import { PeriodicDataModelService } from './periodic-data-model.service';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css']
})
export class PeriodicTableComponent implements AfterViewInit, OnDestroy {

  // Json Model for periodic table
  private model: PeriodicTableModel;
  
  // Display list, to identify which element is being interacted with
  private elementDisplayList: ElementModel[] = [];
  
  
  // Reference to html canvas element
  @ViewChild('canvas') public canvas: ElementRef;

  // Reference to canvas rendering
  private ctx: CanvasRenderingContext2D;


  constructor(private periodicDataModelService: PeriodicDataModelService) {

    
   }
  
  public ngAfterViewInit(): void {
    // Setting the Data Model, for the periodic table
    this.model = this.periodicDataModelService.getPeriodTableDataModel();

    // Set the canvas rendering
    this.setCanvasRendering2D();

    // Initialize height and widht
    this.initializeCanvasWidthAndHeight();

    // Fill canvas background colour
    this.fillBackground();

    // Initialize Elements
    this.initializeElements();

  }

  // Set canvas rendering for component instance
  private setCanvasRendering2D(): void{
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  // Initialise canvas width and height
  private initializeCanvasWidthAndHeight(): void{
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    const width = canvasElement.width = 1748;
    const height = canvasElement.height = 963;
  }

  // Fill the canvas' background with the colour Black
  private fillBackground(width: number = 1748, height: number = 963): void {
    this.ctx.fillRect(0, 0, width, height);
  }


  // A function to initialize the Display List
  // the periodic table 
  private initializeElements(){
    // Get the element array from the periodic table model
    const elements = this.model.elements;
    for (let j = 0; j < elements.length; j++) {
      // for each element create a new instance of the element model
      // and pass the data into the canvas renderer
      const element = new ElementModel(elements[j], this.ctx);
      
      // Draw element graphic
      element.drawGraphics();
      // Draw element Text
      element.drawText();
      // Add element to display list
      this.elementDisplayList.push(element);

    }
  }

  //set an element to the selected element
  private setSelectedElement(element: ElementModel): void {
    let j = -1;
    // loop through the whole list and set is selected to 
    // false for the current isSelected
    while (++j < this.elementDisplayList.length){
      const e = this.elementDisplayList[j];
      if(e.isSelected) {
        e.isSelected = false;
      }
    }
    // set the new selected element's isSelected
    // property to true
    element.isSelected = true;

  }


  // handle onMouseMove for hovering effect
  // and onClick from selected element
  private onMouseAction(pageX: number, pageY: number, navigate: boolean): void {
    let x = pageX;
    let y = pageY;
    
    // subtract any left or top offset when the mouse clicks
    // currently the canvas is full screen so this would 
    // come into use if the canvas where within some
    // other larger frame
    x -= this.canvas.nativeElement.offsetLeft;
    y -= this.canvas.nativeElement.offsetTop;
    let j = -1;
    while(++j < this.elementDisplayList.length){
      const element = this.elementDisplayList[j];

      //perform a hit test on the area of the element
      if((y >= element.y) && (y <= element.y + element.height) && (x >= element.x) && (x <= element.x + element.width)) {
        // use the navigate flag to short circuit the statement 
        // in the case of a click
        // otherwise use the isWithinElementBounds check to
        // drive the selected element behavior
        if(navigate || element.isWithinElementalBound === false){
          // track mouse when inside bound
          // to prevent more than one rendering pass from happening
          element.isWithinElementalBound = true;
          //if the element is clicked
          if(navigate){
            // set selected element
           this.setSelectedElement(element);

           /* //update route via element name
            this.router.navigate([`/${element.elementModel.name}`]);*/
          }
          // clear and re-render graphic and text
          element.clear();
          element.drawGraphics();
          element.drawText();
        }
      }
      else {
        // if the mouse is within element bounds and
        // the element is not selected re render 
        // the graphics and text when on mouse out
        if(element.isWithinElementalBound && !element.isSelected) {
          element.isWithinElementalBound = false;
          element.clear();
          element.drawGraphics();
          element.drawText();
        }

      }
    }
  }

  // on click handler for the canvas
  public onClick(eventObject: MouseEvent): void {
    this.onMouseAction(eventObject.pageX, eventObject.pageY, true);
  }
  // on mouse move handler for the canvas
  public onMouseMove(eventObject: MouseEvent): void {
    this.onMouseAction(eventObject.pageX, eventObject.pageY, false);
  }


  public ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
 

}
