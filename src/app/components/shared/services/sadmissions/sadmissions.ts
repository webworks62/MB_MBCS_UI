import { Component } from '@angular/core';

@Component({
  selector: 'app-sadmissions',
  imports: [],
  templateUrl: './sadmissions.html',
  styleUrl: './sadmissions.css',
})
export class Sadmissions {
  description: string[] = [
    'Application submission support for selected colleges and universities.',
    'Application confirmation updates via Email or WhatsApp.',
    'Post-confirmation coordination, including a scheduled college visit for fee discussions.',
    'After visit confirmation, admission approval and the admit card will be sent via Email.',
    'Complete assistance with education loan processing, if required.',
    'Post-admit card certificate verification and final admission formalities support.',
    'Travel assistance with the student during the joining process, if required.',
  ];
}
