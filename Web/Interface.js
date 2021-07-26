//The school variable is declared in the html file

class Interface{
    constructor()
    {
        this.grapher = new Grapher();

        this.graphTable = null;
        this.graphMode = GRAPH_AFFICHAGE.BAR;
        this.precision = 2;
        this.selectedEntry = null;
        this.graphType = GRAPH_TYPE.REPARTITION;

        this.selectedPrecisionButton = 2;
        this.selectedTypeButton = 0;
        this.selectedEntryeButton = 0;
        this.selectedNavButton = document.getElementById('selectedNavButton');//Here it's an html element instead of an integer as for the three variables above


        this.precisionButtons = document.getElementsByClassName('precision_buttons');

        this.cumulativeRadios = document.getElementsByClassName('radio_type_cumu');

        this.graphModeBarButton = document.getElementById('BAR_GRAPH_MODE_LBL');
        this.graphModeLineButton = document.getElementById('LINE_GRAPH_MODE_LBL');

        //NAV
        
        this.navShortcutsButton = document.getElementsByClassName('shortcutsBtn');
        this.navOurChoicesButton = document.getElementsByClassName('ourChoiceBtn');
        this.navcpi1TButton = document.getElementsByClassName('1cpiTBtn');
        this.navcpi1S1Button = document.getElementsByClassName('1cpiS1Btn');
        this.navcpi1S2Button = document.getElementsByClassName('1cpiS2Btn');
        this.navcpi2TButton = document.getElementsByClassName('2cpiTBtn');
        this.navcpi2S1Button = document.getElementsByClassName('2cpiS1Btn');
        this.navcpi2S2Button = document.getElementsByClassName('2cpiS2Btn');//Some shall be undefined

        //ENTRY
        this.entriesCtn = document.getElementById('entry_ctn');



        //====================================================================================
        //==============GRAPH AFFICHAGE BUTTON================================================
        //====================================================================================
        this.graphModeBarButton.addEventListener('click', ()=>{
            this.graphMode = GRAPH_AFFICHAGE.BAR;

            this.graphModeBarButton.style.backgroundColor = '#00c9e5';
            this.graphModeLineButton.style.backgroundColor = 'transparent';


            this.update();

            //this.grapher.lauch();//==================================================
        });

        this.graphModeLineButton.addEventListener('click', ()=>{
            this.graphMode = GRAPH_AFFICHAGE.LIGNE;


            this.graphModeLineButton.style.backgroundColor = '#00c9e5';
            this.graphModeBarButton.style.backgroundColor = 'transparent';

            this.update();
            //this.grapher.lauch();//==================================================
        });

        //====================================================================================
        //==============GRAPH PRECISION BUTTON================================================
        //====================================================================================

        for (let i = 0; i < this.precisionButtons.length; i++) 
        {
            let precisionButton = this.precisionButtons[i];

            precisionButton.addEventListener('click', ()=>{
                this.precision = parseFloat(precisionButton.innerHTML, 10);

                precisionButton.setAttribute('id', 'selected_precision_button');
                this.precisionButtons[this.selectedPrecisionButton].removeAttribute('id');
                this.selectedPrecisionButton = i;
                
                this.update();
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
                console.log('hallo');
                this.update();
            });

        }
        

        //====================================================================================
        //==============Navigation links to charge new data===================================
        //====================================================================================    
        this.generateNavigationLinks();


        //ImportData The INIT
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Router.importData(...navShortcutsButtonLinks[0], this.update.bind(this, true), schoolID);

    }

