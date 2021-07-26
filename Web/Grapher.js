
const GRAPH_TYPE = {
    CUMULATIVE: 1,
    REPARTITION: 0
}
const GRAPH_AFFICHAGE = {
    BAR : 0,
    LIGNE : 1,
}

class Grapher{

    constructor(){

        this.screen = document.getElementById('graph');
        


        this.graphType = GRAPH_TYPE.ACCUMULATIVE;
        this.graphAffichage = GRAPH_AFFICHAGE.BATON;

        this.precision = 0.5  ; // each unitrefers to 1 "note point" 
        this.graphTable = null;//raw
        this.graphInput = null;//treated


        this.axes = new Axes(this.screen, this.graphInput, this.precision,
                 'Notes', "#Students");
    }


    update(){
        //We compute here the graphInput array


        let nbElem = 20/this.precision;


        this.graphInput = new Array(nbElem);

        for (let i = 0; i < this.graphInput.length; i++) 

            this.graphInput[i] = 0;
            
        
        for (const value of this.graphTable) {
            
            let index = Math.floor(value / this.precision);
            
            if (isNaN(index)) 

                continue;
            

            if (index == nbElem) 
                index --;


            if (this.graphType == GRAPH_TYPE.REPARTITION) 
            {
                this.graphInput[index]++;
            }
            else if (this.graphType == GRAPH_TYPE.CUMULATIVE) 
            {
                for (let i = index; i < nbElem; i++) this.graphInput[i]++;
            }

        }
        console.log(this.graphInput);

        this.updateAxes();
    }

    updateAxes(){
        this.axes.graphInput = this.graphInput;
        this.axes.precision = this.precision;
    }

    draw(toolTipDispCallback, toolTipHideCallback){
        this.clearScreen();

        let echelons = this.axes.draw(true);

        if ( this.graphAffichage == GRAPH_AFFICHAGE.BAR ) 
            this.drawRectGraph( echelons.x, echelons.y, toolTipDispCallback , toolTipHideCallback);

        else if ( this.graphAffichage == GRAPH_AFFICHAGE.LIGNE ) 
            this.drawLineGraph( echelons.x, echelons.y, toolTipDispCallback , toolTipHideCallback);

        //this.axes.drawAxes();
        //this.axes.drawEchelons();

    }

    drawRectGraph(echelon_X_table, echelon_Y_table, toolTipDispCallback , toolTipHideCallback){

        
        var rect_tab_svg = new Array( 20 / this.precision );

        let graphMax = Math.max( ... this.graphInput );


        for (let i = rect_tab_svg.length-1; i >= 0; i--) 
        {
                        
            let width = (echelon_X_table[i+1] - echelon_X_table[i])*0.8,
                height = computeHeight(echelon_Y_table, graphMax, this.graphInput[i]);

            let x = echelon_X_table[i] + 0.1 * (echelon_X_table[i+1] - echelon_X_table[i]);
            
            rect_tab_svg[i] = document.createElementNS( nameSpace, 'rect');
            
            rect_tab_svg[i].setAttribute('class', 'graphRect');
            rect_tab_svg[i].setAttribute('fill', '#00c9e5');
            rect_tab_svg[i].setAttribute('stroke', '#00adcc');
            rect_tab_svg[i].setAttribute('stroke-width', '0.4%');

            //rect_tab_svg[i].setAttribute('stroke-dasharray', (width + height) + '% ' + width+'%');


            rect_tab_svg[i].setAttribute('x', x + '%');
            rect_tab_svg[i].setAttribute('y', POS_ZERO_GRAPH.y - height + '%');
            rect_tab_svg[i].setAttribute('width', width + '%');
            rect_tab_svg[i].setAttribute('height', height + '%');
            
            rect_tab_svg[i].addEventListener('mouseenter', ()=>{
                toolTipDispCallback(x, POS_ZERO_GRAPH.y - height, width, this.graphInput[i])
            })
            rect_tab_svg[i].addEventListener('mouseleave', ()=>{
                toolTipHideCallback()
            })

            this.screen.appendChild(rect_tab_svg[i]);
        }


        function computeHeight(echelon_Y_table, graphMax, currentValue) 
        {
            //TODO --
            let etendu = echelon_Y_table[ echelon_Y_table.length - 1 ] - 2,
                effectiveMax = getEffectiveMax(graphMax);

            let rapport = currentValue / effectiveMax;

            return etendu * rapport;

        }
    }

    drawLineGraph(echelon_X_table, echelon_Y_table, toolTipDispCallback , toolTipHideCallback)
    {

        var point_tab_svg = new Array( 20 / this.precision );

        var posTable = new Array( 20 / this.precision );

        let graphMax = Math.max( ... this.graphInput );


        for (let i = point_tab_svg.length-1; i >= 0; i--) 
        {
                        
            let height = computeHeight(echelon_Y_table, graphMax, this.graphInput[i]);

            let x = (echelon_X_table[i+1] + echelon_X_table[i]) / 2,
                y = POS_ZERO_GRAPH.y - height;
            
            posTable[i] = {x:x, y:y};

            point_tab_svg[i] = document.createElementNS( nameSpace, 'circle');
            
            point_tab_svg[i].setAttribute('class', 'graphPoint');
            point_tab_svg[i].setAttribute('fill', '#00adcc');
            point_tab_svg[i].setAttribute('stroke', '#00adcc');
            point_tab_svg[i].setAttribute('stroke-width', '0.4%');

            point_tab_svg[i].setAttribute('cx', x + '%');
            point_tab_svg[i].setAttribute('cy', y + '%');
            point_tab_svg[i].setAttribute('r', 0.4 + '%');            
            

            
        }


        //LINE GENERATION
        let line_tab_svg = new Array(point_tab_svg.length-1);

        for (let i = 0; i < line_tab_svg.length; i++) 
        {

            line_tab_svg[i] = document.createElementNS( nameSpace, 'line');
            
            line_tab_svg[i].setAttribute('class', 'graphLine');
            line_tab_svg[i].setAttribute('stroke', '#00c9e5');
            line_tab_svg[i].setAttribute('stroke-width', '0.4%');

            line_tab_svg[i].setAttribute('x1', posTable[i].x + '%');
            line_tab_svg[i].setAttribute('y1', posTable[i].y + '%');
            line_tab_svg[i].setAttribute('x2', posTable[i+1].x + '%');
            line_tab_svg[i].setAttribute('y2', posTable[i+1].y + '%');    
            this.screen.appendChild(line_tab_svg[i]);    

            this.screen.appendChild(point_tab_svg[i]);
        }
        
        this.screen.appendChild(point_tab_svg[point_tab_svg.length-1]);

            

        
        function computeHeight(echelon_Y_table, graphMax, currentValue) 
        {
            //TODO --
            let etendu = echelon_Y_table[ echelon_Y_table.length - 1 ] - 2,
                effectiveMax = getEffectiveMax(graphMax);

            let rapport = currentValue / effectiveMax;

            return etendu * rapport;

        }
    }

    clearScreen(){
        this.screen.innerHTML = "";
    }


    static extractGraphTable(table, entryToExtract){
        let graphTable = [];
        console.log(table, entryToExtract);
        let index = table[0].indexOf(entryToExtract);

        for (let i = 1; i < table.length; i++) 
        {
            let value = table[i][index].replace(',', '.');//Systeme de virgule francais

            if (!isNaN(value)) 
                graphTable.push( parseFloat( value ) );   

        }

        return graphTable;
    }
}


