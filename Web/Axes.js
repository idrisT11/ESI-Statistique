const nameSpace = "http://www.w3.org/2000/svg";

class Axes{

    constructor(screen, graphInput, precision, axeX, axeY){

        this.screen = screen;
        this.graphInput = graphInput;
        this.precision = precision;
        this.axeX = axeX;
        this.axeY = axeY;

    }

    draw(kulech){
        if (kulech) 
            this.drawAxes();
        
        

        let echelonTable = this.drawEchelons();
        this.drawEchelonsLabel(echelonTable.x, echelonTable.y, echelonTable.maxY);

        this.writeAxesNames();

        this.drawReferenceLines(echelonTable.y);

        return {
            x: echelonTable.x,
            y: echelonTable.y
        }
    }

    drawAxes(){
        let axeX_svg = document.createElementNS( nameSpace, 'line'),
            axeY_svg = document.createElementNS( nameSpace, 'line');

        axeX_svg.setAttribute('stroke', 'rgba(4, 2, 2, 0.5)');
        axeX_svg.setAttribute('stroke-width', '2px');
        axeX_svg.setAttribute('id', 'svg-line');
        axeX_svg.setAttribute('x1', '5%');
        axeX_svg.setAttribute('y1', '92%');
        axeX_svg.setAttribute('x2', '92%');
        axeX_svg.setAttribute('y2', '92%');

        axeY_svg.setAttribute('stroke', 'rgba(4, 2, 2, 0.5)');
        axeY_svg.setAttribute('stroke-width', '2px');
        axeY_svg.setAttribute('id', 'svg-line');
        axeY_svg.setAttribute('x1', '5%');
        axeY_svg.setAttribute('y1', '5%');
        axeY_svg.setAttribute('x2', '5%');
        axeY_svg.setAttribute('y2', '92%');

        this.screen.appendChild(axeX_svg);
        this.screen.appendChild(axeY_svg);

    }

    drawEchelons(){
        var echelon_X_table = [],
            echelon_Y_table = [];

        //Draws the echelons on the x axis 
        //=======================================================================
        let nbEchelon_X = 20/this.precision + 1;
        
        let arr_echelonX_svg = new Array( nbEchelon_X );

        let posEchelonZero_X = 8, // The position of the first echelon to the left ( in '%' )
            posEchelonLast_X = 92,

            stepSize_X = (posEchelonLast_X - posEchelonZero_X) / nbEchelon_X;
        
        for (let i = 0; i < nbEchelon_X; i++) 
        {
            let echelon_X = posEchelonZero_X + stepSize_X * i;
            echelon_X_table.push(echelon_X);


            arr_echelonX_svg[i] = document.createElementNS( nameSpace, 'line');

            arr_echelonX_svg[i].setAttribute('stroke', 'rgba(4, 2, 2, 0.5)');
            arr_echelonX_svg[i].setAttribute('stroke-width', '2px');
            arr_echelonX_svg[i].setAttribute('id', 'svg-line');
            arr_echelonX_svg[i].setAttribute('x1', echelon_X + '%');
            arr_echelonX_svg[i].setAttribute('y1', '91%');
            arr_echelonX_svg[i].setAttribute('x2', echelon_X + '%');
            arr_echelonX_svg[i].setAttribute('y2', '93%');
            
            this.screen.appendChild(arr_echelonX_svg[i]);
        }

        //Draws the echelons on the Y axis
        //=======================================================================
        let max_y_value = Math.max( ... this.graphInput ),
            max_effective_y = getEffectiveMax(max_y_value);//On arrondie par rapport à 100 par le haut
        
        //Ayeh print();

        let nbEchelon_Y =  10;

        let arr_echelonY_svg = new Array( nbEchelon_Y );

        let posEchelonZero_Y = 10, // The position of the first echelon to the left ( in '%' )
            posEchelonLast_Y = 92;

        let stepSize_Y = (posEchelonLast_Y - posEchelonZero_Y) / nbEchelon_Y;
        
        for (let i = 0; i < nbEchelon_Y; i++) 
        {
            let echelon_Y = posEchelonZero_Y + stepSize_Y * i;
            echelon_Y_table.push(echelon_Y);


            arr_echelonY_svg[i] = document.createElementNS( nameSpace, 'line');

            arr_echelonY_svg[i].setAttribute('stroke', 'rgba(4, 2, 2, 0.5)');
            arr_echelonY_svg[i].setAttribute('stroke-width', '2px');
            arr_echelonY_svg[i].setAttribute('id', 'svg-line');
            arr_echelonY_svg[i].setAttribute('x1', '4.5%');
            arr_echelonY_svg[i].setAttribute('y1', echelon_Y + '%');
            arr_echelonY_svg[i].setAttribute('x2', '5.5%');
            arr_echelonY_svg[i].setAttribute('y2', echelon_Y + '%');
            
            this.screen.appendChild(arr_echelonY_svg[i]);
        }

        return {
            x: echelon_X_table,
            y: echelon_Y_table,
            maxY: max_effective_y 
        };
    }