    generateNavigationLinks(){

        let self = this;

        //for the shortCuts buttons

        for (let i = 0; i < this.navShortcutsButton.length; i++) 
        {
            let btn = this.navShortcutsButton[i];

            btn.addEventListener('click', ()=>{

                Router.importData(...navShortcutsButtonLinks[i], self.update.bind(self, true), schoolID);

                this.selectedNavButton.removeAttribute('id');
                btn.setAttribute('id', 'selectedNavButton');
                this.selectedNavButton = btn;
            });

        }

        //for the ourChoice buttons
        for (let i = 0; i < this.navOurChoicesButton.length; i++) 
        {
            let btn = this.navOurChoicesButton[i];

            btn.addEventListener('click', ()=>{

                Router.importData(...navOurChoiceButtonsLinks[i], self.update.bind(self, true), schoolID);

                this.selectedNavButton.removeAttribute('id');
                btn.setAttribute('id', 'selectedNavButton');
                this.selectedNavButton = btn;
            });

        }
        
        //For the full list 
        for (let i = 0; i < this.navcpi1TButton.length; i++) 
        {
            let btn = this.navcpi1TButton[i];

            btn.addEventListener('click', ()=>{

                Router.importData(...cpi1TButtonsLinks[i], self.update.bind(self, true), schoolID);

                this.selectedNavButton.removeAttribute('id');
                btn.setAttribute('id', 'selectedNavButton');
                this.selectedNavButton = btn;
            });

        }  
        
        //1cpi s1
        for (let i = 0; i < this.navcpi1S1Button.length; i++) 
        {
            let btn = this.navcpi1S1Button[i];

            btn.addEventListener('click', ()=>{

                Router.importData(...cpi1S1ButtonsLinks[i], self.update.bind(self, true), schoolID);
                
                this.selectedNavButton.removeAttribute('id');
                btn.setAttribute('id', 'selectedNavButton');
                this.selectedNavButton = btn;

            });

        }  

        //1cpi s2
        for (let i = 0; i < this.navcpi1S2Button.length; i++) 
        {
            let btn = this.navcpi1S2Button[i];
        
            btn.addEventListener('click', ()=>{
        
                Router.importData(...cpi1S2ButtonsLinks[i], self.update.bind(self, true), schoolID);
                
                this.selectedNavButton.removeAttribute('id');
                btn.setAttribute('id', 'selectedNavButton');
                this.selectedNavButton = btn;
        
            });
        
        }  
        //2cpi T
        for (let i = 0; i < this.navcpi2TButton.length; i++) 
        {
            let btn = this.navcpi2TButton[i];

            btn.addEventListener('click', ()=>{

                Router.importData(...cpi2TButtonsLinks[i], self.update.bind(self, true), schoolID);

                this.selectedNavButton.removeAttribute('id');
                btn.setAttribute('id', 'selectedNavButton');
                this.selectedNavButton = btn;
            });

        }  
        
        //2cpi s1
        for (let i = 0; i < this.navcpi2S1Button.length; i++) 
        {
            let btn = this.navcpi2S1Button[i];

            btn.addEventListener('click', ()=>{

                Router.importData(...cpi2S1ButtonsLinks[i], self.update.bind(self, true), schoolID);
                
                this.selectedNavButton.removeAttribute('id');
                btn.setAttribute('id', 'selectedNavButton');
                this.selectedNavButton = btn;

            });

        }  

        //2cpi s2
        for (let i = 0; i < this.navcpi2S2Button.length; i++) 
        {
            let btn = this.navcpi2S2Button[i];
        
            btn.addEventListener('click', ()=>{
        
                Router.importData(...cpi2S2ButtonsLinks[i], self.update.bind(self, true), schoolID);
                
                this.selectedNavButton.removeAttribute('id');
                btn.setAttribute('id', 'selectedNavButton');
                this.selectedNavButton = btn;
        
            });
        
        }    
    }


    update(entryMaj=false){
        let jsonData = JSON.parse(Router.importedData);

        if(entryMaj)
            this.updateEntries(jsonData);

        this.graphTable = Grapher.extractGraphTable(jsonData, this.selectedEntry);

        this.setGrapher();

        this.grapher.update();
        this.grapher.draw();
    }

    setGrapher(){
        this.grapher.precision = this.precision;
        this.grapher.graphType = this.graphType;
        this.grapher.graphAffichage = this.graphMode;
        this.grapher.graphTable = this.graphTable;

    }

    updateEntries(jsonData){//TODO NOW !!!

        let entriesList = jsonData[0];

        
        this.selectedEntry = jsonData[0][0];
        this.selectedEntryeButton = 0;

        this.entriesCtn.innerHTML = "";

        for (let i = 0; i < entriesList.length; i++) 
        {
            let entryHtmlElem = document.createElement('button');
            let entryName = entriesList[i].charAt(0).toUpperCase() + entriesList[i].toLowerCase().slice(1);

            entryHtmlElem.setAttribute('class', 'radio_type_entry');
            entryHtmlElem.setAttribute('value', i.toString() );

            entryHtmlElem.appendChild(document.createTextNode( entryName ) );

            entryHtmlElem.addEventListener('click', ()=>{
                let index = parseInt(entryHtmlElem.value);

                this.entriesCtn.children[ this.selectedEntryeButton ].removeAttribute('id');
                this.entriesCtn.children[ index ].setAttribute('id', 'selected_entry_button');

                this.selectedEntryeButton = index;
                this.selectedEntry = entriesList[index];

                this.update();
            });


            this.entriesCtn.appendChild(entryHtmlElem);
        }

        this.entriesCtn.firstChild.setAttribute('id', 'selected_entry_button');


        
    }
}
