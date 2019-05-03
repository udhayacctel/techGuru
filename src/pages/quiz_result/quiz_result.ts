import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ViewController  } from 'ionic-angular';
import { Quiz } from '../../models/quiz';
import { Quiz_Select } from '../quiz_select/quiz_select';
import { Home } from '../home/home';
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';


@Component({
    selector: 'quiz-result',
    templateUrl: 'quiz_result.html'
})


export class Quiz_Result {

    quiz_answers_quiz: Quiz[];
    score: number = 0;
    loader: any;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public loadingController: LoadingController, public popoverCtrl: PopoverController) {

        this.quiz_answers_quiz = navParams.get('parm_quiz_data');
        this.calculate_score();
        this.calculate_question();
        this.loading()
        this.loader.dismiss()
    }
    submit() {
        this.navCtrl.push(Quiz_Select).then(() => {
            const index = this.viewCtrl.index;
            for(let i=index; i > 0; i--){
                this.navCtrl.remove(i);
            }
        })
       // this.navCtrl.setRoot(Quiz_Select);

    }
    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }
    calculate_question() {
        if (this.quiz_answers_quiz.length) {

        }
    }
    calculate_score() {
        for (let num of this.quiz_answers_quiz) {

            if (num.checked == num.answer) {
                this.score = this.score + 1;
            }
        }
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad Quiz2Page');
    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({

            ev: myEvent

        });

    }

}