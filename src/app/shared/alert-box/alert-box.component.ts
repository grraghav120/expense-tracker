import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit{
  type:any;
  isLoading:boolean=false;
  userId:any;
  constructor(public authService:AuthService,@Inject(MAT_DIALOG_DATA) public data: any,public snackBar:MatSnackBar,public dialog: MatDialog){}
  ngOnInit(): void {
      this.type=this.data.type;
      this.userId=localStorage.getItem('Id')?.split(' ')[1];
  }

  onLogout(){
    this.authService.onLogout();
  }


  onDeleteAccount(){
    this.isLoading=true;
    if(this.userId==='6558727029c0dacee0900c6a'){
      this.dialog.open(AlertBoxComponent, {
        data:{type:'admin'}
      });
      this.isLoading=false;
      return;
    }
    this.authService.deleteUserAccount().subscribe((res:any)=>{
      console.log(res);
      this.isLoading=false;
      this.onLogout();
      this.snackBar.open('Account Deleted Successfully','',{duration:2000});
    });
  }

}
