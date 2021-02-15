import React, {Component} from 'react';
import { Text, View } from 'react-native';

const cidades = [
    {id: 1, nome: 'Florianópolis', created_at: '13-01-2021', updated_at: "13-01-2021"},
    {id: 2, nome: 'Curitiba', created_at: '14-01-2021', updated_at: "14-01-2021"},
    {id: 3, nome: 'Palhoça', created_at: '15-01-2021', updated_at: "15-01-2021"},
];

export default class ListarCidades extends Component{

    constructor(props){
        super(props)
        
        this.state = {
            listadecidades: cidades
        };
    }
    render(){
        console.log(this.state.listadecidades);
        return(
            <View>
                <Text style={{fontSize: 30}}>CIDADES</Text>
                {this.state.listadecidades.map((cidade) => 
                 <View key={cidade.id}>
                     <Text>{cidade.nome}</Text>                        
                 </View>
                )}                
            </View>
        )
    }
}