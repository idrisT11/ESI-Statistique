
const GRAPH_TYPE = {
    ACCUMULATIVE: 0,
    REPARTITION: 1,
}
const GRAPH_AFFICHAGE = {
    BATON : 0,
    LIGNE : 1,
}

class Grapher{

    constructor(table){

        this.screen = document.getElementById('graph');
        


        this.graphType = GRAPH_TYPE.ACCUMULATIVE;
        this.graphAffichage = GRAPH_AFFICHAGE.BATON;

        this.precision = 1  ; // each unitrefers to 1 "note point" 
        this.graphInput = [0, 30, 152, 285, 20, 12, 153, 98, 302, 56,
            0, 30, 152, 285, 20, 12, 153, 98, 302, 56];

            this.axes = new Axes(this.screen, this.graphInput, this.precision,
                 'Moyenne', "Nombre d'étudiant");


    }

    draw(){
        let echelons = this.axes.draw(true);

        this.drawRectGraph( echelons.x, echelons.y );

        //this.axes.drawAxes();
        //this.axes.drawEchelons();

    }

    drawRectGraph(echelon_X_table, echelon_Y_table){

        
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
            rect_tab_svg[i].setAttribute('y', 92-height + '%');
            rect_tab_svg[i].setAttribute('width', width + '%');
            rect_tab_svg[i].setAttribute('height', height + '%');
            
            

            this.screen.appendChild(rect_tab_svg[i]);
        }


        for (let i = 0; i < rect_tab_svg.length; i++) {
            rect_tab_svg[i].addEventListener('mouseenter', (e)=>{


            })
            
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

    drawLineGraph(echelon_X_table, echelon_Y_table){

    }

}


