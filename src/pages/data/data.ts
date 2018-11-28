import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { FirebaseService } from '../services/firebase.service';

@Component({
    selector: 'page-data',
    templateUrl: 'data.html',
})
export class DataPage {
    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;

    barChart: any;
    doughnutChart: any;
    lineChart: any;
    postData = {
        solved: {
            missingPersons: 0,
            wantedPersons: 0,
            missingProperties: 0,
        },
        unsolved: {
            missingPersons: 0,
            wantedPersons: 0,
            missingProperties: 0,
        },
    };

    constructor(
        public navCtrl: NavController, 
        private firebaseService: FirebaseService,
        public navParams: NavParams,
    ) {} 

    getData(){
        this.firebaseService.getData()
        .then(data => {
            if (data) {
            data.map( dataMap => {
                let allData = dataMap.payload.doc.data();
                this.postData = allData;
                console.log(this.postData);
            });  		
            }
        })
    }

    postsSum( filter='all' ) {
        let sum = 0;
        
        switch ( filter )
        {
            case 'solved':
                sum += this.postData.solved.missingPersons;
                sum += this.postData.solved.missingProperties;
                sum += this.postData.solved.wantedPersons;
                break;
            case 'unsolved':
                sum += this.postData.unsolved.missingPersons;
                sum += this.postData.unsolved.missingProperties;
                sum += this.postData.unsolved.wantedPersons;
                break;
            default:
                sum += this.postData.solved.missingPersons;
                sum += this.postData.solved.missingProperties;
                sum += this.postData.solved.wantedPersons;
                sum += this.postData.unsolved.missingPersons;
                sum += this.postData.unsolved.missingProperties;
                sum += this.postData.unsolved.wantedPersons;
                break;
        }
     
        return sum;
    }

    getSolveRate( solved, unsolved) {
        return ((solved / unsolved) * 100).toFixed(1);
    }

    ionViewDidLoad() {
        this.getData();
        this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: 'pie',
            data: {
                labels: ["Missing Persons", "Mssing Property", "Wanted Persons"],
                datasets: [{
                    label: 'Post Types',
                    data: [12, 19, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            }
        });

        // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

        //     type: 'doughnut',
        //     data: {
        //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //         datasets: [{
        //             label: '# of Votes',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             hoverBackgroundColor: [
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56",
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56"
        //             ]
        //         }]
        //     }

        // });

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }

        });

}

}
