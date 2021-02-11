import { Component, OnInit } from '@angular/core';
import { extend , addClass} from '@syncfusion/ej2-base';
import { TimelineViewsService, AgendaService, GroupModel, EventSettingsModel, ResizeService, DragAndDropService, ActionEventArgs, RenderCellEventArgs, EventRenderedArgs} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.css']
})
export class SheduleComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onCreate(): void {
        // tslint:disable-next-line: no-console
        console.time('init');
    }

    onDataBinding(): void {
        // tslint:disable-next-line: no-console
        console.time('events render');
    }

    onDataBound(): void {
        // tslint:disable-next-line: no-console
        console.timeEnd('events render');
        console.log('data');
        // tslint:disable-next-line: no-console
        console.timeEnd('init');
    }

    onActionBegin(args: ActionEventArgs ): void {
        if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
            // tslint:disable-next-line: no-console
            console.time('init');
            // tslint:disable-next-line: no-console
            console.time('navigate');
        }
    }

    onActionComplete(args: ActionEventArgs ): void {
        if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
            // tslint:disable-next-line: no-console
            console.timeEnd('navigate');
        }
    }

    onRenderCell(args: RenderCellEventArgs): void {
        if ((args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) )  {
            // tslint:disable-next-line: whitespace
            // tslint:disable-next-line: max-line-length
            addClass([args.element], ['resource','project1', 'project2', 'project3', 'resource', 'project4', 'project5', 'resource','project6', 'resource','project7', 'resource','project8', 'resource','project9', 'resource','project10', 'resource','project11', 'resource','project12', 'resource','project13'][parseInt(args.element.getAttribute('data-group-index'), 10)]);
        }
    }

    public generateEventData(startDate: Date, endDate: Date, eventCount: number): Object[] {
        let data: Object[] = [];
        let names: string[] = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
            'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
            'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        let msPerHour: number = 1000 * 60 * 60;
        let id: number = 1;
        let i:number = 1;
        let j:number = 1;
        let incMs: number = (msPerHour * 24) * 1;
        let generate: Function = () => {
        i++; 
            let start: number = startDate.getTime();
            let end: number = endDate.getTime();
            for (let a: number = start; a < end; a += incMs) {
            
                let count: number = Math.floor((Math.random() * 9) + 1);
                for (let b: number = 0; b < count; b++) {
                    j++;
                    let hour: number = Math.floor(Math.random() * 100) % 24;
                    let minutes: number = Math.round((Math.floor(Math.random() * 100) % 60) / 5) * 5;
                    let nCount: number = Math.floor(Math.random() * names.length);
                    let startDate: Date = new Date(new Date(a).setHours(hour, minutes));
                    let endDate: Date = new Date(startDate.getTime() + (msPerHour * 2.5));
                    data.push({
                        Id: id,
                        Subject: names[nCount],
                        StartTime: startDate,
                        EndTime: endDate,
                        IsAllDay: (id % 10) ? false : true,
                        ProjectId: i,
                        TaskId: j
                    });
                    if (data.length >= eventCount) {
                        return;
                    }
                    id++;
                    if(i > 10){i = 1;}
                    
                    if(j > 14){j = 1;}
                }
            }
        }
        while (data.length < eventCount) {
            generate();
        }
        console.log(data);
        
        return data;
    };


    public selectedDate: Date = new Date(2021, 1, 1);
    public currentView: string = "TimelineMonth";
    public group: GroupModel = {
    resources: ['Projects', 'Categories']
    };

    public projectDataSource: Object[] = [
        { text: 'Akhil Ben', id: 1, color: '#cb6bb2', HospitalGroupId: 1 },
        { text: 'Akhil Raj', id: 2, color: '#56ca85', HospitalGroupId: 2 },
        { text: 'Akhilesh Pn', id: 3, color: '#df5286', HospitalGroupId: 3 },
        { text: 'Rahul Aher', id: 4, color: '#df5286', HospitalGroupId: 4 },
        { text: 'Beena Jha', id: 5, color: '#df5286', HospitalGroupId: 5 },
        { text: 'Kavin Silvera', id: 6, color: '#df5286', HospitalGroupId: 6 },
        { text: 'Divya Nair', id: 7, color: '#df5286', HospitalGroupId: 7 },
        { text: 'Prashant Kutty', id: 8, color: '#df5286', HospitalGroupId: 8 },
        { text: 'Ajay Chayya', id: 9, color: '#df5286', HospitalGroupId: 9 }
    ];
    public categoryDataSource: Object[] = [
        { text: 'Project-1', id: 1, color: '#df5286',  DoctorGroupId: 1, startHour: '09:00', endHour: '19:00' },
        { text: 'Project-2', id: 2, color: '#7fa900',  DoctorGroupId: 1, startHour: '10:00', endHour: '16:00' },
        { text: 'Project-3', id: 3, color: '#7fa900', DoctorGroupId: 2, startHour: '07:00', endHour: '18:00' },
        { text: 'Project-4', id: 4, color: '#df5286',  DoctorGroupId: 2, startHour: '02:00', endHour: '19:00' },
        { text: 'Project-5', id: 5, color: '#7fa900',  DoctorGroupId: 3, startHour: '10:00', endHour: '15:00' },
        { text: 'Project-6', id: 6, color: '#7fa900', DoctorGroupId: 3, startHour: '06:00', endHour: '12:00' },
        { text: 'Project-7', id: 7, color: '#7fa900', DoctorGroupId: 4, startHour: '06:00', endHour: '12:00' },
        { text: 'Project-8', id: 8, color: '#7fa900', DoctorGroupId: 5, startHour: '06:00', endHour: '12:00' },
        { text: 'Project-9', id: 9, color: '#7fa900', DoctorGroupId: 6, startHour: '06:00', endHour: '12:00' },
        { text: 'Project-10', id: 10, color: '#7fa900', DoctorGroupId: 7, startHour: '06:00', endHour: '12:00' },
        { text: 'Project-11', id: 11, color: '#7fa900', DoctorGroupId: 7, startHour: '06:00', endHour: '12:00' },
        { text: 'Project-12', id: 12, color: '#7fa900', DoctorGroupId: 8, startHour: '06:00', endHour: '12:00' },
        { text: 'Project-13', id: 13, color: '#7fa900', DoctorGroupId: 9, startHour: '06:00', endHour: '12:00' },
    ];

    public allowMultiple: Boolean = true;
    public eventData: Object[] = this.generateEventData(new Date(2020, 0, 1), new Date(2021, 11, 28), 50000);


    public eventSettings: EventSettingsModel = {
        dataSource: <Object[]>extend([], this.eventData, null, true)
    };


}
