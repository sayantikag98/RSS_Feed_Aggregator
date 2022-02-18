import {Component, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {
  isEmpty!: boolean;
  displayedColumns: string[] = ['feedUrl', 'action']; // naming same as defined in the schema
  dataSource: any;
  feedList: any;
  @Output() newInput = new EventEmitter<any>();

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api:ApiService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
      this.getAllFeeds1();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllFeeds1();
    this.dataSource;
    this.isEmpty;
    this.feedList;
  }

  getAllFeeds1(){
    this.api.getFeeds()
    .subscribe({
          next: (data) => {
                this.dataSource = new MatTableDataSource();
                this.dataSource.data = data;
                this.feedList = data;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.cd.detectChanges();
                // this.ngOnInit();
            },
          error: () => {
            console.log("Error in getting all the feeds");
          }
        })
  }

  editFeed(data: any){
    this.newInput.emit(data);
    

  }

  deleteFeed(data:any){
    this.api.deleteFeed(data._id)
    .subscribe({
      next: res => {
        console.log("Feed deleted from database");
        this.ngOnInit();
      },
      error: () => {
        console.log("Error!!! Feed cannot be deleted from database");
      }
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.nextPage();
    }
  }

}
