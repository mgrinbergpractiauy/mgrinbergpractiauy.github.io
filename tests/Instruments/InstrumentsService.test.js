import axios from 'axios';

import InstrumentsServ from '../../src/services/instrumentsService';


describe('Pruebas InstrumentsService', () => {
 
    test('Prueba', async ()=>{
        const token=['3dd58ab6-bb71-94f8-6107-dc1aff9a3507']; 
        const statusData=await InstrumentsServ.getInstrument(token);
        console.log(statusData);   
    })    

});