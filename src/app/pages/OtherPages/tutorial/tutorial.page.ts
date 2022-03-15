import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage{




  constructor(private router: Router, private storage: Storage) { }

  async ionViewWillEnter () {
    await this.storage.create();
    this.check();
  }

  setValue = async () => {
    await this.storage.set('viewed',true);
    await this.router.navigate(['login'])
  }


  check = async () => {
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
