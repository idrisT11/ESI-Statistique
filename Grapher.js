
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
        
        this.axes = new Axes(this.screen, [0, 20, 152, 285, 20], 4, 'Moyenne', "Nombre d'étudiant");

        this.graphType = GRAPH_TYPE.ACCUMULATIVE;
        this.graphAffichage = GRAPH_AFFICHAGE.BATON;

        this.precision = 1  ; // each unitrefers to 1 "note point" 
        this.graphInput = [];


    }

    draw(){
        this.axes.draw();
    }

    drawRectGraph(){

        var rect_tab_svg = new Array( 20/this.precision );

        for (let i = 0; i < rect_tab_svg.length; i++) 
        {
            rect_tab_svg[i] = document.createElementNS( nameSpace, 'rect');
            
        }


    }

}