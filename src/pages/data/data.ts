import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { PostsService } from '../posts/posts.service';

@Component({
    selector: 'page-data',
    templateUrl: 'data.html',
})
export class DataPage {
    @ViewChild('barCanvas') barCanvas;
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
    
    monthCount = [
        0,0,0,0,0,0,0,0,0,0,0,0
    ]
    constructor(
        public navCtrl: NavController, 
        private postsService: PostsService,
        public navParams: NavParams,
    ) {
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
        this.postsService.getPosts( 'all' );
        this.postsService.collection.snapshotChanges().subscribe( data => {
           if (data) {
            data.map( dataMap => {
                let post = dataMap.payload.doc.data();
                if ( post.status.toLowerCase() == 'solved') {
                    switch( post.type.toLowerCase() ) {
                        case 'wanted person':
                            this.postData.solved.wantedPersons++;                    
                            break;
                        case 'missing property':
                            this.postData.solved.missingProperties++;
                            break;
                        case 'missing person':
                            this.postData.solved.missingPersons++;
                            break;
                    }
                } else if ( post.status.toLowerCase() == 'unsolved') {
                    switch( post.type.toLowerCase() ) {
                        case 'wanted person':
                            this.postData.unsolved.wantedPersons++;                    
                            break;
                        case 'missing property':
                            this.postData.unsolved.missingProperties++;
                            break;
                        case 'missing person':
                            this.postData.unsolved.missingPersons++;
                            break;
                    }
                }
                
                const year = new Date(post.dateTime).getFullYear();
                const month = new Date(post.dateTime).getMonth();
                if ( year == 2019 ) {
                    this.monthCount[ month ]++;
                }
            }); 	
            this.setCharts();
        }
    });

}

    setCharts() {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'pie',
        data: {
            labels: ["Missing Persons", "Mssing Property", "Wanted Persons"],
            datasets: [{
                label: 'Post Types',
                data: [
                    this.postData.solved.missingPersons + this.postData.unsolved.missingPersons, 
                    this.postData.solved.missingProperties +  this.postData.unsolved.missingProperties, 
                    this.postData.solved.wantedPersons +  this.postData.unsolved.wantedPersons,
                ],
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

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: "Number of Incidents by Month",
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
                        data: [{
                            x: "January",
                            y: this.monthCount[0],
                        },
                        {
                            x: "February",
                            y: this.monthCount[1],
                        },
                        {
                            x: "March",
                            y: this.monthCount[2],
                        },
                        {
                            x: "April",
                            y: this.monthCount[3],
                        },
                        {
                            x: "May",
                            y: this.monthCount[4],
                        },
                        {
                            x: "June",
                            y: this.monthCount[5],
                        },
                        {
                            x: "July",
                            y: this.monthCount[6],
                        },
                        {
                            x: "August",
                            y: this.monthCount[7],
                        },
                        {
                            x: "September",
                            y: this.monthCount[8],
                        },
                        {
                            x: "October",
                            y: this.monthCount[9],
                        },
                        {
                            x: "November",
                            y: this.monthCount[10],
                        },
                        {
                            x: "December",
                            y: this.monthCount[11],
                        }
                        ],
                        spanGaps: false,
                    }
                ]
            }
        });
    }

}
