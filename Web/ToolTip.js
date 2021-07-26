class ToolTip{

    constructor(){
        this.screen = document.getElementById('graph');;
        this.svgModal;


        this.state = false; // not displayed
/*
            
        this.svgModal.setAttribute('id', 'graphToolTip');

        this.svgModal.setAttribute('x', 0 + '%');
        this.svgModal.setAttribute('y', 0 + '%');
        this.svgModal.setAttribute('style', '{visibility:hidden }');
        

        this.screen.appendChild(this.svgModal);
*/
        this.displayModal = this.displayModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }


    displayModal(pos_x, pos_y, width, value){
    
        if (this.state)
            this.screen.removeChild(this.svgModal);

        let innerText = document.createTextNode('#' + value);


        this.svgModal = document.createElementNS( nameSpace, 'text');
        this.svgModal.appendChild(innerText);
        

        this.svgModal.setAttribute('text-anchor', 'middle');
        this.svgModal.setAttribute('font-weight', 'bolder');
        this.svgModal.setAttribute('font-family', 'Arial');
        this.svgModal.setAttribute('x', (width/2+pos_x) + '%');
        this.svgModal.setAttribute('y', (pos_y-3) + '%');
        this.svgModal.setAttribute('fill', 'rgba(45, 150, 255, 0.9)');
        
        this.screen.appendChild(this.svgModal);

        this.state = true;
    }  

    hideModal(){
        if (this.state)
            this.screen.removeChild(this.svgModal);

        this.state = false;
    }
}