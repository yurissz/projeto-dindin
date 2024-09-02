export interface IRegistro {
    id: number,
    tipo: string,
    descricao: string,
    valor: number,
    data: string,
    usuario_id: number,
    categoria_id: number,
    categoria_nome: string
}

export interface IRegistroProp {
    registro: IRegistro
}