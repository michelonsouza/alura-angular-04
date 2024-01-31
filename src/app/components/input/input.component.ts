import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnChanges {
  @Input()
  itemQueVaiSerEditado!: Item;

  editando = false;

  textBtn = 'Salvar item';

  valorItem: string = '';

  constructor(private service: ListaDeCompraService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['itemQueVaiSerEditado'].firstChange) {
      this.editando = true;
      this.textBtn = 'Editar item';
      this.valorItem = changes['itemQueVaiSerEditado'].currentValue?.nome;
    }
  }

  editarItem() {
    this.service.editarItemDaLista(this.itemQueVaiSerEditado, this.valorItem);
    this.clearInput();
    this.editando = false;
    this.textBtn = 'Salvar item';
  }

  adicionarItem() {
    this.service.adicionarItemNaList(this.valorItem);
    this.clearInput();
  }

  clearInput() {
    this.valorItem = '';
  }
}
