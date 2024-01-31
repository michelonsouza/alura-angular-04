import { Component, DoCheck, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ListaDeCompraService } from './service/lista-de-compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'app-lista-de-compras';

  listDeCompras!: Item[];

  itemParaSerEditado!: Item;

  constructor(private service: ListaDeCompraService) {}

  async ngOnInit(): Promise<void> {
    this.listDeCompras = await this.service.getListaDeCompra();
  }

  ngDoCheck(): void {
    this.service.atualizarLocalStorage();
  }

  editarItem(item: Item) {
    this.itemParaSerEditado = item;
  }

  deletarItem(id: string | number) {
    this.service.excluirItemDaLista(id);
  }

  clearList() {
    this.listDeCompras = [];
    this.service.clearList();
  }
}
