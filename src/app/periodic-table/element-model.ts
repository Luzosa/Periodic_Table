// {
//     "textFrames": [
//       {
//         "font": {
//           "family": "Roboto",
//           "name": "Roboto-Bold",
//           "style": "Bold"
//         },
//         "color": {
//           "r": 255,
//           "g": 255,
//           "b": 255
//         },
//         "text": "2",
//         "size": 7.10226011276245,
//         "x": 1467.8623046875,
//         "y": -101.181640625
//       },
//       {
//         "font": {
//           "family": "Roboto",
//           "name": "Roboto-Bold",
//           "style": "Bold"
//         },
//         "color": {
//           "r": 255,
//           "g": 255,
//           "b": 255
//         },
//         "text": "4.0026",
//         "size": 7.10226011276245,
//         "x": 1516.08203125,
//         "y": -101.181640625
//       },
//       {
//         "font": {
//           "family": "Roboto",
//           "name": "Roboto-Bold",
//           "style": "Bold"
//         },
//         "color": {
//           "r": 255,
//           "g": 255,
//           "b": 255
//         },
//         "text": "HELLIUM",
//         "size": 11.6524600982666,
//         "x": 1478.3916015625,
//         "y": -169.107421875
//       },
//       {
//         "font": {
//           "family": "Roboto",
//           "name": "Roboto-Bold",
//           "style": "Bold"
//         },
//         "color": {
//           "r": 0,
//           "g": 0,
//           "b": 0
//         },
//         "text": "He",
//         "size": 37,
//         "x": 1479.33984375,
//         "y": -116.48046875
//       }
//     ],
//     "name": "He",
//     "paths": [
//       {
//         "color": {
//           "r": 0,
//           "g": 0,
//           "b": 0
//         },
//         "name": "hex-stroke",
//         "points": [
//           [
//             1530.76531053939,
//             151.495386846977
//           ],
//           [
//             1530.76531053939,
//             119.317911500587
//           ],
//           [
//             1502.89879945977,
//             103.229173827392
//           ],
//           [
//             1475.03228838015,
//             119.317911500587
//           ],
//           [
//             1475.03228838015,
//             151.495386846977
//           ],
//           [
//             1502.89879945977,
//             167.584124520174
//           ]
//         ]
//       },
//       {
//         "color": {
//           "r": 64,
//           "g": 223,
//           "b": 255
//         },
//         "name": "highlite",
//         "points": [
//           [
//             1473.8019676334,
//             118.388811121278
//           ],
//           [
//             1532.24719053287,
//             152.361895412168
//           ],
//           [
//             1532.29245709316,
//             152.335758856959
//           ],
//           [
//             1532.29245709316,
//             118.477539524383
//           ],
//           [
//             1502.97036324745,
//             101.54841924211
//           ]
//         ]
//       },
//       {
//         "color": {
//           "r": 1,
//           "g": 212,
//           "b": 255
//         },
//         "name": "hexagon",
//         "points": [
//           [
//             1532.14930335469,
//             152.335767883067
//           ],
//           [
//             1532.14930335469,
//             118.477545438297
//           ],
//           [
//             1502.82722259053,
//             101.548434215911
//           ],
//           [
//             1473.50514182638,
//             118.477545438297
//           ],
//           [
//             1473.50514182638,
//             152.335767883067
//           ],
//           [
//             1502.82722259053,
//             169.264879105453
//           ]
//         ]
//       },
//       {
//         "color": {
//           "r": 75,
//           "g": 75,
//           "b": 77
//         },
//         "name": "bga",
//         "points": [
//           [
//             1539,
//             180.400560302377
//           ],
//           [
//             1466.45435188192,
//             180.400560302377
//           ],
//           [
//             1466.45435188192,
//             111.74059468314
//           ],
//           [
//             1539,
//             111.74059468314
//           ]
//         ]
//       },
//       {
//         "color": {
//           "r": 63,
//           "g": 63,
//           "b": 65
//         },
//         "name": "bgc",
//         "points": [
//           [
//             1539,
//             180.400560302377
//           ],
//           [
//             1466.45435188192,
//             180.400560302377
//           ],
//           [
//             1466.45435188192,
//             98.7069340489452
//           ],
//           [
//             1539,
//             98.7069340489452
//           ]
//         ]
//       }
//     ]
//   }
export class ElementModel {
    //Width of element
    public width: number;
    //height of element
    public height: number;
    