    drawEchelonsLabel(echelon_X_table, echelon_Y_table, max_effective_y){

        let text_x_svg = new Array( echelon_X_table.length - 1 ),
            text_y_svg = new Array( echelon_Y_table.length - 1 );

        for (let i = 0; i < echelon_X_table.length - 1; i++) 
        {
            let text_x_pos = (echelon_X_table[i+1] + echelon_X_table[i]) / 2;
            let innerText = document.createTextNode( generateTextX(i, this.precision) ) ;


            text_x_svg[i] = document.createElementNS( nameSpace, 'text');
            text_x_svg[i].appendChild(innerText);

            
            text_x_svg[i].setAttribute('fill', 'rgba(4, 2, 2, 0.9)');
            text_x_svg[i].setAttribute('text-anchor', 'middle');
            text_x_svg[i].setAttribute('x', text_x_pos + '%');
            text_x_svg[i].setAttribute('y', '95%');
            
            this.screen.appendChild(text_x_svg[i]);
        }

        let stepSize = max_effective_y/10;
        
        for (let i = 0; i < echelon_Y_table.length; i++) 
        {

            let text_y_pos = echelon_Y_table[echelon_Y_table.length-i-1] + 1;
            let innerText = document.createTextNode( stepSize*(i+1) + '') ;

            text_y_svg[i] = document.createElementNS( nameSpace, 'text');
            text_y_svg[i].appendChild(innerText);

            text_y_svg[i].setAttribute('stroke', 'rgba(4, 2, 2, 0.5)');
            text_y_svg[i].setAttribute('font-size', '1em');

            text_y_svg[i].setAttribute('text-anchor', 'end');
            text_y_svg[i].setAttribute('x', '3.5%');
            text_y_svg[i].setAttribute('y', text_y_pos + '%');

        
            this.screen.appendChild(text_y_svg[i]);
            
        }

        function generateTextX(i, precision) {
            let str = '[';

            

            str += precision * i;
            str += ':';
            str += precision * (i+1);

            if ((i + 1) * precision == 20) 
                str += ']';
            else
                str += '[';

            return str;
        } 
    }

    writeAxesNames(){
        let labelAxeX = document.createElementNS( nameSpace, 'text'),
            labelAxeY = document.createElementNS( nameSpace, 'text');

        let innerTextX = document.createTextNode( ""+this.axeX+"" ),
            innerTextY = document.createTextNode( ""+this.axeY+"");

        labelAxeX.appendChild(innerTextX);
        labelAxeY.appendChild(innerTextY);
        
        labelAxeX.setAttribute('fill', 'rgba(4, 2, 2, 0.9)');
        labelAxeX.setAttribute('text-anchor', 'end');
        labelAxeX.setAttribute('id', 'svg-axe-label');
        labelAxeX.setAttribute('font-weight', 'bolder');
        labelAxeX.setAttribute('font-family', 'Arial');

        labelAxeX.setAttribute('x', '92%');
        labelAxeX.setAttribute('y', '95%');

        labelAxeY.setAttribute('fill', 'rgba(4, 2, 2, 0.9)');
        labelAxeY.setAttribute('id', 'svg-axe-label');
        labelAxeY.setAttribute('text-anchor', 'middle');
        labelAxeY.setAttribute('font-weight', 'bolder');
        labelAxeY.setAttribute('font-family', 'Arial');

        //labelAxeY.setAttribute('textLength', '4%');

        labelAxeY.setAttribute('x', '5.5%');
        labelAxeY.setAttribute('y', '5%');

        this.screen.appendChild(labelAxeX);
        this.screen.appendChild(labelAxeY);
    }

    drawReferenceLines(echelon_Y_table){
        
        var ref_line_svg = new Array( echelon_Y_table.length );

        for (let i = 0; i < echelon_Y_table.length; i++) 
        {

            let line_y_pos = echelon_Y_table[i];

            ref_line_svg[i] = document.createElementNS( nameSpace, 'line');

            ref_line_svg[i].setAttribute('stroke', 'rgba(4, 2, 2, 0.5)');
            ref_line_svg[i].setAttribute('stroke-dasharray', '1, 1');

            ref_line_svg[i].setAttribute('text-anchor', 'end');
            ref_line_svg[i].setAttribute('x1', '5%');
            ref_line_svg[i].setAttribute('x2', '91%');

            ref_line_svg[i].setAttribute('y1', line_y_pos + '%');
            ref_line_svg[i].setAttribute('y2', line_y_pos + '%');

        
            this.screen.appendChild(ref_line_svg[i]);
            
        }
    }

}
