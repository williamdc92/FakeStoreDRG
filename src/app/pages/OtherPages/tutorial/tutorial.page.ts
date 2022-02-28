import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {




  constructor(private router: Router, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.Check();
  }

  async SetValue(value: boolean) {
    await this.storage.set('viewed', value);
    this.ngOnInit();
  }


  async Check() {
    if (await this.storage.get('viewed') == true && await this.storage.get('logged') == false) {
      await this.router.navigate(['login'])
      console.log("viewed");
    }
    else if (await this.storage.get('viewed') == true && await this.storage.get('logged') == true) {
      await this.router.navigate(['products'])
      console.log("viewed and logged");
    }

    else {
      console.log("starting tutorial");
    }


  }

}
