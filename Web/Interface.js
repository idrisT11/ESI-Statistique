
class Interface{
    constructor(grapher)
    {
        this.graphMode = GRAPH_AFFICHAGE.BAR;
        this.precision = 2;
        this.graphType = GRAPH_TYPE.REPARTITION;

        this.selectedPrecisionButton = 3;
        this.selectedTypeButton = 0;

        this.precisionButtons = document.getElementsByClassName('precision_buttons');

        this.cumulativeRadios = document.getElementsByClassName('radio_type');

        this.graphModeBarButton = document.getElementById('BAR_GRAPH_MODE_LBL');
        this.graphModeLineButton = document.getElementById('LINE_GRAPH_MODE_LBL');


        //====================================================================================
        //==============GRAPH AFFICHAGE BUTTON================================================
        //====================================================================================
        this.graphModeBarButton.addEventListener('click', ()=>{
            this.graphMode = parseInt(this.graphModeBarButton.value, 10);

            this.graphModeBarButton.style.backgroundColor = '#00c9e5';
            this.graphModeLineButton.style.backgroundColor = 'transparent';

            //this.grapher.lauch();//==================================================
        });

        this.graphModeLineButton.addEventListener('click', ()=>{
            this.graphMode = parseInt(this.graphModeBarButton.value, 10);

            this.graphModeLineButton.style.backgroundColor = '#00c9e5';
            this.graphModeBarButton.style.backgroundColor = 'transparent';

            //this.grapher.lauch();//==================================================
        });

        //====================================================================================
        //==============GRAPH PRECISION BUTTON================================================
        //====================================================================================

        for (let i = 0; i < this.precisionButtons.length; i++) 
        {
            let precisionButton = this.precisionButtons[i];

            precisionButton.addEventListener('click', ()=>{
                this.precision = parseInt(precisionButton.innerHTML, 10);

                precisionButton.setAttribute('id', 'selected_precision_button');
                this.precisionButtons[this.selectedPrecisionButton].removeAttribute('id');
                this.selectedPrecisionButton = i;
                
            });

        }
        //====================================================================================
        //==============GRAPH TYPE RADIO================================================
        //====================================================================================
        //BOF
        for (let i = 0; i < this.cumulativeRadios.length; i++) 
        {
            let cumulativeRadio = this.cumulativeRadios[i];

            cumulativeRadio.addEventListener('click', ()=>{
                this.graphType = parseInt(cumulativeRadio.value, 10);

                cumulativeRadio.setAttribute('id', 'selected_type_button');
                this.cumulativeRadios[this.selectedTypeButton].removeAttribute('id');
                this.selectedTypeButton = i;
                
            });

        }
        

    }
}
