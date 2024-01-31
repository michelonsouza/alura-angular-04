import { Item } from 'src/app/interfaces/iItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListaDeCompraService {
  private listaDeCompra: Item[] = [];

  constructor() {
    this.listaDeCompra = JSON.parse(
      localStorage.getItem('items') || '[]'
    ) as Item[];
  }

  async getListaDeCompra() {
    return new Promise<Item[]>((resolve) => {
      resolve(this.listaDeCompra);
    });
  }

  criarItem(name: string) {
    const id = this.listaDeCompra.length + 1;
    const item: Item = {
      id,
      nome: name,
      data: new Date().toLocaleString('pt-BR'),
      comprado: false,
    };

    return item;
  }

  adicionarItemNaList(nome: string) {
    const item = this.criarItem(nome);
    this.listaDeCompra.push(item);
    // this.atualizarLocalStorage();
  }

  editarItemDaLista(itemAntigo: Item, nomeEditadoDoItem: string) {
    const itemEditado: Item = {
      ...itemAntigo,
      nome: nomeEditadoDoItem,
    };

    this.listaDeCompra.splice(Number(itemAntigo.id) - 1, 1, itemEditado);
    // this.atualizarLocalStorage();
  }

  excluirItemDaLista(id: string | number) {
    const index = this.listaDeCompra.findIndex((i) => i.id === id);
    this.listaDeCompra.splice(index, 1);
  }

  clearList() {
    this.listaDeCompra = [];
  }

  atualizarLocalStorage() {
    localStorage.setItem('items', JSON.stringify(this.listaDeCompra));
  }
}
