import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import Parse from 'parse';
import { Store } from '@ngrx/store'
/**
 * Generated class for the PowerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory:['HomePage']
})
@Component({
  selector: 'page-power',
  templateUrl: 'power.html',
})

export class PowerPage {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;
  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  chartinfo: Array<any>=[];
  counterresult:Array<any>=[];
  doughuntmonth:any;
  lineyear:any;
  barday:any;
  bardate:any;

  //pie cahrt
  counter_caretaking:number;
  counter_disability:number;
  counter_repairs:number;
  counter_safer:number;
  counter_street:number;
  counter_charging_caretaking:number;
  counter_charging_disability:number;
  counter_charging_repairs:number;
  counter_charging_safer:number;
  counter_charging_street:number;

  //line chart
  counter_january:number;
  counter_february:number;
  counter_march:number;
  counter_april:number;
  counter_may:number;
  counter_june:number;
  counter_july:number;
  counter_august:number;
  counter_september:number;
  counter_october:number;
  counter_november:number;
  counter_december:number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public store: Store<any>) {
    this.store.select('ManagementReducer').subscribe(state => {
      this.chartinfo = state.chart_info
    });
  }
  doughnut(event){
    this.doughuntmonth=event.value;
  }
  line(event){
    this.lineyear=event.value;
  }

  refreshbar(){
    this.counterbar();
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Caretaking", "Disability&HomeImprovement", "Repairs&Investment", "SaferSpaces", "StreetServices"],
        datasets: [
          {
            label: "Amount of Power consumption",
            data: [this.counter_charging_caretaking,
                   this.counter_charging_disability,
                   this.counter_charging_repairs,
                   this.counter_charging_safer,
                   this.counter_charging_street
             ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
              //"rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)"
              //"rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [ {
            //type: 'time',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Service Type'
            },
            ticks: {
              major: {
                fontStyle: 'bold',
                fontColor: '#FF0000'
              }
            }
          } ],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Power(kwh)'
            },
            ticks: {
              beginAtZero: true
            }
            }
          ]
        }
      }
    });
  }
  counterbar(){
    this.counterresult=[];
    // this.counter_caretaking=0;
    // this.counter_disability=0;
    // this.counter_repairs=0;
    // this.counter_safer=0;
    // this.counter_street=0;
    this.counter_charging_caretaking=0;
    this.counter_charging_disability=0;
    this.counter_charging_repairs=0;
    this.counter_charging_safer=0;
    this.counter_charging_street=0;
    for(let i=0;i<this.chartinfo.length;i++){
      if(this.chartinfo[i].date==this.bardate){
        this.counterresult.push(this.chartinfo[i]);
      }
    }
    for(let i=0;i<this.counterresult.length;i++){
      if(this.counterresult[i].service=="Caretaking"){
        //this.counter_caretaking=this.counter_caretaking+1;
        this.counter_charging_caretaking=(100-this.counterresult[i].charging+this.counter_charging_caretaking);
        this.counter_charging_caretaking=this.counter_charging_caretaking*0.33;//0.33=33kwh/100% 33kwh is the battery capacity for Renault
      }
      if(this.counterresult[i].service=="Disability & Home Improvement"){
        //this.counter_disability=this.counter_disability+1;
        this.counter_charging_disability=100-this.counterresult[i].charging+this.counter_charging_disability;
        this.counter_charging_disability=this.counter_charging_disability*0.33;
      }
      if(this.counterresult[i].service=="Repairs & Investment"){
        //this.counter_repairs=this.counter_repairs+1;
        this.counter_charging_repairs=100-this.counterresult[i].charging+this.counter_charging_repairs;
        this.counter_charging_repairs=this.counter_charging_repairs*0.4;//0.4=40kwh/100% 40kwh is the battery capacity for Nissan
      }
      if(this.counterresult[i].service=="Safer Spaces"){
        //this.counter_safer=this.counter_safer+1;
        this.counter_charging_safer=100-this.counterresult[i].charging+this.counter_charging_safer;
        this.counter_charging_safer=this.counter_charging_safer*0.33;
      }
      if(this.counterresult[i].service=="Street Services"){
        //this.counter_street=this.counter_street+1;
        this.counter_charging_street=100-this.counterresult[i].charging+this.counter_charging_street;
        this.counter_charging_street=this.counter_charging_street*0.33;
      }
    }
  }
  refreshdoughunt(){
    //console.log('acc0: '+this.counter_charging_caretaking+' ++ '+this.counter_charging_disability);
    this.counterdoughunt();
    //console.log('acc1: '+this.counter_charging_caretaking+' ++ '+this.counter_charging_disability);
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Caretaking", "Disability&HomeImprovement", "Repairs&Investment", "SaferSpaces", "StreetServices"],
        datasets: [
          {
            label: "Type of Service Department",

            data: [this.counter_charging_caretaking,
                   this.counter_charging_disability,
                   this.counter_charging_repairs,
                   this.counter_charging_safer,
                   this.counter_charging_street
                  ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
              //"rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB"]//, "#FFCE56"
          }
        ]
      }
    });
  }
  counterdoughunt(){
    this.counterresult=[];
    this.counter_caretaking=0;
    this.counter_disability=0;
    this.counter_repairs=0;
    this.counter_safer=0;
    this.counter_street=0;
    this.counter_charging_caretaking=0;
    this.counter_charging_disability=0;
    this.counter_charging_repairs=0;
    this.counter_charging_safer=0;
    this.counter_charging_street=0;
    //console.log('acc3: '+this.counter_charging_caretaking+' ++ '+this.counter_charging_disability);
    for(let i=0;i<this.chartinfo.length;i++){
      if(this.chartinfo[i].month==this.doughuntmonth){
        this.counterresult.push(this.chartinfo[i]);
      }
    }
    for(let i=0;i<this.counterresult.length;i++){
      if(this.counterresult[i].service=="Caretaking"){
        this.counter_caretaking=this.counter_caretaking+1;
        this.counter_charging_caretaking=(100-this.counterresult[i].charging+this.counter_charging_caretaking);
        this.counter_charging_caretaking=this.counter_charging_caretaking*0.33;
        // console.log('charging2: '+this.counterresult[i].charging);
      }
      if(this.counterresult[i].service=="Disability & Home Improvement"){
        this.counter_disability=this.counter_disability+1;
        this.counter_charging_disability=100-this.counterresult[i].charging+this.counter_charging_disability;
        this.counter_charging_disability=this.counter_charging_disability*0.33;
      }
      if(this.counterresult[i].service=="Repairs & Investment"){
        //console.log('checkresult22: '+this.counterresult[i].objectid);
        this.counter_repairs=this.counter_repairs+1;
        this.counter_charging_repairs=100-this.counterresult[i].charging+this.counter_charging_repairs;
        this.counter_charging_repairs=this.counter_charging_repairs*0.4;
      }
      if(this.counterresult[i].service=="Safer Spaces"){
        this.counter_safer=this.counter_safer+1;
        this.counter_charging_safer=100-this.counterresult[i].charging+this.counter_charging_safer;
        this.counter_charging_safer=this.counter_charging_safer*0.33;
      }
      if(this.counterresult[i].service=="Street Services"){
        this.counter_street=this.counter_street+1;
        this.counter_charging_street=100-this.counterresult[i].charging+this.counter_charging_street;
        this.counter_charging_street=this.counter_charging_street*0.33;
      }
    }
  }

  refreshline(){
    //console.log('acc0: '+this.counter_charging_caretaking+' ++ '+this.counter_charging_disability);
    this.counterline();
    //console.log('acc1: '+this.counter_charging_caretaking+' ++ '+this.counter_charging_disability);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
        datasets: [
          {
            label: "Total Onsite Charging Power Consumption Trend (kwh) ",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.counter_january,
                   this.counter_february,
                   this.counter_march,
                   this.counter_april,
                   this.counter_may,
                   this.counter_june,
                   this.counter_july,
                   this.counter_august,
                   this.counter_september,
                   this.counter_october,
                   this.counter_november,
                   this.counter_december],
            spanGaps: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [ {
            //type: 'time',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            },
            ticks: {
              major: {
                fontStyle: 'bold',
                fontColor: '#FF0000'
              }
            }
          } ],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Power(kwh)'
            },
            ticks: {
              beginAtZero: true
            }
            }
          ]
        }
      }
    });
  }
  counterline(){
    this.counterresult=[];
    this.counter_january=0;
    this.counter_february=0;
    this.counter_march=0;
    this.counter_april=0;
    this.counter_may=0;
    this.counter_june=0;
    this.counter_july=0;
    this.counter_august=0;
    this.counter_september=0;
    this.counter_october=0;
    this.counter_november=0;
    this.counter_december=0;
    //console.log('acc3: '+this.counter_charging_caretaking+' ++ '+this.counter_charging_disability);
    for(let i=0;i<this.chartinfo.length;i++){
      if(this.chartinfo[i].year==this.lineyear){
        this.counterresult.push(this.chartinfo[i]);
      }
    }
    for(let i=0;i<this.counterresult.length;i++){
      if(this.counterresult[i].month=="01"){
        //this.counter_january=this.counter_january+1;
        this.counter_january=(100-this.counterresult[i].charging+this.counter_january);
        // console.log('charging2: '+this.counterresult[i].charging);
      }
      if(this.counterresult[i].month=="02"){
        this.counter_february=100-this.counterresult[i].charging+this.counter_february;
      }
      if(this.counterresult[i].month=="03"){
        this.counter_march=100-this.counterresult[i].charging+this.counter_march;
      }
      if(this.counterresult[i].month=="04"){
        this.counter_april=100-this.counterresult[i].charging+this.counter_april;
        //console.log('check01: '+this.counterresult[i].charging);
      }
      if(this.counterresult[i].month=="05"){
        this.counter_may=100-this.counterresult[i].charging+this.counter_may;
      }
      if(this.counterresult[i].month=="06"){
        this.counter_june=100-this.counterresult[i].charging+this.counter_june;
      }
      if(this.counterresult[i].month=="07"){
        this.counter_july=100-this.counterresult[i].charging+this.counter_july;
      }
      if(this.counterresult[i].month=="08"){
        this.counter_august=100-this.counterresult[i].charging+this.counter_august;
      }
      if(this.counterresult[i].month=="09"){
        this.counter_september=100-this.counterresult[i].charging+this.counter_september;
      }
      if(this.counterresult[i].month=="10"){
        this.counter_october=100-this.counterresult[i].charging+this.counter_october;
      }
      if(this.counterresult[i].month=="11"){
        this.counter_november=100-this.counterresult[i].charging+this.counter_november;
      }
      if(this.counterresult[i].month=="12"){
        this.counter_december=100-this.counterresult[i].charging+this.counter_december;
      }
    }
  }
  // ngOnInit() {
  //   console.log('checkdoumon2:'+this.doughuntmonth);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PowerPage');
  }

}
