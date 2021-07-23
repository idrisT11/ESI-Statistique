

class Router{
    


    static importedData = null;
    static origine = './Data/';
    static trig = null;
    /*
        classe   => (string){1CPI, 2CPI, ...}
        semester => (string){S1, S2, T}   //T for all of the year
        module   => (string){GENERAL, ALGO, ANALYSE, ALGEBRE, ARCHI, ELECTRONIQUE, ELECTRICITE, TEO, ANGLAIS, MDP, BUREAUTIQUE, SFD, POO, TIPE}
    */
    static importData(classe, semester, module, updateInterfaceCallback, school="ESI-SBA"){
        this.trig = this.origine;

        this.generateTrigSchool(school);
        this.generateTrigClass(classe);
        this.generateTrigSemester(semester);
        this.generateTrigModule(module);

        this.executeAjaxRequest(updateInterfaceCallback);
    }

    static executeAjaxRequest(callBack){

        let r = new XMLHttpRequest();
        let self = this;

        r.onload = function() {
            self.importedData = this.responseText;

            callBack();
        }


        r.open("GET", this.trig, true);
        r.send();

    }

    static generateTrigSchool(school){

        if (school == 'ESI-SBA')

            this.trig += 'SBA';

        else if (school == 'ESI-VGATH' || school == 'ESTIN' ) 
            
            this.trig += 'VGATH';

        else if (school == 'ESI-ALGER' ) 
            
            console.error('Mazel khay');

        else

            console.error('Wesh Rak tdir, error: school');
        
        this.trig += '/';
    }

    static generateTrigClass(classe){


        switch (classe) 
        {
            case '1CPI':
                this.trig += '1CPI';
                break;
            
            case '2CPI':
                this.trig += '2CPI';
                break;

            case '1CS':
                console.error('Nchallah, error: classe');
                break;
            case '2CS':
                console.error('Nchallah, error: classe');
                break;
            case '3CS':
                console.error('Nchallah, error: classe');
                break;

            default:
                console.error("Wesh bik, error: classe");
        }

        this.trig += '/';

    }

    static generateTrigSemester(semester){
        if (semester == 'S1')

            this.trig += 'S1';
            

        else if (semester == 'S2' ) 
            
            this.trig += 'S2';


        else if (semester == 'T' ) 
            
            this.trig += 'T';


        else

            console.error('Wesh Rak tdir, error: semester');

         this.trig += '/';

    }


    static generateTrigModule(module){
        console.log(module);
        switch (module)
        {
            case 'GENERAL':
                this.trig += 'general';
                break;

            case 'ANALYSE':
                this.trig += 'analyse';
                break;

            case 'ALGEBRE':
                this.trig += 'algebre';
                break;

            case 'ALGO':
                this.trig += 'algo';
                break; 
            
            case 'ANGLAIS':
                this.trig += 'anglais';
                break; 
            
            case 'ARCHI':
                this.trig += 'archi';
                break; 
            
            case 'ECO':
                this.trig += 'economie';
                break; 
            
            case 'PROBA':
                this.trig += 'proba';
                break; 
            
            case 'SFD':
                this.trig += 'sfd';
                break; 
            
            case 'ELECTRONIQUE':
                this.trig += 'electronique';
                break;
            
            case 'ISI':
                this.trig += 'isi';
                break; 
            
            case 'LOGIQUE':
                this.trig += 'logique';
                break; 
            
            case 'POO':
                this.trig += 'poo';
                break;        

            case 'PPD':
                this.trig += 'PPD';
                break; 
            
            case 'OPTIQUE':
                this.trig += 'optique';
                break; 
                
            case 'BW':
                this.trig += 'bw';
                break; 

            case 'ELECTRICITE':
                this.trig += 'electricite';
                break; 
            case 'SYSTEME':
                this.trig += 'systeme';
                break; 
            case 'TEE':
                this.trig += 'tee';
                break; 

            case 'MDP':
                this.trig += 'mdp';
                break; 

            case 'TEO':
                this.trig += 'teo';
                break; 

            default:
                console.error("Dachu igtran, error : module");
                break;
        }


        this.trig += '.json';
    }


    
}