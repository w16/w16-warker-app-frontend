export interface PostosData {
    id: number;
    reservatorio: number;
    coords: {
        latitude: number;
        longitude: number;
    };
    distancia?: number;
    updated_at: TimeRanges;
    created_at: TimeRanges;
}


/** interface para objeto de número variável de parâmetros associados aos dados de usuário */
export interface userData {
    [key: string]: string;
}
    
export interface handlerFunction {
    (data: userData): Promise<boolean>;
}
