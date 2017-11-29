import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketballBetsService } from '../../services/basketball-bets.service';


@Component({
  selector: 'app-basketball',
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.css']
})
export class BasketballComponent implements OnInit {

  bets: Object[];
  form: FormGroup;
  stake1: number = 0;
  //stake2: number = 0;
  stake3: number = 0;
  pReturn: number = 0;
  selectedBet: any;

  constructor(private router: Router,
    private basketballbetsservice: BasketballBetsService,
    private formBuilder: FormBuilder) {
  }

  onClick(bet) {
    this.clear();
    if (bet != null) {
      this.selectedBet = bet;
    }
  }

  clear() {
    this.form.reset({stakes: 0});
  }

  ngOnInit() {
    this.basketballbetsservice.getBets().subscribe(data => {
      if (data.success) {
        this.bets = data.result;
      }
    });

    this.form = this.formBuilder.group({
      stakes: [0]
    });

    this.form.valueChanges.subscribe(data => {
      if(this.selectedBet) {
      let profit = 1 / this.selectedBet.homeTeamOdds + /* 1 / this.selectedBet.drawOdds + */ 1 / this.selectedBet.awayTeamOdds;
      console.log("profit: " + profit);
      this.pReturn = data.stakes / profit;
      console.log(this.pReturn);
      this.stake1 = this.pReturn / this.selectedBet.homeTeamOdds;
      //this.stake2 = this.pReturn / this.selectedBet.drawOdds;
      this.stake3 = this.pReturn / this.selectedBet.awayTeamOdds;
      }
    });
  }
}