    // X and Y top left corner of element
    public x: number;
    public y: number;

    // a flag to know when the mouse is hovering within the element's bounds
    public isWithinElementalBound = false;
    // a flag to know when the element have been selected
    public isSelected = false;
    // an optional scaling for the canvas
    public scalingFactor: number = 1;

    // a flag to indicate that the instance variables have been set, 
    // no reinstantiating of w, h, x, y. Unless starting a dynamical scaling of the view
    private isInstanceVariableSet = false;

    constructor(public elementModel: any, private ctx: CanvasRenderingContext2D){

    }

    // The function uses the values from 
    // the background rectangle of the element's graphics model
    // to create the logical model for the instance element's rectangle
    private setInstanceVariables(points: any[]): void {
        const x1 = points[0][0];
        const y1 = points[0][1];
        const x2 = points[2][0];
        const y2 = points[2][1];
        this.width = (x1 - x2) * this.scalingFactor;
        this.height = (y1 - y2) * this.scalingFactor;

        // as top left corner of the rectangle
        this.x = points[2][0] * this.scalingFactor;
        this.y = points[2][1] * this.scalingFactor;
        this.isInstanceVariableSet = true;
    }

    // draws the text of the instance
    public drawText(): void {
        // get element models' Textframe
        const textFrames = this.elementModel.textFrames;
        for (let f = 0; f < textFrames.length; f++) {
            //get a textFrame
            const textFrame = textFrames[f];

            // Save state of the canvas
            this.ctx.save();
        
            // update fillstyle if element is within bound
            // fill center text with white
            // fill the rest with the colour from the textframe model
            this.ctx.fillStyle = this.isWithinElementalBound 
                ? `rgb(255, 255, 255)`
                : `rgb(${textFrame.color.r}, ${textFrame.color.g}, ${textFrame.color.b})`;
            // set textbase line to top for proper rengering
            this.ctx.textBaseline = 'top';
            // set the text font
            this.ctx.font = `normal  ${textFrame.size * this.scalingFactor}px Roboto`;
            // rendering of the text
            this.ctx.fillText(textFrame.text, textFrame.x * this.scalingFactor, (textFrame.y * -1) * this.scalingFactor );
            // restore the canvas
            this.ctx.restore();
        }        
    }

    public drawGraphics(): void {
        // Clone the path model, to render the graphics correctly
        const paths = [...this.elementModel.paths];
        // reverse paths, to make the render, render the graphics in the correct order
        const pathItems: any[] = paths.reverse();
        // if this instances logical rectangle is not set
        if(this.isInstanceVariableSet === false){
            // set it based on the background rectangle
            // in the graphics model (first set of points in the path items array)
            
            this.setInstanceVariables(pathItems[0].points);
            
        }

        // for each path item
        for (let j = 0; j < pathItems.length; j++) {
            // get the current path item
            const pathItem = pathItems[j];
            // get the path item's points
            const points = pathItem.points;
            // get the path item's colour
            const colour = pathItem.color;
            // begin the path
            this.ctx.beginPath();

            // for each point
            for (let i = 0; i < points.length; i++) {
                // get the current point
                const point = points[i];
                if(i === 0){
                    // for the first point to move
                    this.ctx.moveTo(point[0] * this.scalingFactor, point[1] * this.scalingFactor);
                }
                else {
                    // else lineTo
                    this.ctx.lineTo(point[0] * this.scalingFactor, point[1] * this.scalingFactor);
                }
            }
            // save the graphic's state
            this.ctx.save();
            // update the canvas fillstyle, from the points colour model
            this.ctx.fillStyle = `rgb(${colour.r}, ${colour.g}, ${colour.b})`
            // Close the path, connecting the first and last path
            this.ctx.closePath();

            // All graphic objects are filled, except for this one 
            if(j !== pathItems.length -1){
                this.ctx.fill();
            }
            else {
                this.ctx.stroke();
            }
            //Restore the state of graphics
            this.ctx.restore();
        }
    }
    
    // clear a particular rectangle, within the canvas view area
    public clear(): void {
        // save canvas state
        this.ctx.save();
        // update fillstyle to black
        this.ctx.fillStyle = `rgb(0, 0, 0)`;
        // clear a given rectangle
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        // fill it with black and avoid white edges
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // restore canvas state
        this.ctx.restore();
    }
}
