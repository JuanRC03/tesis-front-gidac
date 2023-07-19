import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewAreasInvestigacionAdminDataSource, ViewAreasInvestigacionAdminItem } from './view-areas-investigacion-admin-datasource';

@Component({
  selector: 'app-view-areas-investigacion-admin',
  templateUrl: './view-areas-investigacion-admin.component.html',
  styleUrls: ['./view-areas-investigacion-admin.component.css']
})
export class ViewAreasInvestigacionAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewAreasInvestigacionAdminItem>;
  dataSource: ViewAreasInvestigacionAdminDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new ViewAreasInvestigacionAdminDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
