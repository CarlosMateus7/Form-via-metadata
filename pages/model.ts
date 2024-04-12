export interface Fields {
    id: string;
    type: string;
    name: string;
    dataUri?: string;
  }
  
  export interface Metadados {
    id: string;
    title: string;
    fields: Fields[];
  }
  
  export interface Dados {
    imageUri: string;
    text: string;
    link: string;
  }
  
  export interface DataUri {
    id: string;
    parent:string;
    data: Dados[];
  }