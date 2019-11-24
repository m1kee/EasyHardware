import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { IStore } from '../../../domain/store';
import { StoreService } from '../../../services/store.service';
import { faSearch, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IStockFilters } from '../../../domain/stock-filters';
import { StockService } from '../../../services/stock.service';
import { IStock } from '../../../domain/stock';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-stock-crud',
    templateUrl: './stock-crud.component.html',
    styleUrls: ['./stock-crud.component.css']
})
export class StockCrudComponent implements OnInit {

    dropdownSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'Id',
        textField: 'Name',
        allowSearchFilter: true,
        searchPlaceholderText: 'Ingrese el nombre de la sucursal',
        noDataAvailablePlaceholderText: 'No hay sucursales',
        enableCheckAll: true,
        selectAllText: 'Seleccionar todas',
        unSelectAllText: 'Desmarcar todas',
    };
    loading: boolean = false;
    icons: any = {
        faSearch: faSearch,
        faEdit: faEdit
    };
    stores: IStore[] = [];
    filters: IStockFilters = {
        ProductName: null,
        Stores: null
    };
    stocks: IStock[] = [];
    paginationConfig: any = {
        itemsPerPage: 15,
        currentPage: 1,
        totalItems: this.stocks.length
    };
    constructor(private storeService: StoreService, private stockService: StockService, private toastrService: ToastrService) { }

    ngOnInit() {
        this.getAllStores();
    }

    public getAllStores() {
        this.loading = true;
        this.storeService.getAll().subscribe((stores: IStore[]) => {
            this.stores = stores;
            this.loading = false;
        });
    };
    public getAllStocks() {
        this.loading = true;
        this.stockService.getAll(this.filters).subscribe((stocks: IStock[]) => {
            this.stocks = stocks;
            this.loading = false;
        });
    };
    public edit(stock: IStock) {

        if (stock.Quantity < 0) {
            this.toastrService.error("La cantidad debe ser cero o mayor.", "Error");
            return;
        }

        this.loading = true;
        this.stockService.put(stock.Id, stock).subscribe((stock: IStock) => {
            this.loading = false;
            this.toastrService.success("Editado correctamente.", "Stock");
        },
        (error) => {
            this.toastrService.success(error.Message, "Error");
        });
    };
    pageChanged(event) {
        this.paginationConfig.currentPage = event;
    };
}
