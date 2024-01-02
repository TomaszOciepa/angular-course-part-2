import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClientsService } from '../../core/services/clients.service';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../core/models/client.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { merge, startWith, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalCount = 0;

  displayedColumns: string[] = [
    'id',
    'firstname',
    'surname',
    'email',
    'buttons',
  ];

  dataSource!: MatTableDataSource<Client>;

  constructor(private clientsService: ClientsService) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const pageIndex = this.paginator.pageIndex + 1;
          const itemsPerPage = this.paginator.pageSize;
          const sortDirection = this.sort.direction;
          const sortColumnName = this.sort.active;

          return this.clientsService.getClients(
            pageIndex,
            itemsPerPage,
            sortDirection,
            sortColumnName,
          );
        }),
        map((data) => {
          this.totalCount = data.totalCount;
          return data.clients;
        }),
      )
      .subscribe((clients) => {
        this.dataSource = new MatTableDataSource<Client>(clients);
      });

    // this.clientsService.getClients().subscribe({
    //   next: (response) => {
    //     this.totalCount = response.totalCount;
    //     this.dataSource = new MatTableDataSource<Client>(response.clients);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
